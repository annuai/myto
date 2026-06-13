import { redirect } from "next/navigation";
import Link from "next/link";
import { Package, ChevronRight } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase-server-client";
import { createAdminClient } from "@/lib/supabase";
import { formatPaise, ORDER_STATUS_COLORS } from "@/lib/order-utils";
import { Footer } from "@/components/Footer";
import type { DBOrder } from "@/lib/types";

export const dynamic = "force-dynamic";

// Use the service-role client so RLS never blocks a verified user's own orders.
async function getOrders(email: string): Promise<DBOrder[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("customer_email", email.toLowerCase())
    .eq("payment_status", "paid")
    .order("created_at", { ascending: false });
  if (error) console.error("getOrders error:", error);
  return (data ?? []) as DBOrder[];
}

export default async function AccountOrdersPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/account/login");

  const orders = await getOrders(user.email!);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--color-background)" }}
    >
      <div className="flex-1 pt-28 pb-16">
        <div className="container-wide max-w-3xl">

          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-10">
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-2"
                style={{ color: "var(--color-muted)" }}
              >
                {user.email}
              </p>
              <h1 className="display-md">My orders</h1>
            </div>
            <SignOutButton />
          </div>

          {/* Empty state */}
          {orders.length === 0 && (
            <div
              className="rounded-3xl p-12 flex flex-col items-center text-center gap-5"
              style={{ background: "var(--color-card-stone)" }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: "var(--color-card-sand)" }}
              >
                <Package size={22} style={{ color: "var(--color-muted)" }} />
              </div>
              <div>
                <p className="font-semibold text-base mb-1">No orders yet</p>
                <p className="text-sm" style={{ color: "var(--color-muted)" }}>
                  When you place an order it will appear here.
                </p>
              </div>
              <Link
                href="/shop"
                className="px-6 py-3 rounded-2xl text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ background: "var(--color-accent)" }}
              >
                Browse products
              </Link>
            </div>
          )}

          {/* Order cards */}
          {orders.length > 0 && (
            <ul className="space-y-3">
              {orders.map((order) => {
                const colors = ORDER_STATUS_COLORS[order.status];
                return (
                  <li key={order.id}>
                    <Link
                      href={`/account/orders/${order.id}`}
                      className="block rounded-3xl p-6 transition-all hover:-translate-y-0.5 group"
                      style={{ background: "var(--color-card-stone)" }}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          {/* Order number + date */}
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-semibold text-sm">
                              {order.order_number}
                            </span>
                            <span
                              className="px-2.5 py-0.5 rounded-lg text-xs font-semibold capitalize"
                              style={{ background: colors.bg, color: colors.text }}
                            >
                              {order.status}
                            </span>
                            {order.is_pre_order && (
                              <span
                                className="px-2.5 py-0.5 rounded-lg text-xs font-semibold"
                                style={{ background: "rgba(190,58,35,0.08)", color: "var(--color-accent)" }}
                              >
                                Pre-order
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-4">
                            <span
                              className="text-sm font-bold"
                            >
                              {formatPaise(order.total_paise)}
                            </span>
                            <span
                              className="text-xs"
                              style={{ color: "var(--color-muted)" }}
                            >
                              {new Date(order.created_at).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                        </div>

                        <ChevronRight
                          size={18}
                          className="flex-shrink-0 transition-transform group-hover:translate-x-0.5"
                          style={{ color: "var(--color-muted)" }}
                        />
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}

        </div>
      </div>
      <Footer />
    </div>
  );
}

// ── Client component for sign-out ─────────────────────────────────
import { SignOutButton } from "@/components/account/SignOutButton";
