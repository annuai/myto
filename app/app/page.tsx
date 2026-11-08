"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Footer } from "@/components/Footer";
import { DownloadButton } from "@/components/app/DownloadButton";
import { WaitlistForm } from "@/components/app/WaitlistForm";
import { beta } from "@/lib/beta";

// Swap for the generated hero when it exists (see docs/app-image-prompts.md).
const HERO_SRC = "/hero-image.png";

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
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

const steps = [
  { title: "Download the file", body: "Tap the button on your Android phone. Chrome may ask to keep the file, say yes." },
  { title: "Allow the install", body: "Open the download. Android asks once to allow installs from your browser or Files app." },
  { title: "Open Myto and ride", body: "Sign in with your Moto Trails account, or look around without one." },
];

export default function AppPage() {
  return (
    <div style={{ background: "var(--color-background)" }}>
      {/* Hero */}
      <section>
        <div className="container-wide pt-24 pb-10 md:pt-36">
          <div className="max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="display-lg mb-5"
              style={{ textWrap: "balance" }}
            >
              Plan it. Ride it. <span style={{ color: "var(--color-accent)" }}>Keep it.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mb-8 max-w-xl text-base leading-relaxed md:text-lg"
              style={{ color: "var(--color-muted)" }}
            >
              The Myto Moto app is a free ride companion for people who go further. It is coming soon, and the Android beta is ready to try today.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.38 }}
              className="flex flex-wrap items-center gap-3"
            >
              <DownloadButton />
              <a
                href="#list"
                className="inline-flex min-h-12 items-center rounded-2xl border px-6 text-sm font-medium transition-all hover:bg-black/5"
                style={{ borderColor: "rgba(26,26,26,0.16)" }}
              >
                Tell me when it&apos;s live
              </a>
            </motion.div>
            <p className="mt-4 text-sm" style={{ color: "var(--color-muted)" }}>
              Android · version {beta.version} beta · {beta.size} · iPhone is on its way
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 aspect-[4/3] overflow-hidden rounded-3xl sm:aspect-[16/9] md:aspect-[21/9]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={HERO_SRC} alt="A motorcycle headlight beaded with rain" className="h-full w-full object-cover" />
          </motion.div>
        </div>
      </section>

      {/* What it does */}
      <section className="py-16">
        <div className="container-wide">
          <FadeUp className="mb-10">
            <h2 className="display-md" style={{ textWrap: "balance" }}>
              Everything around the ride, in one place.
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-6">
            <FadeUp className="md:col-span-4">
              <div className="card-olive card flex h-full flex-col justify-between gap-10 !p-8 md:!p-10">
                <h3 className="display-sm max-w-md">Record every ride, even with the screen off.</h3>
                <p className="max-w-lg text-sm leading-relaxed md:text-base" style={{ color: "var(--color-muted)" }}>
                  It keeps recording through a long day. Every ride lands in your journal with the route, the distance, the fuel and any
                  check-ins, and the year ends with a recap.
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={0.07} className="md:col-span-2">
              <div className="card card-dark flex h-full flex-col justify-between gap-10 !p-8" style={{ color: "#fff" }}>
                <h3 className="display-sm">Ride together, stay found.</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
                  Live status for the whole group, and a Help button that tells everyone where you are.
                </p>
              </div>
            </FadeUp>
            <FadeUp className="md:col-span-2">
              <div className="card-cream card flex h-full flex-col justify-between gap-8 !p-8">
                <h3 className="display-sm">Plan a route, then follow it.</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
                  Search places, plan along real roads, and follow the route as you ride.
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={0.07} className="md:col-span-2">
              <div className="card-stone card flex h-full flex-col justify-between gap-8 !p-8">
                <h3 className="display-sm">Works where signal doesn&apos;t.</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
                  Download maps and trails before you leave. Nothing you need on the road waits on a connection.
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={0.14} className="md:col-span-2">
              <div className="card-clay card flex h-full flex-col justify-between gap-8 !p-8">
                <h3 className="display-sm">Keep the bike sorted.</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
                  To-dos, documents and service reminders, so the insurance never lapses mid-trip.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Try the beta */}
      <section id="beta" className="scroll-mt-24 py-16">
        <div className="container-wide">
          <FadeUp>
            <div className="card-stone card grid gap-10 !p-8 md:grid-cols-2 md:!p-12">
              <div>
                <h2 className="display-md mb-4" style={{ textWrap: "balance" }}>
                  Try the beta today.
                </h2>
                <p className="mb-8 max-w-md text-base leading-relaxed" style={{ color: "var(--color-muted)" }}>
                  Anyone can download it, and it is free. It is still being built, so expect rough edges, and tell us when you find one.
                </p>
                <DownloadButton />
                <p className="mt-4 text-sm" style={{ color: "var(--color-muted)" }}>
                  Found a bug? <Link href="/support" className="underline underline-offset-4">Tell us</Link>.
                </p>
              </div>
              <ol className="flex flex-col gap-6">
                {steps.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
                      style={{ background: "var(--color-foreground)", color: "var(--color-background)" }}
                      aria-hidden
                    >
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="mb-1 text-base font-semibold">{s.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Join the list */}
      <section id="list" className="scroll-mt-24 py-16">
        <div className="container-wide">
          <FadeUp>
            <div className="card card-dark relative flex flex-col items-start gap-6 !p-8 md:!p-14" style={{ color: "#fff" }}>
              <h2 className="display-md max-w-2xl" style={{ textWrap: "balance" }}>
                Hear it first, and watch it get built.
              </h2>
              <p className="max-w-xl text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
                Occasional notes as the app comes together, and one email the day it goes live. iPhone riders: this is how you&apos;ll know when
                your version is ready. Reply to any email to leave the list.
              </p>
              <WaitlistForm />
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
