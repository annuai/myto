import Link from "next/link";
import { createAdminClient } from "@/lib/supabase";
import { formatPaise, ORDER_STATUS_COLORS, PAYMENT_STATUS_COLORS } from "@/lib/order-utils";
import type { DBOrder } from "@/lib/types";

export const dynamic = "force-dynamic";

async function getOrders(): Promise<DBOrder[]> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);
  return (data ?? []) as DBOrder[];
}

export default async function AdminOrdersPage() {
  const orders = await getOrders();

  return (
    <div className="p-8">
      <h1 className="display-sm mb-8">Orders</h1>

      <div
        className="rounded-2xl overflow-hidden border"
        style={{ borderColor: "rgba(0,0,0,0.07)" }}
      >
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: "var(--color-card-stone)" }}>
              {["Order", "Customer", "Total", "Payment", "Status", "Pre-order", "Date"].map((h) => (
                <th
                  key={h}
                  className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "var(--color-muted)" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center" style={{ color: "var(--color-muted)" }}>
                  No orders yet.
                </td>
              </tr>
            ) : (
              orders.map((order, i) => {
                const sc = ORDER_STATUS_COLORS[order.status];
                const pc = PAYMENT_STATUS_COLORS[order.payment_status];
                return (
                  <tr
                    key={order.id}
                    style={{
                      borderTop: i > 0 ? "1px solid rgba(0,0,0,0.04)" : undefined,
                      background: "var(--color-background)",
                    }}
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="font-medium hover:underline"
                        style={{ color: "var(--color-accent)" }}
                      >
                        {order.order_number}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium">{order.customer_name}</p>
                      <p className="text-xs" style={{ color: "var(--color-muted)" }}>
                        {order.customer_email}
                      </p>
                    </td>
                    <td className="px-4 py-3 font-medium">{formatPaise(order.total_paise)}</td>
                    <td className="px-4 py-3">
                      <span
                        className="px-2 py-0.5 rounded-lg text-xs font-semibold capitalize"
                        style={{ background: pc.bg, color: pc.text }}
                      >
                        {order.payment_status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="px-2 py-0.5 rounded-lg text-xs font-semibold capitalize"
                        style={{ background: sc.bg, color: sc.text }}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {order.is_pre_order ? (
                        <span className="text-xs font-bold" style={{ color: "var(--color-accent)" }}>✓</span>
                      ) : (
                        <span className="text-xs" style={{ color: "var(--color-muted)" }}>—</span>
                      )}
                    </td>
                    <td className="px-4 py-3" style={{ color: "var(--color-muted)" }}>
                      {new Date(order.created_at).toLocaleDateString("en-IN")}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
