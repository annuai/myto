import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

/** Anon client — respects RLS. Use for guest checkout inserts and public reads. */
export function createPublicClient() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return createClient<any>(supabaseUrl, supabaseAnonKey);
}

/** Service-role client — bypasses RLS. Use only in Server Actions / Route Handlers. */
export function createAdminClient() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return createClient<any>(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false },
  });
}
