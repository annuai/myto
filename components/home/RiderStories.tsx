"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const stories = [
  {
    quote:
      "After ten thousand kilometres across Scandinavia, the mirrors were still clear, still precise, and the grips had taken every vibration the mountain roads could throw at them. That's the standard I hold everything to.",
    name: "Sven Lindqvist",
    location: "Stockholm, Sweden",
    bike: "Triumph Tiger 900",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80",
  },
  {
    quote:
      "I've owned bikes for twenty years. This is the first tank bag that fits like it was made for my bike, holds in the rain, and doesn't look like it came from a catalogue. Worth every euro.",
    name: "Maarten de Vries",
    location: "Amsterdam, Netherlands",
    bike: "BMW R1250 GS",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80",
  },
];

export function RiderStories() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-16 md:py-20">
      <div className="container-wide">
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span
            className="text-xs font-medium tracking-[0.2em] uppercase block mb-3"
            style={{ color: "var(--color-accent)" }}
          >
            Rider stories
          </span>
          <h2 className="display-md">Tested on real roads.</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {stories.map((story, i) => (
            <motion.div
              key={story.name}
              className="overflow-hidden rounded-2xl"
              style={{ background: "var(--color-surface)" }}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              {/* Image */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={story.image}
                  alt={`${story.name} riding`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Quote */}
              <div className="p-7 md:p-8">
                <blockquote
                  className="text-base md:text-lg leading-relaxed mb-6 font-light"
                  style={{ color: "var(--color-foreground)" }}
                >
                  &ldquo;{story.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                  <div
                    className="w-1 h-8 rounded-full"
                    style={{ background: "var(--color-accent)" }}
                  />
                  <div>
                    <p className="text-sm font-semibold">{story.name}</p>
                    <p className="text-xs" style={{ color: "var(--color-muted)" }}>
                      {story.location} · {story.bike}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
