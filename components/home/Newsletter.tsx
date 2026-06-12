"use client";

import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

export function Newsletter() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section ref={ref} className="py-16 md:py-20">
      <div className="container-wide">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span
            className="text-xs font-medium tracking-[0.2em] uppercase block mb-4"
            style={{ color: "var(--color-accent)" }}
          >
            Newsletter
          </span>
          <h2 className="display-md mb-4">Stay in the loop.</h2>
          <p className="text-base mb-10" style={{ color: "var(--color-muted)" }}>
            New products, process articles, and occasional updates on what we&apos;re building.
            No noise. Unsubscribe anytime.
          </p>

          {submitted ? (
            <motion.p
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-sm font-medium py-4 px-6 rounded-xl inline-block"
              style={{
                background: "var(--color-surface)",
                color: "var(--color-accent)",
                border: "1px solid var(--color-border)",
              }}
            >
              You&apos;re in. We&apos;ll be in touch.
            </motion.p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 px-4 py-3.5 rounded-lg text-sm outline-none transition-all"
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-foreground)",
                }}
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg text-sm font-medium text-white transition-all hover:opacity-90 active:scale-[0.98] whitespace-nowrap"
                style={{ background: "var(--color-accent)" }}
              >
                Subscribe <ArrowRight size={14} />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
