"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Star, CheckCircle, ChevronDown } from "lucide-react";
import { ProductRender } from "@/components/ProductRender";
import { Footer } from "@/components/Footer";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/products";

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

const reviewsBySlug: Record<string, { name: string; stars: number; text: string; location: string }[]> = {
  "trail-beam": [
    { name: "Rohit M.", stars: 5, text: "Changed my night riding completely. The beam pattern is genuinely wide — not just forward throw. Installed in 75 minutes on my Tiger 800.", location: "Pune" },
    { name: "Karan S.", stars: 5, text: "Built quality is exceptional. The housing feels like it belongs on the bike, not like an afterthought. IP67 rating held through a full monsoon season.", location: "Mumbai" },
    { name: "Vikram T.", stars: 5, text: "I've had three other aux lamp setups over the years. This is the first one where the harness didn't give me problems. The relay wiring is done properly.", location: "Bangalore" },
  ],
  "trail-kit": [
    { name: "Priya R.", stars: 5, text: "The magnetic mount is incredibly strong. Did a full Spiti circuit with 70kg loaded on the bike and the tank bag didn't move a millimetre.", location: "Delhi" },
    { name: "Arjun K.", stars: 5, text: "The tool roll is exactly what I've been looking for. Proper sized pockets, proper material. The waxed canvas already has some character after two months.", location: "Hyderabad" },
    { name: "Meera N.", stars: 5, text: "Worth every rupee. Expands just enough for an overnight kit when I need it. The map window works with my Pixel 7 Pro perfectly.", location: "Chennai" },
  ],
  "myto-navi": [
    { name: "Siddharth V.", stars: 5, text: "Finally. A device that does one thing and does it properly. The display is the best I've seen on anything motorcycling-adjacent.", location: "Ahmedabad" },
    { name: "Aditya L.", stars: 5, text: "Rode 8 days without a signal connection. The offline maps are genuinely comprehensive. Didn't miss my phone once.", location: "Jaipur" },
    { name: "Neeraj P.", stars: 5, text: "The vibration isolation mount is worth the price of entry alone. My phone screen always had micro-blur on my old 390 Adventure. Nothing with the navi.", location: "Chandigarh" },
  ],
};

