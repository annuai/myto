import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createAdminClient } from "@/lib/supabase";
import {
  sendOrderConfirmationEmail,
  sendAdminNotificationEmail,
  sendAccountSetupEmail,
} from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      db_order_id,
    } = body;

    // ── Validate inputs ───────────────────────────────────────────
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !db_order_id) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // ── Verify Razorpay HMAC signature ────────────────────────────
    const message = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(message)
      .digest("hex");

    if (
      expected.length !== razorpay_signature.length ||
      !crypto.timingSafeEqual(
        Buffer.from(expected, "hex"),
        Buffer.from(razorpay_signature, "hex")
      )
    ) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    // ── Update order in DB ────────────────────────────────────────
    const supabase = createAdminClient();

    const { data: order, error: updateError } = await supabase
      .from("orders")
      .update({
        status: "confirmed",
        payment_status: "paid",
        razorpay_payment_id,
        razorpay_signature,
        updated_at: new Date().toISOString(),
      })
      .eq("id", db_order_id)
      .eq("razorpay_order_id", razorpay_order_id) // idempotency guard
      .select("*, order_items(*)")
      .single();

    if (updateError || !order) {
      console.error("Order update error:", updateError);
      return NextResponse.json({ error: "Order update failed" }, { status: 500 });
    }

    const orderWithItems = order as typeof order & {
      order_items: Array<{
        product_slug: string;
        quantity: number;
        is_pre_order: boolean;
      }>;
    };

    // ── Decrement inventory (best effort, non-fatal) ───────────────
    for (const item of orderWithItems.order_items ?? []) {
      await supabase
        .rpc("decrement_inventory", {
          p_slug: item.product_slug,
          p_quantity: item.quantity,
          p_is_pre_order: item.is_pre_order,
        })
        .then(({ error }) => {
          if (error) console.error("Inventory decrement error:", error);
        });
    }

    // ── Send emails + provision account ──────────────────────────
    // Awaited with allSettled so all three run in parallel and a
    // failure in one doesn't block the others or the response.
    // Must complete BEFORE return — serverless functions are frozen
    // the instant a response is sent, killing any floating promises.
    const appOrigin = request.nextUrl.origin;
    const items = orderWithItems.order_items ?? [];

    const [confirmResult, adminResult, provisionResult] = await Promise.allSettled([
      sendOrderConfirmationEmail(orderWithItems, items),
      sendAdminNotificationEmail(orderWithItems, items),
      provisionCustomerAccount(supabase, order.customer_email, order.customer_name, order.order_number, appOrigin),
    ]);

    if (confirmResult.status === "rejected")
      console.error("Order confirmation email failed:", confirmResult.reason);
    if (adminResult.status === "rejected")
      console.error("Admin notification email failed:", adminResult.reason);
    if (provisionResult.status === "rejected")
      console.error("Account provisioning failed:", provisionResult.reason);

    return NextResponse.json({ success: true, orderId: db_order_id });
  } catch (err) {
    console.error("Payment verification error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ── Account provisioning helper ───────────────────────────────────
async function provisionCustomerAccount(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: ReturnType<typeof createAdminClient>,
  email: string,
  name: string,
  orderNumber: string,
  appOrigin: string
) {
  // Idempotency check — skip if account already exists
  const { data: exists } = await supabase.rpc("check_email_account_exists", {
    p_email: email,
  });
  if (exists) return;

  // Generate signup link — creates the user without sending Supabase's
  // own email. We send the activation email via Resend instead.
  const redirectTo = `${appOrigin}/auth/callback?next=/account/orders`;
  // A random password is required by the Supabase signup link API.
  // Users set their own password via the forgot-password flow.
  const { data, error } = await supabase.auth.admin.generateLink({
    type: "signup",
    email,
    password: crypto.randomUUID(),
    options: { redirectTo },
  });

  if (error || !data?.properties?.action_link) {
    console.error("generateLink failed:", error);
    return;
  }

  await sendAccountSetupEmail(email, name, orderNumber, data.properties.action_link);
}
