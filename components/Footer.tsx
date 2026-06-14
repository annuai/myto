import Link from "next/link";
import Image from "next/image";
import { FooterClock } from "./FooterClock";

function InstagramIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 1.96C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
    </svg>
  );
}

const navColumns = [
  {
    heading: "Products",
    links: [
      { label: "Trail Beam", href: "/products/trail-beam" },
      { label: "Trail Kit", href: "/products/trail-kit" },
      { label: "Navi", href: "/products/navi" },
      { label: "Shop all", href: "/shop" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Journal", href: "/journal" },
      { label: "Club", href: "/club" },
      { label: "Contact", href: "/support" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Help & FAQ", href: "/support" },
      { label: "Installation guides", href: "/support" },
      { label: "Warranty", href: "/support" },
      { label: "Returns", href: "/support" },
    ],
  },
];

export function Footer({ className = "mt-24" }: { className?: string }) {
  return (
    <footer className={className} style={{ background: "var(--color-background)" }}>
      <div className="border-t" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
        <div className="container-wide pt-16 pb-12">

          {/* ── Top: logo + tagline | clock ───────────────────────── */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-10 mb-14">

            {/* Logo + tagline */}
            <div>
              <div className="relative h-8 w-28 mb-5">
                <Image
                  src="/myto-logo.svg"
                  alt="myto-moto"
                  fill
                  className="object-contain object-left"
                  style={{ filter: "brightness(0)" }}
                />
              </div>
              <p className="text-sm leading-relaxed max-w-[260px]" style={{ color: "var(--color-muted)" }}>
                Motorcycle accessories engineered for the long road.
              </p>
            </div>

            {/* Clock */}
            <div className="flex flex-col sm:items-end">
              <p className="text-xs font-semibold uppercase tracking-widest mb-2.5" style={{ color: "var(--color-muted)" }}>
                Kerala, India
              </p>
              <FooterClock />
              <p className="text-xs font-mono mt-1.5" style={{ color: "var(--color-muted)", opacity: 0.45 }}>
                IST · UTC +5:30
              </p>
            </div>
          </div>

          {/* ── Nav columns ───────────────────────────────────────── */}
          <div
            className="border-t pt-12 grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-10 mb-14"
            style={{ borderColor: "rgba(0,0,0,0.07)" }}
          >
            {navColumns.map((col) => (
              <div key={col.heading}>
                <p
                  className="text-[10px] font-bold uppercase tracking-[0.12em] mb-5"
                  style={{ color: "var(--color-foreground)" }}
                >
                  {col.heading}
                </p>
                <ul className="space-y-3.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm transition-opacity hover:opacity-50"
                        style={{ color: "var(--color-muted)" }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* ── Bottom bar ────────────────────────────────────────── */}
          <div
            className="border-t pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            style={{ borderColor: "rgba(0,0,0,0.07)" }}
          >
            {/* Left: copyright + open source */}
            <div className="flex items-center gap-3 flex-wrap">
              <p className="text-xs" style={{ color: "var(--color-muted)" }}>
                © {new Date().getFullYear()} myto-moto
              </p>
              <span style={{ color: "rgba(0,0,0,0.18)" }}>·</span>
              <div className="flex items-center gap-1.5">
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: "var(--color-accent)" }}
                />
                <p className="text-xs" style={{ color: "var(--color-muted)" }}>
                  All products are open source
                </p>
              </div>
            </div>

            {/* Right: social icons + legal */}
            <div className="flex items-center gap-5">
              <a
                href="https://instagram.com/clubmyto"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="transition-opacity hover:opacity-50"
                style={{ color: "var(--color-muted)" }}
              >
                <InstagramIcon />
              </a>
              <a
                href="https://www.youtube.com/@MytoMoto"

                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="transition-opacity hover:opacity-50"
                style={{ color: "var(--color-muted)" }}
              >
                <YouTubeIcon />
              </a>
              <span style={{ color: "rgba(0,0,0,0.15)" }}>·</span>
              {["Privacy", "Terms"].map((label) => (
                <Link
                  key={label}
                  href="/support"
                  className="text-xs transition-opacity hover:opacity-50"
                  style={{ color: "var(--color-muted)" }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Full-bleed footer image */}
      <div style={{ background: "#f1ece7", lineHeight: 0 }}>
        <Image
          src="/footer/footer.png"
          alt=""
          width={2172}
          height={724}
          className="w-full h-auto block"
          priority={false}
        />
      </div>
    </footer>
  );
}