const faqsBySlug: Record<string, { q: string; a: string }[]> = {
  "trail-beam": [
    { q: "What bike categories is the Trail Beam compatible with?", a: "The Trail Beam is compatible with any 12V motorcycle system. The kit includes universal crash bar clamps and 16–22mm tube clamps. Specific brackets are available for BMW GS, Triumph Tiger, and Honda Africa Twin." },
    { q: "What's the difference between the white and yellow lens options?", a: "White (5,000K) provides maximum visibility in clear conditions. Selective yellow (3,000K) cuts through rain, fog, and dust more effectively — the wavelength scatters less in precipitation. We recommend yellow for riders who frequently ride in poor weather." },
    { q: "Can I fit the Trail Beam myself without an electrician?", a: "Yes. The harness uses a relay to protect your original wiring and includes a pre-wired inline fuse and handlebar toggle switch. The installation guide covers the full wiring process with photographs. Most riders complete the installation in 60–90 minutes." },
    { q: "What does IP67 mean in practice?", a: "IP67 means the lamp is dust-tight and can be submerged in water up to 1m for 30 minutes. In practical terms, it survives sustained rain, pressure washing, and water crossings." },
    { q: "How do I aim the lamps?", a: "The mounting bracket allows full adjustment before the locking bolt is tightened. We recommend aiming them slightly downward and outward on a flat road — the wide beam pattern does the rest." },
    { q: "Is the lens replaceable if it gets damaged?", a: "Yes. The polycarbonate lens is retained by four M3 screws and can be replaced with standard hand tools. We stock replacement lenses and gaskets." },
  ],
  "trail-kit": [
    { q: "Will the magnets damage my tank?", a: "The tank bag base has a foam-padded magnetic face that protects your paint. The N52 magnets are strong enough to hold securely but don't contact the paint directly. We recommend a microfibre protector pad (included) between the bag and tank for additional protection." },
    { q: "What's the maximum load for the magnetic mounting?", a: "We've tested the mount up to 6kg of load at sustained 130km/h. The tank bag is rated to 4kg for the 8L configuration and 5kg expanded. We recommend keeping the bag within rated capacity." },
    { q: "How do I care for the waxed canvas?", a: "Waxed canvas doesn't need regular cleaning — surface dirt can be wiped off with a damp cloth. If the canvas loses its water resistance over time, reproof it with a standard canvas wax (Fjallraven or similar). Avoid machine washing." },
    { q: "Does the tank bag work on fuel tanks with irregular shapes?", a: "The magnetic mounting works on any flat or gently curved steel tank surface. Tanks with sharp curves, plastic inserts over the magnets, or non-steel materials may not be compatible. Contact us with your bike model if unsure." },
    { q: "Can the tool roll be attached externally?", a: "Yes. The tool roll has PALS/MOLLE-compatible webbing on the back and can be mounted to any PALS system or lashed to external luggage with the included straps." },
    { q: "Is the tank bag rainproof without a cover?", a: "The 600D polyester outer with PU coating and YKK water-resistant zips handles sustained rain without a rain cover. The internal PU-coated lining provides an additional waterproofing layer." },
  ],
  "myto-navi": [
    { q: "How do I download maps?", a: "Connect the navi to Wi-Fi via the settings menu, navigate to Map Downloads, and select regions. India is pre-loaded. Additional regions (Nepal, Bhutan, Sri Lanka) are available as free downloads." },
    { q: "Does the navi work without GPS signal?", a: "The navi uses multi-constellation GPS (GPS + GLONASS) for maximum signal coverage. In areas with poor satellite visibility, it uses stored track data to maintain position. It does not require mobile data at any point." },
    { q: "What's the battery life with the display at maximum brightness?", a: "At maximum brightness (800 nits), battery life is approximately 9 hours. At 50% brightness, which is sufficient for most daytime conditions, battery life extends to 14+ hours. The navi can charge via USB-C while riding." },
    { q: "Can I import custom routes?", a: "Yes. The navi accepts GPX files via USB-C connection. Import custom routes through the desktop companion app (Windows/Mac) and they appear in the Route Library on the device." },
    { q: "Is the mount compatible with RAM Ball systems?", a: "The myto navi mount is compatible with RAM 1\" B-ball systems, giving access to the full RAM mounting ecosystem for different handlebar configurations and mounting positions." },
    { q: "What happens if the screen is damaged?", a: "The screen protector (pre-applied) absorbs most minor impacts. For screen replacement, contact us — it's a warranted component and we carry replacement units. The device can be sent in for screen service." },
  ],
};

const compatibilityBySlug: Record<string, { category: string; bikes: string[] }[]> = {
  "trail-beam": [
    { category: "Universal fitment", bikes: ["16–22mm tube clamps included", "Crash bar clamps 25mm / 32mm included", "Any 12V motorcycle system"] },
    { category: "BMW", bikes: ["R1250GS / Adventure", "F850GS / Adventure", "F750GS", "R1200GS (all years)"] },
    { category: "KTM", bikes: ["Adventure 390", "Adventure 790 / 890", "Adventure 1090 / 1290 Super Adventure"] },
    { category: "Royal Enfield", bikes: ["Himalayan 450", "Himalayan 411"] },
    { category: "Honda", bikes: ["Africa Twin CRF1100L / Adventure Sports", "CB500X"] },
    { category: "Triumph", bikes: ["Tiger 900 GT / Rally", "Tiger 1200 GT / Rally Pro", "Tiger Explorer 1200"] },
  ],
  "trail-kit": [
    { category: "Universal fitment", bikes: ["All steel fuel tanks (magnetic mount)", "PALS/MOLLE compatible systems", "Standard pannier and tail bag PALS webbing"] },
    { category: "Adventure bikes", bikes: ["All 600cc+ adventure motorcycles", "KTM Adventure range", "BMW GS range", "Royal Enfield Himalayan"] },
    { category: "Note", bikes: ["Non-steel or carbon fibre tanks are not compatible with magnetic mounting", "Tanks with large plastic covers over the magnetic area may reduce hold strength"] },
  ],
  "myto-navi": [
    { category: "Universal fitment", bikes: ["22mm (7/8\") handlebars — all manufacturers", "28.6mm (1-1/8\") handlebars — all manufacturers", "RAM 1\" B-ball compatible"] },
    { category: "Charging", bikes: ["All motorcycles with 12V USB-C socket", "12V socket (requires USB-C adapter, not included)", "Power banks for off-bike use"] },
  ],
};

