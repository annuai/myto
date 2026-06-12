export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
};

import { meta as m1, paragraphs as p1, pullQuote as pq1 } from "@/content/journal/designing-trail-beam-housing";
import { meta as m2, paragraphs as p2, pullQuote as pq2 } from "@/content/journal/waxed-canvas-sourcing";
import { meta as m3, paragraphs as p3, pullQuote as pq3 } from "@/content/journal/navigation-without-phone";
import { meta as m4, paragraphs as p4, pullQuote as pq4 } from "@/content/journal/spiti-circuit-dispatch";
import { meta as m5, paragraphs as p5, pullQuote as pq5 } from "@/content/journal/designing-for-repairability";
import { meta as m6, paragraphs as p6, pullQuote as pq6 } from "@/content/journal/small-batch-manufacturing-india";

function calcReadTime(paragraphs: string[], pullQuote: string): string {
  const text = [...paragraphs, pullQuote].join(" ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

export const articles: Article[] = [
  { ...m1, readTime: calcReadTime(p1, pq1) },
  { ...m2, readTime: calcReadTime(p2, pq2) },
  { ...m3, readTime: calcReadTime(p3, pq3) },
  { ...m4, readTime: calcReadTime(p4, pq4) },
  { ...m5, readTime: calcReadTime(p5, pq5) },
  { ...m6, readTime: calcReadTime(p6, pq6) },
];

export function getArticleBySlug(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export function getFeaturedArticle() {
  return articles[0];
}
