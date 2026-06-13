"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingBag, Menu, X, Search, User, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CartDrawer } from "./CartDrawer";
import { motion, AnimatePresence } from "framer-motion";
import { filterItems } from "@/lib/search-items";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import type { User as SupabaseUser } from "@supabase/supabase-js";

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
  const [authUser, setAuthUser] = useState<SupabaseUser | null>(null);
  const { itemCount, toggleCart } = useCart();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthUser(session?.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_, session) => setAuthUser(session?.user ?? null)
    );
    return () => subscription.unsubscribe();
  }, []);

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

  // Lock body scroll while mobile overlay is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const darkHeroPage = false;
  const floatingPill = scrolled && !mobileOpen;
  const invertNav = darkHeroPage && !floatingPill && !mobileOpen;

  const navBarBg = mobileOpen
    ? "var(--color-background)"
    : floatingPill
    ? "rgba(255,255,255,0.97)"
    : "transparent";

  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      {/* ── Nav bar ─────────────────────────────────────────────────── */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-start justify-center pointer-events-none">
        <motion.header
          className="pointer-events-auto w-full"
          style={{ maxWidth: floatingPill ? 1400 : "none" }}
          animate={
            floatingPill
              ? { marginTop: 20, paddingLeft: 32, paddingRight: 32 }
              : { marginTop: 0, paddingLeft: 0, paddingRight: 0 }
          }
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            animate={
              floatingPill
                ? { borderRadius: 9999, boxShadow: "0 4px 24px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)" }
                : { borderRadius: 0, boxShadow: "none" }
            }
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: navBarBg,
              backdropFilter: (floatingPill || mobileOpen) ? "blur(16px)" : "none",
              borderBottom: !floatingPill && !mobileOpen && !isHeroPage ? "1px solid rgba(0,0,0,0.07)" : "none",
            }}
          >
            <div className={floatingPill ? "" : "container-wide"}>
              <div
                className="relative flex items-center justify-between h-14"
                style={floatingPill ? { paddingLeft: 20, paddingRight: 20 } : {}}
              >
                {/* Logo */}
                <Link href="/" className="flex items-center" onClick={() => setMobileOpen(false)}>
                  <div className="relative h-[34px] w-[72px]">
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

                {/* Desktop nav — absolutely centred so it sits at the true midpoint */}
                <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-7">
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
                  {/* Desktop search */}
                  <button
                    onClick={() =>
                      window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true }))
                    }
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

                  {/* Desktop auth */}
                  <div className="hidden md:flex items-center gap-0.5">
                    {authUser ? (
                      <>
                        <Link
                          href="/account/orders"
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors hover:bg-black/5"
                          style={{ color: invertNav ? "rgba(245,240,232,0.65)" : "var(--color-muted)" }}
                        >
                          <User size={13} />
                          Orders
                        </Link>
                        <button
                          onClick={async () => {
                            const { createSupabaseBrowserClient } = await import("@/lib/supabase-browser");
                            await createSupabaseBrowserClient().auth.signOut();
                            router.refresh();
                          }}
                          className="px-3 py-1.5 rounded-xl text-xs font-medium transition-colors hover:bg-black/5"
                          style={{ color: invertNav ? "rgba(245,240,232,0.45)" : "var(--color-muted)" }}
                        >
                          Sign out
                        </button>
                      </>
                    ) : (
                      <Link
                        href="/account/login"
                        className="px-3 py-1.5 rounded-xl text-xs font-medium transition-colors hover:bg-black/5"
                        style={{ color: invertNav ? "rgba(245,240,232,0.65)" : "var(--color-muted)" }}
                      >
                        Sign in
                      </Link>
                    )}
                  </div>

                  {/* Cart */}
                  <button
                    onClick={toggleCart}
                    className="relative p-2 rounded-xl transition-colors hover:bg-black/5"
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

                  {/* Mobile hamburger */}
                  <button
                    className="md:hidden p-2 rounded-xl transition-colors hover:bg-black/5"
                    style={{ color: invertNav ? "rgba(245,240,232,0.85)" : "var(--color-foreground)" }}
                    onClick={() => setMobileOpen((v) => !v)}
                    aria-label={mobileOpen ? "Close menu" : "Open menu"}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {mobileOpen ? (
                        <motion.span
                          key="close"
                          initial={{ rotate: -45, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: 45, opacity: 0 }}
                          transition={{ duration: 0.18 }}
                          style={{ display: "flex" }}
                        >
                          <X size={19} />
                        </motion.span>
                      ) : (
                        <motion.span
                          key="open"
                          initial={{ rotate: 45, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: -45, opacity: 0 }}
                          transition={{ duration: 0.18 }}
                          style={{ display: "flex" }}
                        >
                          <Menu size={19} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.header>
      </div>

      {/* ── Mobile fullscreen overlay ───────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed inset-0 z-[45] flex flex-col md:hidden"
            style={{ background: "var(--color-background)" }}
          >
            {/* Matches nav bar height so content starts below it */}
            <div className="h-14 flex-shrink-0" />

            <div className="flex flex-col flex-1 min-h-0 overflow-y-auto">
              {/* Search bar */}
              <div className="px-5 pt-5 pb-2">
                <div
                  className="flex items-center gap-2.5 px-4 py-3 rounded-2xl"
                  style={{ background: "rgba(0,0,0,0.05)" }}
                >
                  <Search size={14} style={{ color: "var(--color-muted)", flexShrink: 0 }} />
                  <input
                    type="text"
                    placeholder="Search products, pages..."
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
                <div className="flex-1 px-5 pt-3 pb-5">
                  {filterItems(mobileSearch).length === 0 ? (
                    <p className="text-sm py-8 text-center" style={{ color: "var(--color-muted)" }}>
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
                        className="w-full flex flex-col items-start py-3 border-b last:border-0 text-left"
                        style={{ borderColor: "rgba(0,0,0,0.06)" }}
                      >
                        <span className="text-sm font-medium" style={{ color: "var(--color-foreground)" }}>
                          {item.title}
                        </span>
                        <span className="text-xs mt-0.5" style={{ color: "var(--color-muted)" }}>
                          {item.description}
                        </span>
                      </button>
                    ))
                  )}
                </div>
              ) : (
                <nav className="flex-1 px-5 pt-3">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.045 + 0.06, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        href={link.href}
                        className="flex items-center justify-between py-[15px] border-b transition-opacity hover:opacity-50"
                        style={{
                          color: pathname === link.href ? "var(--color-accent)" : "var(--color-foreground)",
                          borderColor: "rgba(0,0,0,0.06)",
                        }}
                      >
                        <span className="text-[22px] font-medium tracking-tight leading-none">
                          {link.label}
                        </span>
                        {pathname === link.href && (
                          <span
                            className="w-[6px] h-[6px] rounded-full flex-shrink-0"
                            style={{ background: "var(--color-accent)" }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              )}

              {/* Auth section — pinned to bottom */}
              <motion.div
                className="px-5 py-6 mt-auto"
                style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                {authUser ? (
                  <div className="flex items-center justify-between">
                    <Link href="/account/orders" className="flex items-center gap-3 min-w-0">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(0,0,0,0.07)" }}
                      >
                        <User size={15} style={{ color: "var(--color-foreground)" }} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium leading-tight" style={{ color: "var(--color-foreground)" }}>
                          My Orders
                        </p>
                        <p className="text-xs truncate mt-0.5" style={{ color: "var(--color-muted)" }}>
                          {authUser.email}
                        </p>
                      </div>
                    </Link>
                    <button
                      onClick={async () => {
                        const { createSupabaseBrowserClient } = await import("@/lib/supabase-browser");
                        await createSupabaseBrowserClient().auth.signOut();
                        router.refresh();
                      }}
                      className="ml-3 flex-shrink-0 text-xs px-3 py-1.5 rounded-xl transition-colors hover:bg-black/5"
                      style={{ color: "var(--color-muted)" }}
                    >
                      Sign out
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/account/login"
                    className="flex items-center justify-between w-full px-4 py-3.5 rounded-2xl transition-colors active:bg-black/10"
                    style={{ background: "rgba(0,0,0,0.04)" }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(0,0,0,0.07)" }}
                      >
                        <User size={15} style={{ color: "var(--color-foreground)" }} />
                      </div>
                      <div>
                        <p className="text-sm font-medium leading-tight" style={{ color: "var(--color-foreground)" }}>
                          Sign in
                        </p>
                        <p className="text-xs mt-0.5" style={{ color: "var(--color-muted)" }}>
                          Access your orders & account
                        </p>
                      </div>
                    </div>
                    <ArrowRight size={15} style={{ color: "var(--color-muted)", flexShrink: 0 }} />
                  </Link>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer />
    </>
  );
}
