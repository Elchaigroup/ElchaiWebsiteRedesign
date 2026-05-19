"use client";

/**
 * ServiceDetail — universal template for all service pages.
 * Renders only the sections present in the structured content prop.
 * Same brand chrome (eyebrow pill, gradient accent, Reveal stagger) as
 * the homepage sections, so a service page feels native to the site.
 *
 * Also emits FAQPage JSON-LD when the service-detail content includes
 * a faq block — primary GEO signal so ChatGPT Search, Perplexity and
 * Google AI Overviews can ingest the Q/A pairs directly. JSON-LD body
 * is generated from hardcoded content in `lib/service-detail-content.ts`,
 * so the `dangerouslySetInnerHTML` here is the documented Next.js
 * pattern, not a user-input injection vector.
 */

import Link from "next/link";
import { Reveal } from "@/components/primitives/Reveal";
import { Parallax } from "@/components/primitives/Parallax";
import { Accordion } from "@/components/ui/accordion";
import type { ServiceDetailContent } from "@/lib/service-detail-types";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2.5 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-white/45">
      <span className="w-1.5 h-1.5 rounded-full bg-brand-sky shadow-[0_0_8px_#18DEFF]" />
      {children}
    </span>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function ServiceDetail({
  content,
  slug,
}: {
  content: ServiceDetailContent;
  slug: string;
}) {
  const { hero, stats, capabilities, midBanner, solutions, industries, challenges, impact, whyChoose, techStack, process, faq, closing, extraBanners } = content;

  // Tiny helper — renders any extraBanners whose position matches the
  // current anchor. Returns null when nothing matches so it can sit
  // safely between sections without an empty fragment.
  function ExtraBanners({ at }: { at: NonNullable<typeof extraBanners>[number]["position"] }) {
    const matching = (extraBanners ?? []).filter((b) => b.position === at);
    if (matching.length === 0) return null;
    return (
      <>
        {matching.map((b, i) => (
          <section
            key={`${at}-${i}`}
            className="relative py-12 lg:py-16"
            aria-label={b.heading}
          >
            <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-14 lg:py-20">
              <Reveal>
                <div className="rounded-3xl glass glass-edge p-8 lg:p-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <h2 className="font-[var(--font-display)] font-bold leading-[1.10] tracking-[-0.015em] text-[clamp(20px,2.2vw,32px)] max-w-[820px]">
                    {b.heading}
                  </h2>
                  <Link href={b.cta.href} className="cta cta--primary shrink-0">
                    {b.cta.label}
                    <ArrowIcon />
                  </Link>
                </div>
              </Reveal>
            </div>
          </section>
        ))}
      </>
    );
  }

  // Combined JSON-LD array — Service + BreadcrumbList always; FAQPage
  // only when the service has FAQ content. Sourced entirely from
  // hardcoded values in `lib/service-detail-content.ts`, so the
  // existing `dangerouslySetInnerHTML` below is the documented Next.js
  // JSON-LD pattern, not a user-input injection vector.
  const SITE_URL = "https://www.elchaigroup.com";
  const pageUrl = `${SITE_URL}/${slug}`;
  const schemasJsonLd: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: hero.heading,
      description: hero.subheading ?? hero.body ?? `${hero.heading} services from Elchai Group.`,
      serviceType: content.category,
      url: pageUrl,
      areaServed: "Worldwide",
      provider: {
        "@type": "Organization",
        name: "Elchai Group",
        url: SITE_URL,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: content.category },
        { "@type": "ListItem", position: 3, name: hero.heading, item: pageUrl },
      ],
    },
  ];
  if (faq) {
    schemasJsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.items.map((it) => ({
        "@type": "Question",
        name: it.q,
        acceptedAnswer: { "@type": "Answer", text: it.a },
      })),
    });
  }

  return (
    <main className="relative" style={{ zIndex: 1 }}>
      {schemasJsonLd.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemasJsonLd) }}
        />
      )}
      {/* ─────────── Hero ─────────── */}
      <section
        className="relative pt-40 pb-24 lg:pt-48 lg:pb-32"
        aria-label={hero.heading}
      >
        <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-14 lg:py-20">
          <Reveal>
            <nav
              aria-label="Breadcrumb"
              className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-white/45 flex flex-wrap items-center gap-2"
            >
              <Link href="/" className="hover:text-brand-sky transition-colors">Home</Link>
              <span aria-hidden="true" className="text-white/30">/</span>
              <span className="text-white/65">{content.category}</span>
            </nav>
          </Reveal>

          {hero.eyebrow && (
            <Reveal delay={0.10}>
              <div className="mt-8">
                <Eyebrow>{hero.eyebrow}</Eyebrow>
              </div>
            </Reveal>
          )}

          <Reveal delay={0.18}>
            <h1
              className="mt-8 font-[var(--font-display)] font-bold leading-[1.02]
                         tracking-[-0.028em] text-[clamp(38px,6.0vw,92px)] max-w-[1080px]"
            >
              {hero.heading}
            </h1>
          </Reveal>

          {hero.subheading && (
            <Reveal delay={0.26}>
              <p className="mt-6 font-[var(--font-display)] font-light text-[clamp(18px,1.7vw,24px)] leading-[1.40] text-white/80 max-w-[760px]">
                {hero.subheading}
              </p>
            </Reveal>
          )}

          {hero.body && (
            <Reveal delay={0.32}>
              <p className="mt-6 text-[15px] leading-[1.65] text-white/65 max-w-[640px]">
                {hero.body}
              </p>
            </Reveal>
          )}

          {(hero.primaryCta || hero.ghostCta) && (
            <Reveal delay={0.40}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                {hero.primaryCta && (
                  <Link href={hero.primaryCta.href} className="cta cta--primary">
                    {hero.primaryCta.label}
                    <ArrowIcon />
                  </Link>
                )}
                {hero.ghostCta && (
                  <Link href={hero.ghostCta.href} className="cta cta--ghost">
                    {hero.ghostCta.label}
                  </Link>
                )}
              </div>
            </Reveal>
          )}

          {stats && stats.length > 0 && (
            <Reveal delay={0.48}>
              <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden max-w-[940px]">
                {stats.map((s) => (
                  <div key={s.label} className="bg-[rgba(10,10,14,0.6)] p-6 lg:p-8">
                    <div className="font-[var(--font-display)] font-bold leading-none tracking-[-0.02em] text-[clamp(34px,3.6vw,52px)] text-white">
                      {s.value}
                    </div>
                    <div className="mt-3 text-[12px] leading-[1.45] text-white/55 max-w-[160px]">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ─────────── Capabilities ─────────── */}
      {capabilities && (
        <section className="relative py-24 lg:py-32" aria-label={capabilities.heading}>
          <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-14 lg:py-20">
            {capabilities.eyebrow && (
              <Reveal><Eyebrow>{capabilities.eyebrow}</Eyebrow></Reveal>
            )}
            <div className="mt-6 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <Reveal delay={0.10}>
                <h2 className="font-[var(--font-display)] font-bold leading-[1.04] tracking-[-0.025em] text-[clamp(28px,3.8vw,56px)] max-w-[760px]">
                  {capabilities.heading}
                </h2>
              </Reveal>
              {capabilities.body && (
                <Reveal delay={0.20}>
                  <p className="text-[15px] leading-[1.65] text-white/65 max-w-[460px]">
                    {capabilities.body}
                  </p>
                </Reveal>
              )}
            </div>

            <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
              {capabilities.items.map((it, i) => (
                <Reveal key={it.title} delay={0.18 + (i % 6) * 0.04}>
                  <div className="h-full bg-[rgba(10,10,14,0.6)] p-7 lg:p-8 flex flex-col gap-4">
                    <span className="font-[var(--font-mono)] text-[10px] tracking-[0.22em] text-brand-sky uppercase">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-[var(--font-display)] font-bold tracking-[-0.012em] text-[clamp(17px,1.4vw,20px)] text-white">
                      {it.title}
                    </h3>
                    <p className="text-[13.5px] leading-[1.55] text-white/65">{it.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─────────── Mid CTA Banner ─────────── */}
      {midBanner && (
        <section className="relative py-12 lg:py-16" aria-label={midBanner.heading}>
          <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-14 lg:py-20">
            <Reveal>
              <div className="rounded-3xl glass glass-edge p-8 lg:p-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <h2 className="font-[var(--font-display)] font-bold leading-[1.10] tracking-[-0.015em] text-[clamp(20px,2.2vw,32px)] max-w-[820px]">
                  {midBanner.heading}
                </h2>
                <Link href={midBanner.cta.href} className="cta cta--primary shrink-0">
                  {midBanner.cta.label}
                  <ArrowIcon />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ─────────── Solutions (mirrors capabilities) ─────────── */}
      {solutions && (
        <section className="relative py-24 lg:py-32" aria-label={solutions.heading}>
          <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-14 lg:py-20">
            {solutions.eyebrow && (
              <Reveal><Eyebrow>{solutions.eyebrow}</Eyebrow></Reveal>
            )}
            <div className="mt-6 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <Reveal delay={0.10}>
                <h2 className="font-[var(--font-display)] font-bold leading-[1.04] tracking-[-0.025em] text-[clamp(28px,3.8vw,56px)] max-w-[760px]">
                  {solutions.heading}
                </h2>
              </Reveal>
              {solutions.body && (
                <Reveal delay={0.20}>
                  <p className="text-[15px] leading-[1.65] text-white/65 max-w-[460px]">
                    {solutions.body}
                  </p>
                </Reveal>
              )}
            </div>

            <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
              {solutions.items.map((it, i) => (
                <Reveal key={it.title} delay={0.18 + (i % 4) * 0.04}>
                  <div className="h-full bg-[rgba(10,10,14,0.6)] p-7 lg:p-8 flex flex-col gap-4">
                    <span className="font-[var(--font-mono)] text-[10px] tracking-[0.22em] text-brand-sky uppercase">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-[var(--font-display)] font-bold tracking-[-0.012em] text-[clamp(17px,1.4vw,20px)] text-white">
                      {it.title}
                    </h3>
                    <p className="text-[13.5px] leading-[1.55] text-white/65">{it.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─────────── Industries ─────────── */}
      {industries && (
        <section className="relative py-24 lg:py-32" aria-label={industries.heading}>
          <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-14 lg:py-20">
            {industries.eyebrow && (
              <Reveal><Eyebrow>{industries.eyebrow}</Eyebrow></Reveal>
            )}
            <div className="mt-6 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <Reveal delay={0.10}>
                <h2 className="font-[var(--font-display)] font-bold leading-[1.04] tracking-[-0.025em] text-[clamp(28px,3.8vw,56px)] max-w-[760px]">
                  {industries.heading}
                </h2>
              </Reveal>
              {industries.body && (
                <Reveal delay={0.20}>
                  <p className="text-[15px] leading-[1.65] text-white/65 max-w-[460px]">
                    {industries.body}
                  </p>
                </Reveal>
              )}
            </div>

            <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {industries.items.map((it, i) => (
                <Reveal key={it.title} delay={0.16 + (i % 4) * 0.05}>
                  <div className="h-full rounded-2xl glass glass-edge p-6 lg:p-7 flex flex-col gap-3">
                    <span className="font-[var(--font-mono)] text-[10px] tracking-[0.22em] text-brand-sky uppercase">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-[var(--font-display)] font-bold tracking-[-0.012em] text-[15px] text-white">
                      {it.title}
                    </h3>
                    {it.desc && <p className="text-[12.5px] leading-[1.55] text-white/65">{it.desc}</p>}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <ExtraBanners at="after-industries" />

      {/* ─────────── Challenges (where projects get stuck) ─────────── */}
      {challenges && (
        <section className="relative py-24 lg:py-32" aria-label={challenges.heading}>
          <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-14 lg:py-20">
            {challenges.eyebrow && (
              <Reveal><Eyebrow>{challenges.eyebrow}</Eyebrow></Reveal>
            )}
            <div className="mt-6 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <Reveal delay={0.10}>
                <h2 className="font-[var(--font-display)] font-bold leading-[1.04] tracking-[-0.025em] text-[clamp(28px,3.8vw,56px)] max-w-[760px]">
                  {challenges.heading}
                </h2>
              </Reveal>
              {challenges.body && (
                <Reveal delay={0.20}>
                  <p className="text-[15px] leading-[1.65] text-white/65 max-w-[460px]">
                    {challenges.body}
                  </p>
                </Reveal>
              )}
            </div>
            <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
              {challenges.items.map((it, i) => (
                <Reveal key={it.title} delay={0.18 + (i % 3) * 0.05}>
                  <div className="h-full bg-[rgba(10,10,14,0.6)] p-7 lg:p-8 flex flex-col gap-4">
                    <span className="font-[var(--font-mono)] text-[10px] tracking-[0.22em] text-brand-sky uppercase">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-[var(--font-display)] font-bold tracking-[-0.012em] text-[clamp(17px,1.4vw,20px)] text-white">
                      {it.title}
                    </h3>
                    <p className="text-[13.5px] leading-[1.55] text-white/65">{it.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <ExtraBanners at="after-challenges" />

      {/* ─────────── Impact (real business outcomes) ─────────── */}
      {impact && (
        <section className="relative py-24 lg:py-32" aria-label={impact.heading}>
          <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-14 lg:py-20">
            {impact.eyebrow && (
              <Reveal><Eyebrow>{impact.eyebrow}</Eyebrow></Reveal>
            )}
            <div className="mt-6 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <Reveal delay={0.10}>
                <h2 className="font-[var(--font-display)] font-bold leading-[1.04] tracking-[-0.025em] text-[clamp(28px,3.8vw,56px)] max-w-[760px]">
                  {impact.heading}
                </h2>
              </Reveal>
              {impact.body && (
                <Reveal delay={0.20}>
                  <p className="text-[15px] leading-[1.65] text-white/65 max-w-[460px]">
                    {impact.body}
                  </p>
                </Reveal>
              )}
            </div>
            <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {impact.items.map((it, i) => (
                <Reveal key={it.title} delay={0.18 + (i % 3) * 0.05}>
                  <div className="h-full rounded-2xl glass glass-edge p-7 lg:p-8 flex flex-col gap-3">
                    <h3 className="font-[var(--font-display)] font-bold tracking-[-0.012em] text-[clamp(17px,1.4vw,20px)] text-white">
                      {it.title}
                    </h3>
                    <p className="text-[13.5px] leading-[1.55] text-white/65">{it.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─────────── Why Choose ─────────── */}
      {whyChoose && (
        <section className="relative py-24 lg:py-32" aria-label={whyChoose.heading}>
          <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-14 lg:py-20">
            {whyChoose.eyebrow && (
              <Reveal><Eyebrow>{whyChoose.eyebrow}</Eyebrow></Reveal>
            )}
            <div className="mt-6 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <Reveal delay={0.10}>
                <h2 className="font-[var(--font-display)] font-bold leading-[1.04] tracking-[-0.025em] text-[clamp(28px,3.8vw,56px)] max-w-[680px]">
                  {whyChoose.heading}
                </h2>
              </Reveal>
              {whyChoose.body && (
                <Reveal delay={0.20}>
                  <p className="text-[15px] leading-[1.65] text-white/65 max-w-[460px]">
                    {whyChoose.body}
                  </p>
                </Reveal>
              )}
            </div>

            <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
              {whyChoose.items.map((it, i) => (
                <Reveal key={it.title} delay={0.18 + (i % 3) * 0.06}>
                  <div className="h-full bg-[rgba(10,10,14,0.6)] p-8 lg:p-10 flex flex-col gap-4">
                    <h3 className="font-[var(--font-display)] font-bold tracking-[-0.012em] text-[clamp(18px,1.5vw,22px)] text-white">
                      {it.title}
                    </h3>
                    <p className="text-[14px] leading-[1.60] text-white/70">{it.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─────────── Tech Stack ─────────── */}
      {techStack && (
        <section className="relative py-24 lg:py-32" aria-label={techStack.heading}>
          <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-14 lg:py-20">
            {techStack.eyebrow && (
              <Reveal><Eyebrow>{techStack.eyebrow}</Eyebrow></Reveal>
            )}
            <Reveal delay={0.10}>
              <h2 className="mt-6 font-[var(--font-display)] font-bold leading-[1.04] tracking-[-0.025em] text-[clamp(28px,3.8vw,56px)] max-w-[760px]">
                {techStack.heading}
              </h2>
            </Reveal>
            {techStack.body && (
              <Reveal delay={0.20}>
                <p className="mt-6 text-[15px] leading-[1.65] text-white/65 max-w-[640px]">
                  {techStack.body}
                </p>
              </Reveal>
            )}

            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {techStack.groups.map((g, i) => (
                <Reveal key={g.title} delay={0.18 + (i % 2) * 0.06}>
                  <div className="h-full rounded-2xl glass glass-edge p-7 lg:p-9">
                    <h3 className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-brand-sky">
                      {g.title}
                    </h3>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {g.items.map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center px-3 py-1.5 rounded-full
                                     border border-white/[0.12] bg-white/[0.03]
                                     text-[12.5px] text-white/80
                                     font-[var(--font-brand)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <ExtraBanners at="after-techStack" />

      {/* ─────────── Process / Methodology ─────────── */}
      {process && (
        <section className="relative py-24 lg:py-32" aria-label={process.heading}>
          <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-14 lg:py-20">
            {process.eyebrow && (
              <Reveal><Eyebrow>{process.eyebrow}</Eyebrow></Reveal>
            )}
            <div className="mt-6 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <Reveal delay={0.10}>
                <h2 className="font-[var(--font-display)] font-bold leading-[1.04] tracking-[-0.025em] text-[clamp(28px,3.8vw,56px)] max-w-[720px]">
                  {process.heading}
                </h2>
              </Reveal>
              {process.body && (
                <Reveal delay={0.20}>
                  <p className="text-[15px] leading-[1.65] text-white/65 max-w-[460px]">
                    {process.body}
                  </p>
                </Reveal>
              )}
            </div>

            <ol className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden list-none p-0 m-0">
              {process.steps.map((step, i) => (
                <Reveal key={step.title} delay={0.18 + (i % 4) * 0.06}>
                  <li className="h-full bg-[rgba(10,10,14,0.6)] p-7 lg:p-8 flex flex-col gap-4">
                    <span className="font-[var(--font-mono)] text-[10px] tracking-[0.22em] text-brand-sky">
                      STEP {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-[var(--font-display)] font-bold tracking-[-0.012em] text-[clamp(17px,1.4vw,20px)] text-white">
                      {step.title}
                    </h3>
                    <p className="text-[13.5px] leading-[1.55] text-white/65">{step.desc}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>
      )}

      <ExtraBanners at="after-process" />

      {/* ─────────── FAQ ─────────── */}
      {faq && (
        <section className="relative py-24 lg:py-32" aria-label={faq.heading}>
          <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-14 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start">
              <div className="lg:sticky lg:top-24">
                {faq.eyebrow && (
                  <Reveal><Eyebrow>{faq.eyebrow}</Eyebrow></Reveal>
                )}
                <Reveal delay={0.10}>
                  <h2 className="mt-6 font-[var(--font-display)] font-bold leading-[1.04] tracking-[-0.025em] text-[clamp(28px,3.8vw,56px)] max-w-[460px]">
                    {faq.heading}
                  </h2>
                </Reveal>
              </div>

              <Reveal delay={0.20}>
                <Accordion
                  items={faq.items.map((it, i) => ({
                    id: `${i}`,
                    question: it.q,
                    answer: it.a,
                  }))}
                />
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* ─────────── Closing CTA ─────────── */}
      {closing && (
        <section className="relative py-24 lg:py-32" aria-label={closing.heading}>
          <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-14 lg:py-20">
            <div className="relative overflow-hidden rounded-[32px] glass glass-edge px-8 sm:px-14 py-20 lg:py-28">
              <Parallax amount={-80} className="absolute inset-0 pointer-events-none">
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(60% 50% at 20% 30%, rgba(24,222,255,0.18), transparent 65%)," +
                      "radial-gradient(50% 60% at 85% 70%, rgba(176,124,255,0.14), transparent 65%)",
                  }}
                />
              </Parallax>

              <div className="relative flex flex-col items-center text-center gap-8">
                <Parallax amount={30}>
                  <Reveal>
                    <h2 className="font-[var(--font-display)] font-bold leading-[1.04] tracking-[-0.028em] text-[clamp(32px,4.6vw,68px)] max-w-[820px]">
                      {closing.heading}
                    </h2>
                  </Reveal>
                </Parallax>
                {closing.body && (
                  <Reveal delay={0.15}>
                    <p className="text-[15px] leading-[1.65] text-white/70 max-w-[560px]">
                      {closing.body}
                    </p>
                  </Reveal>
                )}
                <Reveal delay={0.22}>
                  <Link href={closing.cta.href} className="cta cta--primary">
                    {closing.cta.label}
                    <ArrowIcon />
                  </Link>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
