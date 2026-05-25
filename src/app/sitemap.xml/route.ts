import { listServicePages } from "@/lib/service-pages";
import { getServiceDetailContent } from "@/lib/service-detail-content";
import { listBlogPosts } from "@/lib/blog-content";
import { listPostSlugs } from "@/lib/blog";

const SITE_URL = "https://www.elchaigroup.com";

// Stable lastmod for routes without per-entry timestamps.
// Bumped on meaningful site-wide content refreshes; do NOT replace with
// `new Date()` — a lastmod that changes on every crawl is ignored by Google
// and can degrade scheduling.
const SITE_LASTMOD = new Date("2026-05-25T00:00:00.000Z");

type SitemapEntry = {
  url: string;
  lastModified: Date | string;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
};

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function formatDate(value: Date | string) {
  return new Date(value).toISOString();
}

function renderUrl(entry: SitemapEntry) {
  return [
    "  <url>",
    `    <loc>${escapeXml(entry.url)}</loc>`,
    `    <lastmod>${formatDate(entry.lastModified)}</lastmod>`,
    `    <changefreq>${entry.changeFrequency}</changefreq>`,
    `    <priority>${entry.priority.toFixed(1)}</priority>`,
    "  </url>",
  ].join("\n");
}

export async function GET() {
  const staticRoutes: SitemapEntry[] = [
    { url: SITE_URL, lastModified: SITE_LASTMOD, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/about-us`, lastModified: SITE_LASTMOD, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/contact`, lastModified: SITE_LASTMOD, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/live-demo`, lastModified: SITE_LASTMOD, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/portfolios`, lastModified: SITE_LASTMOD, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/case-study`, lastModified: SITE_LASTMOD, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/blog-list`, lastModified: SITE_LASTMOD, changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE_URL}/interns`, lastModified: SITE_LASTMOD, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/privacy-policy`, lastModified: SITE_LASTMOD, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms-of-service`, lastModified: SITE_LASTMOD, changeFrequency: "yearly", priority: 0.3 },
  ];

  const serviceRoutes: SitemapEntry[] = listServicePages()
    .filter((p) => getServiceDetailContent(p.slug) !== null)
    .map((p) => ({
      url: `${SITE_URL}/${p.slug}`,
      lastModified: SITE_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  const staticBlogRoutes: SitemapEntry[] = listBlogPosts().map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const knownUrls = new Set(staticBlogRoutes.map((r) => r.url));
  const wpSlugs = await listPostSlugs().catch(() => [] as string[]);
  const wpBlogRoutes: SitemapEntry[] = wpSlugs
    .map((slug) => `${SITE_URL}/blog/${slug}`)
    .filter((url) => !knownUrls.has(url))
    .map((url) => ({
      url,
      lastModified: SITE_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  const entries = [...staticRoutes, ...serviceRoutes, ...staticBlogRoutes, ...wpBlogRoutes];
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries.map(renderUrl),
    "</urlset>",
  ].join("\n");

  return new Response(xml, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
