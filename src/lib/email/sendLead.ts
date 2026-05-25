/**
 * Lead → email delivery via Resend.
 *
 * Env vars:
 *   RESEND_API_KEY   — from https://resend.com/api-keys (required)
 *   LEAD_EMAIL_TO    — recipient address (default: info@elchaigroup.com)
 *   LEAD_EMAIL_FROM  — sender address. Must be from a Resend-verified domain.
 *                      Default: "Elchai Website <leads@elchaigroup.com>"
 *                      For pre-verification testing: "onboarding@resend.dev"
 *
 * Failure is logged and swallowed — the public POST always returns ok so a
 * broken SMTP setup never blocks a lead from being captured elsewhere.
 */

import { Resend } from "resend";

export interface LeadEmailPayload {
  source: "whatsapp" | "consultation";
  name?: string;
  email?: string;
  phone?: string;
  dial?: string;
  message?: string;
  page?: string;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderHtml(lead: LeadEmailPayload): string {
  const rows: Array<[string, string | undefined]> = [
    ["Source",  lead.source],
    ["Name",    lead.name],
    ["Email",   lead.email],
    ["Phone",   lead.phone && lead.dial ? `${lead.dial} ${lead.phone}` : lead.phone],
    ["Page",    lead.page],
    ["Message", lead.message],
  ];
  const body = rows
    .filter(([, v]) => v && String(v).trim().length > 0)
    .map(([k, v]) => `
      <tr>
        <td style="padding:8px 14px;border-bottom:1px solid #eee;font:13px/1.4 system-ui;color:#666;vertical-align:top;width:120px;">${escapeHtml(k)}</td>
        <td style="padding:8px 14px;border-bottom:1px solid #eee;font:14px/1.5 system-ui;color:#111;white-space:pre-wrap;">${escapeHtml(String(v))}</td>
      </tr>`)
    .join("");

  return `<!doctype html>
<html><body style="margin:0;padding:24px;background:#f5f5f7;font-family:system-ui,-apple-system,Segoe UI,sans-serif;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e5e5e9;border-radius:12px;overflow:hidden;">
    <tr>
      <td style="padding:18px 22px;background:linear-gradient(135deg,#18DEFF,#7B6CFF);color:#fff;font:600 15px/1.3 system-ui;letter-spacing:.02em;">
        New ${escapeHtml(lead.source)} lead — Elchai Group
      </td>
    </tr>
    <tr>
      <td style="padding:0;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
          ${body}
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:14px 22px;background:#fafafa;font:12px/1.4 system-ui;color:#888;">
        Received ${new Date().toUTCString()}
      </td>
    </tr>
  </table>
</body></html>`;
}

function renderText(lead: LeadEmailPayload): string {
  const rows: Array<[string, string | undefined]> = [
    ["Source",  lead.source],
    ["Name",    lead.name],
    ["Email",   lead.email],
    ["Phone",   lead.phone && lead.dial ? `${lead.dial} ${lead.phone}` : lead.phone],
    ["Page",    lead.page],
    ["Message", lead.message],
  ];
  return rows
    .filter(([, v]) => v && String(v).trim().length > 0)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
}

export async function sendLeadEmail(lead: LeadEmailPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[lead/email] RESEND_API_KEY not set — skipping email delivery");
    return;
  }
  const to = process.env.LEAD_EMAIL_TO || "info@elchaigroup.com";
  const from = process.env.LEAD_EMAIL_FROM || "Elchai Website <leads@elchaigroup.com>";

  const subject =
    lead.source === "consultation"
      ? `New consultation request${lead.name ? ` — ${lead.name}` : ""}`
      : `New WhatsApp lead${lead.phone ? ` — ${lead.phone}` : ""}`;

  try {
    const resend = new Resend(apiKey);
    // Intentionally no replyTo. The lead address is attacker-controlled and
    // putting it in an RFC-5322 header is a phishing surface — staff should
    // reply via CRM, not via the operator inbox.
    const { error } = await resend.emails.send({
      from,
      to: [to],
      subject,
      html: renderHtml(lead),
      text: renderText(lead),
    });
    if (error) {
      console.error("[lead/email] Resend error", error);
    }
  } catch (err) {
    console.error("[lead/email] send failed", err);
  }
}
