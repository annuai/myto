import { Sk } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="p-8">
      <Sk className="h-9 w-28 mb-8" />

      <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
        {/* Table header */}
        <div
          className="grid grid-cols-5 gap-4 px-5 py-3 border-b"
          style={{ background: "var(--color-card-stone)", borderColor: "rgba(0,0,0,0.07)" }}
        >
          {[20, 36, 28, 20, 16].map((w, i) => (
            <Sk key={i} className={`h-3 w-${w}`} />
          ))}
        </div>
        {/* Rows */}
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-5 gap-4 px-5 py-4 border-b last:border-0"
            style={{ borderColor: "rgba(0,0,0,0.05)", opacity: 1 - i * 0.07 }}
          >
            <Sk className="h-4 w-20" />
            <Sk className="h-4 w-32" />
            <Sk className="h-4 w-24" />
            <Sk className="h-5 w-16 rounded-lg" />
            <Sk className="h-4 w-14" />
          </div>
        ))}
      </div>
    </div>
  );
}
