"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

// NOTE: Metadata is exported from server components only. For this client component,
// meta is handled in layout.tsx defaults.

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

const philosophyCards = [
  {
    title: "Problem-first",
    description:
      "We start with a specific, documented problem — not a product idea. If the problem isn't real and important, we don't make the product.",
    bg: "var(--color-card-cream)",
  },
  {
    title: "Process-led",
    description:
      "Every decision is traceable to research or testing. If we can't explain why a design choice was made, it gets reconsidered.",
    bg: "var(--color-card-stone)",
  },
  {
    title: "Made to last",
    description:
      "We specify materials for ten-year service life, not for cost efficiency. The cheapest option is rarely the right option.",
    bg: "var(--color-card-olive)",
  },
  {
    title: "Honest pricing",
    description:
      "Our prices reflect genuine cost of materials, manufacturing, and testing. We don't inflate for perceived premium positioning.",
    bg: "var(--color-card-clay)",
  },
];

const processSteps = [
  { n: "01", title: "Research", description: "Document the real problem. Interview riders. Understand failure modes of existing solutions." },
  { n: "02", title: "Sketch", description: "Paper sketches and proportional studies. The fastest way to kill bad ideas." },
  { n: "03", title: "CAD", description: "Precise 3D geometry. Tolerance analysis. Interference checking before any material is committed." },
  { n: "04", title: "Prototype", description: "3D-printed and machined prototypes tested under realistic conditions, not in a lab." },
  { n: "05", title: "Test", description: "Hundreds of kilometres of real riding. Document every failure, frustration, and unexpected behaviour." },
  { n: "06", title: "Product", description: "Production only when testing reveals nothing that would disappoint a rider on a long trip." },
];

const materials = [
  {
    name: "Die-cast aluminium",
    why: "Excellent strength-to-weight ratio, takes hard-anodise finish well, and machines to tight tolerances. Specified for lamp housings and structural brackets.",
  },
  {
    name: "Waxed cotton canvas",
    why: "Ages well, repairs easily, and provides a degree of water resistance without the clammy feeling of synthetic alternatives. Specified for the Trail Kit tool roll.",
  },
  {
    name: "N52 rare-earth magnets",
    why: "Strong enough to hold through mountain passes at speed, releasable with one hand. Foam-padded to protect paint. Specified for the Trail Kit magnetic tank bag.",
  },
  {
    name: "Polycarbonate",
    why: "Impact resistance far exceeds glass. UV-hard-coat prevents yellowing over years of sun exposure. Specified for lamp lenses.",
  },
  {
    name: "Silicone dampers",
    why: "Shore 45A hardness provides the right balance between vibration absorption and positional stability. Used in both the Trail Beam harness and Navi mount.",
  },
];

