const phone = {
  width: 600,
  height: 1220,
};

type Screen = { src: string; alt: string };

const screens: { left: Screen; centre: Screen; right: Screen } = {
  left: { src: "/app/app-dash.webp", alt: "The Myto app home screen showing the last ride: 6 minutes, 2.9 kilometres, top speed 47 kilometres an hour" },
  centre: { src: "/app/app-ride.webp", alt: "A group ride in the Myto app: turn-by-turn directions, three riders' live distances, and Pause, Waypoint and Hold to stop controls" },
  right: { src: "/app/app-trails.webp", alt: "The Trails screen in the Myto app: trails near you with road distances, and a searchable list" },
};

function Phone({ screen, className = "", priority = false }: { screen: Screen; className?: string; priority?: boolean }) {
  return (
    <div
      className={`overflow-hidden rounded-[2.25rem] ${className}`}
      style={{
        background: "var(--color-card-dark)",
        padding: "0.4rem",
        boxShadow: "0 24px 48px -12px rgba(26,26,26,0.28), 0 6px 14px rgba(26,26,26,0.10)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={screen.src}
        alt={screen.alt}
        width={phone.width}
        height={phone.height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="block h-auto w-full rounded-[1.9rem]"
      />
    </div>
  );
}

/** Three real screens from the beta on a warm tile. Phones run off the bottom edge so the tile stays short. */
export function PhoneShowcase() {
  return (
    <div
      className="relative flex h-[26rem] items-start justify-center gap-5 overflow-hidden px-6 pt-10 sm:h-[30rem] md:h-[34rem] md:gap-8"
      style={{ background: "var(--color-card-stone)" }}
    >
      <Phone screen={screens.left} className="mt-10 hidden w-56 shrink-0 sm:block md:mt-14 md:w-64" />
      <Phone screen={screens.centre} className="w-60 shrink-0 md:w-72" priority />
      <Phone screen={screens.right} className="mt-10 hidden w-56 shrink-0 sm:block md:mt-14 md:w-64" />
    </div>
  );
}
