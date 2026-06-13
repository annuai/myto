import { Sk } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--color-background)" }}>
      <div className="flex-1 pt-28 pb-16">
        <div className="container-wide max-w-3xl">

          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-10">
            <div className="space-y-2.5">
              <Sk className="h-3 w-44" />
              <Sk className="h-9 w-36" />
            </div>
            <Sk className="h-9 w-24 rounded-2xl" />
          </div>

          {/* Order card skeletons */}
          <ul className="space-y-3">
            {[0, 1, 2].map((i) => (
              <li key={i}>
                <div
                  className="rounded-3xl p-6"
                  style={{ background: "var(--color-card-stone)", opacity: 1 - i * 0.15 }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 space-y-2.5">
                      <div className="flex items-center gap-3">
                        <Sk className="h-4 w-28" />
                        <Sk className="h-5 w-16 rounded-lg" />
                      </div>
                      <div className="flex items-center gap-4">
                        <Sk className="h-4 w-16" />
                        <Sk className="h-3 w-32" />
                      </div>
                    </div>
                    <Sk className="h-4 w-4 rounded-full" />
                  </div>
                </div>
              </li>
            ))}
          </ul>

        </div>
      </div>
    </div>
  );
}
