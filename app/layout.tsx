import type { Metadata } from "next";
import { Geist, Michroma } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { CommandPalette } from "@/components/CommandPalette";
import { CartProvider } from "@/context/CartContext";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const michroma = Michroma({
  variable: "--font-michroma",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "myto-moto — Thoughtfully Engineered Motorcycle Accessories",
    template: "%s | myto-moto",
  },
  description:
    "Thoughtfully engineered tools for riders who travel further. Trail Beam, Trail Kit, and myto navi — designed through research, prototyping, and real-world testing.",
  keywords: [
    "motorcycle accessories",
    "motorcycle gear",
    "adventure motorcycle",
    "auxiliary lights",
    "motorcycle navigation",
    "trail beam",
    "myto navi",
    "adventure riding India",
  ],
  metadataBase: new URL("https://myto-moto.com"),
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    title: "myto-moto — Thoughtfully Engineered Motorcycle Accessories",
    description:
      "Thoughtfully engineered tools for riders who travel further. Designed through research, prototyping, and real-world testing.",
    type: "website",
    siteName: "myto-moto",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "myto-moto — Thoughtfully Engineered Motorcycle Accessories",
    description: "Thoughtfully engineered tools for riders who travel further.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${michroma.variable}`} suppressHydrationWarning>
      <body>
        <CartProvider>
          <Navigation />
          <CommandPalette />
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
