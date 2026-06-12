"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CartDrawer } from "./CartDrawer";
import { motion, AnimatePresence } from "framer-motion";
import { filterItems } from "@/lib/search-items";

const navLinks = [
  { label: "Products", href: "/shop" },
  { label: "Journal", href: "/journal" },
  { label: "Club", href: "/club" },
  { label: "About", href: "/about" },
  { label: "Support", href: "/support" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState("");
  const { itemCount, toggleCart } = useCart();
  const pathname = usePathname();
  const router = useRouter();

  const isHeroPage = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 56);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileSearch("");
  }, [pathname]);

  // Pages with a dark hero need inverted (white) nav until the pill kicks in.
  const darkHeroPage = pathname === "/about" || pathname === "/club";

  // When scrolled: floating pill. When at top: edge-to-edge transparent bar.
  const floatingPill = scrolled && !mobileOpen;

  // Background is white whenever floatingPill OR mobileOpen — both need dark text/logo.
  const invertNav = darkHeroPage && !floatingPill && !mobileOpen;

  return (
    <>
      {/* Outer wrapper */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-start justify-center pointer-events-none">
        {/* Nav bar — pill uses container-wide max-width, full-width otherwise */}
        <motion.header
          className="pointer-events-auto w-full"
          style={{ maxWidth: floatingPill ? 1400 : "none" }}
          animate={
            floatingPill
              ? { marginTop: 12, paddingLeft: 32, paddingRight: 32 }
              : { marginTop: 0, paddingLeft: 0, paddingRight: 0 }
          }
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            animate={
              floatingPill
                ? {
                    borderRadius: 9999,
                    boxShadow: "0 4px 24px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)",
                  }
                : {
                    borderRadius: 0,
                    boxShadow: "none",
                  }
            }
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: (floatingPill || mobileOpen) ? "rgba(255,255,255,0.97)" : "transparent",
              backdropFilter: (floatingPill || mobileOpen) ? "blur(16px)" : "none",
              borderBottom: !floatingPill && !mobileOpen && !isHeroPage ? "1px solid rgba(0,0,0,0.07)" : "none",
            }}
          >
            <div className={floatingPill ? "" : "container-wide"}>
              <div className="flex items-center justify-between h-14" style={floatingPill ? { paddingLeft: 20, paddingRight: 20 } : {}}>
                <Link href="/" className="flex items-center">
                  <div className="relative h-6 w-20">
                    <Image
                      src="/myto-logo.svg"
                      alt="myto-moto"
                      fill
                      className="object-contain object-left"
                      style={{ filter: invertNav ? "brightness(0) invert(1)" : "invert(1) brightness(0)" }}
                      priority
                    />
                  </div>
                </Link>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-7">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-sm font-medium transition-opacity hover:opacity-60 relative"
                      style={{
                        color:
                          pathname === link.href
                            ? "var(--color-accent)"
                            : invertNav
                            ? "rgba(245,240,232,0.85)"
                            : "var(--color-foreground)",
                      }}
                    >
                      {link.label}
                      {pathname === link.href && (
                        <span
                          className="absolute -bottom-0.5 left-0 right-0 h-px rounded-full"
                          style={{ background: "var(--color-accent)" }}
                        />
                      )}
                    </Link>
                  ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true }))}
                    className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs transition-colors hover:bg-black/5"
                    style={{ color: invertNav ? "rgba(245,240,232,0.6)" : "var(--color-muted)" }}
                    aria-label="Search"
                  >
                    <Search size={14} />
                    <span>Search</span>
                    <kbd
                      className="ml-1 px-1.5 py-0.5 rounded text-[10px]"
                      style={{ background: invertNav ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)" }}
                    >
                      ⌘K
                    </kbd>
                  </button>
                  <button
                    onClick={toggleCart}
                    className="relative p-2 rounded-xl transition-colors hover:bg-white/10"
                    style={{ color: invertNav ? "rgba(245,240,232,0.85)" : "var(--color-foreground)" }}
                    aria-label={`Cart (${itemCount} items)`}
                  >
                    <ShoppingBag size={18} />
                    {itemCount > 0 && (
                      <span
                        className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
                        style={{ background: "var(--color-accent)" }}
                      >
                        {itemCount}
                      </span>
                    )}
                  </button>
                  <button
                    className="md:hidden p-2 rounded-xl transition-colors hover:bg-white/10"
                    style={{ color: invertNav ? "rgba(245,240,232,0.85)" : "var(--color-foreground)" }}
                    onClick={() => setMobileOpen((v) => !v)}
                    aria-label="Menu"
                  >
                    {mobileOpen ? <X size={19} /> : <Menu size={19} />}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mobile menu — drops below the pill */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden overflow-hidden mx-4 rounded-b-2xl"
                style={{
                  background: "rgba(248,247,244,0.97)",
                  backdropFilter: "blur(16px)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
              >
                {/* Search bar */}
                <div className="px-4 pt-4 pb-3">
                  <div
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl"
                    style={{ background: "rgba(0,0,0,0.05)" }}
                  >
                    <Search size={14} style={{ color: "var(--color-muted)", flexShrink: 0 }} />
                    <input
                      type="text"
                      placeholder="Search pages, products..."
                      value={mobileSearch}
                      onChange={(e) => setMobileSearch(e.target.value)}
                      className="flex-1 text-sm outline-none bg-transparent"
                      style={{ color: "var(--color-foreground)" }}
                      autoComplete="off"
                    />
                    {mobileSearch && (
                      <button onClick={() => setMobileSearch("")} aria-label="Clear search">
                        <X size={13} style={{ color: "var(--color-muted)" }} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Nav links or search results */}
                {mobileSearch.trim() ? (
                  <div className="px-4 pb-5">
                    {filterItems(mobileSearch).length === 0 ? (
                      <p className="text-sm py-4 text-center" style={{ color: "var(--color-muted)" }}>
                        No results for &ldquo;{mobileSearch}&rdquo;
                      </p>
                    ) : (
                      filterItems(mobileSearch).map((item) => (
                        <button
                          key={item.href}
                          onClick={() => {
                            setMobileOpen(false);
                            if (item.href.startsWith("mailto:")) {
                              window.location.href = item.href;
                            } else {
                              router.push(item.href);
                            }
                          }}
                          className="w-full flex flex-col items-start py-2.5 border-b last:border-0 text-left"
                          style={{ borderColor: "rgba(0,0,0,0.06)" }}
                        >
                          <span className="text-sm font-medium" style={{ color: "var(--color-foreground)" }}>
                            {item.title}
                          </span>
                          <span className="text-xs" style={{ color: "var(--color-muted)" }}>
                            {item.description}
                          </span>
                        </button>
                      ))
                    )}
                  </div>
                ) : (
                  <nav className="px-6 pb-5 flex flex-col gap-0.5">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-base font-medium py-3 border-b last:border-0 transition-opacity hover:opacity-60"
                        style={{
                          color: pathname === link.href ? "var(--color-accent)" : "var(--color-foreground)",
                          borderColor: "rgba(0,0,0,0.06)",
                        }}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      </div>

      <CartDrawer />
    </>
  );
}
