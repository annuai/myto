"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const stages = [
  {
    step: "01",
    label: "Research",
    description: "Rider interviews, field observations, and problem documentation before a sketch is drawn.",
    image: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=600&q=80",
  },
  {
    step: "02",
    label: "Sketch",
    description: "Hundreds of hand sketches exploring form, function, and proportions with no filters.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
  },
  {
    step: "03",
    label: "CAD",
    description: "Parametric 3D models with every tolerance and fit interface fully specified.",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&q=80",
  },
  {
    step: "04",
    label: "Prototype",
    description: "Rapid SLA prints and soft-tooled samples used to validate ergonomics and assembly.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  },
  {
    step: "05",
    label: "Testing",
    description: "Thousands of kilometres of real-world riding to validate performance and durability.",
    image: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=600&q=80",
  },
  {
    step: "06",
    label: "Product",
    description: "CNC-machined, inspected, and delivered. Refined until it earns its place on your bike.",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&q=80",
  },
];

export function IterationTimeline() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-16 md:py-20" style={{ background: "var(--color-surface)" }}>
      <div className="container-wide">
        <motion.div
          className="max-w-2xl mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span
            className="text-xs font-medium tracking-[0.2em] uppercase block mb-3"
            style={{ color: "var(--color-accent)" }}
          >
            Process
          </span>
          <h2 className="display-md">Built through iteration.</h2>
          <p className="mt-4 text-base" style={{ color: "var(--color-muted)" }}>
            Every product passes through a rigorous development process before it reaches production.
            We document every stage so nothing gets skipped.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
          {stages.map((stage, i) => (
            <motion.div
              key={stage.step}
              className="flex flex-col"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="relative rounded-xl overflow-hidden aspect-square mb-4">
                <Image
                  src={stage.image}
                  alt={stage.label}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 17vw"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(31,31,31,0.5) 0%, transparent 60%)" }}
                />
                <span
                  className="absolute bottom-3 left-3 text-[10px] font-bold tracking-[0.15em] uppercase text-white"
                >
                  {stage.step}
                </span>
              </div>
              <h3 className="text-sm font-semibold mb-1.5">{stage.label}</h3>
              <p className="text-xs leading-relaxed" style={{ color: "var(--color-muted)" }}>
                {stage.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
