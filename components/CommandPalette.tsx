"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { searchItems as items, filterItems } from "@/lib/search-items";
import type { SearchItem as Item } from "@/lib/search-items";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const filtered = filterItems(query);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  }, []);

  const navigate = useCallback(
    (item: Item) => {
      close();
      if (item.href.startsWith("mailto:")) {
        window.location.href = item.href;
      } else {
        router.push(item.href);
      }
    },
    [close, router]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setActiveIndex(0);
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && filtered[activeIndex]) {
      navigate(filtered[activeIndex]);
    }
  };

  const categories = [...new Set(filtered.map((i) => i.category))];

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-[100]"
              style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
              onClick={close}
            />

            {/* Palette */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -8 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="fixed left-1/2 top-[18%] z-[101] w-full max-w-lg -translate-x-1/2 rounded-3xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.98)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 24px 64px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08)",
              }}
            >
              {/* Input row */}
              <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
                <Search size={16} style={{ color: "var(--color-muted)", flexShrink: 0 }} />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Search pages, products..."
                  className="flex-1 text-sm outline-none bg-transparent"
                  style={{ color: "var(--color-foreground)" }}
                />
                {query && (
                  <button onClick={() => setQuery("")} style={{ color: "var(--color-muted)" }}>
                    <X size={14} />
                  </button>
                )}
                <kbd
                  className="hidden md:flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-md"
                  style={{ background: "rgba(0,0,0,0.06)", color: "var(--color-muted)" }}
                >
                  esc
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-80 overflow-y-auto py-2">
                {filtered.length === 0 ? (
                  <p className="text-sm text-center py-8" style={{ color: "var(--color-muted)" }}>
                    No results for &ldquo;{query}&rdquo;
                  </p>
                ) : (
                  categories.map((cat) => (
                    <div key={cat}>
                      <p
                        className="text-[10px] font-semibold uppercase tracking-widest px-5 pt-3 pb-1"
                        style={{ color: "var(--color-muted)" }}
                      >
                        {cat}
                      </p>
                      {filtered
                        .filter((i) => i.category === cat)
                        .map((item) => {
                          const idx = filtered.indexOf(item);
                          return (
                            <button
                              key={item.href}
                              onClick={() => navigate(item)}
                              onMouseEnter={() => setActiveIndex(idx)}
                              className="w-full flex items-center gap-3 px-5 py-2.5 text-left transition-colors"
                              style={{
                                background: idx === activeIndex ? "rgba(0,0,0,0.04)" : "transparent",
                              }}
                            >
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{item.title}</p>
                                {item.description && (
                                  <p className="text-xs truncate" style={{ color: "var(--color-muted)" }}>
                                    {item.description}
                                  </p>
                                )}
                              </div>
                              {idx === activeIndex && (
                                <span className="hidden md:inline text-[10px] px-1.5 py-0.5 rounded" style={{ background: "rgba(0,0,0,0.06)", color: "var(--color-muted)" }}>
                                  ↵
                                </span>
                              )}
                            </button>
                          );
                        })}
                    </div>
                  ))
                )}
              </div>

              {/* Footer hint — desktop only */}
              <div
                className="hidden md:flex items-center gap-4 px-5 py-3 border-t"
                style={{ borderColor: "rgba(0,0,0,0.07)" }}
              >
                <span className="text-[10px]" style={{ color: "var(--color-muted)" }}>
                  ↑↓ navigate · ↵ open · esc close
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
