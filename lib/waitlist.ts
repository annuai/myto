import { createPublicClient } from "@/lib/supabase";

export const WAITLIST_SOURCES = ["myto-moto", "moto-trails"] as const;
export type WaitlistSource = (typeof WAITLIST_SOURCES)[number];
export const WAITLIST_PLATFORMS = ["android", "iphone"] as const;

export type WaitlistResult = { error: string | null; success: boolean };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Add one person to the app list. A repeat signup counts as success so the form never reveals who is already on it. */
export async function addToWaitlist(input: {
  email: unknown;
  source: unknown;
  platform?: unknown;
}): Promise<WaitlistResult> {
  const email = typeof input.email === "string" ? input.email.toLowerCase().trim() : "";
  if (!email || email.length > 254 || !EMAIL.test(email)) {
    return { error: "Please enter a valid email address.", success: false };
  }
  const source = WAITLIST_SOURCES.find((s) => s === input.source) ?? "myto-moto";
  const platform = WAITLIST_PLATFORMS.find((p) => p === input.platform) ?? null;

  const { error } = await createPublicClient()
    .from("newsletter_subscribers")
    .insert({ email, source, platform });

  if (error && error.code !== "23505") {
    return { error: "Something went wrong. Please try again.", success: false };
  }
  return { error: null, success: true };
}