export default function AboutPage() {
  return (
    <div style={{ background: "var(--color-background)" }}>
      {/* SECTION 1: Hero */}
      <section className="pt-32 pb-12">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl p-10 md:p-14"
            style={{ background: "var(--color-card-dark)" }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: "rgba(245,240,232,0.35)" }}>
              About
            </p>
            <h1 className="display-xl mb-8 max-w-3xl" style={{ color: "#f5f0e8" }}>
              Built from what was missing.
            </h1>
            <p className="text-lg max-w-xl leading-relaxed" style={{ color: "rgba(245,240,232,0.55)" }}>
              Every product here started as a frustration on a long ride. Not a business
              opportunity — a real problem without a good solution.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: Origin Story */}
      <section className="py-16">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <FadeUp>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--color-muted)" }}>
                The origin
              </p>
              <h2 className="display-md mb-6">Annuai&apos;s story</h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <div className="space-y-5 text-base leading-relaxed" style={{ color: "var(--color-muted)" }}>
                <p>
                  I started riding long-distance in 2019 — Rajasthan, Ladakh, the northeastern
                  states. The kind of routes where you&apos;re genuinely far from help and the kit
                  you carry matters.
                </p>
                <p>
                  What I found consistently was that the accessories available were designed by
                  people who had photographed adventure riding rather than done it. Phone mounts
                  that cracked in cold weather. Tank bags with zips that jammed with dust. Aux
                  lamps with beam patterns optimised for a photoshoot rather than 2am on an unlit
                  mountain road.
                </p>
                <p>
                  myto-moto started as a notebook of problems and a workshop. I&apos;m an industrial
                  designer by training. The first products took two years from first sketch to
                  first sale — not because manufacturing is slow, but because I wasn&apos;t willing
                  to ship something I wouldn&apos;t stake my own safety on.
                </p>
                <p>
                  The business is deliberately small. I&apos;d rather make three products properly
                  than fifteen products acceptably. Every product in the range is something I use
                  on every long ride I do.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* SECTION 3: Philosophy Cards */}
      <section className="py-12">
        <div className="container-wide">
          <FadeUp className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--color-muted)" }}>
              Philosophy
            </p>
            <h2 className="display-md">How we think about products.</h2>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {philosophyCards.map((card, i) => (
              <FadeUp key={card.title} delay={i * 0.07}>
                <div
                  className="rounded-3xl p-8 h-full"
                  style={{ background: card.bg }}
                >
                  <h3 className="display-sm mb-3">{card.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
                    {card.description}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: Process */}
      <section className="py-16">
        <div className="container-wide">
          <FadeUp className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--color-muted)" }}>
              Process
            </p>
            <h2 className="display-md max-w-lg">How a product gets made.</h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {processSteps.map((step, i) => (
              <FadeUp key={step.n} delay={i * 0.07}>
                <div
                  className="rounded-3xl p-7 h-full"
                  style={{ background: "var(--color-card-cream)" }}
                >
                  <span
                    className="text-xs font-mono font-bold block mb-4"
                    style={{ color: "var(--color-accent)" }}
                  >
                    {step.n}
                  </span>
                  <h3 className="font-semibold text-base mb-2">{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
                    {step.description}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: Materials */}
      <section className="py-16">
        <div className="container-wide">
          <FadeUp className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--color-muted)" }}>
              Materials
            </p>
            <h2 className="display-md max-w-lg">What we specify and why.</h2>
          </FadeUp>
          <div
            className="rounded-3xl overflow-hidden"
            style={{ background: "var(--color-card-stone)" }}
          >
            {materials.map((m, i) => (
              <FadeUp key={m.name} delay={i * 0.06}>
                <div
                  className="flex flex-col sm:flex-row gap-3 sm:gap-8 px-8 py-6 border-b last:border-0"
                  style={{ borderColor: "rgba(0,0,0,0.06)" }}
                >
                  <div className="flex-shrink-0 sm:w-48">
                    <span className="font-semibold text-sm">{m.name}</span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
                    {m.why}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: Vision */}
      <section className="py-12">
        <div className="container-wide">
          <FadeUp>
            <div
              className="rounded-3xl p-10 md:p-16"
              style={{ background: "var(--color-card-dark)" }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: "rgba(245,240,232,0.35)" }}>
                What comes next
              </p>
              <h2 className="display-md mb-6 max-w-2xl" style={{ color: "#f5f0e8" }}>
                A small, complete system for riders who go far.
              </h2>
              <p className="text-base leading-relaxed max-w-xl mb-8" style={{ color: "rgba(245,240,232,0.55)" }}>
                The current three products are designed to work as a complete ecosystem.
                Future products will extend this — always from a real problem, always with
                the same level of testing and care. No category expansion for its own sake.
              </p>
              <Link
                href="/journal"
                className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-75"
                style={{ color: "var(--color-accent)" }}
              >
                Follow the process in the journal →
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* SECTION 7: Journal CTA */}
      <section className="py-12">
        <div className="container-wide">
          <FadeUp>
            <div
              className="rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              style={{ background: "var(--color-card-cream)" }}
            >
              <div>
                <h3 className="display-sm mb-2">Read the journal</h3>
                <p className="text-sm" style={{ color: "var(--color-muted)" }}>
                  Engineering deep-dives, material sourcing, and riding dispatches.
                </p>
              </div>
              <Link
                href="/journal"
                className="inline-flex items-center px-6 py-3 rounded-2xl text-sm font-semibold transition-all hover:opacity-90 flex-shrink-0"
                style={{ background: "var(--color-foreground)", color: "#f5f0e8" }}
              >
                All articles →
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
