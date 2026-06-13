import { Sk } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="p-8">
      <Sk className="h-9 w-44 mb-8" />

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-2xl p-6" style={{ background: "var(--color-card-stone)" }}>
            <Sk className="h-3 w-24 mb-3" />
            <Sk className="h-7 w-20" />
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <Sk className="h-5 w-32 mb-4" />
      <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
        {/* Table header */}
        <div
          className="grid grid-cols-4 gap-4 px-5 py-3 border-b"
          style={{ background: "var(--color-card-stone)", borderColor: "rgba(0,0,0,0.07)" }}
        >
          {[28, 36, 20, 16].map((w, i) => (
            <Sk key={i} className={`h-3 w-${w}`} />
          ))}
        </div>
        {/* Rows */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="grid grid-cols-4 gap-4 px-5 py-4 border-b last:border-0"
            style={{ borderColor: "rgba(0,0,0,0.05)", opacity: 1 - i * 0.1 }}
          >
            <Sk className="h-4 w-24" />
            <Sk className="h-4 w-28" />
            <Sk className="h-5 w-16 rounded-lg" />
            <Sk className="h-4 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}
