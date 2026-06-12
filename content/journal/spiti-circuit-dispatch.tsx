export const meta = {
  slug: "spiti-circuit-dispatch",
  title: "Spiti Circuit: Notes from 1,400km of High-Altitude Testing",
  excerpt:
    "Taking pre-production Trail Beam units into the Spiti Valley to see what altitude, cold, and sustained vibration do to assumptions made at sea level.",
  date: "2025-08-02",
  category: "Riding",
  author: "Annuai",
};

export const paragraphs = [
  "We took four pre-production Trail Beam units into the Spiti Valley in October — deliberately late in the season, when temperatures drop to -8°C at the passes and the roads are deteriorating. The brief was to find out what we'd missed. The answer was: more than we thought, less than we feared.",
  "The most significant finding was connector corrosion. At altitude, the temperature differential between day and night creates condensation inside connector housings that we hadn't fully accounted for. Two of the four units showed early-stage oxidation on the positive terminals by day four. We redesigned the connector specification before returning — fully sealed IP67 push-to-lock connectors rather than the weather-resistant (but not waterproof) connectors in the pre-production units.",
  "The housing geometry held up precisely as the CFD had predicted. No oscillation, no buffeting complaints, and the beam pattern performed better than expected on the narrow, unlit roads above 4,000m where moonless nights are genuinely dark. The vibration-isolated mounting performed perfectly over eight days of rock-strewn high-altitude roads.",
  "The route itself — Manali to Kaza, across to Pin Valley, back via Kunzum La — is one of the best testing grounds for motorcycle equipment in India. Sustained vibration from broken tarmac, extreme temperature swings, altitude effects on electronics, and dust that finds its way into every unsealed gap. If a product survives Spiti in October, it's ready.",
];

export const pullQuote =
  "Pre-production testing in controlled conditions tells you what you designed. Testing in the field tells you what you missed.";

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
