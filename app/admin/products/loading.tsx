import { Sk } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="p-8">
      <Sk className="h-9 w-32 mb-8" />

      <div className="space-y-4">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="rounded-2xl p-6"
            style={{ background: "var(--color-card-stone)", opacity: 1 - i * 0.15 }}
          >
            <div className="flex items-start justify-between gap-6 mb-5">
              <div className="space-y-2">
                <Sk className="h-5 w-36" />
                <Sk className="h-3 w-24" />
              </div>
              <Sk className="h-6 w-20 rounded-lg" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Sk className="h-3 w-16" />
                <Sk className="h-9 w-full rounded-xl" />
              </div>
              <div className="space-y-1.5">
                <Sk className="h-3 w-20" />
                <Sk className="h-9 w-full rounded-xl" />
              </div>
              <div className="space-y-1.5">
                <Sk className="h-3 w-14" />
                <Sk className="h-9 w-full rounded-xl" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
