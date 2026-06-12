"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ChevronDown, Settings, Wrench, Shield, Package, RotateCcw, MessageSquare } from "lucide-react";
import { Footer } from "@/components/Footer";

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
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

const quickAccessCards = [
  { icon: <Settings size={22} />, title: "Setup guides", description: "Step-by-step installation for every product." },
  { icon: <Wrench size={22} />, title: "Troubleshooting", description: "Common issues and how to resolve them." },
  { icon: <Shield size={22} />, title: "Warranty", description: "2-year warranty on all products. What's covered." },
  { icon: <Package size={22} />, title: "Spare parts", description: "Replacement gaskets, lenses, and hardware." },
  { icon: <RotateCcw size={22} />, title: "Returns", description: "30-day no-questions return policy." },
  { icon: <MessageSquare size={22} />, title: "Contact", description: "Reach us directly. Response within 24 hours." },
];

const productHubs = [
  {
    name: "Trail Beam",
    slug: "trail-beam",
    description: "Installation guides, beam pattern FAQ, wiring diagrams, and compatibility information.",
    links: ["Installation guide", "Wiring FAQ", "Compatibility list"],
  },
  {
    name: "Trail Kit",
    slug: "trail-kit",
    description: "Tank bag setup, magnet care, canvas reproofing, and strapping system guidance.",
    links: ["Bag setup", "Canvas care", "Strapping system"],
  },
  {
    name: "Navi",
    slug: "navi",
    description: "First setup, offline map downloads, battery replacement, and mount adjustment.",
    links: ["First setup", "Map downloads", "Mount adjustment"],
  },
];

type FAQItem = { q: string; a: string };
const faqs: Record<string, FAQItem[]> = {
  Orders: [
    { q: "How long does delivery take?", a: "We ship within 2 business days of receiving your order. Delivery typically takes 3–7 business days across India. We ship via premium courier with tracking." },
    { q: "Do you ship internationally?", a: "Not yet. We're working on international shipping and will announce when it's available. Sign up for the newsletter to be notified." },
    { q: "Can I change or cancel my order?", a: "You can change or cancel your order within 24 hours of placing it by emailing clubmyto@gmail.com with your order number." },
  ],
  Returns: [
    { q: "What is the return policy?", a: "We accept returns within 30 days of delivery. Products must be unused and in original packaging. Contact us to initiate a return and we'll arrange collection." },
    { q: "How long does a refund take?", a: "Once we receive and inspect the returned item, refunds are processed within 3–5 business days to the original payment method." },
    { q: "What if the product is faulty?", a: "If you receive a faulty product, contact us immediately. We'll arrange a free replacement or refund and cover all return shipping costs." },
  ],
  Installation: [
    { q: "How difficult is the Trail Beam installation?", a: "The Trail Beam installs in 60–90 minutes with basic hand tools. No electrical expertise required — the included harness uses a relay and pre-wired fuse. The installation guide covers the full process with photographs." },
    { q: "Do I need to modify my bike for the Trail Kit?", a: "No. The Trail Kit uses magnetic mounting for the tank bag — no drilling or modification required. The tool roll attaches to PALS webbing or can be packed inside most tail bags." },
    { q: "What tools do I need for Navi installation?", a: "Only the included Allen key. The mount clamps to your handlebar with two bolts and the navi snaps onto the mount. The full process takes about 20 minutes." },
  ],
  Warranty: [
    { q: "What does the warranty cover?", a: "The 2-year warranty covers manufacturing defects, material failures, and workmanship issues under normal use. It doesn't cover damage from accidents, incorrect installation, or modifications." },
    { q: "How do I make a warranty claim?", a: "Email clubmyto@gmail.com with your order number, a description of the issue, and photographs. We aim to respond within 24 hours and resolve all warranty claims within 7 business days." },
    { q: "Does the warranty cover the Navi battery?", a: "The battery is covered against manufacturing defects for 2 years. Normal capacity degradation over time is not covered, but the battery is user-replaceable and we stock replacements." },
  ],
};

