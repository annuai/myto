import type { Metadata } from "next";
import { Geist, Michroma } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
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
    "Thoughtfully engineered tools for riders who travel further. Designed through research, prototyping, and iteration.",
  keywords: ["motorcycle accessories", "motorcycle gear", "rider accessories", "adventure motorcycle"],
  openGraph: {
    title: "myto-moto — Thoughtfully Engineered Motorcycle Accessories",
    description: "Thoughtfully engineered tools for riders who travel further.",
    type: "website",
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
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
