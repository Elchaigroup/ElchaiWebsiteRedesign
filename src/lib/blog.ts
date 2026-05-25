/**
 * Blog facade — single async surface for all blog data.
 *
 * Resolution order:
 *   1. WordPress (if WP_BASE_URL is set) — REST `/wp/v2/posts`, ISR-cached.
 *   2. Static registry (src/lib/blog-posts.ts) — always available, used
 *      both as the no-WP default AND as a safety net when WP errors.
 *
 * The static registry is the canonical content shape (BlogPost). The WP
 * mapper conforms to it, so callers see one stable interface.
 */

import { POSTS, type BlogPost } from "@/lib/blog-posts";
import { isWpEnabled } from "@/lib/wp/client";
import { wpGetPostBySlug, wpListPosts } from "@/lib/wp/posts";

export type { BlogPost, BlogCategory } from "@/lib/blog-posts";

async function fromWpOrNull<T>(fn: () => Promise<T | null>): Promise<T | null> {
  if (!isWpEnabled()) return null;
  try {
    return await fn();
  } catch (err) {
    console.error("[blog] WP fetch failed, falling back to static", err);
    return null;
  }
}

export async function listPosts(): Promise<BlogPost[]> {
  const remote = await fromWpOrNull(() => wpListPosts());
  if (remote && remote.length > 0) return remote;
  return POSTS as BlogPost[];
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const remote = await fromWpOrNull(() => wpGetPostBySlug(slug));
  if (remote) return remote;
  return POSTS.find((p) => p.slug === slug);
}

export async function getRelatedPosts(slug: string, limit = 3): Promise<BlogPost[]> {
  const all = await listPosts();
  const current = all.find((p) => p.slug === slug);
  if (!current) return all.slice(0, limit);
  const sameCat = all.filter(
    (p) => p.slug !== slug && p.categories.some((c) => current.categories.includes(c)),
  );
  if (sameCat.length >= limit) return sameCat.slice(0, limit);
  const others = all.filter((p) => p.slug !== slug && !sameCat.includes(p));
  return [...sameCat, ...others].slice(0, limit);
}

export async function listPostSlugs(): Promise<string[]> {
  const all = await listPosts();
  return all.map((p) => p.slug);
}
