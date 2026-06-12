"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { formatPrice } from "@/lib/format";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedProducts } from "@/lib/products";
import { ProductRender } from "@/components/ProductRender";

export function FeaturedProducts() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const products = getFeaturedProducts();

  return (
    <section className="py-16 md:py-20" ref={ref}>
      <div className="container-wide">
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="text-xs font-medium tracking-[0.2em] uppercase block mb-3" style={{ color: "var(--color-accent)" }}>
              Featured
            </span>
            <h2 className="display-md">Products built to last.</h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70"
            style={{ color: "var(--color-accent)" }}
          >
            View all products <ArrowRight size={14} />
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <Link href={`/products/${product.slug}`} className="group block">
                <div
                  className="rounded-3xl p-8 mb-5 flex items-center justify-center"
                  style={{ background: "var(--color-card-cream)" }}
                >
                  <ProductRender name={product.name} size="md" />
                </div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-widest mb-1" style={{ color: "var(--color-muted)" }}>
                      {product.category}
                    </p>
                    <h3 className="font-medium text-base leading-snug">{product.name}</h3>
                    <p className="text-sm mt-1 line-clamp-2" style={{ color: "var(--color-muted)" }}>
                      {product.tagline}
                    </p>
                  </div>
                  <p className="font-semibold text-base flex-shrink-0">{formatPrice(product.price)}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
