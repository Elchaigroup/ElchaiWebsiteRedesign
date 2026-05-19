import type { MetadataRoute } from "next";
import { listServicePages } from "@/lib/service-pages";
import { getServiceDetailContent } from "@/lib/service-detail-content";

const SITE_URL = "https://www.elchaigroup.com";

/**
 * Sitemap is derived at build time from the same registries that drive
 * the [slug] route, so adding a new service page in
 * service-pages.ts + service-detail-content.ts auto-publishes it.
 * Pages without a populated detail entry are excluded — that's
 * intentional: a "Coming soon" stub should not be indexable.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/about-us`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/live-demo`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/portfolios`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/case-study`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/blog-list`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE_URL}/interns`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
  const serviceRoutes: MetadataRoute.Sitemap = listServicePages()
    .filter((p) => getServiceDetailContent(p.slug) !== null)
    .map((p) => ({
      url: `${SITE_URL}/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  return [...staticRoutes, ...serviceRoutes];
}
