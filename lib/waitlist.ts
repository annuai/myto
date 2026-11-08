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

  const table = createPublicClient().from("newsletter_subscribers");
  let { error } = await table.insert({ email, source, platform });

  // Before migration 006 reaches a database the source and platform columns do not exist.
  // Keep signup working with just the email rather than failing the visitor.
  if (error && (error.code === "PGRST204" || error.code === "42703")) {
    ({ error } = await table.insert({ email }));
  }

  // 23505: already on the list, which counts as success.
  if (error && error.code !== "23505") {
    console.error("waitlist insert failed", error.code, error.message);
    return { error: "Something went wrong. Please try again.", success: false };
  }
  return { error: null, success: true };
}
