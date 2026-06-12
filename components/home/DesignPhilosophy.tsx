"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const pillars = [
  {
    label: "01",
    title: "Research",
    description:
      "Every product starts with structured research — rider interviews, observational studies, and competitive analysis. We document real problems before we sketch a single solution.",
  },
  {
    label: "02",
    title: "Industrial Design",
    description:
      "Form follows function, but function informs beauty. Our design process spans hundreds of sketches and 3D studies before anything is committed to CAD.",
  },
  {
    label: "03",
    title: "Prototyping",
    description:
      "We build early and build often. SLA prints, CNC test cuts, and hand-fabricated mockups help us validate ideas quickly and cheaply.",
  },
  {
    label: "04",
    title: "Testing",
    description:
      "Real-world validation on real bikes. Every product is ridden extensively in varied conditions before it reaches the production stage.",
  },
  {
    label: "05",
    title: "Manufacturing",
    description:
      "We work with a small network of specialist machining partners. Every tolerance matters, every finish is specified, and every batch is inspected.",
  },
];

export function DesignPhilosophy() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 md:py-32 overflow-hidden">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Image stack */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
              <Image
                src="https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=900&q=80"
                alt="Workshop with industrial design sketches and prototypes"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Floating inset card */}
            <motion.div
              className="absolute -bottom-8 -right-4 md:-right-10 w-44 h-44 md:w-52 md:h-52 rounded-xl overflow-hidden shadow-xl border-4"
              style={{ borderColor: "var(--color-background)" }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80"
                alt="Product detail close-up"
                fill
                className="object-cover"
                sizes="220px"
              />
            </motion.div>
          </motion.div>

          {/* Right: Text */}
          <div className="lg:pt-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span
                className="text-xs font-medium tracking-[0.2em] uppercase block mb-4"
                style={{ color: "var(--color-accent)" }}
              >
                Our approach
              </span>
              <h2 className="display-md mb-6">
                Designed from the ground up. Tested on the road.
              </h2>
              <p className="text-base leading-relaxed mb-12" style={{ color: "var(--color-muted)" }}>
                We are a small, independent team of riders and engineers obsessed with solving real
                problems through craft and iteration. No shortcuts. No compromise on quality.
              </p>
            </motion.div>

            <ul className="space-y-8">
              {pillars.map((pillar, i) => (
                <motion.li
                  key={pillar.label}
                  className="flex gap-5 group"
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                >
                  <span
                    className="text-xs font-semibold tabular-nums mt-1 flex-shrink-0"
                    style={{ color: "var(--color-accent)" }}
                  >
                    {pillar.label}
                  </span>
                  <div>
                    <h3 className="font-semibold text-sm mb-1.5">{pillar.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
                      {pillar.description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
