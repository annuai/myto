"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import { Suspense } from "react";

type Mode = "signin" | "signup" | "reset";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "/account/orders";
  const linkExpired = searchParams.get("error") === "link_expired";
  const prefillEmail = searchParams.get("email") ?? "";
  const initialMode = searchParams.get("mode") === "signup" ? "signup" : "signin";

  const [mode, setMode] = useState<Mode>(initialMode);
  const [email, setEmail] = useState(prefillEmail);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(
    linkExpired ? "Your activation link has expired. Enter your email below to get a new one." : null
  );
  const [success, setSuccess] = useState<string | null>(null);

  const supabase = createSupabaseBrowserClient();

  function switchMode(m: Mode) {
    setMode(m);
    setError(null);
    setSuccess(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          setError(
            error.message === "Invalid login credentials"
              ? "Incorrect email or password."
              : error.message.includes("Email not confirmed")
              ? "Please confirm your email first. Check your inbox for the activation link."
              : error.message
          );
          return;
        }
        router.push(from);
        router.refresh();

      } else if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback?next=/account/orders`,
          },
        });
        if (error) {
          setError(error.message);
          return;
        }
        setSuccess("Account created. Check your email to confirm before signing in.");

      } else {
        // Password reset
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth/callback?next=/account/update-password`,
        });
        if (error) {
          setError(error.message);
          return;
        }
        setSuccess("Reset link sent. Check your email — it expires in 1 hour.");
      }
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full px-4 py-3 rounded-2xl text-sm outline-none border transition-all focus:border-[var(--color-accent)]";
  const inputStyle = {
    background: "var(--color-card-cream)",
    borderColor: "rgba(0,0,0,0.1)",
    color: "var(--color-foreground)",
  };

  const modeLabel: Record<Mode, string> = {
    signin: "Sign in",
    signup: "Create account",
    reset: "Reset password",
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-16"
      style={{ background: "var(--color-background)" }}
    >
      {/* Back link */}
      <div className="w-full max-w-sm mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm transition-opacity hover:opacity-60"
          style={{ color: "var(--color-muted)" }}
        >
          <ArrowLeft size={14} />
          Back to site
        </Link>
      </div>

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

        {/* Mode toggle (signin / signup only) */}
        {mode !== "reset" && (
          <div
            className="flex rounded-2xl p-1 mb-6"
            style={{ background: "var(--color-card-stone)" }}
          >
            {(["signin", "signup"] as const).map((m) => (
              <button
                key={m}
                onClick={() => switchMode(m)}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: mode === m ? "var(--color-foreground)" : "transparent",
                  color: mode === m ? "#f5f0e8" : "var(--color-muted)",
                }}
              >
                {m === "signin" ? "Sign in" : "Create account"}
              </button>
            ))}
          </div>
        )}

        {/* Card */}
        <div
          className="rounded-3xl p-7"
          style={{ background: "var(--color-card-stone)" }}
        >
          {mode === "reset" && (
            <button
              onClick={() => switchMode("signin")}
              className="flex items-center gap-1.5 text-xs mb-5 transition-opacity hover:opacity-60"
              style={{ color: "var(--color-muted)" }}
            >
              <ArrowLeft size={12} /> Back to sign in
            </button>
          )}

          <h1 className="font-semibold text-base mb-1">{modeLabel[mode]}</h1>
          <p className="text-sm mb-6" style={{ color: "var(--color-muted)" }}>
            {mode === "signin"
              ? "Sign in to view your orders and track delivery."
              : mode === "signup"
              ? "Create an account to track orders and manage returns."
              : "Enter your email and we'll send a reset link."}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className="block text-xs font-semibold uppercase tracking-widest mb-1.5"
                style={{ color: "var(--color-muted)" }}
              >
                Email
              </label>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={inputClass}
                style={inputStyle}
              />
            </div>

            {mode !== "reset" && (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Password
                  </label>
                  {mode === "signin" && (
                    <button
                      type="button"
                      onClick={() => switchMode("reset")}
                      className="text-xs transition-opacity hover:opacity-60"
                      style={{ color: "var(--color-muted)" }}
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={mode === "signup" ? 8 : 1}
                    autoComplete={mode === "signin" ? "current-password" : "new-password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={inputClass}
                    style={{ ...inputStyle, paddingRight: "2.75rem" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-60"
                    style={{ color: "var(--color-muted)" }}
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
            )}

            {/* Feedback */}
            {error && (
              <div
                className="rounded-xl px-4 py-2.5 text-sm"
                style={{ background: "rgba(190,58,35,0.08)", color: "var(--color-accent)" }}
              >
                {error}
              </div>
            )}
            {success && (
              <div
                className="rounded-xl px-4 py-2.5 text-sm"
                style={{ background: "rgba(45,106,79,0.1)", color: "#2d6a4f" }}
              >
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl text-sm font-bold text-white transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60 mt-1"
              style={{ background: "var(--color-accent)" }}
            >
              {loading ? `${modeLabel[mode]}…` : modeLabel[mode]}
            </button>
          </form>
        </div>

        {/* Help text */}
        <p className="text-center text-xs mt-5" style={{ color: "var(--color-muted)" }}>
          {mode === "signin" ? (
            <>
              No account?{" "}
              <button
                onClick={() => switchMode("signup")}
                className="font-semibold hover:underline"
                style={{ color: "var(--color-foreground)" }}
              >
                Create one
              </button>
            </>
          ) : mode === "signup" ? (
            <>
              Already have an account?{" "}
              <button
                onClick={() => switchMode("signin")}
                className="font-semibold hover:underline"
                style={{ color: "var(--color-foreground)" }}
              >
                Sign in
              </button>
            </>
          ) : (
            <>
              Remembered it?{" "}
              <button
                onClick={() => switchMode("signin")}
                className="font-semibold hover:underline"
                style={{ color: "var(--color-foreground)" }}
              >
                Sign in
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default function AccountLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
