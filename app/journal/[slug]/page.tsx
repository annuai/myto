import { notFound } from "next/navigation";
import Link from "next/link";
import { getArticleBySlug, articles } from "@/lib/journal";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
  };
}

const categoryColors: Record<string, string> = {
  Engineering: "var(--color-card-olive)",
  Design: "var(--color-card-cream)",
  Riding: "var(--color-card-clay)",
  Manufacturing: "var(--color-card-warmgrey)",
  Research: "var(--color-card-sand)",
  Craft: "var(--color-card-stone)",
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const articleBodies: Record<string, { paragraphs: string[]; pullQuote: string }> = {
  "designing-trail-beam-housing": {
    paragraphs: [
      "The brief for the Trail Beam started with a single sentence: design a lamp housing that doesn't make things worse at speed. That sounds like a low bar. It isn't. Most auxiliary lamp shapes create turbulent wake that oscillates at certain speeds, inducing micro-vibrations that transfer directly to the handlebar. Riders describe this as a buzzing or numbness in their hands that they can't quite diagnose. We traced it to lamp housing geometry.",
      "We ran the first CFD simulation on the stock round lamp shape that appears on almost every auxiliary lamp on the market. The results were predictable — a messy turbulent wake extending well behind the lamp at 100km/h. The drag coefficient was higher than it needed to be, and the oscillation frequency sat uncomfortably close to the natural frequency of most handlebar setups.",
      "From there, we iterated through eleven housing shapes, running each through the same CFD parameters: 80km/h, 100km/h, 120km/h. We were looking for laminar flow separation at the trailing edge and a drag coefficient below our target threshold. The seventh shape was the first to hit both criteria simultaneously. We then spent three more iterations optimising the mounting lug geometry so the bracket attachment point didn't reintroduce turbulence.",
    ],
    pullQuote:
      "The shape of a lamp housing has as much to do with how it performs as the LED inside it. We spent longer on aerodynamics than on the lighting specification.",
    },
  "waxed-canvas-sourcing": {
    paragraphs: [
      "We knew we wanted waxed canvas for the Trail Kit tool roll before we knew anything else about it. The material ages in a way that no synthetic can replicate — it develops a patina that tells the story of where it's been. Creases from being packed under a seat in Ladakh look different from creases from being lashed to a pannier frame on a coastal route. That's a feature, not a fault.",
      "Finding the right fabric was harder than expected. We tested eleven waxed canvas fabrics from seven suppliers. The criteria were specific: a minimum wax weight of 8oz, consistent coating penetration across the weave, thread count above 120, and a hand feel that doesn't transfer wax to tools or hands at operating temperatures between -5°C and 55°C.",
      "Three fabrics failed the heat test — the wax became tacky above 40°C and transferred to the tools stored inside. Four failed the cold test — below 0°C, the canvas became stiff enough to crack along fold lines. The remaining four were tested for abrasion resistance and waterproofing after fifty wash-and-reproofing cycles. Only one fabric held its waterproofing consistently across all test conditions. That's the one in the Trail Kit.",
    ],
    pullQuote:
      "A material that fails after two years isn't cheaper than one that lasts ten. It's more expensive, and it's in a landfill.",
  },
  "navigation-without-phone": {
    paragraphs: [
      "Over 40,000km of long-distance riding with a phone as primary navigation, we documented every failure. Not anecdotally — we kept a log. Heat management failures above 40°C ambient: 23 incidents. Screen unreadable in direct sun without shade: daily occurrence. Notification interruptions during navigation: too frequent to count. Camera OIS failure from sustained vibration: two phones.",
      "The phone is the wrong device for motorcycle navigation for reasons that aren't obvious until you've experienced them on a long trip. The most fundamental issue is that phones are designed to run multiple tasks simultaneously, and navigation competes with every other process on the device for thermal headroom. On a hot day, in direct sun, mounted to a vibrating handlebar, a phone is working harder than it was designed to work.",
      "The myto navi started from that failure log. We didn't set out to build a navigation device — we set out to solve eleven documented problems. The device that emerged from that process happens to be a dedicated navigation unit. Single-purpose by necessity, not by philosophy. Everything in the specification traces back to a line in that failure log.",
    ],
    pullQuote:
      "The phone in your pocket is a remarkable general-purpose computer. That's exactly why it's the wrong tool for one specific job.",
  },
  "spiti-circuit-dispatch": {
    paragraphs: [
      "We took four pre-production Trail Beam units into the Spiti Valley in October — deliberately late in the season, when temperatures drop to -8°C at the passes and the roads are deteriorating. The brief was to find out what we'd missed. The answer was: more than we thought, less than we feared.",
      "The most significant finding was connector corrosion. At altitude, the temperature differential between day and night creates condensation inside connector housings that we hadn't fully accounted for. Two of the four units showed early-stage oxidation on the positive terminals by day four. We redesigned the connector specification before returning — fully sealed IP67 push-to-lock connectors rather than the weather-resistant (but not waterproof) connectors in the pre-production units.",
      "The housing geometry held up precisely as the CFD had predicted. No oscillation, no buffeting complaints, and the beam pattern performed better than expected on the narrow, unlit roads above 4,000m where moonless nights are genuinely dark. The vibration-isolated mounting performed perfectly over eight days of rock-strewn high-altitude roads.",
    ],
    pullQuote:
      "Pre-production testing in controlled conditions tells you what you designed. Testing in the field tells you what you missed.",
  },
  "designing-for-repairability": {
    paragraphs: [
      "Before we start designing any product, we ask a single question: can a rider repair this on the road with tools they already carry? If the answer is no, we redesign until it is. This isn't a marketing stance — it's a design constraint that improves the product in ways that have nothing to do with repairability.",
      "Designing for repairability forces modularity. A lamp housing that can be opened without specialist tools to replace a gasket must have a logical, accessible sealing interface. That same interface makes the assembly easier to quality-check at production. It makes warranty assessment faster. It makes the product easier to understand. Repairability isn't a separate design goal — it's a forcing function for good engineering.",
      "The Trail Beam can be fully disassembled with a 3mm Allen key and a Phillips PH2 — tools that live in the Trail Kit. The gasket, lens, and LED module are all replaceable. We stock spares. The myto navi has a user-replaceable battery accessible through four M3 screws. The Trail Kit tool roll uses a standard brass press-stud closure that can be replaced at any saddler.",
    ],
    pullQuote:
      "A product that can be repaired is a product that respects the rider's time, money, and the material that went into making it.",
  },
  "small-batch-manufacturing-india": {
    paragraphs: [
      "Small-batch manufacturing at high quality is genuinely difficult in India, not because the capability doesn't exist but because the incentive structure doesn't favour it. Most precision manufacturing capacity is configured for export runs of 10,000+ units. A 500-unit run with tight tolerances and specific material certifications is an inconvenient outlier.",
      "We spoke to forty-seven manufacturers in the first six months. The conversations followed a predictable pattern: enthusiasm at the brief, then a specification review, then a quiet suggestion that certain tolerances could be 'loosened a little' without affecting function. That suggestion, in our experience, means the manufacturer already knows they can't hold the spec we've asked for.",
      "The manufacturers we work with now were found through a different path: referrals from other small-batch designers who had done the work of qualification before us. They're not always the cheapest option. They hold the tolerances we specify on the first article without negotiation. That reliability is worth more than the per-unit cost difference — because a batch that ships with out-of-spec parts costs more in returns and reputational damage than the price difference ever saves.",
    ],
    pullQuote:
      "A supplier who asks you to loosen a tolerance before they've tried to meet it is telling you something important about how they operate.",
  },
};

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const body = articleBodies[slug] ?? {
    paragraphs: [
      "This piece is about the intersection of careful design, material honesty, and the reality of long-distance riding. When you're far from help, the equipment you rely on either earns your trust or reveals its compromises.",
      "We approach every problem the same way: document the failure first, understand it completely, then design a solution that addresses the root cause rather than the symptom. This takes longer. It produces better outcomes.",
      "The details in this article represent months of iteration, testing, and — sometimes — returning to the beginning with a better understanding of what the problem actually was. That process is what the journal exists to document.",
      "We believe that showing the work is as important as the work itself. A product that arrives without context is just an object. A product that comes with the story of its development is something you can trust.",
      "More to come as the product line grows and the accumulated knowledge of long-distance riding continues to inform what we build next.",
    ],
    pullQuote: "The best design process is one you'd be comfortable explaining in full to the person who will rely on the result.",
  };

  const relatedArticles = articles.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <div style={{ background: "var(--color-background)" }}>
      {/* Back link */}
      <div className="pt-24 pb-2">
        <div className="container-wide">
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
            style={{ color: "var(--color-muted)" }}
          >
            ← Journal
          </Link>
        </div>
      </div>

      {/* Article header */}
      <section className="py-10">
        <div className="container-wide">
          <div
            className="rounded-3xl p-10 md:p-14"
            style={{
              background: categoryColors[article.category] ?? "var(--color-card-stone)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span
                className="text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-lg"
                style={{ background: "rgba(0,0,0,0.07)", color: "var(--color-foreground)" }}
              >
                {article.category}
              </span>
            </div>
            <h1 className="display-lg mb-6 max-w-2xl">{article.title}</h1>
            <p className="text-base leading-relaxed mb-8 max-w-xl" style={{ color: "var(--color-muted)" }}>
              {article.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <span className="text-sm font-medium">{article.author}</span>
              <span className="text-sm" style={{ color: "var(--color-muted)" }}>
                {formatDate(article.date)}
              </span>
              <span className="text-sm" style={{ color: "var(--color-muted)" }}>
                {article.readTime}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Article body */}
      <article className="py-8">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto">
            <div className="prose-body">
              {body.paragraphs.slice(0, 3).map((p, i) => (
                <p key={i} className="mb-6 text-base leading-[1.8]">
                  {p}
                </p>
              ))}
            </div>

            {/* Pull quote */}
            <div
              className="rounded-3xl px-10 py-8 my-10"
              style={{ background: "var(--color-card-stone)", boxShadow: "var(--shadow-sm)" }}
            >
              <p
                className="text-xl md:text-2xl leading-relaxed italic"
                style={{ fontFamily: "var(--font-display)", color: "var(--color-foreground)" }}
              >
                &ldquo;{body.pullQuote}&rdquo;
              </p>
            </div>

            <div className="prose-body">
              {body.paragraphs.slice(3).map((p, i) => (
                <p key={i} className="mb-6 text-base leading-[1.8]">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* Related articles */}
      <section className="py-16">
        <div className="container-wide">
          <h2 className="display-sm mb-8">More from the journal</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {relatedArticles.map((a) => (
              <Link key={a.slug} href={`/journal/${a.slug}`} className="block group">
                <div
                  className="rounded-3xl p-7 h-full transition-all duration-300 group-hover:-translate-y-0.5"
                  style={{
                    background: categoryColors[a.category] ?? "var(--color-card-stone)",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  <span
                    className="text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-lg inline-block mb-4"
                    style={{ background: "rgba(0,0,0,0.07)", color: "var(--color-foreground)" }}
                  >
                    {a.category}
                  </span>
                  <h3 className="font-semibold text-base leading-snug mb-2">{a.title}</h3>
                  <p className="text-xs mt-2" style={{ color: "var(--color-muted)" }}>
                    {a.readTime}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
