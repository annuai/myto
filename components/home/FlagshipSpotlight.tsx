"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

const callouts = [
  { label: "Material", value: "6061-T6 Billet Aluminium" },
  { label: "Weight", value: "98g" },
  { label: "Clamp", value: "22 / 28.6mm included" },
  { label: "Isolation", value: "Shore 45A silicone" },
];

const features = [
  "Vibration-isolated cradle protects your phone's camera",
  "One-handed thumb-lever release, glove-friendly",
  "360° articulation with positive vibration-proof lock",
  "Hard-anodised finish — built for outdoor use",
  "15-minute installation, single hex key",
];

export function FlagshipSpotlight() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-16 md:py-24"
      style={{ background: "var(--color-surface)" }}
    >
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: content */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h2 className="display-lg mb-4">Phone Mount Pro</h2>
            <p className="text-base leading-relaxed mb-7" style={{ color: "var(--color-muted)" }}>
              Your navigation, exactly where it should be. Precision-machined from billet aluminium
              with internal silicone vibration dampers — designed after studying how riders actually
              use their phones on the road.
            </p>

            {/* Spec callouts */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {callouts.map((c) => (
                <div
                  key={c.label}
                  className="p-4 rounded-xl"
                  style={{ background: "var(--color-card)" }}
                >
                  <p className="text-[11px] font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--color-muted)" }}>
                    {c.label}
                  </p>
                  <p className="text-sm font-medium">{c.value}</p>
                </div>
              ))}
            </div>

            {/* Features */}
            <ul className="space-y-2 mb-8">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm" style={{ color: "var(--color-muted)" }}>
                  <Check size={14} className="mt-0.5 flex-shrink-0" style={{ color: "var(--color-accent)" }} />
                  {f}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-5">
              <Link
                href="/products/phone-mount-pro"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-medium text-white transition-all hover:opacity-90"
                style={{ background: "var(--color-accent)" }}
              >
                View product <ArrowRight size={14} />
              </Link>
              <span className="text-lg font-semibold">₹10,999</span>
            </div>
          </motion.div>

          {/* Right: images */}
          <motion.div
            className="grid grid-cols-2 gap-3"
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="col-span-2 relative rounded-2xl overflow-hidden aspect-[16/10]">
              <Image
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80"
                alt="Phone Mount Pro hero"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="relative rounded-xl overflow-hidden aspect-square">
              <Image
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80"
                alt="Mount detail"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="relative rounded-xl overflow-hidden aspect-square">
              <Image
                src="https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=500&q=80"
                alt="On-bike installation"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
