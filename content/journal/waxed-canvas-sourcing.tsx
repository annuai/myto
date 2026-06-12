export const meta = {
  slug: "waxed-canvas-sourcing",
  title: "Finding the Right Canvas: A Material Sourcing Journey",
  excerpt:
    "We tested eleven waxed canvas fabrics before specifying the one in the Trail Kit tool roll. What we were looking for — and why most fell short.",
  date: "2025-10-08",
  category: "Craft",
  author: "Annuai",
};

export const paragraphs = [
  "We knew we wanted waxed canvas for the Trail Kit tool roll before we knew anything else about it. The material ages in a way that no synthetic can replicate — it develops a patina that tells the story of where it's been. Creases from being packed under a seat in Ladakh look different from creases from being lashed to a pannier frame on a coastal route. That's a feature, not a fault.",
  "Finding the right fabric was harder than expected. We tested eleven waxed canvas fabrics from seven suppliers. The criteria were specific: a minimum wax weight of 8oz, consistent coating penetration across the weave, thread count above 120, and a hand feel that doesn't transfer wax to tools or hands at operating temperatures between -5°C and 55°C.",
  "Three fabrics failed the heat test — the wax became tacky above 40°C and transferred to the tools stored inside. Four failed the cold test — below 0°C, the canvas became stiff enough to crack along fold lines. The remaining four were tested for abrasion resistance and waterproofing after fifty wash-and-reproofing cycles. Only one fabric held its waterproofing consistently across all test conditions. That's the one in the Trail Kit.",
  "The supplier we ended up specifying is a British mill that has been producing waxed cotton since the 1970s. Their minimum order quantity is far higher than we needed for the first production run. We bought the minimum and absorbed the cost. The alternative — specifying a lesser fabric to save money on the first batch — felt like exactly the kind of compromise we set out to avoid.",
];

export const pullQuote =
  "A material that fails after two years isn't cheaper than one that lasts ten. It's more expensive, and it's in a landfill.";

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-3xl px-10 py-8 my-10" style={{ background: "var(--color-card-stone)" }}>
      <p
        className="text-xl md:text-2xl leading-relaxed italic"
        style={{ fontFamily: "var(--font-display)", color: "var(--color-foreground)" }}
      >
        &ldquo;{children}&rdquo;
      </p>
    </div>
  );
}

export default function Content() {
  return (
    <>
      {paragraphs.slice(0, 3).map((p, i) => (
        <p key={i} className="mb-6 text-base leading-[1.8]">{p}</p>
      ))}
      <PullQuote>{pullQuote}</PullQuote>
      {paragraphs.slice(3).map((p, i) => (
        <p key={i + 3} className="mb-6 text-base leading-[1.8]">{p}</p>
      ))}
    </>
  );
}
