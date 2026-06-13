"use client";

import { useRef } from "react";
import { useActionState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { subscribeNewsletter } from "@/app/actions/newsletter";

export function Newsletter() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const [state, action, pending] = useActionState(subscribeNewsletter, {
    error: null,
    success: false,
  });

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

          {state.success ? (
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
            <form action={action} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                name="email"
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
                disabled={pending}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg text-sm font-medium text-white transition-all hover:opacity-90 active:scale-[0.98] whitespace-nowrap disabled:opacity-60"
                style={{ background: "var(--color-accent)" }}
              >
                {pending ? "Subscribing…" : <>Subscribe <ArrowRight size={14} /></>}
              </button>
            </form>
          )}

          {state.error && (
            <p className="mt-3 text-xs" style={{ color: "var(--color-accent)" }}>
              {state.error}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
