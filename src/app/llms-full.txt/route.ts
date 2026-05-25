/**
 * /llms-full.txt — extended LLM-friendly content dump.
 *
 * The companion to /llms.txt (which is a curated overview): this route emits
 * a structured, plain-text summary of every published service so that AI
 * crawlers (ChatGPT Search, Perplexity, Claude, Gemini) can ingest the full
 * surface without executing JavaScript or parsing 40+ HTML pages.
 *
 * Source of truth: the service registry under src/lib/services. Drift-free.
 */

import { listServicePages } from "@/lib/service-pages";
import { getServiceDetailContent } from "@/lib/services";

const SITE_URL = "https://www.elchaigroup.com";

function line(s = "") {
  return `${s}\n`;
}

export async function GET() {
  const pages = listServicePages();
  const published = pages
    .map((p) => ({ page: p, detail: getServiceDetailContent(p.slug) }))
    .filter((x): x is { page: typeof pages[number]; detail: NonNullable<ReturnType<typeof getServiceDetailContent>> } => x.detail !== null);

  // Group by category for navigability.
  const byCategory = new Map<string, typeof published>();
  for (const entry of published) {
    const cat = entry.page.category || "Other";
    if (!byCategory.has(cat)) byCategory.set(cat, []);
    byCategory.get(cat)!.push(entry);
  }

  let out = "";
  out += line("# Elchai Group — Full Service Catalog");
  out += line();
  out += line("> Dubai-based AI and blockchain consultancy. This file mirrors the");
  out += line("> live service catalog at https://www.elchaigroup.com for AI");
  out += line("> crawlers and answer engines. For a short overview see /llms.txt.");
  out += line();
  out += line("Last refreshed: 2026-05-25");
  out += line(`Total published services: ${published.length}`);
  out += line();
  out += line("---");
  out += line();

  for (const [category, items] of byCategory) {
    out += line(`## ${category}`);
    out += line();
    for (const { page, detail } of items) {
      const url = `${SITE_URL}/${page.slug}`;
      const heading = detail.hero.heading ?? page.title;
      const body =
        detail.hero.subheading ??
        detail.hero.body ??
        `${page.title} services from Elchai Group.`;

      out += line(`### ${heading}`);
      out += line(`URL: ${url}`);
      out += line();
      out += line(body);
      out += line();

      if (detail.capabilities?.items?.length) {
        out += line("Capabilities:");
        for (const cap of detail.capabilities.items) {
          const desc = cap.desc ? ` — ${cap.desc}` : "";
          out += line(`- ${cap.title}${desc}`);
        }
        out += line();
      }

      if (detail.process?.steps?.length) {
        out += line(`Process — ${detail.process.heading ?? "Delivery methodology"}:`);
        detail.process.steps.forEach((s, i) => {
          out += line(`${i + 1}. ${s.title} — ${s.desc}`);
        });
        out += line();
      }

      if (detail.faq?.items?.length) {
        out += line("FAQ:");
        for (const it of detail.faq.items) {
          out += line(`Q: ${it.q}`);
          out += line(`A: ${it.a}`);
          out += line();
        }
      }

      out += line("---");
      out += line();
    }
  }

  out += line("## Contact");
  out += line();
  out += line("- Website: https://www.elchaigroup.com");
  out += line("- Email: info@elchaigroup.com");
  out += line("- Phone: +971 4 883 7176");
  out += line("- Headquarters: Jumeirah Lakes Towers, Dubai, United Arab Emirates");
  out += line();

  return new Response(out, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
