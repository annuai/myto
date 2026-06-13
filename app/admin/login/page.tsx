"use client";

import { useActionState } from "react";
import { loginAdmin } from "./actions";
import Image from "next/image";
import { Lock } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginForm() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "/admin";

  const [state, action, pending] = useActionState(loginAdmin, { error: null });

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "var(--color-background)" }}
    >
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <div className="relative h-8 w-28">
            <Image
              src="/myto-logo.svg"
              alt="myto-moto"
              fill
              className="object-contain"
              style={{ filter: "brightness(0)" }}
            />
          </div>
        </div>

        <div className="rounded-3xl p-8" style={{ background: "var(--color-card-stone)" }}>
          <div className="flex items-center gap-2 mb-6">
            <Lock size={16} style={{ color: "var(--color-muted)" }} />
            <h1 className="font-semibold text-base">Admin access</h1>
          </div>

          <form action={action} className="space-y-4">
            <input type="hidden" name="from" value={from} />
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold uppercase tracking-widest mb-1.5"
                style={{ color: "var(--color-muted)" }}
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoFocus
                className="w-full px-4 py-3 rounded-2xl text-sm outline-none border"
                style={{
                  background: "var(--color-card-cream)",
                  borderColor: "rgba(0,0,0,0.1)",
                  color: "var(--color-foreground)",
                }}
              />
            </div>

            {state.error && (
              <p
                className="text-xs px-3 py-2 rounded-xl"
                style={{
                  background: "rgba(190,58,35,0.08)",
                  color: "var(--color-accent)",
                }}
              >
                {state.error}
              </p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="w-full py-3 rounded-2xl text-sm font-bold text-white transition-all hover:opacity-90 disabled:opacity-60"
              style={{ background: "var(--color-accent)" }}
            >
              {pending ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
