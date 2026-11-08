import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** Home page band announcing the app. One headline, two ways in. */
export function AppBand() {
  return (
    <section aria-labelledby="app-band-title" className="py-12">
      <div className="container-wide">
        <div
          className="card card-dark flex flex-col items-start justify-between gap-8 !p-8 md:flex-row md:items-center md:!p-12"
          style={{ color: "#fff" }}
        >
          <div className="max-w-xl">
            <span
              className="mb-4 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
              style={{ background: "var(--color-accent)", color: "#fff" }}
            >
              Beta open · Android
            </span>
            <h2 id="app-band-title" className="display-md mb-3" style={{ textWrap: "balance" }}>
              The Myto Moto app is coming.
            </h2>
            <p className="text-sm leading-relaxed md:text-base" style={{ color: "rgba(255,255,255,0.72)" }}>
              Record rides, follow routes with no signal, and keep your group together. Try the beta now, or hear when it&apos;s live.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/app#beta"
              className="inline-flex min-h-12 items-center gap-2 rounded-2xl px-6 text-sm font-semibold transition-all hover:opacity-90 active:scale-[0.97]"
              style={{ background: "var(--color-accent)", color: "#fff" }}
            >
              Try the beta <ArrowRight size={16} aria-hidden />
            </Link>
            <Link
              href="/app#list"
              className="inline-flex min-h-12 items-center rounded-2xl border px-6 text-sm font-medium transition-all hover:bg-white/10"
              style={{ borderColor: "rgba(255,255,255,0.3)" }}
            >
              Join the list
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
