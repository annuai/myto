import { notFound } from "next/navigation";
import Link from "next/link";
import { getArticleBySlug, articles } from "@/lib/journal";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";
import type { ComponentType } from "react";

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return { title: article.title, description: article.excerpt };
}

const contentMap: Record<string, () => Promise<{ default: ComponentType }>> = {
  "designing-trail-beam-housing": () => import("@/content/journal/designing-trail-beam-housing"),
  "waxed-canvas-sourcing": () => import("@/content/journal/waxed-canvas-sourcing"),
  "navigation-without-phone": () => import("@/content/journal/navigation-without-phone"),
  "spiti-circuit-dispatch": () => import("@/content/journal/spiti-circuit-dispatch"),
  "designing-for-repairability": () => import("@/content/journal/designing-for-repairability"),
  "small-batch-manufacturing-india": () => import("@/content/journal/small-batch-manufacturing-india"),
};

const categoryColors: Record<string, string> = {
  Engineering: "var(--color-card-olive)",
  Design: "var(--color-card-cream)",
  Riding: "var(--color-card-clay)",
  Manufacturing: "var(--color-card-warmgrey)",
  Research: "var(--color-card-sand)",
  Craft: "var(--color-card-stone)",
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const loader = contentMap[slug];
  const ContentComponent = loader ? (await loader()).default : null;

  const relatedArticles = articles.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <div style={{ background: "var(--color-background)" }}>
      {/* Back link */}
      <div className="pt-24 pb-2">
        <div className="container-wide">
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
            style={{ color: "var(--color-muted)" }}
          >
            ← Journal
          </Link>
        </div>
      </div>

      {/* Article header */}
      <section className="py-10">
        <div className="container-wide">
          <div
            className="rounded-3xl p-10 md:p-14"
            style={{ background: categoryColors[article.category] ?? "var(--color-card-stone)" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span
                className="text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-lg"
                style={{ background: "rgba(0,0,0,0.07)", color: "var(--color-foreground)" }}
              >
                {article.category}
              </span>
            </div>
            <h1 className="display-lg mb-6 max-w-2xl">{article.title}</h1>
            <p className="text-base leading-relaxed mb-8 max-w-xl" style={{ color: "var(--color-muted)" }}>
              {article.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <span className="text-sm font-medium">{article.author}</span>
              <span className="text-sm" style={{ color: "var(--color-muted)" }}>
                {formatDate(article.date)}
              </span>
              <span className="text-sm" style={{ color: "var(--color-muted)" }}>
                {article.readTime}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Article body */}
      <article className="py-8">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto">
            {ContentComponent ? (
              <ContentComponent />
            ) : (
              <p className="mb-6 text-base leading-[1.8]" style={{ color: "var(--color-muted)" }}>
                Article content coming soon.
              </p>
            )}
          </div>
        </div>
      </article>

      {/* Related articles */}
      <section className="py-16">
        <div className="container-wide">
          <h2 className="display-sm mb-8">More from the journal</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {relatedArticles.map((a) => (
              <Link key={a.slug} href={`/journal/${a.slug}`} className="block group">
                <div
                  className="rounded-3xl p-7 h-full transition-all duration-300 group-hover:-translate-y-0.5"
                  style={{ background: categoryColors[a.category] ?? "var(--color-card-stone)" }}
                >
                  <span
                    className="text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-lg inline-block mb-4"
                    style={{ background: "rgba(0,0,0,0.07)", color: "var(--color-foreground)" }}
                  >
                    {a.category}
                  </span>
                  <h3 className="font-semibold text-base leading-snug mb-2">{a.title}</h3>
                  <p className="text-xs mt-2" style={{ color: "var(--color-muted)" }}>
                    {a.readTime}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
