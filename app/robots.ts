import type { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://myto-moto.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/account/",
          "/api/",
          "/auth/",
          "/checkout",
          "/order-success/",
        ],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
