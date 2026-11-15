import { NextResponse } from "next/server";
import { createPublicClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

/**
 * Keeps the Supabase free-tier project from pausing (7 days of inactivity).
 * Called daily by Vercel Cron (vercel.json). Vercel sends `Authorization: Bearer $CRON_SECRET`.
 * Runs one real Postgres query through the REST API, which is what counts as activity.
 */
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const t0 = Date.now();
  const { error } = await createPublicClient()
    .from("products")
    .select("id", { head: true, count: "exact" })
    .limit(1);

  if (error) {
    console.error("[keepalive] supabase query failed:", error.message);
    return NextResponse.json({ ok: false, error: error.message }, { status: 502 });
  }
  return NextResponse.json(
    { ok: true, ms: Date.now() - t0 },
    { headers: { "Cache-Control": "no-store" } }
  );
}
