import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Package, Mail, UserCheck, ShieldAlert } from "lucide-react";
import { createAdminClient } from "@/lib/supabase";
import { createSupabaseServerClient } from "@/lib/supabase-server-client";
import { formatPaise } from "@/lib/order-utils";
import { Footer } from "@/components/Footer";
import type { DBOrderWithItems } from "@/lib/types";

export const dynamic = "force-dynamic";

type AccountStatus = "none" | "unverified" | "verified";

async function getOrder(orderId: string): Promise<DBOrderWithItems | null> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .eq("id", orderId)
    .eq("payment_status", "paid")
    .single();
  return data as DBOrderWithItems | null;
}

async function getAccountStatus(email: string): Promise<AccountStatus> {
  const admin = createAdminClient();
  const { data } = await admin.rpc("get_account_verification_status", {
    p_email: email,
  });
  return (data as AccountStatus) ?? "none";
}

export default async function OrderSuccessPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;

  const [order, supabase] = await Promise.all([
    getOrder(orderId),
    createSupabaseServerClient(),
  ]);

  if (!order) notFound();

  const [{ data: { user } }, accountStatus] = await Promise.all([
    supabase.auth.getUser(),
    getAccountStatus(order.customer_email),
  ]);

  // Is the current session the owner of this order?
  const isTheirSession =
    !!user &&
    user.email?.toLowerCase() === order.customer_email.toLowerCase();
  const isConfirmed = isTheirSession && !!user?.email_confirmed_at;

  return (
    <div
      className="min-h-screen pt-24 pb-20"
      style={{ background: "var(--color-background)" }}
    >
      <div className="container-wide max-w-2xl">

        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: "rgba(45,106,79,0.12)" }}
          >
            <CheckCircle size={32} style={{ color: "#2d6a4f" }} />
          </div>
          <h1 className="display-md mb-3">Order confirmed</h1>
          <p className="text-base" style={{ color: "var(--color-muted)" }}>
            Thank you, {order.customer_name.split(" ")[0]}. Your order has been
            received and is being processed.
          </p>
        </div>

        {/* Order number card */}
        <div
          className="rounded-3xl p-7 mb-6 text-center"
          style={{ background: "var(--color-card-dark)" }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: "rgba(245,240,232,0.35)" }}
          >
            Order number
          </p>
          <p className="display-sm" style={{ color: "#f5f0e8" }}>
            {order.order_number}
          </p>
        </div>

        {/* ── Account / email cards ─────────────────────────────────── */}

        {isConfirmed ? (
          /* ── Verified + signed in → clean card, no verification noise ── */
          <div
            className="rounded-3xl p-6 mb-6 flex items-start gap-4"
            style={{ background: "var(--color-card-cream)" }}
          >
            <div
              className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center mt-0.5"
              style={{ background: "rgba(45,106,79,0.12)" }}
            >
              <UserCheck size={16} style={{ color: "#2d6a4f" }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold mb-0.5">Order details emailed</p>
              <p className="text-xs mb-3" style={{ color: "var(--color-muted)" }}>
                A confirmation has been sent to{" "}
                <strong>{order.customer_email}</strong>. You can also track this
                order any time from your account.
              </p>
              <Link
                href="/account/orders"
                className="inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-70"
                style={{ color: "var(--color-accent)" }}
              >
                View my orders →
              </Link>
            </div>
          </div>

        ) : accountStatus === "verified" ? (
          /* ── Verified account, not currently signed in ── */
          <div
            className="rounded-3xl p-6 mb-6 flex items-start gap-4"
            style={{ background: "var(--color-card-cream)" }}
          >
            <div
              className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center mt-0.5"
              style={{ background: "rgba(45,106,79,0.12)" }}
            >
              <Mail size={16} style={{ color: "#2d6a4f" }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold mb-0.5">Order details emailed</p>
              <p className="text-xs mb-3" style={{ color: "var(--color-muted)" }}>
                A confirmation has been sent to{" "}
                <strong>{order.customer_email}</strong>.
              </p>
              <Link
                href={`/account/login?email=${encodeURIComponent(order.customer_email)}`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-70"
                style={{ color: "var(--color-accent)" }}
              >
                Sign in to track this order →
              </Link>
            </div>
          </div>

        ) : (
          /* ── Unverified or new account → two separate cards ── */
          <div className="space-y-3 mb-6">
            {/* Card 1: order email */}
            <div
              className="rounded-3xl p-6 flex items-start gap-4"
              style={{ background: "var(--color-card-cream)" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center mt-0.5"
                style={{ background: "rgba(45,106,79,0.12)" }}
              >
                <Mail size={16} style={{ color: "#2d6a4f" }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold mb-0.5">Order details emailed</p>
                <p className="text-xs" style={{ color: "var(--color-muted)" }}>
                  A confirmation has been sent to{" "}
                  <strong>{order.customer_email}</strong>.
                </p>
              </div>
            </div>

            {/* Card 2: verification email (separate) */}
            <div
              className="rounded-3xl p-6 flex items-start gap-4"
              style={{ background: "var(--color-card-stone)" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center mt-0.5"
                style={{ background: "rgba(190,58,35,0.08)" }}
              >
                <ShieldAlert size={16} style={{ color: "var(--color-accent)" }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold mb-0.5">
                  {accountStatus === "unverified"
                    ? "Verify your account"
                    : "Activate your account"}
                </p>
                <p className="text-xs mb-3" style={{ color: "var(--color-muted)" }}>
                  {accountStatus === "unverified"
                    ? "We've sent a verification link separately to "
                    : "We've sent an activation link to "}
                  <strong>{order.customer_email}</strong>.{" "}
                  Click it to confirm your account and track orders. The link expires in 24 hours.
                </p>
                <Link
                  href={`/account/login?email=${encodeURIComponent(order.customer_email)}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-70"
                  style={{ color: "var(--color-accent)" }}
                >
                  Sign in instead →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Order items */}
        <div
          className="rounded-3xl p-7 mb-6"
          style={{ background: "var(--color-card-stone)" }}
        >
          <h2 className="font-semibold text-sm mb-5">Items ordered</h2>
          <ul className="space-y-3">
            {order.order_items.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-4"
              >
                <div>
                  <p className="text-sm font-medium">{item.product_name}</p>
                  {item.is_pre_order && (
                    <span
                      className="text-[10px] font-bold uppercase tracking-wide"
                      style={{ color: "var(--color-accent)" }}
                    >
                      Pre-order
                    </span>
                  )}
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-semibold">
                    {formatPaise(item.subtotal_paise)}
                  </p>
                  {item.quantity > 1 && (
                    <p className="text-xs" style={{ color: "var(--color-muted)" }}>
                      qty {item.quantity}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <div
            className="border-t mt-5 pt-4 flex justify-between font-bold"
            style={{ borderColor: "rgba(0,0,0,0.07)" }}
          >
            <span>Total paid</span>
            <span>{formatPaise(order.total_paise)}</span>
          </div>
        </div>

        {/* Shipping */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          <div
            className="rounded-2xl p-5"
            style={{ background: "var(--color-card-cream)" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Package size={14} style={{ color: "var(--color-muted)" }} />
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--color-muted)" }}>
                Shipping to
              </p>
            </div>
            <p className="text-sm font-medium">{order.shipping_name}</p>
            <p className="text-sm" style={{ color: "var(--color-muted)" }}>
              {order.shipping_address_line1}
            </p>
            {order.shipping_address_line2 && (
              <p className="text-sm" style={{ color: "var(--color-muted)" }}>
                {order.shipping_address_line2}
              </p>
            )}
            <p className="text-sm" style={{ color: "var(--color-muted)" }}>
              {order.shipping_city}, {order.shipping_state} – {order.shipping_pincode}
            </p>
          </div>
          <div
            className="rounded-2xl p-5"
            style={{ background: "var(--color-card-cream)" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Mail size={14} style={{ color: "var(--color-muted)" }} />
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--color-muted)" }}>
                Confirmation sent to
              </p>
            </div>
            <p className="text-sm font-medium">{order.customer_email}</p>
            <p className="text-xs mt-2" style={{ color: "var(--color-muted)" }}>
              Check your inbox for the order receipt and, if applicable, a
              separate account activation email.
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-2xl text-sm font-semibold transition-all hover:opacity-90"
            style={{ background: "var(--color-accent)", color: "#fff" }}
          >
            Continue shopping
          </Link>
          <Link
            href="/support"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-2xl text-sm font-semibold transition-all hover:opacity-75"
            style={{ border: "1px solid rgba(0,0,0,0.12)", color: "var(--color-foreground)" }}
          >
            Need help?
          </Link>
        </div>

      </div>
      <div className="mt-20">
        <Footer className="" />
      </div>
    </div>
  );
}
