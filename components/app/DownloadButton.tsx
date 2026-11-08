import { Download } from "lucide-react";
import { beta } from "@/lib/beta";

/** The beta APK link. Without a configured URL it says so instead of linking nowhere. */
export function DownloadButton({ className = "" }: { className?: string }) {
  const base = `inline-flex min-h-12 items-center gap-2 rounded-2xl px-6 text-sm font-semibold ${className}`;
  if (!beta.apkUrl) {
    return (
      <span className={base} style={{ background: "var(--color-card-stone)", color: "var(--color-muted)" }}>
        Beta download going up shortly
      </span>
    );
  }
  return (
    <a
      href={beta.apkUrl}
      download
      className={`${base} transition-all hover:opacity-90 active:scale-[0.97]`}
      style={{ background: "var(--color-accent)", color: "#fff" }}
    >
      <Download size={16} aria-hidden />
      Download beta for Android
    </a>
  );
}
