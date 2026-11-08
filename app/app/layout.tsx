import type { Metadata } from "next";

const description =
  "The Myto Moto app records your rides, follows routes with no signal, and keeps your group together. Try the Android beta now, or join the list for launch.";

export const metadata: Metadata = {
  title: "The Myto Moto app",
  description,
  openGraph: { title: "The Myto Moto app — myto-moto", description, type: "website" },
  twitter: { card: "summary_large_image", title: "The Myto Moto app — myto-moto", description },
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
