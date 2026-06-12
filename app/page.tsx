"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Wrench, Shield, Compass, RotateCcw, MapPin, Layers } from "lucide-react";
import { ProductRender } from "@/components/ProductRender";
import { Footer } from "@/components/Footer";
import { products } from "@/lib/products";
import { articles } from "@/lib/journal";
import { formatPrice } from "@/lib/format";

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
      initial={{ opacity: 0, y: 24 }}
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

const categoryColors: Record<string, string> = {
  Engineering: "var(--color-card-olive)",
  Design: "var(--color-card-cream)",
  Riding: "var(--color-card-clay)",
  Manufacturing: "var(--color-card-warmgrey)",
  Research: "var(--color-card-sand)",
  Craft: "var(--color-card-stone)",
};

const whyFeatures = [
  {
    icon: <Wrench size={20} />,
    title: "Engineered carefully",
    description: "Every component earns its place. Nothing is added for appearance alone.",
  },
  {
    icon: <Shield size={20} />,
    title: "Built to last",
    description: "Specified for years of road use, not a single review cycle.",
  },
  {
    icon: <Compass size={20} />,
    title: "Rider-first",
    description: "Designed by someone who rides, for people who ride.",
  },
  {
    icon: <RotateCcw size={20} />,
    title: "Repairable",
    description: "Every product can be disassembled and repaired with common tools.",
  },
  {
    icon: <MapPin size={20} />,
    title: "Tested on real roads",
    description: "Validated over thousands of kilometres before a single unit ships.",
  },
  {
    icon: <Layers size={20} />,
    title: "Honest materials",
    description: "We specify what each material is and exactly why we chose it.",
  },
];

const processSteps = [
  { n: "01", title: "Research", description: "Understand the real problem before touching a pen." },
  { n: "02", title: "Design", description: "Sketch and iterate until the concept is sound." },
  { n: "03", title: "Prototype", description: "Build physical prototypes early and often." },
  { n: "04", title: "Test", description: "Ride with it. Break it. Understand where it fails." },
  { n: "05", title: "Build", description: "Commit to production only when it is genuinely ready." },
];

