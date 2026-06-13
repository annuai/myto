"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { products } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { preOrderPrice } from "@/context/CartContext";
import { ProductRender } from "@/components/ProductRender";
import { Footer } from "@/components/Footer";

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const cardBgs = [
  "var(--color-card-cream)",
  "var(--color-card-stone)",
  "var(--color-card-olive)",
];

const allCategories = ["All", "Lighting", "Utility", "Navigation"];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div style={{ background: "var(--color-background)" }}>
      {/* Header */}
      <section className="pt-32 pb-12">
        <div className="container-wide">
          <FadeUp>
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--color-muted)" }}>
              Products
            </p>
            <h1 className="display-lg mb-4">Everything we make.</h1>
            <p className="text-base" style={{ color: "var(--color-muted)", maxWidth: "44ch" }}>
              Three products. Designed to work independently and better together.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Category filter */}
      <section className="pb-10">
        <div className="container-wide">
          <FadeUp>
            <div className="flex flex-wrap gap-2">
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="px-4 py-2 rounded-2xl text-sm font-medium transition-all"
                  style={{
                    background:
                      activeCategory === cat
                        ? "var(--color-foreground)"
                        : "var(--color-card-stone)",
                    color:
                      activeCategory === cat ? "#f5f0e8" : "var(--color-muted)",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Product grid */}
      <section className="pb-24">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((product, i) => (
              <FadeUp key={product.id} delay={i * 0.08}>
                <Link href={`/products/${product.slug}`} className="block group h-full">
                  <div
                    className="rounded-3xl overflow-hidden flex flex-col h-full transition-all duration-300 group-hover:-translate-y-1"
                    style={{
                      background: cardBgs[products.indexOf(product) % cardBgs.length],
                    }}
                  >
                    <div className="w-full h-56">
                      <ProductRender name={product.name} size="fill" />
                    </div>
                    <div className="px-8 pb-8 pt-5 mt-0">
                      <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--color-muted)" }}>
                        {product.category}
                      </p>
                      <h3 className="display-sm mb-1">{product.name}</h3>
                      <p className="text-sm mb-5 leading-relaxed" style={{ color: "var(--color-muted)" }}>
                        {product.tagline}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="font-bold text-base">{formatPrice(product.price)}</span>
                            <span
                              className="text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-md"
                              style={{ background: "var(--color-accent)", color: "#fff" }}
                            >
                              Pre-order
                            </span>
                          </div>
                          <p className="text-xs" style={{ color: "var(--color-muted)" }}>
                            {formatPrice(preOrderPrice(product.price))} with 20% off
                          </p>
                        </div>
                        <span
                          className="text-sm font-semibold px-4 py-2 rounded-xl transition-all group-hover:bg-[var(--color-accent)] group-hover:text-white"
                          style={{ background: "rgba(0,0,0,0.06)", color: "var(--color-foreground)" }}
                        >
                          View product
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p style={{ color: "var(--color-muted)" }}>No products in this category.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
