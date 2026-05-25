import { NextResponse } from "next/server";
import { z } from "zod";
import { forwardLeadToWp } from "@/lib/wp/lead";
import { sendLeadEmail } from "@/lib/email/sendLead";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LeadSchema = z.object({
  source: z.enum(["whatsapp", "consultation"]),
  name: z.string().trim().min(1).max(120).optional(),
  email: z.string().trim().email().max(200).optional(),
  phone: z.string().trim().min(4).max(40).optional(),
  dial: z.string().trim().max(8).optional(),
  message: z.string().trim().max(4000).optional(),
  page: z.string().trim().max(500).optional(),
  // Honeypot — must be empty.
  website: z.string().max(0).optional(),
  // Time-to-submit guard (ms since form mount). Bots usually submit < 1500ms.
  ttsMs: z.number().int().nonnegative().optional(),
});

type Lead = z.infer<typeof LeadSchema>;

async function forward(lead: Lead) {
  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) return;
  try {
    await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        text: `New lead (${lead.source})`,
        lead,
        receivedAt: new Date().toISOString(),
      }),
      // Don't hold the request — but await so logs surface errors.
      signal: AbortSignal.timeout(5000),
    });
  } catch (err) {
    console.error("[lead] webhook forward failed", err);
  }
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = LeadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "invalid_payload", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const lead = parsed.data;

  if (lead.website && lead.website.length > 0) {
    return NextResponse.json({ ok: true });
  }
  if (typeof lead.ttsMs === "number" && lead.ttsMs < 1200) {
    return NextResponse.json({ ok: true });
  }

  if (lead.source === "consultation" && (!lead.name || !lead.email)) {
    return NextResponse.json(
      { ok: false, error: "missing_required" },
      { status: 400 }
    );
  }
  if (lead.source === "whatsapp" && !lead.phone) {
    return NextResponse.json(
      { ok: false, error: "missing_required" },
      { status: 400 }
    );
  }

  // Fan out: internal webhook + WordPress + email.
  // All best-effort; never block the response on a downstream failure.
  await Promise.allSettled([
    forward(lead),
    forwardLeadToWp({
      source: lead.source,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      dial: lead.dial,
      message: lead.message,
      page: lead.page,
    }),
    sendLeadEmail({
      source: lead.source,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      dial: lead.dial,
      message: lead.message,
      page: lead.page,
    }),
  ]);

  console.info("[lead]", {
    source: lead.source,
    page: lead.page,
    hasEmail: Boolean(lead.email),
    hasPhone: Boolean(lead.phone),
  });

  return NextResponse.json({ ok: true });
}