export default function HomePage() {
  const previewArticles = articles.slice(0, 3);

  return (
    <div style={{ background: "var(--color-background)" }}>
      {/* SECTION 1: Hero */}
      <section style={{ background: "var(--color-background)" }}>
        <div className="container-wide pt-24 md:pt-36 pb-10">
          {/* Text block */}
          <div className="max-w-xl">
            {/* <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: "var(--color-muted)" }}
            >
              myto-moto — adventure motorcycle accessories
            </motion.p> */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                fontWeight: 400,
                lineHeight: 1.12,
                letterSpacing: "-0.01em",
                color: "var(--color-foreground)",
                marginBottom: "1.25rem",
              }}
            >
              Designed for the roads that{" "}
              <span style={{ color: "var(--color-accent)" }}>don&apos;t end.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-sm md:text-base mb-8 leading-relaxed"
              style={{ color: "var(--color-muted)" }}
            >
              Thoughtfully engineered tools for riders who travel further.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.44 }}
              className="flex flex-wrap gap-3"
            >
              <Link
                href="/shop"
                className="inline-flex items-center px-6 py-3 rounded-2xl text-sm font-semibold transition-all hover:opacity-90 active:scale-[0.97]"
                style={{ background: "var(--color-accent)", color: "#fff" }}
              >
                Explore products
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center px-6 py-3 rounded-2xl text-sm font-medium border transition-all hover:bg-black/5"
                style={{ color: "var(--color-foreground)", borderColor: "rgba(26,26,26,0.16)" }}
              >
                Story
              </Link>
            </motion.div>
          </div>

          {/* Hero image tile — full content width, rounded corners */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="hero-image.png"
              alt="Motorcycle on an open road"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: Product Grid */}
      <section className="py-16">
        <div className="container-wide">
          <FadeUp className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--color-muted)" }}>
              Products
            </p>
            <h2 className="display-md">Three tools. One ecosystem.</h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {products.map((product, i) => (
              <FadeUp key={product.id} delay={i * 0.08}>
                <Link href={`/products/${product.slug}`} className="block group h-full">
                  <div
                    className="rounded-3xl overflow-hidden flex flex-col h-full transition-all duration-300 group-hover:-translate-y-1"
                    style={{ background: cardBgs[i] }}
                  >
                    <div className="w-full h-56">
                      <ProductRender name={product.name} size="fill" />
                    </div>
                    <div className="px-8 pb-8 pt-5">
                      <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--color-muted)" }}>
                        {product.category}
                      </p>
                      <h3 className="display-sm mb-1">{product.name}</h3>
                      <p className="text-sm mb-4 leading-relaxed" style={{ color: "var(--color-muted)" }}>
                        {product.tagline}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-base">{formatPrice(product.price)}</span>
                        <span
                          className="text-sm font-medium transition-colors group-hover:text-[var(--color-accent)]"
                          style={{ color: "var(--color-muted)" }}
                        >
                          View product →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: Why myto */}
      <section className="py-16">
        <div className="container-wide">
          <FadeUp className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--color-muted)" }}>
              Why myto-moto
            </p>
            <h2 className="display-md max-w-lg">
              Things that matter when you&apos;re far from home.
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {whyFeatures.map((f, i) => (
              <FadeUp key={f.title} delay={i * 0.06}>
                <div
                  className="rounded-3xl p-7 h-full transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: i % 2 === 0 ? "var(--color-card-cream)" : "var(--color-card-stone)",

                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: "rgba(0,0,0,0.06)" }}
                  >
                    {f.icon}
                  </div>
                  <h3 className="font-semibold text-base mb-2">{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
                    {f.description}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: Ecosystem Block */}
      <section className="py-12">
        <div className="container-wide">
          <FadeUp>
            <div
              className="rounded-3xl px-10 py-16"
              style={{ background: "var(--color-card-dark)" }}
            >
              <div className="text-center mb-12">
                <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "rgba(245,240,232,0.35)" }}>
                  The ecosystem
                </p>
                <h2 className="display-md mx-auto max-w-2xl" style={{ color: "#f5f0e8" }}>
                  Lighting. Navigation. Utility.{" "}
                  <span style={{ color: "rgba(245,240,232,0.45)" }}>Designed to work together.</span>
                </h2>
              </div>
              <div className="flex flex-wrap justify-center gap-6 mb-12">
                {products.map((p) => (
                  <div
                    key={p.id}
                    className="flex flex-col items-center gap-4 rounded-3xl p-8"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                  >
                    <ProductRender name={p.name} size="md" />
                    <span className="text-sm font-medium" style={{ color: "rgba(245,240,232,0.65)" }}>
                      {p.name}
                    </span>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-75"
                  style={{ color: "var(--color-accent)" }}
                >
                  Explore the ecosystem →
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* SECTION 5: Engineering Process */}
      <section className="py-16">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <FadeUp>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--color-muted)" }}>
                How we work
              </p>
              <h2 className="display-md mb-6">From sketch to road.</h2>
              <p className="text-base leading-relaxed" style={{ color: "var(--color-muted)" }}>
                Every myto-moto product goes through the same rigorous process — from documented
                frustration to tested, shipped product. No shortcuts.
              </p>
            </FadeUp>
            <div className="space-y-1">
              {processSteps.map((step, i) => (
                <FadeUp key={step.n} delay={i * 0.07}>
                  <div
                    className="flex items-start gap-5 p-5 rounded-2xl"
                    style={{ background: i % 2 === 0 ? "var(--color-card-cream)" : "transparent" }}
                  >
                    <span
                      className="text-xs font-mono font-bold flex-shrink-0 mt-0.5"
                      style={{ color: "var(--color-accent)" }}
                    >
                      {step.n}
                    </span>
                    <div>
                      <h3 className="font-semibold text-sm">{step.title}</h3>
                      <p className="text-sm mt-0.5" style={{ color: "var(--color-muted)" }}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Journal Preview */}
      <section className="py-16">
        <div className="container-wide">
          <FadeUp className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--color-muted)" }}>
                Journal
              </p>
              <h2 className="display-md">From the journal</h2>
            </div>
            <Link
              href="/journal"
              className="text-sm font-medium transition-opacity hover:opacity-70 hidden sm:block"
              style={{ color: "var(--color-muted)" }}
            >
              All articles →
            </Link>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {previewArticles.map((article, i) => (
              <FadeUp key={article.slug} delay={i * 0.07}>
                <Link href={`/journal/${article.slug}`} className="block group h-full">
                  <div
                    className="rounded-3xl p-7 flex flex-col h-full transition-all duration-300 group-hover:-translate-y-0.5"
                    style={{
                      background: categoryColors[article.category] ?? "var(--color-card-stone)",

                    }}
                  >
                    <div className="mb-4">
                      <span
                        className="text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-lg"
                        style={{ background: "rgba(0,0,0,0.07)", color: "var(--color-foreground)" }}
                      >
                        {article.category}
                      </span>
                    </div>
                    <h3 className="font-semibold text-base leading-snug mb-3 flex-1">
                      {article.title}
                    </h3>
                    <p className="text-sm leading-relaxed line-clamp-3 mb-4" style={{ color: "var(--color-muted)" }}>
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs" style={{ color: "var(--color-muted)" }}>
                        {article.readTime}
                      </span>
                      <span
                        className="text-xs font-medium transition-colors group-hover:text-[var(--color-accent)]"
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
        </div>
      </section>

      {/* SECTION 7: Support Block */}
      <section className="py-12">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FadeUp>
              <Link href="/support" className="block group">
                <div
                  className="rounded-3xl p-8 transition-all duration-300 group-hover:-translate-y-0.5"
                  style={{ background: "var(--color-card-stone)" }}
                >
                  <h3 className="display-sm mb-2">Product support</h3>
                  <p className="text-sm mb-5" style={{ color: "var(--color-muted)" }}>
                    Installation guides, troubleshooting, and FAQs for every product.
                  </p>
                  <span
                    className="text-sm font-semibold transition-colors group-hover:text-[var(--color-accent)]"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    View support →
                  </span>
                </div>
              </Link>
            </FadeUp>
            <FadeUp delay={0.07}>
              <Link href="/support" className="block group">
                <div
                  className="rounded-3xl p-8 transition-all duration-300 group-hover:-translate-y-0.5"
                  style={{ background: "var(--color-card-clay)" }}
                >
                  <h3 className="display-sm mb-2">Get in touch</h3>
                  <p className="text-sm mb-5" style={{ color: "var(--color-muted)" }}>
                    Questions about your order or a product? We respond within 24 hours.
                  </p>
                  <span
                    className="text-sm font-semibold transition-colors group-hover:text-[var(--color-accent)]"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    Contact us →
                  </span>
                </div>
              </Link>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* SECTION 8: Club Myto Community */}
      <section className="py-12">
        <div className="container-wide">
          <FadeUp>
            <div
              className="rounded-3xl p-10 md:p-16"
              style={{ background: "var(--color-card-dark)" }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: "rgba(245,240,232,0.35)" }}>
                Community
              </p>
              <h2 className="display-md mb-6 max-w-lg" style={{ color: "#f5f0e8" }}>
                Club Myto
              </h2>
              <p className="text-base leading-relaxed max-w-xl mb-4" style={{ color: "rgba(245,240,232,0.6)" }}>
                Built by riders, for riders. Club Myto is the community behind every product — a place for long-distance riders to share routes, maintenance knowledge, and the kind of hard-won experience that only comes from real distance.
              </p>
              <p className="text-base leading-relaxed max-w-xl mb-8" style={{ color: "rgba(245,240,232,0.6)" }}>
                Every product in the range started as a problem someone on a real ride encountered. If you've ridden far enough to know that good kit matters, you're already one of us.
              </p>
              <a
                href="mailto:clubmyto@gmail.com"
                className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-75"
                style={{ color: "var(--color-accent)" }}
              >
                Join the community →
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* SECTION 9: Newsletter */}
      <section className="py-12">
        <div className="container-wide">
          <FadeUp>
            <div
              className="rounded-3xl p-10 md:p-16 text-center"
              style={{ background: "var(--color-card-dark)" }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "rgba(245,240,232,0.35)" }}>
                Newsletter
              </p>
              <h2 className="display-md mb-3" style={{ color: "#f5f0e8" }}>
                Stay informed.
              </h2>
              <p className="text-sm mb-8" style={{ color: "rgba(245,240,232,0.45)" }}>
                New products, journal entries, and process notes. No noise.
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
