import Link from "next/link";
import { createAdminClient } from "@/lib/supabase";
import { formatPaise, ORDER_STATUS_COLORS } from "@/lib/order-utils";
import type { DBOrder } from "@/lib/types";

export const dynamic = "force-dynamic";

async function getStats() {
  const supabase = createAdminClient();

  const [ordersRes, revenueRes, recentRes] = await Promise.all([
    supabase
      .from("orders")
      .select("id", { count: "exact", head: true })
      .eq("payment_status", "paid"),
    supabase
      .from("orders")
      .select("total_paise")
      .eq("payment_status", "paid"),
    supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(8),
  ]);

  const totalRevenuePaise =
    revenueRes.data?.reduce((sum, o) => sum + o.total_paise, 0) ?? 0;

  return {
    orderCount: ordersRes.count ?? 0,
    totalRevenue: totalRevenuePaise,
    recentOrders: (recentRes.data ?? []) as DBOrder[],
  };
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl p-6" style={{ background: "var(--color-card-stone)" }}>
      <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--color-muted)" }}>
        {label}
      </p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

export default async function AdminDashboard() {
  const { orderCount, totalRevenue, recentOrders } = await getStats();

  return (
    <div className="p-8">
      <h1 className="display-sm mb-8">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        <StatCard label="Paid orders" value={String(orderCount)} />
        <StatCard label="Total revenue" value={formatPaise(totalRevenue)} />
        <StatCard label="Products" value="3" />
      </div>

      {/* Recent orders */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-base">Recent orders</h2>
          <Link
            href="/admin/orders"
            className="text-xs font-medium transition-opacity hover:opacity-60"
            style={{ color: "var(--color-accent)" }}
          >
            View all →
          </Link>
        </div>

        <div
          className="rounded-2xl overflow-hidden border"
          style={{ borderColor: "rgba(0,0,0,0.07)" }}
        >
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "var(--color-card-stone)" }}>
                {["Order", "Customer", "Total", "Status", "Date"].map((h) => (
                  <th
                    key={h}
                    className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-widest"
                    style={{ color: "var(--color-muted)" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center" style={{ color: "var(--color-muted)" }}>
                    No orders yet.
                  </td>
                </tr>
              ) : (
                recentOrders.map((order, i) => {
                  const colors = ORDER_STATUS_COLORS[order.status];
                  return (
                    <tr
                      key={order.id}
                      style={{
                        borderTop: i > 0 ? "1px solid rgba(0,0,0,0.05)" : undefined,
                        background: "var(--color-background)",
                      }}
                    >
                      <td className="px-5 py-3.5">
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="font-medium hover:underline"
                          style={{ color: "var(--color-accent)" }}
                        >
                          {order.order_number}
                        </Link>
                      </td>
                      <td className="px-5 py-3.5" style={{ color: "var(--color-foreground)" }}>
                        {order.customer_name}
                      </td>
                      <td className="px-5 py-3.5 font-medium">
                        {formatPaise(order.total_paise)}
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold capitalize"
                          style={{ background: colors.bg, color: colors.text }}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5" style={{ color: "var(--color-muted)" }}>
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
    </div>
  );
}
