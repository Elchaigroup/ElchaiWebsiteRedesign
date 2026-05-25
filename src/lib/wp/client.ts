/**
 * WordPress REST client.
 *
 * Reads connection from env at request time. If WP_BASE_URL is unset, every
 * helper returns null and callers fall back to the static content registry
 * — the site keeps working with zero WP dependency.
 *
 * Auth: WordPress Application Passwords (Basic). Generate one in
 * wp-admin → Users → Profile → Application Passwords.
 *
 * Caching: Next 15 `fetch` with `next.revalidate` + `next.tags`. Use
 * `revalidateTag("wp:posts")` from the /api/revalidate webhook to flush
 * after a post saves.
 */

import type { WPError } from "./types";

export const WP_TAG = {
  posts: "wp:posts",
  post: (slug: string) => `wp:post:${slug}`,
} as const;

const DEFAULT_REVALIDATE_SECONDS = 300;

export function getWpConfig() {
  const baseUrl = process.env.WP_BASE_URL?.replace(/\/+$/, "");
  const user = process.env.WP_APP_USER;
  const pass = process.env.WP_APP_PASSWORD;
  if (!baseUrl) return null;
  const authHeader =
    user && pass
      ? "Basic " + Buffer.from(`${user}:${pass}`).toString("base64")
      : undefined;
  return { baseUrl, authHeader };
}

export function isWpEnabled(): boolean {
  return getWpConfig() !== null;
}

interface WpGetOptions {
  query?: Record<string, string | number | boolean | undefined>;
  revalidate?: number | false;
  tags?: string[];
  // For mutations, override the method.
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  // Per-request auth override (e.g. a token from a different env var).
  authHeader?: string;
}

export class WpError extends Error {
  status: number;
  code: string;
  constructor(message: string, status: number, code: string) {
    super(message);
    this.name = "WpError";
    this.status = status;
    this.code = code;
  }
}

function buildUrl(baseUrl: string, path: string, query?: WpGetOptions["query"]) {
  const url = new URL(
    path.startsWith("/") ? path : `/${path}`,
    baseUrl + "/wp-json/"
  );
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v === undefined) continue;
      url.searchParams.set(k, String(v));
    }
  }
  return url.toString();
}

export async function wpFetch<T>(
  path: string,
  opts: WpGetOptions = {}
): Promise<T | null> {
  const cfg = getWpConfig();
  if (!cfg) return null;

  const url = buildUrl(cfg.baseUrl, path, opts.query);
  const method = opts.method ?? "GET";
  const headers: Record<string, string> = { accept: "application/json" };
  const auth = opts.authHeader ?? cfg.authHeader;
  if (auth) headers.authorization = auth;
  if (opts.body !== undefined) headers["content-type"] = "application/json";

  const init: RequestInit & { next?: { revalidate?: number | false; tags?: string[] } } = {
    method,
    headers,
    body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
  };

  if (method === "GET") {
    init.next = {
      revalidate:
        opts.revalidate === undefined ? DEFAULT_REVALIDATE_SECONDS : opts.revalidate,
      tags: opts.tags,
    };
  } else {
    init.cache = "no-store";
  }

  let res: Response;
  try {
    res = await fetch(url, init);
  } catch (err) {
    console.error("[wp] network error", { url, err });
    return null;
  }

  if (res.status === 404) return null;

  if (!res.ok) {
    let body: WPError | undefined;
    try {
      body = (await res.json()) as WPError;
    } catch {
      /* ignore */
    }
    const msg = body?.message ?? `WP ${method} failed with ${res.status}`;
    throw new WpError(msg, res.status, body?.code ?? "wp_http_error");
  }

  return (await res.json()) as T;
}
