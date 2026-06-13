"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Lock, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { useCart, preOrderPrice } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import { INDIAN_STATES } from "@/lib/order-utils";
import { createOrder, checkEmailExists } from "./actions";
import type { CheckoutFormData } from "./actions";

// ── Razorpay script loader ────────────────────────────────────────
function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

// ── Field wrapper ─────────────────────────────────────────────────
function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: "var(--color-muted)" }}>
        {label} {required && <span style={{ color: "var(--color-accent)" }}>*</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full px-4 py-3 rounded-2xl text-sm outline-none transition-all border focus:border-[var(--color-accent)]";
const inputStyle = {
  background: "var(--color-card-cream)",
  borderColor: "rgba(0,0,0,0.1)",
  color: "var(--color-foreground)",
};

type AccountStatus = "idle" | "checking" | "new" | "existing";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();

  const [form, setForm] = useState<CheckoutFormData>({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    shippingName: "",
    shippingAddress1: "",
    shippingAddress2: "",
    shippingCity: "",
    shippingState: "",
    shippingPincode: "",
  });

  const [step, setStep] = useState<"form" | "processing" | "verifying">("form");
  const [error, setError] = useState<string | null>(null);

  // Account sign-in state
  const [accountStatus, setAccountStatus] = useState<AccountStatus>("idle");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [skipSignIn, setSkipSignIn] = useState(false);
  const lastCheckedEmail = useRef("");

  const set = (key: keyof CheckoutFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    // Reset account check if email changes
    if (key === "customerEmail") {
      setAccountStatus("idle");
      setPassword("");
      setSkipSignIn(false);
      lastCheckedEmail.current = "";
    }
  };

  async function handleEmailBlur() {
    const email = form.customerEmail.trim();
    if (!email || !email.includes("@") || email === lastCheckedEmail.current) return;
    lastCheckedEmail.current = email;
    setAccountStatus("checking");
    try {
      const { exists } = await checkEmailExists(email);
      setAccountStatus(exists ? "existing" : "new");
    } catch {
      setAccountStatus("idle");
    }
  }

  if (items.length === 0) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-6 pt-24"
        style={{ background: "var(--color-background)" }}
      >
        <p className="text-base" style={{ color: "var(--color-muted)" }}>
          Your cart is empty.
        </p>
        <Link
          href="/shop"
          className="px-6 py-3 rounded-2xl text-sm font-semibold text-white"
          style={{ background: "var(--color-accent)" }}
        >
          Browse products
        </Link>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setStep("processing");

    const loaded = await loadRazorpay();
    if (!loaded) {
      setError("Could not load payment gateway. Please check your connection.");
      setStep("form");
      return;
    }

    // Pass password only if account exists and user hasn't skipped
    const signInPassword =
      accountStatus === "existing" && !skipSignIn && password
        ? password
        : undefined;

    const result = await createOrder(form, items, signInPassword);
    if (!result.success) {
      setError(result.error);
      setStep("form");
      return;
    }

    const rzp = new window.Razorpay({
      key: result.razorpayKeyId,
      amount: result.amount,
      currency: "INR",
      name: "myto-moto",
      description: `Order ${result.orderNumber}`,
      order_id: result.razorpayOrderId,
      prefill: {
        name: form.customerName,
        email: form.customerEmail,
        contact: form.customerPhone,
      },
      theme: { color: "#BE3A23" },
      modal: {
        ondismiss: () => {
          setStep("form");
          setError("Payment cancelled. Your order has not been placed.");
        },
      },
      handler: async (response: {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
      }) => {
        setStep("verifying");
        try {
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              db_order_id: result.dbOrderId,
            }),
          });

          const data = await verifyRes.json();

          if (data.success) {
            clearCart();
            router.push(`/order-success/${result.dbOrderId}`);
          } else {
            setError("Payment verification failed. Please contact support.");
            setStep("form");
          }
        } catch {
          setError("Verification error. Please contact support with your payment ID.");
          setStep("form");
        }
      },
    });

    rzp.open();
  }

  const isProcessing = step === "processing" || step === "verifying";

  return (
    <div
      className="min-h-screen pt-24 pb-20"
      style={{ background: "var(--color-background)" }}
    >
      <div className="container-wide">
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-sm mb-10 transition-opacity hover:opacity-60"
          style={{ color: "var(--color-muted)" }}
        >
          <ChevronLeft size={14} />
          Continue shopping
        </Link>

        <h1 className="display-md mb-10">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 items-start">

            {/* ── Left: Form ────────────────────────────────────── */}
            <div className="space-y-8">

              {/* Contact */}
              <div
                className="rounded-3xl p-7 md:p-8 space-y-5"
                style={{ background: "var(--color-card-stone)" }}
              >
                <h2 className="font-semibold text-base">Contact information</h2>

                <Field label="Full name" required>
                  <input
                    type="text"
                    required
                    value={form.customerName}
                    onChange={set("customerName")}
                    placeholder="Annuai"
                    className={inputClass}
                    style={inputStyle}
                  />
                </Field>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Email" required>
                    <input
                      type="email"
                      required
                      value={form.customerEmail}
                      onChange={set("customerEmail")}
                      onBlur={handleEmailBlur}
                      placeholder="you@example.com"
                      className={inputClass}
                      style={inputStyle}
                    />
                    {/* Account status indicator */}
                    {accountStatus === "checking" && (
                      <p className="text-xs mt-1.5" style={{ color: "var(--color-muted)" }}>
                        Checking…
                      </p>
                    )}
                    {accountStatus === "new" && (
                      <p className="text-xs mt-1.5" style={{ color: "#2d6a4f" }}>
                        We&apos;ll create your account after checkout.
                      </p>
                    )}
                  </Field>
                  <Field label="Phone" required>
                    <input
                      type="tel"
                      required
                      value={form.customerPhone}
                      onChange={set("customerPhone")}
                      placeholder="+91 98765 43210"
                      className={inputClass}
                      style={inputStyle}
                    />
                  </Field>
                </div>

                {/* Existing account sign-in */}
                {accountStatus === "existing" && !skipSignIn && (
                  <div
                    className="rounded-2xl p-5 space-y-4"
                    style={{ background: "var(--color-card-cream)", border: "1px solid rgba(0,0,0,0.07)" }}
                  >
                    <div>
                      <p className="text-sm font-semibold mb-0.5">You have a myto-moto account</p>
                      <p className="text-xs" style={{ color: "var(--color-muted)" }}>
                        Enter your password to sign in and access your orders immediately.
                        You can also skip — your order will still appear when you sign in later.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: "var(--color-muted)" }}>
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          autoComplete="current-password"
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

                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => setSkipSignIn(true)}
                        className="text-xs underline transition-opacity hover:opacity-60"
                        style={{ color: "var(--color-muted)" }}
                      >
                        Skip, I&apos;ll sign in after
                      </button>
                      <Link
                        href="/account/login"
                        className="text-xs underline transition-opacity hover:opacity-60"
                        style={{ color: "var(--color-muted)" }}
                        target="_blank"
                        rel="noopener"
                      >
                        Forgot password?
                      </Link>
                    </div>
                  </div>
                )}

                {/* Skipped sign-in notice */}
                {accountStatus === "existing" && skipSignIn && (
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs" style={{ color: "var(--color-muted)" }}>
                      Signing in after checkout. Your order will be linked to your account automatically.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSkipSignIn(false)}
                      className="text-xs font-semibold flex-shrink-0 underline hover:opacity-70"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      Sign in now
                    </button>
                  </div>
                )}
              </div>

              {/* Shipping */}
              <div
                className="rounded-3xl p-7 md:p-8 space-y-5"
                style={{ background: "var(--color-card-stone)" }}
              >
                <h2 className="font-semibold text-base">Shipping address</h2>
                <Field label="Name on package" required>
                  <input
                    type="text"
                    required
                    value={form.shippingName}
                    onChange={set("shippingName")}
                    placeholder="Annuai"
                    className={inputClass}
                    style={inputStyle}
                  />
                </Field>
                <Field label="Address line 1" required>
                  <input
                    type="text"
                    required
                    value={form.shippingAddress1}
                    onChange={set("shippingAddress1")}
                    placeholder="House / flat number, street"
                    className={inputClass}
                    style={inputStyle}
                  />
                </Field>
                <Field label="Address line 2">
                  <input
                    type="text"
                    value={form.shippingAddress2}
                    onChange={set("shippingAddress2")}
                    placeholder="Landmark, area (optional)"
                    className={inputClass}
                    style={inputStyle}
                  />
                </Field>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Field label="City" required>
                    <input
                      type="text"
                      required
                      value={form.shippingCity}
                      onChange={set("shippingCity")}
                      placeholder="Kochi"
                      className={inputClass}
                      style={inputStyle}
                    />
                  </Field>
                  <Field label="State" required>
                    <select
                      required
                      value={form.shippingState}
                      onChange={set("shippingState")}
                      className={inputClass}
                      style={inputStyle}
                    >
                      <option value="">Select state</option>
                      {INDIAN_STATES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="PIN code" required>
                    <input
                      type="text"
                      required
                      pattern="[0-9]{6}"
                      maxLength={6}
                      value={form.shippingPincode}
                      onChange={set("shippingPincode")}
                      placeholder="682001"
                      className={inputClass}
                      style={inputStyle}
                    />
                  </Field>
                </div>
              </div>

            </div>

            {/* ── Right: Order summary ──────────────────────────── */}
            <div className="space-y-4 lg:sticky lg:top-28">
              <div
                className="rounded-3xl p-7"
                style={{ background: "var(--color-card-dark)" }}
              >
                <h2
                  className="font-semibold text-sm mb-6 uppercase tracking-widest"
                  style={{ color: "rgba(245,240,232,0.45)" }}
                >
                  Order summary
                </h2>

                <ul className="space-y-4 mb-6">
                  {items.map(({ product, quantity, isPreOrder }) => {
                    const unitPrice = isPreOrder
                      ? preOrderPrice(product.price)
                      : product.price;
                    return (
                      <li
                        key={`${product.id}-${isPreOrder}`}
                        className="flex items-start justify-between gap-4"
                      >
                        <div className="flex-1 min-w-0">
                          <p
                            className="text-sm font-medium leading-tight"
                            style={{ color: "#f5f0e8" }}
                          >
                            {product.name}
                            {quantity > 1 && (
                              <span
                                className="ml-1.5 text-xs"
                                style={{ color: "rgba(245,240,232,0.45)" }}
                              >
                                × {quantity}
                              </span>
                            )}
                          </p>
                          {isPreOrder && (
                            <span
                              className="text-[10px] font-bold uppercase tracking-wide"
                              style={{ color: "var(--color-accent)" }}
                            >
                              Pre-order · 20% off
                            </span>
                          )}
                        </div>
                        <span
                          className="text-sm font-semibold flex-shrink-0"
                          style={{ color: "#f5f0e8" }}
                        >
                          {formatPrice(unitPrice * quantity)}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                <div
                  className="border-t pt-4 space-y-2"
                  style={{ borderColor: "rgba(245,240,232,0.1)" }}
                >
                  <div className="flex justify-between text-sm">
                    <span style={{ color: "rgba(245,240,232,0.45)" }}>Subtotal</span>
                    <span style={{ color: "#f5f0e8" }}>{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: "rgba(245,240,232,0.45)" }}>Shipping</span>
                    <span style={{ color: "rgba(245,240,232,0.7)" }}>Free</span>
                  </div>
                  <div
                    className="flex justify-between font-bold text-base pt-2 border-t"
                    style={{ borderColor: "rgba(245,240,232,0.1)", color: "#f5f0e8" }}
                  >
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              {error && (
                <div
                  className="rounded-2xl px-4 py-3 text-sm"
                  style={{
                    background: "rgba(190,58,35,0.08)",
                    color: "var(--color-accent)",
                    border: "1px solid rgba(190,58,35,0.15)",
                  }}
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 rounded-2xl text-sm font-bold transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{ background: "var(--color-accent)", color: "#fff" }}
              >
                <Lock size={14} />
                {step === "verifying"
                  ? "Verifying payment…"
                  : step === "processing"
                  ? "Opening payment…"
                  : `Pay ${formatPrice(total)}`}
              </button>

              <div className="flex items-center justify-center gap-5 pt-1">
                {["Secure checkout", "2-year warranty", "Free returns"].map(
                  (t) => (
                    <span
                      key={t}
                      className="flex items-center gap-1 text-xs"
                      style={{ color: "var(--color-muted)" }}
                    >
                      <ShieldCheck size={11} style={{ color: "var(--color-accent)" }} />
                      {t}
                    </span>
                  )
                )}
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}
