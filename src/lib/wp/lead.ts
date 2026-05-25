/**
 * Lead forwarding to WordPress.
 *
 * Two delivery modes, chosen by env:
 *   1. WP_LEAD_ENDPOINT = full URL → POST the JSON payload there. Use this
 *      with a custom MU plugin route (see docs/wordpress.md) or any other
 *      WP-side handler (Contact Form 7 webhook, WPForms, Gravity Forms, etc).
 *   2. Otherwise, if WP_BASE_URL is set, fall back to POSTing to
 *      `${WP_BASE_URL}/wp-json/elchai/v1/leads`.
 *
 * Never throws on the request path — failure is logged and swallowed so the
 * client always sees a successful submission. The internal webhook
 * (LEAD_WEBHOOK_URL) remains the source of truth.
 */

import { getWpConfig } from "./client";

export interface LeadPayload {
  source: "whatsapp" | "consultation";
  name?: string;
  email?: string;
  phone?: string;
  dial?: string;
  message?: string;
  page?: string;
}

export async function forwardLeadToWp(lead: LeadPayload): Promise<void> {
  const explicit = process.env.WP_LEAD_ENDPOINT;
  const cfg = getWpConfig();
  const url = explicit ?? (cfg ? `${cfg.baseUrl}/wp-json/elchai/v1/leads` : null);
  if (!url) return;

  const headers: Record<string, string> = {
    "content-type": "application/json",
    accept: "application/json",
  };
  if (cfg?.authHeader) headers.authorization = cfg.authHeader;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({ ...lead, receivedAt: new Date().toISOString() }),
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) {
      console.error("[wp-lead] forward failed", { status: res.status });
    }
  } catch (err) {
    console.error("[wp-lead] network error", err);
  }
}
