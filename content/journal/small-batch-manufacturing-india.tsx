export const meta = {
  slug: "small-batch-manufacturing-india",
  title: "Small-Batch Manufacturing in India: What We Learned",
  excerpt:
    "Finding suppliers who care about tolerances when your order quantities are in the hundreds rather than thousands is genuinely difficult. Here is what the search looked like.",
  date: "2025-06-05",
  category: "Manufacturing",
  author: "Annuai",
};

export const paragraphs = [
  "Small-batch manufacturing at high quality is genuinely difficult in India, not because the capability doesn't exist but because the incentive structure doesn't favour it. Most precision manufacturing capacity is configured for export runs of 10,000+ units. A 500-unit run with tight tolerances and specific material certifications is an inconvenient outlier.",
  "We spoke to forty-seven manufacturers in the first six months. The conversations followed a predictable pattern: enthusiasm at the brief, then a specification review, then a quiet suggestion that certain tolerances could be 'loosened a little' without affecting function. That suggestion, in our experience, means the manufacturer already knows they can't hold the spec we've asked for.",
  "The manufacturers we work with now were found through a different path: referrals from other small-batch designers who had done the work of qualification before us. They're not always the cheapest option. They hold the tolerances we specify on the first article without negotiation. That reliability is worth more than the per-unit cost difference — because a batch that ships with out-of-spec parts costs more in returns and reputational damage than the price difference ever saves.",
  "The broader lesson from two years of qualification work: the manufacturers who can hold tight tolerances on small batches are usually specialists in one or two processes, not generalists. Finding the right specialist for each component — die-casting, PCB assembly, precision machining — and then managing the supply chain complexity that comes with multiple partners is genuinely hard work. It doesn't scale as quickly. It produces better products.",
];

export const pullQuote =
  "A supplier who asks you to loosen a tolerance before they've tried to meet it is telling you something important about how they operate.";

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
