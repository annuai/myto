"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { articles, getFeaturedArticle } from "@/lib/journal";
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

const categoryColors: Record<string, string> = {
  Engineering: "var(--color-card-olive)",
  Design: "var(--color-card-cream)",
  Riding: "var(--color-card-clay)",
  Manufacturing: "var(--color-card-warmgrey)",
  Research: "var(--color-card-sand)",
  Craft: "var(--color-card-stone)",
};

const allCategories = ["All", "Design", "Engineering", "Riding", "Manufacturing", "Research", "Craft"];

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function JournalPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const featured = getFeaturedArticle();
  const rest = articles.filter((a) => a.slug !== featured.slug);
  const filtered =
    activeCategory === "All"
      ? rest
      : rest.filter((a) => a.category === activeCategory);

  return (
    <div style={{ background: "var(--color-background)" }}>
      {/* Header */}
      <section className="pt-32 pb-12">
        <div className="container-wide">
          <FadeUp>
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--color-muted)" }}>
              Journal
            </p>
            <h1 className="display-lg mb-4">Writing about what we build.</h1>
            <p className="text-base" style={{ color: "var(--color-muted)", maxWidth: "50ch" }}>
              Engineering deep-dives, material decisions, riding dispatches, and process notes
              from behind the scenes at myto-moto.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Featured article */}
      <section className="pb-16">
        <div className="container-wide">
          <FadeUp>
            <Link href={`/journal/${featured.slug}`} className="block group">
              <div
                className="rounded-3xl p-10 md:p-14 transition-all duration-300 group-hover:-translate-y-1"
                style={{
                  background: categoryColors[featured.category] ?? "var(--color-card-stone)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    <span
                      className="text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-lg"
                      style={{ background: "rgba(0,0,0,0.07)", color: "var(--color-foreground)" }}
                    >
                      {featured.category}
                    </span>
                    <span className="text-xs" style={{ color: "var(--color-muted)" }}>
                      Featured
                    </span>
                  </div>
                  <h2 className="display-md mb-4 leading-tight">{featured.title}</h2>
                  <p className="text-base leading-relaxed mb-8" style={{ color: "var(--color-muted)" }}>
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-5">
                    <span className="text-sm font-medium">{featured.author}</span>
                    <span className="text-sm" style={{ color: "var(--color-muted)" }}>
                      {formatDate(featured.date)}
                    </span>
                    <span className="text-sm" style={{ color: "var(--color-muted)" }}>
                      {featured.readTime}
                    </span>
                    <span
                      className="ml-auto text-sm font-semibold transition-colors group-hover:text-[var(--color-accent)]"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      Read article →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
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

      {/* Article grid */}
      <section className="pb-24">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map((article, i) => (
              <FadeUp key={article.slug} delay={i * 0.06}>
                <Link href={`/journal/${article.slug}`} className="block group h-full">
                  <div
                    className="rounded-3xl p-8 flex flex-col h-full transition-all duration-300 group-hover:-translate-y-0.5"
                    style={{
                      background: categoryColors[article.category] ?? "var(--color-card-stone)",
                      boxShadow: "var(--shadow-sm)",
                    }}
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <span
                        className="text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-lg"
                        style={{ background: "rgba(0,0,0,0.07)", color: "var(--color-foreground)" }}
                      >
                        {article.category}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg leading-snug mb-3 flex-1">
                      {article.title}
                    </h3>
                    <p className="text-sm leading-relaxed line-clamp-3 mb-5" style={{ color: "var(--color-muted)" }}>
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-medium">{article.author}</span>
                        <span className="text-xs" style={{ color: "var(--color-muted)" }}>
                          {article.readTime}
                        </span>
                      </div>
                      <span
                        className="text-xs font-semibold transition-colors group-hover:text-[var(--color-accent)]"
                        style={{ color: "var(--color-muted)" }}
                      >
                        Read →
                      </span>
                    </div>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p style={{ color: "var(--color-muted)" }}>No articles in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="pb-0">
        <div className="container-wide">
          <FadeUp>
            <div
              className="rounded-3xl p-10 md:p-14 text-center"
              style={{ background: "var(--color-card-dark)" }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "rgba(245,240,232,0.35)" }}>
                Newsletter
              </p>
              <h2 className="display-md mb-3" style={{ color: "#f5f0e8" }}>
                New articles in your inbox.
              </h2>
              <p className="text-sm mb-8" style={{ color: "rgba(245,240,232,0.45)" }}>
                Occasional. No noise. Just new writing.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-5 py-3 rounded-2xl text-sm outline-none"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    color: "#f5f0e8",
                    border: "1px solid rgba(255,255,255,0.10)",
                  }}
                />
                <button
                  className="px-6 py-3 rounded-2xl text-sm font-semibold transition-opacity hover:opacity-90"
                  style={{ background: "var(--color-accent)", color: "#fff" }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
