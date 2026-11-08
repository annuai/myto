"use client";

import { useActionState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { joinWaitlist } from "@/app/actions/waitlist";

const platforms = [
  { value: "android", label: "Android" },
  { value: "iphone", label: "iPhone" },
];

/** Email plus the phone you ride with. Shown on the dark card, so colours are light on dark. */
export function WaitlistForm() {
  const [state, action, pending] = useActionState(joinWaitlist, { error: null, success: false });

  if (state.success) {
    return (
      <p
        role="status"
        className="inline-flex items-center gap-3 rounded-2xl px-5 py-4 text-sm font-medium"
        style={{ background: "rgba(255,255,255,0.08)", color: "#fff" }}
      >
        <Check size={18} aria-hidden style={{ color: "var(--color-accent)" }} />
        You&apos;re on the list. We&apos;ll write when there&apos;s something worth saying.
      </p>
    );
  }

  return (
    <form action={action} className="w-full max-w-xl" noValidate={false}>
      {/* Honeypot, hidden from people */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="flex-1">
          <span className="sr-only">Email address</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="Your email address"
            aria-describedby={state.error ? "waitlist-error" : undefined}
            className="min-h-12 w-full rounded-2xl px-4 text-sm outline-none transition-colors placeholder:text-white/60 focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
            style={{ background: "rgba(255,255,255,0.10)", color: "#fff", border: "1px solid rgba(255,255,255,0.22)" }}
          />
        </label>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-6 text-sm font-semibold transition-all hover:opacity-90 active:scale-[0.97] disabled:opacity-60"
          style={{ background: "var(--color-accent)", color: "#fff" }}
        >
          {pending ? "Joining…" : "Keep me posted"}
          {!pending && <ArrowRight size={16} aria-hidden />}
        </button>
      </div>

      <fieldset className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
        <legend className="sr-only">Which phone do you ride with?</legend>
        <span className="text-sm" style={{ color: "rgba(255,255,255,0.72)" }} aria-hidden>
          I ride with
        </span>
        {platforms.map((p) => (
          <label key={p.value} className="inline-flex min-h-11 cursor-pointer items-center gap-2 text-sm" style={{ color: "#fff" }}>
            <input type="radio" name="platform" value={p.value} className="h-4 w-4 accent-[var(--color-accent)]" />
            {p.label}
          </label>
        ))}
      </fieldset>

      {state.error && (
        <p id="waitlist-error" role="alert" className="mt-3 text-sm" style={{ color: "#ffb4a6" }}>
          {state.error}
        </p>
      )}
    </form>
  );
}
