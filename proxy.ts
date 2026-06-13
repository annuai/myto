import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

// ── Admin HMAC session ────────────────────────────────────────────
const ADMIN_COOKIE = "myto_admin_session";
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

async function verifyAdminSession(token: string): Promise<boolean> {
  try {
    const secret = process.env.ADMIN_JWT_SECRET;
    if (!secret) return false;
    const [ts, sig] = token.split(".");
    if (!ts || !sig) return false;
    const timestamp = parseInt(ts, 36);
    if (Date.now() - timestamp > MAX_AGE_MS) return false;
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const mac = await crypto.subtle.sign("HMAC", key, encoder.encode(ts));
    const expected = Array.from(new Uint8Array(mac)).map(b => b.toString(16).padStart(2, "0")).join("");
    if (expected.length !== sig.length) return false;
    let diff = 0;
    for (let i = 0; i < expected.length; i++) {
      diff |= expected.charCodeAt(i) ^ sig.charCodeAt(i);
    }
    return diff === 0;
  } catch {
    return false;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── 1. Admin routes: HMAC cookie auth ────────────────────────
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = request.cookies.get(ADMIN_COOKIE)?.value;
    const valid = token ? await verifyAdminSession(token) : false;
    if (!valid) {
      const url = new URL("/admin/login", request.url);
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // ── 2. All other routes: refresh Supabase session ─────────────
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // ── 3. Protected account routes (require sign-in + confirmed email) ─
  const isProtectedAccount =
    pathname.startsWith("/account/orders") || pathname === "/account";

  if (isProtectedAccount) {
    if (!user) {
      const url = new URL("/account/login", request.url);
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }
    // Guard: email must be confirmed before accessing account pages
    if (!user.email_confirmed_at) {
      const url = new URL("/account/login", request.url);
      url.searchParams.set("error", "unconfirmed");
      return NextResponse.redirect(url);
    }
  }

  // ── 4. Redirect away from login if already authenticated ──────
  if (pathname === "/account/login" && user && user.email_confirmed_at) {
    return NextResponse.redirect(new URL("/account/orders", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/account/:path*",
    // Exclude static assets, API routes, and the auth callback
    // (callback must run without middleware interference to exchange the code)
    "/((?!_next/static|_next/image|favicon|api|auth).*)",
  ],
};
