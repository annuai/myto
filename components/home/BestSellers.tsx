"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { getFeaturedProducts } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { ProductRender } from "@/components/ProductRender";
import { useCart } from "@/context/CartContext";

export function BestSellers() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const products = getFeaturedProducts();
  const { addItem } = useCart();

  return (
    <section ref={ref} className="py-16 md:py-20">
      <div className="container-wide">
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-medium tracking-[0.2em] uppercase block mb-3" style={{ color: "var(--color-accent)" }}>
            Products
          </span>
          <h2 className="display-md">The essentials.</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-7">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="group"
            >
              <Link href={`/products/${product.slug}`}>
                <div
                  className="rounded-3xl p-8 mb-4 flex items-center justify-center"
                  style={{ background: "var(--color-card-cream)" }}
                >
                  <ProductRender name={product.name} size="md" />
                </div>
                <p className="text-[11px] font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--color-muted)" }}>
                  {product.category}
                </p>
                <h3 className="text-sm font-medium leading-snug mb-1">{product.name}</h3>
                <span className="text-sm font-semibold">{formatPrice(product.price)}</span>
              </Link>
              <button
                onClick={() => addItem(product)}
                className="mt-3 w-full py-2.5 rounded-xl text-xs font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: "var(--color-accent)" }}
              >
                Add to cart
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
