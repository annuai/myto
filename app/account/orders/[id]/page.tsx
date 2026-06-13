import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Package, Mail, Truck } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase-server-client";
import { createAdminClient } from "@/lib/supabase";
import { formatPaise, ORDER_STATUS_COLORS, ORDER_STATUS_LABELS, PAYMENT_STATUS_COLORS } from "@/lib/order-utils";
import { Footer } from "@/components/Footer";
import type { DBOrderWithItems, OrderStatus } from "@/lib/types";

export const dynamic = "force-dynamic";

const STATUS_STEPS: OrderStatus[] = ["confirmed", "processing", "shipped", "delivered"];

export default async function AccountOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/account/login");

  const admin = createAdminClient();
  const { data } = await admin
    .from("orders")
    .select("*, order_items(*)")
    .eq("id", id)
    .eq("customer_email", user.email!.toLowerCase())
    .eq("payment_status", "paid")
    .single();

  if (!data) notFound();

  const order = data as DBOrderWithItems;
  const sc = ORDER_STATUS_COLORS[order.status];
  const pc = PAYMENT_STATUS_COLORS[order.payment_status];

  const currentStepIndex = STATUS_STEPS.indexOf(order.status as OrderStatus);
  const isCancelled = order.status === "cancelled" || order.status === "refunded";
  const hasTracking = !!(order.tracking_number || order.tracking_carrier || order.tracking_url);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--color-background)" }}
    >
      <div className="flex-1 pt-28 pb-16">
        <div className="container-wide max-w-2xl">

          {/* Back */}
          <Link
            href="/account/orders"
            className="inline-flex items-center gap-1.5 text-sm mb-8 transition-opacity hover:opacity-60"
            style={{ color: "var(--color-muted)" }}
          >
            <ChevronLeft size={14} />
            My orders
          </Link>

          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
            <div>
              <h1 className="display-sm mb-2">{order.order_number}</h1>
              <p className="text-sm" style={{ color: "var(--color-muted)" }}>
                Placed on{" "}
                {new Date(order.created_at).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="px-3 py-1.5 rounded-xl text-xs font-bold"
                style={{ background: pc.bg, color: pc.text }}
              >
                {order.payment_status}
              </span>
              <span
                className="px-3 py-1.5 rounded-xl text-xs font-bold capitalize"
                style={{ background: sc.bg, color: sc.text }}
              >
                {ORDER_STATUS_LABELS[order.status]}
              </span>
              {order.is_pre_order && (
                <span
                  className="px-3 py-1.5 rounded-xl text-xs font-bold"
                  style={{ background: "rgba(190,58,35,0.08)", color: "var(--color-accent)" }}
                >
                  Pre-order
                </span>
              )}
            </div>
          </div>

          <div className="space-y-4">
            {/* Order progress stepper */}
            {!isCancelled && (
              <div
                className="rounded-3xl p-6"
                style={{ background: "var(--color-card-stone)" }}
              >
                <h2
                  className="text-xs font-semibold uppercase tracking-widest mb-5"
                  style={{ color: "var(--color-muted)" }}
                >
                  Order progress
                </h2>
                <div className="flex items-start gap-0">
                  {STATUS_STEPS.map((step, i) => {
                    const isDone = currentStepIndex >= i && currentStepIndex !== -1;
                    const isCurrent = currentStepIndex === i;
                    const stepColors = ORDER_STATUS_COLORS[step];
                    return (
                      <div key={step} className="flex-1 flex flex-col items-center">
                        {/* connector + dot row */}
                        <div className="w-full flex items-center">
                          {/* left line */}
                          <div
                            className="flex-1 h-0.5"
                            style={{
                              background: i === 0
                                ? "transparent"
                                : isDone || (currentStepIndex >= i - 1 && currentStepIndex !== -1)
                                  ? stepColors.text
                                  : "rgba(0,0,0,0.1)",
                            }}
                          />
                          {/* dot */}
                          <div
                            className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold transition-all"
                            style={{
                              background: isDone ? stepColors.bg : "rgba(0,0,0,0.05)",
                              color: isDone ? stepColors.text : "rgba(0,0,0,0.25)",
                              outline: isCurrent ? `2px solid ${stepColors.text}` : "none",
                              outlineOffset: "2px",
                            }}
                          >
                            {isDone ? "✓" : i + 1}
                          </div>
                          {/* right line */}
                          <div
                            className="flex-1 h-0.5"
                            style={{
                              background: i === STATUS_STEPS.length - 1
                                ? "transparent"
                                : currentStepIndex > i
                                  ? ORDER_STATUS_COLORS[STATUS_STEPS[i + 1]].text
                                  : "rgba(0,0,0,0.1)",
                            }}
                          />
                        </div>
                        {/* label */}
                        <p
                          className="text-[10px] font-semibold mt-2 text-center leading-tight"
                          style={{ color: isDone ? "var(--color-foreground)" : "var(--color-muted)" }}
                        >
                          {ORDER_STATUS_LABELS[step]}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tracking info (shown when available) */}
            {hasTracking && (
              <div
                className="rounded-3xl p-6"
                style={{ background: "var(--color-card-cream)" }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Truck size={14} style={{ color: "var(--color-muted)" }} />
                  <h2
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Shipment tracking
                  </h2>
                </div>
                <div className="space-y-2">
                  {order.tracking_carrier && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs w-24 flex-shrink-0" style={{ color: "var(--color-muted)" }}>Carrier</span>
                      <span className="text-sm font-semibold">{order.tracking_carrier}</span>
                    </div>
                  )}
                  {order.tracking_number && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs w-24 flex-shrink-0" style={{ color: "var(--color-muted)" }}>Tracking #</span>
                      <span className="text-sm font-mono font-semibold">{order.tracking_number}</span>
                    </div>
                  )}
                </div>
                {order.tracking_url && (
                  <a
                    href={order.tracking_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-80"
                    style={{ background: "var(--color-accent)", color: "#fff" }}
                  >
                    <Truck size={14} />
                    Track your order
                  </a>
                )}
              </div>
            )}

            {/* Items */}
            <div
              className="rounded-3xl p-7"
              style={{ background: "var(--color-card-stone)" }}
            >
              <h2
                className="text-xs font-semibold uppercase tracking-widest mb-5"
                style={{ color: "var(--color-muted)" }}
              >
                Items ordered
              </h2>
              <ul className="space-y-4">
                {order.order_items.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center"
                        style={{ background: "var(--color-card-cream)" }}
                      >
                        <Package size={14} style={{ color: "var(--color-muted)" }} />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {item.product_name}
                          {item.quantity > 1 && (
                            <span
                              className="ml-1.5 text-xs"
                              style={{ color: "var(--color-muted)" }}
                            >
                              × {item.quantity}
                            </span>
                          )}
                        </p>
                        {item.is_pre_order && (
                          <p
                            className="text-[10px] font-bold uppercase tracking-wide"
                            style={{ color: "var(--color-accent)" }}
                          >
                            Pre-order · 20% off
                          </p>
                        )}
                      </div>
                    </div>
                    <p className="text-sm font-semibold flex-shrink-0">
                      {formatPaise(item.subtotal_paise)}
                    </p>
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
            <div
              className="rounded-3xl p-7"
              style={{ background: "var(--color-card-cream)" }}
            >
              <h2
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: "var(--color-muted)" }}
              >
                Shipping address
              </h2>
              <p className="text-sm font-medium">{order.shipping_name}</p>
              <p className="text-sm mt-0.5" style={{ color: "var(--color-muted)" }}>
                {order.shipping_address_line1}
                {order.shipping_address_line2 && `, ${order.shipping_address_line2}`}
                <br />
                {order.shipping_city}, {order.shipping_state} – {order.shipping_pincode}
              </p>
            </div>

            {/* Need help */}
            <div
              className="rounded-3xl p-6 flex items-center gap-4"
              style={{ background: "var(--color-card-stone)" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center"
                style={{ background: "var(--color-card-sand)" }}
              >
                <Mail size={14} style={{ color: "var(--color-muted)" }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium mb-0.5">Need help with this order?</p>
                <p className="text-xs" style={{ color: "var(--color-muted)" }}>
                  Email us at{" "}
                  <a
                    href="mailto:clubmyto@gmail.com"
                    className="font-semibold hover:underline"
                    style={{ color: "var(--color-accent)" }}
                  >
                    clubmyto@gmail.com
                  </a>{" "}
                  with your order number.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}
