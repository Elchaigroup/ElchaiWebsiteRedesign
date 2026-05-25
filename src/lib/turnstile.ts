/**
 * Cloudflare Turnstile token verification.
 *
 * Activates only when TURNSTILE_SECRET_KEY is set. Until then,
 * verifyTurnstile() returns true so the lead form keeps working in
 * environments without a configured site key.
 *
 * Front-end widget reads NEXT_PUBLIC_TURNSTILE_SITE_KEY and posts the
 * resulting token as `turnstileToken` in the lead payload.
 */
export async function verifyTurnstile(token: string | undefined, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured; fail-open
  if (!token) return false;

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { success?: boolean };
    return Boolean(data.success);
  } catch {
    return false;
  }
}
