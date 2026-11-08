import { NextResponse } from "next/server";
import { addToWaitlist } from "@/lib/waitlist";

/**
 * The app list is shared with moto-trails.com, whose server posts signups here.
 * Server to server, so no CORS is needed.
 */
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Send JSON with an email." }, { status: 400 });
  }
  const result = await addToWaitlist(body);
  return NextResponse.json(result, { status: result.success ? 200 : 400 });
}
