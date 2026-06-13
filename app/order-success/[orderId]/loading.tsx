import { Sk } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div
      className="min-h-screen pt-24 pb-20"
      style={{ background: "var(--color-background)" }}
    >
      <div className="container-wide max-w-2xl">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <Sk className="w-16 h-16 rounded-full mb-6" />
          <Sk className="h-9 w-52 mb-3" />
          <Sk className="h-4 w-72 mb-1" />
          <Sk className="h-4 w-56" />
        </div>

        <div className="space-y-4">
          {/* Order number card */}
          <div className="rounded-3xl p-6" style={{ background: "var(--color-card-stone)" }}>
            <Sk className="h-3 w-24 mb-3" />
            <Sk className="h-6 w-40" />
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

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Sk className="h-12 flex-1 rounded-2xl" />
            <Sk className="h-12 flex-1 rounded-2xl" />
          </div>
        </div>

      </div>
    </div>
  );
}
