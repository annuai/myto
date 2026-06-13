import Link from "next/link";
import Image from "next/image";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "404 — Trail ends here | myto-moto",
};

export default function NotFoundPage() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--color-background)" }}
    >
      <div className="flex-1 pt-28 pb-16">
        <div className="container-wide">
          <div
            className="rounded-3xl px-8 py-16 md:px-16 md:py-20 flex flex-col items-center text-center overflow-hidden"
            style={{ background: "var(--color-card-dark)" }}
          >
            {/* Label */}
            <span
              className="text-xs font-semibold uppercase tracking-widest mb-5 font-mono"
              style={{ color: "rgba(245,240,232,0.3)" }}
            >
              Error 404
            </span>

            {/* Heading */}
            <h1
              className="display-lg mb-5"
              style={{ color: "#f5f0e8" }}
            >
              Trail ends here.
            </h1>

            {/* Description */}
            <p
              className="text-base mb-14 max-w-xs leading-relaxed"
              style={{ color: "rgba(245,240,232,0.45)" }}
            >
              This route doesn&apos;t exist. Let&apos;s get you back on track.
            </p>

            {/* ── Motorcycle illustration ─────────────── */}
            <div className="w-full max-w-2xl mb-14 px-2">
              <Image
                src="/404/motorcycle.png"
                alt="Adventure motorcycle stranded off-road"
                width={800}
                height={600}
                className="w-full h-auto"
                priority
              />
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/"
                className="px-7 py-3.5 rounded-2xl text-sm font-semibold transition-all hover:opacity-90 active:scale-[0.97]"
                style={{ background: "var(--color-accent)", color: "#fff" }}
              >
                Back home
              </Link>
              <Link
                href="/shop"
                className="px-7 py-3.5 rounded-2xl text-sm font-semibold transition-all hover:opacity-70"
                style={{
                  border: "1px solid rgba(245,240,232,0.15)",
                  color: "rgba(245,240,232,0.65)",
                }}
              >
                Browse products
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
