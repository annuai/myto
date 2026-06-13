"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

export function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <button
      onClick={handleSignOut}
      className="inline-flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-60 flex-shrink-0"
      style={{ color: "var(--color-muted)" }}
    >
      <LogOut size={14} />
      Sign out
    </button>
  );
}
