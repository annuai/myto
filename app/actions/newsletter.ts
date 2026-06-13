"use server";

import { createPublicClient } from "@/lib/supabase";

export async function subscribeNewsletter(
  _prev: { error: string | null; success: boolean },
  formData: FormData
): Promise<{ error: string | null; success: boolean }> {
  const email = (formData.get("email") as string)?.toLowerCase().trim();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Please enter a valid email address.", success: false };
  }

  const supabase = createPublicClient();
  const { error } = await supabase
    .from("newsletter_subscribers")
    .insert({ email });

  if (error) {
    // Duplicate = already subscribed
    if (error.code === "23505") {
      return { error: null, success: true }; // silently succeed
    }
    return { error: "Something went wrong. Please try again.", success: false };
  }

  return { error: null, success: true };
}
