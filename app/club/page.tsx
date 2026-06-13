"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
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

const values = [
  {
    title: "Share what works",
    description: "Routes, gear fixes, improvised repairs. Honest accounts from riders who've been there — no brand loyalty, no sponsored opinions.",
  },
  {
    title: "Help first",
    description: "When someone asks a question, the first response is the most useful answer available. Not a redirect. Not an upsell.",
  },
  {
    title: "Ride seriously",
    description: "We don't gatekeep by bike, budget, or kilometre count. We care about the intention to ride thoughtfully and share what you learn.",
  },
  {
    title: "Fix things",
    description: "Every myto product can be repaired on the road. Club members know how. The group is a running record of maintenance knowledge.",
  },
];

export default function ClubPage() {
  return (
    <div style={{ background: "var(--color-background)" }}>
      {/* Hero */}
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
              Community
            </p>
            <h1 className="display-xl mb-6 max-w-2xl" style={{ color: "#f5f0e8" }}>
              Club Myto
            </h1>
            <p className="text-lg max-w-lg leading-relaxed mb-2" style={{ color: "rgba(245,240,232,0.55)" }}>
              A WhatsApp group for long-distance riders. Routes, repairs, real experience — shared by people who ride far enough to know that kit matters.
            </p>
            <p className="text-sm mb-10" style={{ color: "rgba(245,240,232,0.35)" }}>
              Currently a WhatsApp group. Expanding when the time is right.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://chat.whatsapp.com/EsdxZquNyIICasiv7HPVoz?mode=gi_t"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-7 py-3.5 rounded-2xl text-sm font-semibold transition-all hover:opacity-90"
                style={{ background: "var(--color-accent)", color: "#fff" }}
              >
                Join on WhatsApp →
              </a>
              <Link
                href="/journal"
                className="inline-flex items-center px-7 py-3.5 rounded-2xl text-sm font-semibold transition-all hover:opacity-75"
                style={{ color: "rgba(245,240,232,0.65)", border: "1px solid rgba(245,240,232,0.15)" }}
              >
                Read the journal
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16">
        <div className="container-wide">
          <FadeUp>
            <div className="rounded-3xl p-10 md:p-14" style={{ background: "var(--color-card-cream)" }}>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--color-muted)" }}>
                How it works
              </p>
              <h2 className="display-md mb-6 max-w-lg">A WhatsApp group, for now.</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
                <div>
                  <p className="font-semibold mb-2" style={{ color: "var(--color-foreground)" }}>01 — Click to join</p>
                  <p>Tap the invite link and join the WhatsApp group directly. No approval, no waitlist — just click and you&apos;re in.</p>
                </div>
                <div>
                  <p className="font-semibold mb-2" style={{ color: "var(--color-foreground)" }}>02 — Introduce yourself</p>
                  <p>Tell the group where you ride and what you ride. That&apos;s the only entry requirement.</p>
                </div>
                <div>
                  <p className="font-semibold mb-2" style={{ color: "var(--color-foreground)" }}>03 — Shape the products</p>
                  <p>Member feedback directly influences what we build. Every product in the range has been shaped by Club input.</p>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Values */}
      <section className="py-12">
        <div className="container-wide">
          <FadeUp className="mb-10">
            <h2 className="display-md">What the group is built on.</h2>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {values.map((v, i) => (
              <FadeUp key={v.title} delay={i * 0.07}>
                <div
                  className="rounded-3xl p-8 h-full"
                  style={{ background: i % 2 === 0 ? "var(--color-card-stone)" : "var(--color-card-cream)" }}
                >
                  <h3 className="display-sm mb-3">{v.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
                    {v.description}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12">
        <div className="container-wide">
          <FadeUp>
            <div className="rounded-3xl p-10 md:p-14" style={{ background: "var(--color-card-dark)" }}>
              <h2 className="display-md mb-4 max-w-lg" style={{ color: "#f5f0e8" }}>
                If you ride far, you belong here.
              </h2>
              <p className="text-base leading-relaxed max-w-lg mb-8" style={{ color: "rgba(245,240,232,0.55)" }}>
                Click the link to join the WhatsApp group directly. No questionnaire, no approval — just click and you&apos;re in.
              </p>
              <a
                href="https://chat.whatsapp.com/EsdxZquNyIICasiv7HPVoz?mode=gi_t"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-7 py-3.5 rounded-2xl text-sm font-semibold transition-all hover:opacity-90"
                style={{ background: "var(--color-accent)", color: "#fff" }}
              >
                Join on WhatsApp →
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
