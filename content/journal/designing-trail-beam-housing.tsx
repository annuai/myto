export const meta = {
  slug: "designing-trail-beam-housing",
  title: "Shape Before Lumens: Designing the Trail Beam Housing",
  excerpt:
    "Most auxiliary lamp makers start with the LED specification. We started with the housing shape. Six months of CFD work before a single circuit board was drawn.",
  date: "2025-11-20",
  category: "Engineering",
  author: "Annuai",
};

export const paragraphs = [
  "The brief for the Trail Beam started with a single sentence: design a lamp housing that doesn't make things worse at speed. That sounds like a low bar. It isn't. Most auxiliary lamp shapes create turbulent wake that oscillates at certain speeds, inducing micro-vibrations that transfer directly to the handlebar. Riders describe this as a buzzing or numbness in their hands that they can't quite diagnose. We traced it to lamp housing geometry.",
  "We ran the first CFD simulation on the stock round lamp shape that appears on almost every auxiliary lamp on the market. The results were predictable — a messy turbulent wake extending well behind the lamp at 100 km/h. The drag coefficient was higher than it needed to be, and the oscillation frequency sat uncomfortably close to the natural frequency of most handlebar setups.",
  "From there, we iterated through eleven housing shapes, running each through the same CFD parameters: 80 km/h, 100 km/h, 120 km/h. We were looking for laminar flow separation at the trailing edge and a drag coefficient below our target threshold. The seventh shape was the first to hit both criteria simultaneously. We then spent three more iterations optimising the mounting lug geometry so the bracket attachment point didn't reintroduce turbulence.",
  "The final housing shape isn't dramatic. It doesn't look like a design exercise. It looks like something that has been resolved — because it has. The taper angle at the rear, the relief cuts around the mounting lugs, the subtle asymmetry that redirects airflow away from the wire exit point. None of these details are visible in a product photograph. All of them matter at speed.",
];

export const pullQuote =
  "The shape of a lamp housing has as much to do with how it performs as the LED inside it. We spent longer on aerodynamics than on the lighting specification.";

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
