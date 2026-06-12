import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "myto-moto was built from frustrations on real rides. Every product starts with a documented problem, not a product idea.",
  openGraph: {
    title: "About — myto-moto",
    description:
      "myto-moto was built from frustrations on real rides. Every product starts with a documented problem, not a product idea.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About — myto-moto",
    description:
      "myto-moto was built from frustrations on real rides. Every product starts with a documented problem, not a product idea.",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
