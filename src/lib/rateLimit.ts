/**
 * Tiny in-memory per-key sliding-window rate limiter.
 *
 * Suitable for single-instance hosting (Vercel serverless invocations
 * are warm-pooled per region, so this still throttles the typical
 * attacker). For multi-region / horizontally scaled deployments, swap
 * to @upstash/ratelimit with Redis.
 */
type Bucket = { count: number; resetAt: number };
const BUCKETS = new Map<string, Bucket>();
const MAX_KEYS = 10_000;

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  resetAt: number;
}

export function rateLimit(key: string, max: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  const existing = BUCKETS.get(key);

  if (!existing || existing.resetAt <= now) {
    if (BUCKETS.size >= MAX_KEYS) {
      // Cheap eviction: drop the oldest 10% of expired buckets.
      for (const [k, v] of BUCKETS) {
        if (v.resetAt <= now) BUCKETS.delete(k);
        if (BUCKETS.size < MAX_KEYS * 0.9) break;
      }
    }
    const bucket: Bucket = { count: 1, resetAt: now + windowMs };
    BUCKETS.set(key, bucket);
    return { ok: true, remaining: max - 1, resetAt: bucket.resetAt };
  }

  existing.count += 1;
  return {
    ok: existing.count <= max,
    remaining: Math.max(0, max - existing.count),
    resetAt: existing.resetAt,
  };
}

export function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  return (
    req.headers.get("x-real-ip") ||
    req.headers.get("cf-connecting-ip") ||
    "unknown"
  );
}
