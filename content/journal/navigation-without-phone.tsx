export const meta = {
  slug: "navigation-without-phone",
  title: "Why a Phone Is Still the Wrong Tool for Navigation",
  excerpt:
    "After riding 40,000km with a phone as primary navigation, we documented every failure mode. The list formed the brief for Navi.",
  date: "2025-09-14",
  category: "Research",
  author: "Annuai",
};

export const paragraphs = [
  "Over 40,000 km of long-distance riding with a phone as primary navigation, we documented every failure. Not anecdotally — we kept a log. Heat management failures above 40°C ambient: 23 incidents. Screen unreadable in direct sun without shade: daily occurrence. Notification interruptions during navigation: too frequent to count. Camera OIS failure from sustained vibration: two phones.",
  "The phone is the wrong device for motorcycle navigation for reasons that aren't obvious until you've experienced them on a long trip. The most fundamental issue is that phones are designed to run multiple tasks simultaneously, and navigation competes with every other process on the device for thermal headroom. On a hot day, in direct sun, mounted to a vibrating handlebar, a phone is working harder than it was designed to work.",
  "The Navi started from that failure log. We didn't set out to build a navigation device — we set out to solve eleven documented problems. The device that emerged from that process happens to be a dedicated navigation unit. Single-purpose by necessity, not by philosophy. Everything in the specification traces back to a line in that failure log.",
  "The most common objection we hear is that a dedicated device is an extra thing to carry and maintain. That's true. But a phone that throttles to 30% performance in the Rajasthan heat, becomes unreadable at noon, and dies from vibration damage in 18 months isn't a navigation device. It's a liability with navigation software installed.",
];

export const pullQuote =
  "The phone in your pocket is a remarkable general-purpose computer. That's exactly why it's the wrong tool for one specific job.";

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
