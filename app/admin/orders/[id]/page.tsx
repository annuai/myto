import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { createAdminClient } from "@/lib/supabase";
import {
  formatPaise,
  ORDER_STATUS_LABELS,
  ORDER_STATUS_COLORS,
  PAYMENT_STATUS_COLORS,
} from "@/lib/order-utils";
import type { DBOrderWithItems, OrderStatus } from "@/lib/types";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

async function getOrder(id: string): Promise<DBOrderWithItems | null> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .eq("id", id)
    .single();
  return data as DBOrderWithItems | null;
}

async function updateOrderStatus(orderId: string, status: OrderStatus) {
  "use server";
  const supabase = createAdminClient();
  await supabase
    .from("orders")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", orderId);
  revalidatePath(`/admin/orders/${orderId}`);
}

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getOrder(id);
  if (!order) notFound();

  const sc = ORDER_STATUS_COLORS[order.status];
  const pc = PAYMENT_STATUS_COLORS[order.payment_status];

  const statuses: OrderStatus[] = [
    "pending", "confirmed", "processing", "shipped", "delivered", "cancelled", "refunded",
  ];

  async function updateTracking(formData: FormData) {
    "use server";
    const supabase = createAdminClient();
    await supabase
      .from("orders")
      .update({
        tracking_carrier: (formData.get("tracking_carrier") as string).trim() || null,
        tracking_number:  (formData.get("tracking_number")  as string).trim() || null,
        tracking_url:     (formData.get("tracking_url")     as string).trim() || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);
    revalidatePath(`/admin/orders/${id}`);
  }

  return (
    <div className="p-8 max-w-3xl">
      <Link
        href="/admin/orders"
        className="inline-flex items-center gap-1.5 text-sm mb-8 transition-opacity hover:opacity-60"
        style={{ color: "var(--color-muted)" }}
      >
        <ChevronLeft size={14} /> Orders
      </Link>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="display-sm mb-1">{order.order_number}</h1>
          <p className="text-sm" style={{ color: "var(--color-muted)" }}>
            {new Date(order.created_at).toLocaleString("en-IN")}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-3 py-1.5 rounded-xl text-xs font-bold" style={{ background: pc.bg, color: pc.text }}>
            {order.payment_status}
          </span>
          <span className="px-3 py-1.5 rounded-xl text-xs font-bold capitalize" style={{ background: sc.bg, color: sc.text }}>
            {order.status}
          </span>
          {order.is_pre_order && (
            <span className="px-3 py-1.5 rounded-xl text-xs font-bold" style={{ background: "rgba(190,58,35,0.08)", color: "var(--color-accent)" }}>
              Pre-order
            </span>
          )}
        </div>
      </div>

      <div className="space-y-5">
        {/* Customer */}
        <div className="rounded-2xl p-6" style={{ background: "var(--color-card-stone)" }}>
          <h2 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--color-muted)" }}>Customer</h2>
          <p className="font-medium">{order.customer_name}</p>
          <p className="text-sm mt-0.5" style={{ color: "var(--color-muted)" }}>{order.customer_email}</p>
          <p className="text-sm" style={{ color: "var(--color-muted)" }}>{order.customer_phone}</p>
        </div>

        {/* Shipping */}
        <div className="rounded-2xl p-6" style={{ background: "var(--color-card-stone)" }}>
          <h2 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--color-muted)" }}>Shipping address</h2>
          <p className="font-medium">{order.shipping_name}</p>
          <p className="text-sm mt-0.5" style={{ color: "var(--color-muted)" }}>
            {order.shipping_address_line1}
            {order.shipping_address_line2 && <>, {order.shipping_address_line2}</>}
            <br />
            {order.shipping_city}, {order.shipping_state} – {order.shipping_pincode}
          </p>
        </div>

        {/* Items */}
        <div className="rounded-2xl p-6" style={{ background: "var(--color-card-stone)" }}>
          <h2 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--color-muted)" }}>Items</h2>
          <ul className="space-y-3">
            {order.order_items.map((item) => (
              <li key={item.id} className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium">{item.product_name} × {item.quantity}</p>
                  {item.is_pre_order && (
                    <p className="text-[10px] font-bold uppercase" style={{ color: "var(--color-accent)" }}>Pre-order</p>
                  )}
                </div>
                <p className="text-sm font-semibold">{formatPaise(item.subtotal_paise)}</p>
              </li>
            ))}
          </ul>
          <div className="border-t mt-4 pt-4 flex justify-between font-bold" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
            <span>Total</span>
            <span>{formatPaise(order.total_paise)}</span>
          </div>
        </div>

        {/* Payment IDs */}
        {order.razorpay_payment_id && (
          <div className="rounded-2xl p-6" style={{ background: "var(--color-card-stone)" }}>
            <h2 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--color-muted)" }}>Payment</h2>
            <div className="space-y-1">
              {[
                ["Razorpay Order ID", order.razorpay_order_id],
                ["Razorpay Payment ID", order.razorpay_payment_id],
              ].map(([label, val]) => val && (
                <div key={label} className="flex gap-4">
                  <span className="text-xs w-40 flex-shrink-0" style={{ color: "var(--color-muted)" }}>{label}</span>
                  <span className="text-xs font-mono">{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Update order status */}
        <div className="rounded-2xl p-6" style={{ background: "var(--color-card-cream)" }}>
          <h2 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--color-muted)" }}>Update status</h2>
          <div className="flex flex-wrap gap-2">
            {statuses.map((s) => {
              const colors = ORDER_STATUS_COLORS[s];
              const isCurrent = order.status === s;
              const updateWithId = updateOrderStatus.bind(null, order.id, s);
              return (
                <form key={s} action={updateWithId}>
                  <button
                    type="submit"
                    disabled={isCurrent}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-opacity hover:opacity-80 disabled:cursor-default"
                    style={{
                      background: isCurrent ? colors.bg : "rgba(0,0,0,0.06)",
                      color: isCurrent ? colors.text : "var(--color-muted)",
                      outline: isCurrent ? `1.5px solid ${colors.text}` : "none",
                    }}
                  >
                    {ORDER_STATUS_LABELS[s]}
                  </button>
                </form>
              );
            })}
          </div>
        </div>

        {/* Tracking info */}
        <div className="rounded-2xl p-6" style={{ background: "var(--color-card-cream)" }}>
          <h2 className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: "var(--color-muted)" }}>
            Shipment tracking
          </h2>

          {/* Current tracking summary */}
          {(order.tracking_number || order.tracking_carrier) && (
            <div
              className="rounded-xl px-4 py-3 mb-5 flex flex-wrap gap-x-6 gap-y-1 text-sm"
              style={{ background: "rgba(80,60,200,0.07)" }}
            >
              {order.tracking_carrier && (
                <div>
                  <span className="text-xs" style={{ color: "var(--color-muted)" }}>Carrier · </span>
                  <span className="font-semibold">{order.tracking_carrier}</span>
                </div>
              )}
              {order.tracking_number && (
                <div>
                  <span className="text-xs" style={{ color: "var(--color-muted)" }}>Tracking # · </span>
                  <span className="font-mono font-semibold">{order.tracking_number}</span>
                </div>
              )}
              {order.tracking_url && (
                <a
                  href={order.tracking_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold underline"
                  style={{ color: "var(--color-accent)" }}
                >
                  View tracking page →
                </a>
              )}
            </div>
          )}

          <form action={updateTracking} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold" style={{ color: "var(--color-muted)" }}>
                  Carrier
                </label>
                <input
                  type="text"
                  name="tracking_carrier"
                  defaultValue={order.tracking_carrier ?? ""}
                  placeholder="e.g. Delhivery, Bluedart"
                  className="rounded-xl px-3 py-2.5 text-sm border outline-none focus:ring-2 w-full"
                  style={{
                    background: "var(--color-background)",
                    borderColor: "rgba(0,0,0,0.12)",
                    color: "var(--color-foreground)",
                  }}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold" style={{ color: "var(--color-muted)" }}>
                  Tracking number
                </label>
                <input
                  type="text"
                  name="tracking_number"
                  defaultValue={order.tracking_number ?? ""}
                  placeholder="e.g. 1234567890"
                  className="rounded-xl px-3 py-2.5 text-sm border outline-none focus:ring-2 w-full"
                  style={{
                    background: "var(--color-background)",
                    borderColor: "rgba(0,0,0,0.12)",
                    color: "var(--color-foreground)",
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold" style={{ color: "var(--color-muted)" }}>
                Tracking URL
              </label>
              <input
                type="url"
                name="tracking_url"
                defaultValue={order.tracking_url ?? ""}
                placeholder="https://track.delhivery.com/..."
                className="rounded-xl px-3 py-2.5 text-sm border outline-none focus:ring-2 w-full"
                style={{
                  background: "var(--color-background)",
                  borderColor: "rgba(0,0,0,0.12)",
                  color: "var(--color-foreground)",
                }}
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-80"
              style={{ background: "var(--color-accent)", color: "#fff" }}
            >
              Save tracking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
