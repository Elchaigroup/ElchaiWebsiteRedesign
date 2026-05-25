import type { Metadata } from "next";
import seoConfig from "./seo-config.json";

/**
 * Per-page SEO helper. Builds a complete Metadata object with canonical,
 * OpenGraph, and Twitter blocks populated from a single (title,
 * description, path) tuple — so every page's social card matches its
 * route instead of all of them falling back to the homepage defaults.
 *
 * IMPORTANT: pass the RAW page title without "· Elchai Group" — the
 * layout's `title.template` adds the brand suffix automatically. If you
 * include it here you get the double-suffix bug ("About Us · Elchai
 * Group · Elchai Group").
 */
const SITE_URL = "https://www.elchaigroup.com";
const SITE_NAME = "Elchai Group";
const SITE_DESC_DEFAULT =
  "Elchai Group is a Dubai-based AI and blockchain consultancy. We design, build and scale custom AI agents, generative AI, Web3 platforms, smart contracts and tokenization for enterprises worldwide.";

/**
 * Default OG image — served by the dynamic next/og route at `/og`
 * (src/app/og/route.tsx). Returns 1200×630 PNG. Per-page metadata can
 * override by passing `image: "/og?slug=foo"` or a static asset path.
 */
const OG_IMAGE_DEFAULT = "/og";

/* ── seo-config.json look-up tables ────────────────────────────── */
type SeoPageEntry = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  keywords: string[];
  breadcrumb: string[];
};
const _pages = seoConfig.pages as Record<string, SeoPageEntry>;

/** Return the seo-config entry for a path. */
export function getSeoEntry(path: string): SeoPageEntry | null {
  return _pages[path] ?? null;
}

/**
 * Clamp description to 155 chars at a word boundary + ellipsis.
 * Google truncates SERP descriptions ~155–160 chars on desktop; clipping
 * mid-word looks broken and hurts CTR. Anything ≤155 passes through.
 */
function clampDescription(raw: string, max = 155): string {
  if (raw.length <= max) return raw;
  const slice = raw.slice(0, max - 1);
  const cut = slice.lastIndexOf(" ");
  return (cut > 80 ? slice.slice(0, cut) : slice).replace(/[\s.,;:!?-]+$/, "") + "…";
}

export function pageMetadata(opts: {
  title: string;
  description?: string;
  path: string; // leading slash, e.g. "/about-us"
  image?: string;
  keywords?: string[];
}): Metadata {
  // Try the config first — it has keyword-rich, hand-tuned descriptions
  const entry = getSeoEntry(opts.path);
  const description = clampDescription(
    opts.description ?? entry?.description ?? SITE_DESC_DEFAULT,
  );
  const image = opts.image ?? OG_IMAGE_DEFAULT;
  const url = `${SITE_URL}${opts.path}`;
  const fullTitle = `${opts.title} · ${SITE_NAME}`;
  const keywords = opts.keywords ?? entry?.keywords;
  return {
    title: opts.title,
    description,
    ...(keywords && keywords.length > 0 ? { keywords } : {}),
    alternates: {
      canonical: opts.path,
      // Single-URL site with client-side i18n (cookie/localStorage). We
      // still declare hreflang so search engines know the page serves
      // multiple audiences and pick the right one for each query.
      languages: {
        "en-US": opts.path,
        "en-AE": opts.path,
        "en-GB": opts.path,
        "ar-AE": opts.path,
        "it-IT": opts.path,
        "x-default": opts.path,
      },
    },
    openGraph: {
      type: "website",
      url,
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      images: [{ url: image, width: 1200, height: 630, alt: opts.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
      site: "@elchaigroup",
      creator: "@elchaigroup",
    },
  };
}

/**
 * Build a BreadcrumbList JSON-LD object for a page.
 * If the path has an entry in seo-config.json it uses the breadcrumb
 * labels from there; otherwise it auto-generates from the URL segments.
 */
export function breadcrumbJsonLd(
  path: string,
  /** Override label for the final breadcrumb segment (e.g. service title). */
  currentLabel?: string,
): object {
  const entry = getSeoEntry(path);
  const segments = path.split("/").filter(Boolean);

  let items: { name: string; item?: string }[];

  if (entry?.breadcrumb && entry.breadcrumb.length > 0) {
    items = entry.breadcrumb.map((label, i) => {
      if (i === 0) return { name: label, item: SITE_URL };
      if (i === entry.breadcrumb.length - 1) return { name: label };
      const href = "/" + segments.slice(0, i).join("/");
      return { name: label, item: `${SITE_URL}${href}` };
    });
  } else {
    items = [{ name: "Home", item: SITE_URL }];
    segments.forEach((seg, i) => {
      const label =
        i === segments.length - 1 && currentLabel
          ? currentLabel
          : seg
              .split("-")
              .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
              .join(" ");
      if (i === segments.length - 1) {
        items.push({ name: label });
      } else {
        items.push({
          name: label,
          item: `${SITE_URL}/${segments.slice(0, i + 1).join("/")}`,
        });
      }
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      ...(it.item ? { item: it.item } : {}),
    })),
  };
}
