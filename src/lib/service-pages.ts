/**
 * service-pages — Registry of all internal routes referenced from nav + footer.
 *
 * Used by Step 6 stub generation so the ~40 service-page destinations don't
 * 404. The dynamic [slug] route uses this for generateStaticParams; the stub
 * page renders title + category breadcrumb from this lookup.
 *
 * Slugs are derived from each href: strip leading/trailing slash and any
 * `#` fragment. Multi-segment paths are filtered out (none in the source).
 */

import { nav, footer } from "./content";

export type ServicePage = {
  slug: string;
  title: string;
  category: string;
};

function slugFromHref(href: string): string | null {
  if (!href || href === "#" || !href.startsWith("/")) return null;
  const cleaned = href.split("#")[0].replace(/^\/+|\/+$/g, "");
  if (!cleaned) return null;
  if (cleaned.includes("/")) return null;
  return cleaned;
}

export function listServicePages(): ServicePage[] {
  const out = new Map<string, ServicePage>();

  function add(href: string, label: string, category: string) {
    const slug = slugFromHref(href);
    if (!slug) return;
    if (!out.has(slug)) {
      out.set(slug, { slug, title: label, category });
    }
  }

  // Mega-menu groups
  for (const groupKey of ["blockchain", "cryptocurrency", "ai"] as const) {
    const group = nav[groupKey];
    for (const col of group.columns) {
      for (const item of col.items) {
        add(item.href, item.label, `${group.label} · ${col.title}`);
      }
    }
  }

  // Top-level nav items + their children.
  // Use the item's OWN label as its category (not a generic "Company")
  // so categoryToVariant() can route App Development → "appdev",
  // About Us → its own variant, etc.
  for (const item of nav.topLevel) {
    add(item.href, item.label, item.label);
    if ("children" in item && item.children) {
      for (const child of item.children) {
        add(child.href, child.label, item.label);
      }
    }
  }

  // Footer sitemap
  for (const col of footer.columns) {
    for (const item of col.items) {
      add(item.href, item.label, col.title);
    }
  }

  return Array.from(out.values()).sort((a, b) => a.slug.localeCompare(b.slug));
}

export function getServicePage(slug: string): ServicePage | null {
  return listServicePages().find((p) => p.slug === slug) ?? null;
}

export type SceneTintKey = "default" | "blockchain" | "ai" | "crypto";

/**
 * Map a service-page category string to a BackgroundScene tint.
 * Categories come from listServicePages() and look like:
 *   "Blockchain · Services" | "Artificial Intelligence · AI Solutions"
 *   "Cryptocurrency · Wallets" | "Blockchain & Web3" | "Company" | "App Development"
 */
export function categoryToTint(category: string): SceneTintKey {
  const c = category;
  if (c.startsWith("Blockchain") || c.startsWith("Metaverse")) return "blockchain";
  if (c.startsWith("Cryptocurrency")) return "crypto";
  if (
    c.startsWith("Artificial Intelligence") ||
    c.startsWith("AI") ||
    c.startsWith("ML")
  ) {
    return "ai";
  }
  return "default";
}

/**
 * Map a service-page category to a BackgroundScene 3D variant.
 *   Blockchain      → "chain"  (spiral chain of blocks + links + tx pulses)
 *   Metaverse       → "key"    (horizontal master-key)
 *   Crypto          → "crypto" (orbit-arc + notched coin + embossed key)
 *   AI              → "neural" (Fibonacci neural cluster + orbit + data ring)
 *   App Development → "appdev" (wireframe phone + tiles + brackets + gears + rockets)
 *   Default         → "key"    (matches the homepage)
 */
export type SceneVariantKey =
  | "ribbon" | "globe" | "key" | "crypto" | "neural" | "chain" | "appdev";
export function categoryToVariant(category: string): SceneVariantKey {
  const c = category;
  if (c.startsWith("Blockchain")) return "chain";
  if (c.startsWith("Metaverse")) return "key";
  if (c.startsWith("Cryptocurrency")) return "crypto";
  if (
    c.startsWith("Artificial Intelligence") ||
    c.startsWith("AI") ||
    c.startsWith("ML")
  ) {
    return "neural";
  }
  if (c.startsWith("App Development") || c.startsWith("Mobile")) return "appdev";
  return "key";
}
