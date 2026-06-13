import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase";
import { formatPaise } from "@/lib/order-utils";
import { products as staticProducts } from "@/lib/products";
import type { DBProduct } from "@/lib/types";

export const dynamic = "force-dynamic";

async function getDBProducts(): Promise<DBProduct[]> {
  const supabase = createAdminClient();
  const { data } = await supabase.from("products").select("*");
  return (data ?? []) as DBProduct[];
}

async function updateProduct(formData: FormData) {
  "use server";
  const slug = formData.get("slug") as string;
  const pricePaise = Math.round(Number(formData.get("price_rupees")) * 100);
  const inventory = parseInt(formData.get("inventory") as string, 10);

  if (!slug || isNaN(pricePaise) || isNaN(inventory)) return;

  const supabase = createAdminClient();
  await supabase
    .from("products")
    .update({
      price_paise: pricePaise,
      inventory,
      updated_at: new Date().toISOString(),
    })
    .eq("slug", slug);

  revalidatePath("/admin/products");
}

export default async function AdminProductsPage() {
  const dbProducts = await getDBProducts();

  const merged = staticProducts.map((sp) => {
    const db = dbProducts.find((p) => p.slug === sp.slug);
    return { ...sp, db };
  });

  return (
    <div className="p-8">
      <h1 className="display-sm mb-2">Products</h1>
      <p className="text-sm mb-8" style={{ color: "var(--color-muted)" }}>
        Product content lives in <code className="text-xs font-mono px-1.5 py-0.5 rounded-lg" style={{ background: "var(--color-card-stone)" }}>lib/products.ts</code>.
        Edit price and inventory here.
      </p>

      <div className="space-y-4">
        {merged.map(({ name, slug, category, db }) => (
          <div
            key={slug}
            className="rounded-2xl p-6"
            style={{ background: "var(--color-card-stone)" }}
          >
            <div className="flex flex-wrap items-start justify-between gap-6">
              {/* Info */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--color-muted)" }}>
                  {category}
                </p>
                <p className="font-semibold text-base">{name}</p>
                <p className="text-xs mt-1 font-mono" style={{ color: "var(--color-muted)" }}>/products/{slug}</p>
                {db && (
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs" style={{ color: "var(--color-muted)" }}>
                      Price: <strong>{formatPaise(db.price_paise)}</strong>
                    </span>
                    <span className="text-xs" style={{ color: "var(--color-muted)" }}>
                      Stock: <strong>{db.inventory}</strong>
                    </span>
                    <span className="text-xs" style={{ color: "var(--color-muted)" }}>
                      Pre-orders: <strong>{db.pre_order_claimed}/{db.pre_order_seats}</strong>
                    </span>
                  </div>
                )}
                {!db && (
                  <p className="text-xs mt-1" style={{ color: "var(--color-accent)" }}>
                    Not in database — run seed.sql
                  </p>
                )}
              </div>

              {/* Edit form */}
              {db && (
                <form action={updateProduct} className="flex flex-wrap items-end gap-3">
                  <input type="hidden" name="slug" value={slug} />
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--color-muted)" }}>
                      Price (₹)
                    </label>
                    <input
                      type="number"
                      name="price_rupees"
                      defaultValue={db.price_paise / 100}
                      min="1"
                      step="1"
                      required
                      className="w-32 px-3 py-2 rounded-xl text-sm outline-none border"
                      style={{
                        background: "var(--color-card-cream)",
                        borderColor: "rgba(0,0,0,0.1)",
                        color: "var(--color-foreground)",
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--color-muted)" }}>
                      Inventory
                    </label>
                    <input
                      type="number"
                      name="inventory"
                      defaultValue={db.inventory}
                      min="0"
                      step="1"
                      required
                      className="w-24 px-3 py-2 rounded-xl text-sm outline-none border"
                      style={{
                        background: "var(--color-card-cream)",
                        borderColor: "rgba(0,0,0,0.1)",
                        color: "var(--color-foreground)",
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                    style={{ background: "var(--color-foreground)" }}
                  >
                    Save
                  </button>
                </form>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
