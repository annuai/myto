export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
};

export const articles: Article[] = [
  {
    slug: "designing-trail-beam-housing",
    title: "Shape Before Lumens: Designing the Trail Beam Housing",
    excerpt:
      "Most auxiliary lamp makers start with the LED specification. We started with the housing shape. Six months of CFD work before a single circuit board was drawn.",
    date: "2025-11-20",
    readTime: "9 min read",
    category: "Engineering",
    author: "Annuai",
  },
  {
    slug: "waxed-canvas-sourcing",
    title: "Finding the Right Canvas: A Material Sourcing Journey",
    excerpt:
      "We tested eleven waxed canvas fabrics before specifying the one in the Trail Kit tool roll. What we were looking for — and why most fell short.",
    date: "2025-10-08",
    readTime: "7 min read",
    category: "Craft",
    author: "Annuai",
  },
  {
    slug: "navigation-without-phone",
    title: "Why a Phone Is Still the Wrong Tool for Navigation",
    excerpt:
      "After riding 40,000km with a phone as primary navigation, we documented every failure mode. The list formed the brief for myto navi.",
    date: "2025-09-14",
    readTime: "11 min read",
    category: "Research",
    author: "Annuai",
  },
  {
    slug: "spiti-circuit-dispatch",
    title: "Spiti Circuit: Notes from 1,400km of High-Altitude Testing",
    excerpt:
      "Taking pre-production Trail Beam units into the Spiti Valley to see what altitude, cold, and sustained vibration do to assumptions made at sea level.",
    date: "2025-08-02",
    readTime: "14 min read",
    category: "Riding",
    author: "Annuai",
  },
  {
    slug: "designing-for-repairability",
    title: "Designed to Be Repaired",
    excerpt:
      "Every product we make can be disassembled with common tools. This isn't an afterthought — it is a design constraint we imposed before any sketching began.",
    date: "2025-07-17",
    readTime: "8 min read",
    category: "Design",
    author: "Annuai",
  },
  {
    slug: "small-batch-manufacturing-india",
    title: "Small-Batch Manufacturing in India: What We Learned",
    excerpt:
      "Finding suppliers who care about tolerances when your order quantities are in the hundreds rather than thousands is genuinely difficult. Here is what the search looked like.",
    date: "2025-06-05",
    readTime: "10 min read",
    category: "Manufacturing",
    author: "Annuai",
  },
];

export function getArticleBySlug(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export function getFeaturedArticle() {
  return articles[0];
}
