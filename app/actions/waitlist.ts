"use server";

import { addToWaitlist, type WaitlistResult } from "@/lib/waitlist";

export async function joinWaitlist(_prev: WaitlistResult, formData: FormData): Promise<WaitlistResult> {
  // Honeypot: real people never fill the hidden "website" field.
  if (formData.get("website")) return { error: null, success: true };
  return addToWaitlist({
    email: formData.get("email"),
    platform: formData.get("platform"),
    source: "myto-moto",
  });
}
