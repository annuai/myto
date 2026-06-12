import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Installation guides, product FAQs, warranty information, and direct contact. We respond within 24 hours.",
  openGraph: {
    title: "Support — myto-moto",
    description:
      "Installation guides, product FAQs, warranty information, and direct contact. We respond within 24 hours.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Support — myto-moto",
    description:
      "Installation guides, product FAQs, warranty information, and direct contact. We respond within 24 hours.",
  },
};

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
