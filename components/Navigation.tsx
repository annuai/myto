"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CartDrawer } from "./CartDrawer";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Products", href: "/shop" },
  { label: "Journal", href: "/journal" },
  { label: "About", href: "/about" },
  { label: "Support", href: "/support" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount, toggleCart } = useCart();
  const pathname = usePathname();

  const isHeroPage = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 56);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Hero page now has white background — nav is always "solid" (dark text/logo).
  // On scroll: transitions to floating pill with shadow.
  const solid = true; // always dark text since hero is white

  // When scrolled: floating pill. When at top of hero: edge-to-edge transparent bar.
  const floatingPill = scrolled && !mobileOpen;

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
                    borderRadius: 20,
                    boxShadow: "0 4px 24px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)",
                  }
                : {
                    borderRadius: 0,
                    boxShadow: "none",
                  }
            }
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: floatingPill ? "rgba(255,255,255,0.97)" : "transparent",
              backdropFilter: floatingPill ? "blur(16px)" : "none",
              borderBottom: !floatingPill && !isHeroPage ? "1px solid rgba(0,0,0,0.07)" : "none",
            }}
          >
            <div className={floatingPill ? "" : "container-wide"}>
              <div className="flex items-center justify-between h-14" style={floatingPill ? { paddingLeft: 8, paddingRight: 8 } : {}}>
                {/* Logo — always dark since hero is white */}
                <Link href="/" className="flex items-center">
                  <div className="relative h-6 w-20">
                    <Image
                      src="/myto-logo.svg"
                      alt="myto-moto"
                      fill
                      className="object-contain object-left"
                      style={{ filter: "invert(1) brightness(0)" }}
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
                            : solid
                            ? "var(--color-foreground)"
                            : "rgba(26,26,26,0.88)",
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
                    onClick={toggleCart}
                    className="relative p-2 rounded-xl transition-colors hover:bg-black/5"
                    style={{ color: solid ? "var(--color-foreground)" : "var(--color-foreground)" }}
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
                    className="md:hidden p-2 rounded-xl transition-colors hover:bg-black/5"
                    style={{ color: solid ? "var(--color-foreground)" : "var(--color-foreground)" }}
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
                <nav className="px-6 pb-5 pt-2 flex flex-col gap-0.5">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-base font-medium py-3 border-b last:border-0 transition-opacity hover:opacity-60"
                      style={{
                        color:
                          pathname === link.href
                            ? "var(--color-accent)"
                            : "var(--color-foreground)",
                        borderColor: "rgba(0,0,0,0.06)",
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      </div>

      <CartDrawer />
    </>
  );
}
