import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { articles } from "@/lib/journal";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://myto-moto.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, priority: 1, changeFrequency: "weekly" },
    { url: `${BASE}/shop`, priority: 0.9, changeFrequency: "weekly" },
    { url: `${BASE}/about`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE}/journal`, priority: 0.8, changeFrequency: "weekly" },
    { url: `${BASE}/club`, priority: 0.6, changeFrequency: "monthly" },
    { url: `${BASE}/support`, priority: 0.5, changeFrequency: "monthly" },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE}/products/${p.slug}`,
    priority: 0.85,
    changeFrequency: "monthly",
  }));

  const journalRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE}/journal/${a.slug}`,
    lastModified: new Date(a.date),
    priority: 0.65,
    changeFrequency: "never",
  }));

  return [...staticRoutes, ...productRoutes, ...journalRoutes];
}
