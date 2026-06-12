import Link from "next/link";
import Image from "next/image";

interface FooterProps {
  className?: string;
}

const footerColumns = [
  {
    heading: "Products",
    links: [
      { label: "Trail Beam", href: "/products/trail-beam" },
      { label: "Trail Kit", href: "/products/trail-kit" },
      { label: "myto navi", href: "/products/myto-navi" },
      { label: "All products", href: "/shop" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Journal", href: "/journal" },
      { label: "Process", href: "/about" },
      { label: "Contact", href: "/support" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Help & support", href: "/support" },
      { label: "Installation guides", href: "/support" },
      { label: "Warranty", href: "/support" },
      { label: "Returns", href: "/support" },
    ],
  },
  {
    heading: "Follow",
    links: [
      { label: "Instagram", href: "https://instagram.com" },
      { label: "YouTube", href: "https://youtube.com" },
    ],
  },
];

export function Footer({ className = "mt-24" }: FooterProps) {
  return (
    <footer
      className={className}
      style={{ background: "var(--color-background)" }}
    >
      <div
        className="border-t"
        style={{ borderColor: "rgba(0,0,0,0.08)" }}
      >
        <div className="container-wide pt-14 pb-10">

          {/* Large logo mark — Google Store style */}
          <div className="mb-14">
            <div className="relative h-8 w-28">
              <Image
                src="/myto-logo.svg"
                alt="myto-moto"
                fill
                className="object-contain object-left"
                style={{ filter: "invert(1) brightness(0)" }}
              />
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10">
            {footerColumns.map((col) => (
              <div key={col.heading}>
                <p
                  className="text-sm font-semibold mb-5"
                  style={{ color: "var(--color-foreground)" }}
                >
                  {col.heading}
                </p>
                <ul className="space-y-4">
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

          {/* Bottom bar */}
          <div
            className="mt-14 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t"
            style={{ borderColor: "rgba(0,0,0,0.08)" }}
          >
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
