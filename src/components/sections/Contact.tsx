"use client";

/**
 * §18 — Contact + 7 offices.
 * Dubai HQ card (full details) on the left; "Our Presence" grid of 7
 * international offices on the right. Legend row underneath separates
 * direct-operations vs partner locations.
 */

import Link from "next/link";
import { Reveal } from "@/components/primitives/Reveal";
import { Parallax } from "@/components/primitives/Parallax";
import { useContent } from "@/lib/use-content";

const FLAG_EMOJI: Record<string, string> = {
  "United-Arab-Emirates": "🇦🇪",
  Belgium: "🇧🇪",
  Albania: "🇦🇱",
  "Sultanate-of-Oman": "🇴🇲",
  Hungary: "🇭🇺",
  Italy: "🇮🇹",
  UAE: "🇦🇪",
};

export function Contact() {
  const { contact } = useContent();
  return (
    <section
      id="contact"
      className="relative py-10 lg:py-14"
      aria-label="Contact"
    >
      <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-14 lg:py-20">
        <Reveal>
          <span
            className="inline-flex items-center gap-2.5 font-[var(--font-mono)]
                       text-[11px] uppercase tracking-[0.22em] text-white/45"
          >
            {contact.eyebrow}
          </span>
        </Reveal>
        <Reveal delay={0.10}>
          <h2
            className="mt-6 font-[var(--font-display)] font-bold leading-[1.04]
                       tracking-[-0.025em] text-[clamp(28px,3.8vw,56px)] max-w-[760px]"
          >
            {contact.heading}
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-12 items-stretch">
          <Reveal delay={0.20}>
            <div className="rounded-3xl glass glass-edge p-8 lg:p-12 h-full flex flex-col">
              <div className="flex items-center gap-3">
                <span className="text-2xl leading-none" aria-hidden="true">
                  {FLAG_EMOJI[contact.primary.flag] ?? ""}
                </span>
                <span className="font-[var(--font-mono)] text-[10px] tracking-[0.22em] text-brand-sky uppercase">
                  Headquarters · {contact.primary.city}
                </span>
              </div>

              <Link
                href={contact.primary.addressHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 text-[15px] leading-[1.65] text-white/75 hover:text-white transition-colors"
              >
                {contact.primary.address}
              </Link>

              <dl className="mt-8 space-y-4">
                <div className="flex flex-col gap-1">
                  <dt className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-white/40">
                    Email
                  </dt>
                  <dd>
                    <Link
                      href={`mailto:${contact.primary.email}`}
                      className="text-[15px] text-white/85 hover:text-brand-sky transition-colors"
                    >
                      {contact.primary.email}
                    </Link>
                  </dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-white/40">
                    Phone
                  </dt>
                  <dd>
                    <Link
                      href={`tel:${contact.primary.phone.replace(/\s/g, "")}`}
                      className="text-[15px] text-white/85 hover:text-brand-sky transition-colors"
                    >
                      {contact.primary.phone}
                    </Link>
                  </dd>
                </div>
              </dl>

              <p
                className="mt-10 font-[var(--font-display)] font-light leading-[1.40]
                           tracking-[-0.012em] text-[clamp(18px,1.6vw,24px)] text-white/70"
              >
                {contact.primary.pitch}
              </p>

              <Link
                href={contact.primary.cta.href}
                className="cta cta--primary mt-auto self-start"
              >
                {contact.primary.cta.label}
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.28}>
            <Parallax amount={-40} className="rounded-3xl glass glass-edge p-8 lg:p-12 h-full">
              <span className="font-[var(--font-mono)] text-[10px] tracking-[0.22em] text-white/50 uppercase">
                {contact.presenceLabel}
              </span>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
                {contact.offices.map((o, i) => (
                  <div
                    key={`${o.city}-${i}`}
                    className="bg-[rgba(10,10,14,0.55)] p-5 lg:p-6 flex items-start gap-4"
                  >
                    <span className="text-2xl leading-none" aria-hidden="true">
                      {FLAG_EMOJI[o.flag] ?? "🌐"}
                    </span>
                    <div>
                      <div className="font-[var(--font-display)] font-medium text-[15px] tracking-[-0.01em] text-white">
                        {o.city}
                      </div>
                      <div className="mt-1 text-[12px] text-white/70">{o.country}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-[12px] text-white/70">
                {contact.legend.map((l) => (
                  <div key={l.label} className="flex items-center gap-2.5">
                    <span
                      aria-hidden="true"
                      className={
                        l.href === "#Strategic"
                          ? "w-2 h-2 rounded-full bg-brand-sky shadow-[0_0_8px_#18DEFF]"
                          : "w-2 h-2 rounded-full border border-brand-sky"
                      }
                    />
                    <span>{l.label}</span>
                  </div>
                ))}
              </div>
            </Parallax>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