function Accordion({ group, items }: { group: string; items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div>
      <h3 className="font-semibold text-base mb-3" style={{ fontFamily: "var(--font-display)" }}>
        {group}
      </h3>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div
            key={i}
            className="rounded-2xl overflow-hidden"
            style={{ background: "var(--color-card-stone)" }}
          >
            <button
              className="w-full flex items-center justify-between px-6 py-4 text-left"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className="text-sm font-medium pr-4">{item.q}</span>
              <ChevronDown
                size={16}
                className="flex-shrink-0 transition-transform duration-200"
                style={{
                  transform: open === i ? "rotate(180deg)" : "rotate(0deg)",
                  color: "var(--color-muted)",
                }}
              />
            </button>
            {open === i && (
              <div className="px-6 pb-4">
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
                  {item.a}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const allFAQs = Object.entries(faqs).flatMap(([group, items]) =>
    items.map((item) => ({ ...item, group }))
  );

  const searchResults = searchQuery.trim()
    ? allFAQs.filter(
        (item) =>
          item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.a.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.group.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const showResults = searchQuery.trim().length > 0;

  return (
    <div style={{ background: "var(--color-background)" }}>
      {/* Header */}
      <section className="pt-32 pb-10">
        <div className="container-wide">
          <FadeUp className="text-center max-w-xl mx-auto">
            <h1 className="display-lg mb-4">How can we help?</h1>
            <p className="text-base mb-8" style={{ color: "var(--color-muted)" }}>
              Product support, installation help, warranty, and contact.
            </p>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for help..."
                className="w-full px-6 py-4 rounded-2xl text-sm outline-none"
                style={{
                  background: "var(--color-card-cream)",
                  border: "1px solid rgba(0,0,0,0.08)",
                  color: "var(--color-foreground)",
                }}
              />
              {showResults && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs px-2 py-1 rounded-lg"
                  style={{ color: "var(--color-muted)" }}
                >
                  Clear
                </button>
              )}
            </div>
          </FadeUp>

          {/* Search results */}
          {showResults && (
            <div className="max-w-2xl mx-auto mt-6">
              {searchResults.length > 0 ? (
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--color-muted)" }}>
                    {searchResults.length} result{searchResults.length !== 1 ? "s" : ""}
                  </p>
                  {searchResults.map((item, i) => (
                    <div
                      key={i}
                      className="rounded-2xl p-5"
                      style={{ background: "var(--color-card-stone)" }}
                    >
                      <p className="text-xs font-semibold mb-1" style={{ color: "var(--color-accent)" }}>
                        {item.group}
                      </p>
                      <p className="text-sm font-medium mb-2">{item.q}</p>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
                        {item.a}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-sm" style={{ color: "var(--color-muted)" }}>
                    No results for &ldquo;{searchQuery}&rdquo;. Try different keywords or{" "}
                    <a href="mailto:clubmyto@gmail.com" className="underline" style={{ color: "var(--color-accent)" }}>
                      email us directly
                    </a>
                    .
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Quick access */}
      <section className="py-12">
        <div className="container-wide">
          <FadeUp className="mb-8">
            <h2 className="display-sm">Quick access</h2>
          </FadeUp>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {quickAccessCards.map((card, i) => (
              <FadeUp key={card.title} delay={i * 0.06}>
                <div
                  className="rounded-3xl p-6 h-full cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: i % 2 === 0 ? "var(--color-card-cream)" : "var(--color-card-stone)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: "rgba(0,0,0,0.06)" }}
                  >
                    {card.icon}
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{card.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--color-muted)" }}>
                    {card.description}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Product hubs */}
      <section className="py-12">
        <div className="container-wide">
          <FadeUp className="mb-8">
            <h2 className="display-sm">Product support hubs</h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {productHubs.map((hub, i) => (
              <FadeUp key={hub.slug} delay={i * 0.07}>
                <div
                  className="rounded-3xl p-8 h-full"
                  style={{ background: "var(--color-card-cream)" }}
                >
                  <h3 className="display-sm mb-3">{hub.name}</h3>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--color-muted)" }}>
                    {hub.description}
                  </p>
                  <div className="space-y-2">
                    {hub.links.map((link) => (
                      <div key={link} className="flex items-center gap-2">
                        <span className="text-xs font-medium" style={{ color: "var(--color-accent)" }}>→</span>
                        <span className="text-sm" style={{ color: "var(--color-foreground)" }}>{link}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <Link
                      href={`/products/${hub.slug}`}
                      className="text-sm font-medium transition-opacity hover:opacity-70"
                      style={{ color: "var(--color-muted)" }}
                    >
                      Product page →
                    </Link>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12">
        <div className="container-wide">
          <FadeUp className="mb-10">
            <h2 className="display-sm">Frequently asked questions</h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {Object.entries(faqs).map(([group, items], i) => (
              <FadeUp key={group} delay={i * 0.06}>
                <Accordion group={group} items={items} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Contact card */}
      <section className="py-12">
        <div className="container-wide">
          <FadeUp>
            <div
              className="rounded-3xl p-10 md:p-14"
              style={{ background: "var(--color-card-dark)" }}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "rgba(245,240,232,0.4)" }}>
                    Direct contact
                  </p>
                  <h2 className="display-sm mb-3" style={{ color: "#f5f0e8" }}>
                    Still need help?
                  </h2>
                  <p className="text-sm mb-2" style={{ color: "rgba(245,240,232,0.55)" }}>
                    Email us at{" "}
                    <a
                      href="mailto:clubmyto@gmail.com"
                      className="font-medium transition-opacity hover:opacity-75"
                      style={{ color: "var(--color-accent)" }}
                    >
                      clubmyto@gmail.com
                    </a>
                  </p>
                  <p className="text-xs" style={{ color: "rgba(245,240,232,0.35)" }}>
                    We respond to every email within 24 hours on business days.
                  </p>
                </div>
                <a
                  href="mailto:clubmyto@gmail.com"
                  className="inline-flex items-center px-7 py-3.5 rounded-2xl text-sm font-semibold transition-all hover:opacity-90 flex-shrink-0"
                  style={{ background: "var(--color-accent)", color: "#fff" }}
                >
                  Send an email
                </a>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
