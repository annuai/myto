"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff, CheckCircle } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const supabase = createSupabaseBrowserClient();

  const inputClass =
    "w-full px-4 py-3 rounded-2xl text-sm outline-none border transition-all focus:border-[var(--color-accent)]";
  const inputStyle = {
    background: "var(--color-card-cream)",
    borderColor: "rgba(0,0,0,0.1)",
    color: "var(--color-foreground)",
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) {
        setError(updateError.message);
        return;
      }
      setDone(true);
      setTimeout(() => router.push("/account/orders"), 2500);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-16"
      style={{ background: "var(--color-background)" }}
    >
      <div className="w-full max-w-sm">
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

        <div
          className="rounded-3xl p-7"
          style={{ background: "var(--color-card-stone)" }}
        >
          {done ? (
            <div className="flex flex-col items-center gap-4 py-4">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: "rgba(45,106,79,0.12)" }}
              >
                <CheckCircle size={28} style={{ color: "#2d6a4f" }} />
              </div>
              <p className="text-base font-semibold text-center">Password updated</p>
              <p className="text-sm text-center" style={{ color: "var(--color-muted)" }}>
                Redirecting to your orders…
              </p>
            </div>
          ) : (
            <>
              <h1 className="font-semibold text-base mb-1">Set your password</h1>
              <p className="text-sm mb-6" style={{ color: "var(--color-muted)" }}>
                Choose a strong password for your myto-moto account.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    className="block text-xs font-semibold uppercase tracking-widest mb-1.5"
                    style={{ color: "var(--color-muted)" }}
                  >
                    New password
                  </label>
                  <div className="relative">
                    <input
                      type={show ? "text" : "password"}
                      required
                      minLength={8}
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min. 8 characters"
                      className={inputClass}
                      style={{ ...inputStyle, paddingRight: "2.75rem" }}
                    />
                    <button
                      type="button"
                      onClick={() => setShow((v) => !v)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-60"
                      style={{ color: "var(--color-muted)" }}
                    >
                      {show ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    className="block text-xs font-semibold uppercase tracking-widest mb-1.5"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Confirm password
                  </label>
                  <input
                    type={show ? "text" : "password"}
                    required
                    minLength={8}
                    autoComplete="new-password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="Repeat password"
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>

                {error && (
                  <div
                    className="rounded-xl px-4 py-2.5 text-sm"
                    style={{ background: "rgba(190,58,35,0.08)", color: "var(--color-accent)" }}
                  >
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-2xl text-sm font-bold text-white transition-all hover:opacity-90 disabled:opacity-60 mt-1"
                  style={{ background: "var(--color-accent)" }}
                >
                  {loading ? "Saving…" : "Set password"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
