"use server";

import { headers } from "next/headers";
import { createAdminClient } from "@/lib/supabase";
import { createSupabaseServerClient } from "@/lib/supabase-server-client";
import { generateOrderNumber } from "@/lib/order-utils";
import { preOrderPrice } from "@/lib/pricing";
import type { CartItem } from "@/context/CartContext";

// ── In-process rate limiter (per IP) ────────────────────────────────
// Good enough for a single-instance deployment.
// Replace with Redis/Upstash for multi-instance production.
const _rateLimitBuckets = new Map<string, number[]>();
function checkRateLimit(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const hits = (_rateLimitBuckets.get(key) ?? []).filter((t) => now - t < windowMs);
  if (hits.length >= max) return false; // blocked
  hits.push(now);
  _rateLimitBuckets.set(key, hits);
  return true; // allowed
}

// ── Email account check ──────────────────────────────────────────────
export async function checkEmailExists(
  email: string
): Promise<{ exists: boolean }> {
  const trimmed = email.toLowerCase().trim();
  if (!trimmed || !trimmed.includes("@")) return { exists: false };

  // Rate limit: 15 checks per IP per 60 s
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (!checkRateLimit(`email-check:${ip}`, 15, 60_000)) {
    // Rate limited — respond as if no account to avoid enumeration via timing
    await new Promise((r) => setTimeout(r, 150));
    return { exists: false };
  }

  // Minimum 150 ms response to slow bulk enumeration
  const t0 = Date.now();
  const admin = createAdminClient();
  const { data } = await admin.rpc("check_email_account_exists", {
    p_email: trimmed,
  });
  const elapsed = Date.now() - t0;
  if (elapsed < 150) await new Promise((r) => setTimeout(r, 150 - elapsed));

  return { exists: data === true };
}

// ── Types ────────────────────────────────────────────────────────────
export type CheckoutFormData = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingName: string;
  shippingAddress1: string;
  shippingAddress2?: string;
  shippingCity: string;
  shippingState: string;
  shippingPincode: string;
};

export type CreateOrderResult =
  | {
      success: true;
      razorpayOrderId: string;
      razorpayKeyId: string;
      amount: number;
      dbOrderId: string;
      orderNumber: string;
    }
  | { success: false; error: string };

// ── Main action ──────────────────────────────────────────────────────
export async function createOrder(
  formData: CheckoutFormData,
  items: CartItem[],
  password?: string
): Promise<CreateOrderResult> {
  try {
    if (!items || items.length === 0) {
      return { success: false, error: "Your cart is empty." };
    }

    const email = formData.customerEmail.toLowerCase().trim();

    // ── Sign in existing user if password provided ──────────────────
    // This sets a session cookie for the current response so the user
    // is logged in immediately after payment. It is optional — the
    // order is linked by email regardless of whether they sign in now.
    if (password) {
      const supabase = await createSupabaseServerClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) {
        const m = signInError.message;
        if (m.includes("Invalid login credentials")) {
          return { success: false, error: "Incorrect password. Please try again or skip sign-in to continue." };
        }
        if (m.includes("Email not confirmed")) {
          return {
            success: false,
            error: "Your account email hasn't been confirmed yet. Skip sign-in for now — you'll get a fresh activation link after payment.",
          };
        }
        return { success: false, error: "Sign-in failed. Skip sign-in to continue with checkout." };
      }
    }

    // ── Compute totals (prices in lib/products.ts are whole rupees) ─
    const subtotalPaise = items.reduce((sum, item) => {
      const priceRupees = item.isPreOrder
        ? preOrderPrice(item.product.price)
        : item.product.price;
      return sum + priceRupees * item.quantity * 100;
    }, 0);

    const shippingPaise = 0;
    const totalPaise = subtotalPaise + shippingPaise;
    const isPreOrder = items.some((i) => i.isPreOrder);
    const orderNumber = generateOrderNumber();

    // ── Create Razorpay order ────────────────────────────────────────
    const rzpResponse = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`
          ).toString("base64"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: totalPaise,
        currency: "INR",
        receipt: orderNumber,
        notes: { customer_email: email },
      }),
    });

    if (!rzpResponse.ok) {
      console.error("Razorpay order creation failed:", await rzpResponse.text());
      return { success: false, error: "Payment gateway error. Please try again." };
    }

    const rzpOrder = await rzpResponse.json();

    // ── Create DB order ──────────────────────────────────────────────
    const supabase = createAdminClient();

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        order_number: orderNumber,
        status: "pending",
        customer_email: email,
        customer_name: formData.customerName.trim(),
        customer_phone: formData.customerPhone.trim(),
        shipping_name: formData.shippingName.trim(),
        shipping_address_line1: formData.shippingAddress1.trim(),
        shipping_address_line2: formData.shippingAddress2?.trim() || null,
        shipping_city: formData.shippingCity.trim(),
        shipping_state: formData.shippingState,
        shipping_pincode: formData.shippingPincode.trim(),
        subtotal_paise: subtotalPaise,
        shipping_paise: shippingPaise,
        discount_paise: 0,
        total_paise: totalPaise,
        payment_status: "pending",
        razorpay_order_id: rzpOrder.id,
        is_pre_order: isPreOrder,
      })
      .select("id")
      .single();

    if (orderError || !order) {
      console.error("Order DB insert error:", orderError);
      return { success: false, error: "Could not create order. Please try again." };
    }

    // ── Create order items ───────────────────────────────────────────
    const orderItems = items.map((item) => {
      const unitPriceRupees = item.isPreOrder
        ? preOrderPrice(item.product.price)
        : item.product.price;
      return {
        order_id: order.id,
        product_slug: item.product.slug,
        product_name: item.product.name,
        unit_price_paise: unitPriceRupees * 100,
        original_price_paise: item.product.price * 100,
        quantity: item.quantity,
        is_pre_order: item.isPreOrder,
        subtotal_paise: unitPriceRupees * item.quantity * 100,
      };
    });

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      console.error("Order items insert error:", itemsError);
    }

    return {
      success: true,
      razorpayOrderId: rzpOrder.id,
      razorpayKeyId: process.env.RAZORPAY_KEY_ID!,
      amount: totalPaise,
      dbOrderId: order.id,
      orderNumber,
    };
  } catch (err) {
    console.error("createOrder unexpected error:", err);
    return { success: false, error: "An unexpected error occurred. Please try again." };
  }
}
