"use server";

import { cookies } from "next/headers";
import crypto from "crypto";
import { redirect } from "next/navigation";

const COOKIE = "myto_admin_session";

export async function loginAdmin(
  _prevState: { error: string | null },
  formData: FormData
): Promise<{ error: string | null }> {
  const password = formData.get("password") as string;
  const from = (formData.get("from") as string) || "/admin";

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return { error: "Incorrect password." };
  }

  const secret = process.env.ADMIN_JWT_SECRET!;
  const ts = Date.now().toString(36);
  const sig = crypto.createHmac("sha256", secret).update(ts).digest("hex");
  const token = `${ts}.${sig}`;

  const cookieStore = await cookies();
  cookieStore.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    path: "/",
  });

  redirect(from);
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE);
  redirect("/admin/login");
}
