import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