interface ProductPageProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductPage({ product, relatedProducts }: ProductPageProps) {
  const { addItem } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openCompat, setOpenCompat] = useState<number | null>(null);

  const reviews = reviewsBySlug[product.slug] ?? [];
  const faqs = faqsBySlug[product.slug] ?? [];
  const compatibility = compatibilityBySlug[product.slug] ?? [];

  function handleAddToCart() {
    addItem(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  }

  const engineeringSteps = [
    { n: "01", title: "Problem documentation", description: "Every product starts with a recorded frustration from real riding." },
    { n: "02", title: "Research & benchmarking", description: "Understanding existing solutions and where they fail." },
    { n: "03", title: "Design iteration", description: "Sketching, CAD modelling, tolerance analysis." },
    { n: "04", title: "Physical prototyping", description: "3D-printed and machined prototypes for fit and function testing." },
    { n: "05", title: "Road testing", description: "Real-world validation over hundreds of kilometres in varied conditions." },
    { n: "06", title: "Production", description: "Only when testing reveals no meaningful improvement remaining." },
  ];

  return (
    <div style={{ background: "var(--color-background)" }}>
      {/* SECTION 1: Hero */}
      <section className="pt-16 min-h-screen flex items-center">
        <div className="container-wide py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--color-muted)" }}>
                {product.category}
              </p>
              <h1 className="display-lg mb-3">{product.name}</h1>
              <p className="text-base mb-6 leading-relaxed" style={{ color: "var(--color-muted)" }}>
                {product.tagline}
              </p>
              <p className="text-3xl font-bold mb-8">{formatPrice(product.price)}</p>

              {/* Trust chips */}
              <div className="flex flex-wrap gap-2 mb-8">
                {["Free shipping", "2-year warranty", "30-day returns"].map((chip) => (
                  <span
                    key={chip}
                    className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-xl"
                    style={{ background: "var(--color-card-cream)" }}
                  >
                    <CheckCircle size={12} style={{ color: "var(--color-accent)" }} />
                    {chip}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleAddToCart}
                  className="inline-flex items-center px-8 py-4 rounded-2xl text-sm font-bold transition-all hover:opacity-90 active:scale-[0.97]"
                  style={{ background: addedToCart ? "#2d6a4f" : "var(--color-accent)", color: "#fff" }}
                >
                  {addedToCart ? "Added to cart ✓" : "Add to cart"}
                </button>
                <button
                  className="inline-flex items-center px-6 py-4 rounded-2xl text-sm font-medium border transition-all hover:bg-black/5"
                  style={{ borderColor: "rgba(0,0,0,0.12)", color: "var(--color-muted)" }}
                >
                  Add to wishlist
                </button>
              </div>
            </motion.div>

            {/* Right: Product render */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="flex justify-center"
            >
              <div
                className="w-full rounded-3xl flex items-center justify-center py-16"
                style={{ background: "var(--color-card-cream)", boxShadow: "var(--shadow-md)" }}
              >
                <ProductRender name={product.name} size="xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Product overview */}
      <section className="py-12">
        <div className="container-wide">
          <FadeUp>
            <div
              className="rounded-3xl p-10 md:p-14"
              style={{ background: "var(--color-card-dark)" }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: "rgba(245,240,232,0.35)" }}>
                Overview
              </p>
              <p className="display-sm max-w-2xl leading-relaxed" style={{ color: "#f5f0e8" }}>
                {product.longDescription}
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* SECTION 3: Key features */}
      <section className="py-12">
        <div className="container-wide">
          <FadeUp className="mb-10">
            <h2 className="display-sm">Key features</h2>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {product.features.map((feature, i) => (
              <FadeUp key={feature.title} delay={i * 0.06}>
                <div
                  className="rounded-3xl p-7 h-full"
                  style={{
                    background: i % 3 === 0
                      ? "var(--color-card-cream)"
                      : i % 3 === 1
                      ? "var(--color-card-stone)"
                      : "var(--color-card-olive)",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  <span
                    className="text-xs font-mono font-bold block mb-3"
                    style={{ color: "var(--color-accent)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-semibold text-base mb-2">{feature.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
                    {feature.description}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: Engineering story */}
      <section className="py-12">
        <div className="container-wide">
          <FadeUp className="mb-10">
            <h2 className="display-sm">How it was made</h2>
          </FadeUp>
          <div
            className="rounded-3xl p-8 md:p-12"
            style={{ background: "var(--color-card-stone)", boxShadow: "var(--shadow-sm)" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
              {engineeringSteps.map((step, i) => (
                <FadeUp key={step.n} delay={i * 0.06}>
                  <div
                    className="p-5 border-b border-r last:border-r-0 md:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0"
                    style={{ borderColor: "rgba(0,0,0,0.08)" }}
                  >
                    <span className="text-xs font-mono font-bold block mb-2" style={{ color: "var(--color-accent)" }}>
                      {step.n}
                    </span>
                    <h3 className="font-semibold text-sm mb-1">{step.title}</h3>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--color-muted)" }}>
                      {step.description}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Specs */}
      <section className="py-12">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <FadeUp>
              <h2 className="display-sm mb-6">Specifications</h2>
              <div
                className="rounded-3xl overflow-hidden"
                style={{ background: "var(--color-card-cream)", boxShadow: "var(--shadow-sm)" }}
              >
                {Object.entries(product.specs).map(([key, value], i) => (
                  <div
                    key={key}
                    className="flex justify-between gap-6 px-6 py-4 border-b last:border-0"
                    style={{ borderColor: "rgba(0,0,0,0.06)" }}
                  >
                    <span className="text-sm" style={{ color: "var(--color-muted)" }}>{key}</span>
                    <span className="text-sm font-medium text-right">{value}</span>
                  </div>
                ))}
              </div>
            </FadeUp>

            <div>
              {/* Materials */}
              <FadeUp delay={0.05}>
                <h2 className="display-sm mb-4">Materials</h2>
                <div
                  className="rounded-3xl px-6 py-5 mb-6"
                  style={{ background: "var(--color-card-olive)", boxShadow: "var(--shadow-sm)" }}
                >
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
                    {product.materials}
                  </p>
                </div>
              </FadeUp>

              {/* Ecosystem */}
              <FadeUp delay={0.1}>
                <h2 className="display-sm mb-4">Ecosystem note</h2>
                <div
                  className="rounded-3xl px-6 py-5 mb-6"
                  style={{ background: "var(--color-card-clay)", boxShadow: "var(--shadow-sm)" }}
                >
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
                    {product.ecosystemNote}
                  </p>
                </div>
              </FadeUp>

              {/* Install time */}
              <FadeUp delay={0.15}>
                <div
                  className="rounded-3xl px-6 py-5"
                  style={{ background: "var(--color-card-stone)", boxShadow: "var(--shadow-sm)" }}
                >
                  <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--color-muted)" }}>
                    Installation time
                  </p>
                  <p className="font-semibold text-lg">{product.installTime}</p>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Ecosystem / Related */}
      {relatedProducts.length > 0 && (
        <section className="py-12">
          <div className="container-wide">
            <FadeUp className="mb-8">
              <h2 className="display-sm">Works with</h2>
            </FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {relatedProducts.map((rp, i) => (
                <FadeUp key={rp.id} delay={i * 0.07}>
                  <Link href={`/products/${rp.slug}`} className="block group">
                    <div
                      className="rounded-3xl p-8 flex items-center gap-6 transition-all duration-300 group-hover:-translate-y-0.5"
                      style={{
                        background: i === 0 ? "var(--color-card-cream)" : "var(--color-card-stone)",
                        boxShadow: "var(--shadow-sm)",
                      }}
                    >
                      <ProductRender name={rp.name} size="sm" />
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--color-muted)" }}>
                          {rp.category}
                        </p>
                        <h3 className="font-semibold text-base mb-1">{rp.name}</h3>
                        <p className="text-sm" style={{ color: "var(--color-muted)" }}>{rp.tagline}</p>
                        <p className="text-sm font-semibold mt-2 transition-colors group-hover:text-[var(--color-accent)]">
                          {formatPrice(rp.price)} →
                        </p>
                      </div>
                    </div>
                  </Link>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 7: What's in the box */}
      <section className="py-12">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <FadeUp>
              <h2 className="display-sm mb-6">What&apos;s in the box</h2>
              <div
                className="rounded-3xl overflow-hidden"
                style={{ background: "var(--color-card-stone)", boxShadow: "var(--shadow-sm)" }}
              >
                {product.whatsInBox.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 px-6 py-4 border-b last:border-0"
                    style={{ borderColor: "rgba(0,0,0,0.06)" }}
                  >
                    <span className="text-xs font-mono font-bold flex-shrink-0 mt-0.5" style={{ color: "var(--color-accent)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </FadeUp>
            <FadeUp delay={0.1} className="flex justify-center">
              <div
                className="rounded-3xl p-12 flex items-center justify-center w-full"
                style={{ background: "var(--color-card-cream)" }}
              >
                <ProductRender name={product.name} size="md" />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* SECTION 8: Compatibility */}
      {compatibility.length > 0 && (
        <section className="py-12">
          <div className="container-wide">
            <FadeUp className="mb-8">
              <h2 className="display-sm">Compatibility</h2>
            </FadeUp>
            <div className="space-y-2">
              {compatibility.map((group, i) => (
                <FadeUp key={group.category} delay={i * 0.05}>
                  <div
                    className="rounded-2xl overflow-hidden"
                    style={{ background: "var(--color-card-cream)" }}
                  >
                    <button
                      className="w-full flex items-center justify-between px-6 py-4 text-left"
                      onClick={() => setOpenCompat(openCompat === i ? null : i)}
                    >
                      <span className="text-sm font-semibold">{group.category}</span>
                      <ChevronDown
                        size={16}
                        className="transition-transform duration-200"
                        style={{
                          transform: openCompat === i ? "rotate(180deg)" : "rotate(0deg)",
                          color: "var(--color-muted)",
                        }}
                      />
                    </button>
                    {openCompat === i && (
                      <div className="px-6 pb-4">
                        <ul className="space-y-1.5">
                          {group.bikes.map((bike) => (
                            <li key={bike} className="text-sm" style={{ color: "var(--color-muted)" }}>
                              • {bike}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 9: Reviews */}
      {reviews.length > 0 && (
        <section className="py-12">
          <div className="container-wide">
            <FadeUp className="mb-8">
              <h2 className="display-sm">Reviews</h2>
            </FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {reviews.map((review, i) => (
                <FadeUp key={review.name} delay={i * 0.07}>
                  <div
                    className="rounded-3xl p-7 h-full"
                    style={{ background: "var(--color-card-stone)", boxShadow: "var(--shadow-sm)" }}
                  >
                    <div className="flex gap-0.5 mb-4">
                      {Array.from({ length: review.stars }).map((_, j) => (
                        <Star key={j} size={14} fill="var(--color-accent)" color="var(--color-accent)" />
                      ))}
                    </div>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--color-muted)" }}>
                      &ldquo;{review.text}&rdquo;
                    </p>
                    <div>
                      <p className="text-sm font-semibold">{review.name}</p>
                      <p className="text-xs" style={{ color: "var(--color-muted)" }}>{review.location}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 10: FAQ */}
      {faqs.length > 0 && (
        <section className="py-12">
          <div className="container-wide">
            <FadeUp className="mb-8">
              <h2 className="display-sm">Frequently asked questions</h2>
            </FadeUp>
            <div className="space-y-2 max-w-2xl">
              {faqs.map((faq, i) => (
                <FadeUp key={i} delay={i * 0.04}>
                  <div
                    className="rounded-2xl overflow-hidden"
                    style={{ background: "var(--color-card-cream)" }}
                  >
                    <button
                      className="w-full flex items-center justify-between px-6 py-4 text-left"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    >
                      <span className="text-sm font-medium pr-4">{faq.q}</span>
                      <ChevronDown
                        size={16}
                        className="flex-shrink-0 transition-transform duration-200"
                        style={{
                          transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)",
                          color: "var(--color-muted)",
                        }}
                      />
                    </button>
                    {openFaq === i && (
                      <div className="px-6 pb-4">
                        <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
                          {faq.a}
                        </p>
                      </div>
                    )}
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 11: Final CTA */}
      <section className="py-12 pb-0">
        <div className="container-wide">
          <FadeUp>
            <div
              className="rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
              style={{ background: "var(--color-card-dark)" }}
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "rgba(245,240,232,0.35)" }}>
                  {product.name}
                </p>
                <h2 className="display-md mb-2" style={{ color: "#f5f0e8" }}>
                  Ready for the road?
                </h2>
                <p className="text-2xl font-bold" style={{ color: "rgba(245,240,232,0.7)" }}>
                  {formatPrice(product.price)}
                </p>
              </div>
              <button
                onClick={handleAddToCart}
                className="inline-flex items-center px-8 py-4 rounded-2xl text-sm font-bold transition-all hover:opacity-90 active:scale-[0.97] flex-shrink-0"
                style={{ background: addedToCart ? "#2d6a4f" : "var(--color-accent)", color: "#fff" }}
              >
                {addedToCart ? "Added to cart ✓" : "Add to cart"}
              </button>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
