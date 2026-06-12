export const meta = {
  slug: "designing-for-repairability",
  title: "Designed to Be Repaired",
  excerpt:
    "Every product we make can be disassembled with common tools. This isn't an afterthought — it is a design constraint we imposed before any sketching began.",
  date: "2025-07-17",
  category: "Design",
  author: "Annuai",
};

export const paragraphs = [
  "Before we start designing any product, we ask a single question: can a rider repair this on the road with tools they already carry? If the answer is no, we redesign until it is. This isn't a marketing stance — it's a design constraint that improves the product in ways that have nothing to do with repairability.",
  "Designing for repairability forces modularity. A lamp housing that can be opened without specialist tools to replace a gasket must have a logical, accessible sealing interface. That same interface makes the assembly easier to quality-check at production. It makes warranty assessment faster. It makes the product easier to understand. Repairability isn't a separate design goal — it's a forcing function for good engineering.",
  "The Trail Beam can be fully disassembled with a 3mm Allen key and a Phillips PH2 — tools that live in the Trail Kit. The gasket, lens, and LED module are all replaceable. We stock spares. The Navi has a user-replaceable battery accessible through four M3 screws. The Trail Kit tool roll uses a standard brass press-stud closure that can be replaced at any saddler.",
  "There's a broader argument here that we find hard to ignore. Products designed to be unrepairable are optimised for replacement. We're not in the business of planned obsolescence. A product that lasts a decade in active use represents better value — and a better use of the energy and materials that went into making it — than one that looks similar but fails in three years and goes to landfill.",
];

export const pullQuote =
  "A product that can be repaired is a product that respects the rider's time, money, and the material that went into making it.";

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
