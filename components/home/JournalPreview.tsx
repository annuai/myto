"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { articles } from "@/lib/journal";

const categoryColors: Record<string, string> = {
  Engineering: "var(--color-card-olive)",
  Design: "var(--color-card-cream)",
  Riding: "var(--color-card-clay)",
  Manufacturing: "var(--color-card-warmgrey)",
  Research: "var(--color-card-sand)",
  Craft: "var(--color-card-stone)",
};

export function JournalPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const featured = articles.slice(0, 3);

  return (
    <section ref={ref} className="py-16 md:py-20" style={{ background: "var(--color-surface)" }}>
      <div className="container-wide">
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="text-xs font-medium tracking-[0.2em] uppercase block mb-3" style={{ color: "var(--color-accent)" }}>
              Journal
            </span>
            <h2 className="display-md">Inside the process.</h2>
          </div>
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70"
            style={{ color: "var(--color-accent)" }}
          >
            All articles <ArrowRight size={14} />
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {featured.map((article, i) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1 }}
            >
              <Link href={`/journal/${article.slug}`} className="group block">
                <div
                  className="rounded-3xl p-7 h-full transition-all duration-300 group-hover:-translate-y-0.5"
                  style={{
                    background: categoryColors[article.category] ?? "var(--color-card-stone)",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  <span
                    className="text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-lg inline-block mb-4"
                    style={{ background: "rgba(0,0,0,0.07)", color: "var(--color-foreground)" }}
                  >
                    {article.category}
                  </span>
                  <p className="text-xs mb-2" style={{ color: "var(--color-muted)" }}>
                    {new Date(article.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}{" "}
                    · {article.readTime}
                  </p>
                  <h3 className="font-semibold text-base leading-snug mb-2">
                    {article.title}
                  </h3>
                  <p className="text-sm line-clamp-2" style={{ color: "var(--color-muted)" }}>
                    {article.excerpt}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
