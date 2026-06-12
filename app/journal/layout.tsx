import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Engineering deep-dives, material sourcing stories, and riding dispatches from the myto-moto workshop.",
  openGraph: {
    title: "Journal — myto-moto",
    description:
      "Engineering deep-dives, material sourcing stories, and riding dispatches from the myto-moto workshop.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Journal — myto-moto",
    description:
      "Engineering deep-dives, material sourcing stories, and riding dispatches from the myto-moto workshop.",
  },
};

export default function JournalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
