import { Sk } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--color-background)" }}>
      <div className="flex-1 pt-28 pb-16">
        <div className="container-wide max-w-2xl">

          {/* Back link */}
          <Sk className="h-4 w-20 mb-8" />

          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
            <div className="space-y-2.5">
              <Sk className="h-8 w-40" />
              <Sk className="h-4 w-36" />
            </div>
            <div className="flex items-center gap-2">
              <Sk className="h-7 w-16 rounded-xl" />
              <Sk className="h-7 w-20 rounded-xl" />
            </div>
          </div>

          <div className="space-y-4">
            {/* Progress stepper */}
            <div className="rounded-3xl p-6" style={{ background: "var(--color-card-stone)" }}>
              <Sk className="h-3 w-28 mb-5" />
              <div className="flex items-center">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center flex-1">
                    {i > 0 && <Sk className="flex-1 h-0.5 rounded-none" />}
                    <Sk className="w-7 h-7 rounded-full flex-shrink-0" />
                    {i < 3 && <Sk className="flex-1 h-0.5 rounded-none" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Items card */}
            <div className="rounded-3xl p-7" style={{ background: "var(--color-card-stone)" }}>
              <Sk className="h-3 w-24 mb-5" />
              <div className="space-y-4">
                {[0, 1].map((i) => (
                  <div key={i} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Sk className="w-10 h-10 rounded-xl flex-shrink-0" />
                      <Sk className="h-4 w-36" />
                    </div>
                    <Sk className="h-4 w-16" />
                  </div>
                ))}
              </div>
              <div
                className="border-t mt-5 pt-4 flex justify-between"
                style={{ borderColor: "rgba(0,0,0,0.07)" }}
              >
                <Sk className="h-4 w-20" />
                <Sk className="h-4 w-20" />
              </div>
            </div>

            {/* Shipping card */}
            <div className="rounded-3xl p-7" style={{ background: "var(--color-card-cream)" }}>
              <Sk className="h-3 w-36 mb-4" />
              <Sk className="h-4 w-40 mb-1.5" />
              <Sk className="h-4 w-56 mb-1" />
              <Sk className="h-4 w-48" />
            </div>

            {/* Help card */}
            <div className="rounded-3xl p-6 flex items-center gap-4" style={{ background: "var(--color-card-stone)" }}>
              <Sk className="w-10 h-10 rounded-xl flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <Sk className="h-4 w-40" />
                <Sk className="h-3 w-56" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
