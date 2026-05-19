"use client";

/**
 * §17 — Frequently Asked Questions.
 * Sticky header column on the left; accordion of 6 Q&A items on the right.
 * Uses the curated 21st.dev Accordion (numbered, "+" rotate-to-X).
 *
 * Also emits FAQPage JSON-LD — primary GEO signal that lets AI search
 * engines (ChatGPT search, Perplexity, Google AI Overviews) ingest the
 * Q&A pairs directly and surface them when users ask matching questions.
 * JSON-LD payload is hardcoded content from `lib/content.ts`, so the
 * `dangerouslySetInnerHTML` here is the documented Next.js pattern, not
 * a user-input injection vector.
 */

import { Reveal } from "@/components/primitives/Reveal";
import { Accordion } from "@/components/ui/accordion";
import { faq } from "@/lib/content";

export function FAQ() {
  const items = faq.items.map((it) => ({
    id: it.n,
    question: it.q,
    answer: it.a,
  }));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };

  return (
    <section
      id="faq"
      className="relative py-10 lg:py-14"
      aria-label="Frequently asked questions"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14 py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start">
          <div className="lg:sticky lg:top-24">
            <Reveal>
              <span
                className="inline-flex items-center gap-2.5 font-[var(--font-mono)]
                           text-[11px] uppercase tracking-[0.22em] text-white/45"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-sky shadow-[0_0_8px_#18DEFF]" />
                {faq.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={0.10}>
              <h2
                className="mt-6 font-[var(--font-display)] font-bold leading-[1.04]
                           tracking-[-0.025em] text-[clamp(28px,3.8vw,56px)] max-w-[460px]"
              >
                {faq.heading}
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.20}>
            <Accordion items={items} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
