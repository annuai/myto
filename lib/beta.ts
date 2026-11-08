/**
 * The Android beta build. The APK lives on object storage (it is too big for the site host);
 * set NEXT_PUBLIC_BETA_APK_URL to its https address. Until then the page says the download is not up yet.
 */
function httpsUrl(raw: string | undefined) {
  try {
    return raw && new URL(raw).protocol === "https:" ? raw : null;
  } catch {
    return null;
  }
}

export const beta = {
  apkUrl: httpsUrl(process.env.NEXT_PUBLIC_BETA_APK_URL),
  version: process.env.NEXT_PUBLIC_BETA_VERSION ?? "0.10",
  size: process.env.NEXT_PUBLIC_BETA_SIZE ?? "60 MB",
};
