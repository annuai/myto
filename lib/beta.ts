/**
 * The Android beta build, kept on object storage (too big for the site host).
 * The link is public, so it ships as the default; set NEXT_PUBLIC_BETA_* to point at a newer build.
 */
const DEFAULT_APK_URL = "https://media.myto-moto.com/public/app/myto-beta-2026-11-08.apk";

function httpsUrl(raw: string | undefined) {
  try {
    return raw && new URL(raw).protocol === "https:" ? raw : null;
  } catch {
    return null;
  }
}

export const beta = {
  apkUrl: httpsUrl(process.env.NEXT_PUBLIC_BETA_APK_URL) ?? DEFAULT_APK_URL,
  version: process.env.NEXT_PUBLIC_BETA_VERSION ?? "0.9.0",
  size: process.env.NEXT_PUBLIC_BETA_SIZE ?? "166 MB",
};
