import Link from "next/link";
import Image from "next/image";
import { FooterClock } from "./FooterClock";

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
      { label: "Contact", href: "/support" },
      { label: "Instagram", href: "https://instagram.com" },
      { label: "YouTube", href: "https://youtube.com" },
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
        <div className="container-wide pt-14 pb-12">

          {/* Top row: logo + tagline | Kerala clock */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-10 mb-14">
            <div>
              <div className="relative h-8 w-28 mb-4">
                <Image
                  src="/myto-logo.svg"
                  alt="myto-moto"
                  fill
                  className="object-contain object-left"
                  style={{ filter: "brightness(0)" }}
                />
              </div>
              <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--color-muted)" }}>
                Motorcycle accessories engineered for the long road.
              </p>
            </div>

            <div className="sm:text-right">
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-2"
                style={{ color: "var(--color-muted)" }}
              >
                Kerala, India
              </p>
              <FooterClock />
              <p className="text-xs mt-1 font-mono" style={{ color: "var(--color-muted)", opacity: 0.6 }}>
                IST · UTC +5:30
              </p>
            </div>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-10 mb-14">
            {navColumns.map((col) => (
              <div key={col.heading}>
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-5"
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

          {/* Open source + location bar */}
          <div
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-5 border-y"
            style={{ borderColor: "rgba(0,0,0,0.08)" }}
          >
            <div className="flex items-center gap-2">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: "var(--color-accent)" }}
              />
              <p className="text-xs" style={{ color: "var(--color-muted)" }}>
                All products are open source
              </p>
            </div>
            <p className="text-xs" style={{ color: "var(--color-muted)" }}>
              Made in Kerala, India
            </p>
          </div>

          {/* Bottom bar */}
          <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-xs" style={{ color: "var(--color-muted)" }}>
              © {new Date().getFullYear()} myto-moto
            </p>
            <div className="flex items-center gap-6">
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
    </footer>
  );
}
