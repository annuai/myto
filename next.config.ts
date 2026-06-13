import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    unoptimized: false, // enable Next.js image optimisation
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      // Supabase storage (swap your project ref below after connecting Supabase)
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
};

export default nextConfig;
