import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Three thoughtfully engineered tools for riders who travel further — Trail Beam, Trail Kit, and myto navi.",
  openGraph: {
    title: "Products — myto-moto",
    description:
      "Three thoughtfully engineered tools for riders who travel further — Trail Beam, Trail Kit, and myto navi.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Products — myto-moto",
    description:
      "Three thoughtfully engineered tools for riders who travel further — Trail Beam, Trail Kit, and myto navi.",
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
