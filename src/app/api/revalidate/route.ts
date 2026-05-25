/**
 * Revalidation webhook.
 *
 * WordPress hits this endpoint after a post is saved/published so the
 * cached blog list and individual post pages refresh without a redeploy.
 *
 * Auth: shared secret in the `x-revalidate-secret` header, compared in
 * constant time. Set REVALIDATE_SECRET on the host AND in the WP plugin
 * that calls this endpoint. Requests without a matching secret return 401.
 *
 * Payload shape (JSON):
 *   {
 *     "tag":  "wp:posts" | "wp:post:<slug>"   // optional, repeatable as array
 *     "path": "/blog/<slug>" | "/blog-list"   // optional, repeatable as array
 *   }
 *
 * If no tags/paths are supplied, the full `wp:posts` tag is invalidated
 * (cheap, covers everything blog-derived).
 *
 * Combined tag + path count is capped at 50 to prevent cache-thrash DoS
 * if the secret ever leaks. Tag and path values are regex-validated.
 */

import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import { timingSafeEqual } from "node:crypto";
import { rateLimit, clientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TAG_RE = /^wp:(posts|post:[\w-]{1,200})$/;
const PATH_RE = /^\/[\w\-/]{0,200}$/;
const MAX_ENTRIES = 50;

const Body = z.object({
  tag: z.union([z.string(), z.array(z.string())]).optional(),
  path: z.union([z.string(), z.array(z.string())]).optional(),
});

function toArray(v: string | string[] | undefined): string[] {
  if (!v) return [];
  return Array.isArray(v) ? v : [v];
}

function safeEqual(a: string, b: string): boolean {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  return timingSafeEqual(aBuf, bBuf);
}

export async function POST(req: Request) {
  const ip = clientIp(req);
  const limit = rateLimit(`revalidate:${ip}`, 60, 60 * 1000);
  if (!limit.ok) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json(
      { ok: false, error: "revalidate_disabled" },
      { status: 503 }
    );
  }

  const provided = req.headers.get("x-revalidate-secret") ?? "";
  if (!safeEqual(provided, secret)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  let body: unknown = {};
  try {
    body = await req.json();
  } catch {
    /* allow empty body — defaults to full invalidation */
  }

  const parsed = Body.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "invalid_payload" },
      { status: 400 }
    );
  }

  const tags = toArray(parsed.data.tag);
  const paths = toArray(parsed.data.path);

  if (tags.length + paths.length > MAX_ENTRIES) {
    return NextResponse.json(
      { ok: false, error: "too_many_entries" },
      { status: 400 }
    );
  }
  if (tags.some((t) => !TAG_RE.test(t)) || paths.some((p) => !PATH_RE.test(p))) {
    return NextResponse.json(
      { ok: false, error: "invalid_entry" },
      { status: 400 }
    );
  }

  if (tags.length === 0 && paths.length === 0) {
    revalidateTag("wp:posts");
    return NextResponse.json({ ok: true, revalidated: { tags: ["wp:posts"], paths: [] } });
  }

  for (const t of tags) revalidateTag(t);
  for (const p of paths) revalidatePath(p);

  return NextResponse.json({ ok: true, revalidated: { tags, paths } });
}
