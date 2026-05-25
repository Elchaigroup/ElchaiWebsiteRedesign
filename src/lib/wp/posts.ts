/**
 * WordPress → BlogPost mapping.
 *
 * Maps the WP REST `/wp/v2/posts` response onto the BlogPost shape consumers
 * already use, so /blog-list, /blog/[slug], and the sitemap need no changes
 * beyond awaiting an async helper.
 */

import type { BlogCategory, BlogPost } from "@/lib/blog-posts";
import { WP_TAG, wpFetch } from "./client";
import type { WPPost, WPTerm } from "./types";

const CATEGORY_MAP: Record<string, BlogCategory> = {
  "artificial-intelligence": "Artificial Intelligence",
  blog: "Blog",
  news: "News",
  "web3-news": "Web3 News",
};

function decodeHtml(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&#8217;/g, "’")
    .replace(/&#8216;/g, "‘")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#038;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
}

function htmlToParagraphs(html: string): string[] {
  // Strip scripts/styles, split on <p>, drop tags, decode entities, trim.
  const stripped = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "");
  const blocks = stripped
    .split(/<\/?p[^>]*>/i)
    .map((b) => decodeHtml(b.replace(/<[^>]+>/g, "")).trim())
    .filter((b) => b.length > 0);
  return blocks;
}

function formatDate(iso: string): string {
  // Match the static registry style: "January 8, 2025".
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function pickCategoryName(slug: string, name: string): BlogCategory {
  return CATEGORY_MAP[slug] ?? (name as BlogCategory) ?? "Blog";
}

export function mapWpPost(wp: WPPost): BlogPost {
  const terms = (wp._embedded?.["wp:term"] ?? [])
    .flat()
    .filter((t): t is WPTerm => Boolean(t) && t.taxonomy === "category");
  const categories: BlogCategory[] = terms.length
    ? terms.map((t) => pickCategoryName(t.slug, t.name))
    : ["Blog"];

  const media = wp._embedded?.["wp:featuredmedia"]?.[0];
  const featured =
    media?.media_details?.sizes?.large?.source_url ??
    media?.source_url ??
    "/elchai/blog/blockchain-copy.webp";

  return {
    slug: wp.slug,
    title: decodeHtml(wp.title.rendered),
    category: categories[0] ?? "Blog",
    categories,
    date: formatDate(wp.date),
    image: featured,
    href: `/blog/${wp.slug}`,
    body: htmlToParagraphs(wp.content.rendered),
  };
}

const POST_FIELDS =
  "id,slug,date,modified,link,title,excerpt,content,featured_media,categories";

export async function wpListPosts(limit = 100): Promise<BlogPost[] | null> {
  const posts = await wpFetch<WPPost[]>("/wp/v2/posts", {
    query: {
      per_page: Math.min(limit, 100),
      _embed: "wp:featuredmedia,wp:term",
      _fields: `${POST_FIELDS},_links,_embedded`,
      status: "publish",
      orderby: "date",
      order: "desc",
    },
    tags: [WP_TAG.posts],
  });
  if (!posts) return null;
  return posts.map(mapWpPost);
}

export async function wpGetPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await wpFetch<WPPost[]>("/wp/v2/posts", {
    query: {
      slug,
      _embed: "wp:featuredmedia,wp:term",
      _fields: `${POST_FIELDS},_links,_embedded`,
      status: "publish",
    },
    tags: [WP_TAG.post(slug), WP_TAG.posts],
  });
  const first = posts?.[0];
  if (!first) return null;
  return mapWpPost(first);
}
