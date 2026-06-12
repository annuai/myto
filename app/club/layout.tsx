import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Club Myto",
  description:
    "Club Myto is a community for long-distance riders. A WhatsApp group where serious riders share routes, maintenance knowledge, and honest experience from the road.",
  openGraph: {
    title: "Club Myto — myto-moto",
    description:
      "A WhatsApp community for long-distance riders. Routes, maintenance knowledge, and honest experience from the road.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Club Myto — myto-moto",
    description:
      "A WhatsApp community for long-distance riders. Routes, maintenance knowledge, and honest experience from the road.",
  },
};

export default function ClubLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
