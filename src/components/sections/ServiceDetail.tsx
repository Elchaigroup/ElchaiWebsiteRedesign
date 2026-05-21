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

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/primitives/Reveal";
import { Parallax } from "@/components/primitives/Parallax";
import { Accordion } from "@/components/ui/accordion";
import { CaseStudiesTabbed } from "@/components/sections/CaseStudiesTabbed";
import { ChallengesSlider } from "@/components/sections/ChallengesSlider";
import { FeatureSection } from "@/components/sections/FeatureSection";
import { ProcessGrid } from "@/components/sections/ProcessGrid";
import { ProcessSlider } from "@/components/sections/ProcessSlider";
import { ProductDemo } from "@/components/sections/ProductDemo";
import { TechStackTabbed } from "@/components/sections/TechStackTabbed";
import { TopicIcon } from "@/components/sections/TopicIcon";
import { TrustedPartnersGrid } from "@/components/sections/TrustedPartnersGrid";
import { IndustryLeaderBanner } from "@/components/sections/IndustryLeaderBanner";
import { WhyChooseSlider } from "@/components/sections/WhyChooseSlider";
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
  const { hero, stats, capabilities, midBanner, solutions, industries, challenges, impact, whyChoose, techStack, process, caseStudies, productDemo, faq, closing, extraBanners, featureSections } = content;

  // Render any featureSections at a named anchor — covers smart-contract
  // page bands like "Leading Partner", "Ethereum Services", "Hyperledger
  // Services", and "Smart Contract Audit".
  function FeatureBands({ at }: { at: NonNullable<typeof featureSections>[number]["position"] }) {
    if (!featureSections) return null;
    const matching = featureSections.filter((b) => b.position === at);
    if (matching.length === 0) return null;
    return (
      <>
        {matching.map((band, i) => (
          <FeatureSection key={`${band.heading}-${i}`} data={band} />
        ))}
      </>
    );
  }

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
  //
  // Service node uses `@id` + `provider.@id` so it links to the
  // Organization node in layout.tsx. Breadcrumb is 2-level (Home →
  // current page) because category-level landing pages (/blockchain,
  // /ai, …) don't exist yet — a 3-level crumb with no item URL on
  // position 2 fails Google's Rich Results validator.
  const SITE_URL = "https://www.elchaigroup.com";
  const ORG_ID = `${SITE_URL}/#organization`;
  const pageUrl = `${SITE_URL}/${slug}`;
  const offerCatalog = capabilities && capabilities.items.length > 0
    ? {
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `${hero.heading} — Capabilities`,
          itemListElement: capabilities.items.map((c) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: c.title,
              ...(c.desc ? { description: c.desc } : {}),
            },
          })),
        },
      }
    : {};
  const schemasJsonLd: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${pageUrl}#service`,
      name: hero.heading,
      ...(hero.eyebrow ? { alternateName: hero.eyebrow } : {}),
      description: hero.subheading ?? hero.body ?? `${hero.heading} services from Elchai Group.`,
      serviceType: content.category,
      url: pageUrl,
      provider: { "@id": ORG_ID },
      areaServed: [
        { "@type": "Country", name: "United Arab Emirates" },
        { "@type": "Place", name: "Gulf Cooperation Council" },
        { "@type": "Place", name: "Worldwide" },
      ],
      audience: {
        "@type": "BusinessAudience",
        audienceType: "Enterprises, SMBs, Government",
      },
      ...offerCatalog,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: hero.heading, item: pageUrl },
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
        className="relative pt-40 pb-24 lg:pt-48 lg:pb-32 overflow-hidden"
        aria-label={hero.heading}
      >
        {/* Atmospheric backdrop — transparent base lets the BackgroundScene 3D canvas
            (mounted at the page level) show through; only soft tinted gradients,
            drifting orbs, dotted grid, and a subtle vignette on top. */}
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          {/* Soft tinted overlays — transparent so the 3D scene reads through */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 22% 30%, rgba(24,38,68,0.32), transparent 60%), radial-gradient(ellipse at 78% 70%, rgba(40,22,68,0.32), transparent 60%)",
            }}
          />
          {/* Drifting ambient orbs */}
          <div
            className="pointer-events-none absolute -top-24 -left-16 w-[520px] h-[520px] rounded-full blur-[120px] opacity-65 animate-[orbDriftA_18s_ease-in-out_infinite]"
            style={{
              background:
                "radial-gradient(circle, rgba(82,184,255,0.55), rgba(82,184,255,0.0) 70%)",
            }}
          />
          <div
            className="pointer-events-none absolute bottom-[-12rem] right-[-6rem] w-[640px] h-[640px] rounded-full blur-[140px] opacity-55 animate-[orbDriftB_24s_ease-in-out_infinite]"
            style={{
              background:
                "radial-gradient(circle, rgba(176,124,255,0.55), rgba(176,124,255,0.0) 70%)",
            }}
          />
          <div
            className="pointer-events-none absolute top-[35%] left-[55%] w-[420px] h-[420px] rounded-full blur-[110px] opacity-40 animate-[orbDriftA_26s_ease-in-out_infinite]"
            style={{
              background:
                "radial-gradient(circle, rgba(24,222,255,0.45), rgba(24,222,255,0.0) 70%)",
            }}
          />
          {/* Dotted grid texture — masked for depth */}
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
              maskImage:
                "radial-gradient(ellipse at center, black 35%, transparent 78%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at center, black 35%, transparent 78%)",
            }}
          />
          {/* Subtle vignette + scan-line texture — kept very light so the 3D scene reads through */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,transparent_0%,rgba(8,8,12,0.18)_75%,rgba(8,8,12,0.35)_100%)]" />
          <div
            className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-[0.05]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(255,255,255,0.6) 0 1px, transparent 1px 3px)",
            }}
          />
        </div>
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
                         tracking-[-0.028em] text-[clamp(38px,6.0vw,92px)] max-w-[1080px]
                         drop-shadow-[0_2px_30px_rgba(12,16,40,0.55)]"
              style={{
                backgroundImage:
                  "linear-gradient(120deg, #ffffff 0%, #e6efff 38%, #f2e6ff 72%, #ffffff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
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

          {hero.chips && hero.chips.length > 0 && (
            <Reveal delay={0.34}>
              <ul className="mt-8 flex flex-wrap gap-2 list-none p-0 m-0">
                {hero.chips.map((c, i) => (
                  <li
                    key={i}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/[0.05] text-[12.5px] text-white/85"
                  >
                    <span
                      aria-hidden="true"
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: "linear-gradient(135deg, #52b8ff, #b07cff)" }}
                    />
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          {hero.bullets && hero.bullets.length > 0 && (
            <Reveal delay={0.46}>
              <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-[1080px] list-none p-0 m-0">
                {hero.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 rounded-xl border border-white/10 bg-[rgba(10,10,14,0.55)] p-4">
                    <span
                      aria-hidden="true"
                      className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                      style={{
                        background: "linear-gradient(135deg, #52b8ff, #b07cff)",
                        boxShadow: "0 0 12px rgba(82,184,255,0.35)",
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                        <path d="M3.5 8.5l3 3 6-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <p className="text-[13.5px] leading-[1.55] text-white/85">{b}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          {stats && stats.length > 0 && (
            <Reveal delay={0.48}>
              <div className={`mt-20 grid grid-cols-2 ${stats.length === 5 ? "sm:grid-cols-5" : "sm:grid-cols-4"} gap-3 lg:gap-4 max-w-[1100px]`}>
                {stats.map((s, i) => (
                  <div
                    key={s.label}
                    className="group relative rounded-2xl p-[1px] overflow-hidden hover:-translate-y-1 transition-transform duration-500"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(82,184,255,0.30), rgba(176,124,255,0.18) 40%, rgba(255,255,255,0.05) 70%, rgba(255,255,255,0.03))",
                    }}
                  >
                    <div
                      className="relative h-full rounded-[calc(1rem-1px)] overflow-hidden p-5 lg:p-6 flex flex-col gap-3"
                      style={{
                        background:
                          "radial-gradient(circle at 100% 0%, rgba(176,124,255,0.10), transparent 55%), radial-gradient(circle at 0% 100%, rgba(82,184,255,0.10), transparent 55%), #0B0B12",
                      }}
                    >
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute top-3 right-3 w-1.5 h-1.5 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: "linear-gradient(135deg, #52b8ff, #b07cff)", boxShadow: "0 0 10px rgba(82,184,255,0.55)" }}
                      />
                      {s.icon && (
                        <div className="relative">
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 -translate-x-2 -translate-y-2 w-20 h-20 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                            style={{ background: "radial-gradient(circle, rgba(82,184,255,0.45), rgba(176,124,255,0.2) 50%, transparent 75%)" }}
                          />
                          <div
                            className="relative w-12 h-12 rounded-xl p-2 flex items-center justify-center"
                            style={{
                              background: "linear-gradient(135deg, rgba(82,184,255,0.22), rgba(176,124,255,0.22))",
                              boxShadow: "0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.10), 0 8px 22px -6px rgba(82,184,255,0.32)",
                            }}
                          >
                            <Image src={s.icon} alt="" aria-hidden="true" width={40} height={40} unoptimized className="object-contain w-full h-full" />
                          </div>
                        </div>
                      )}
                      <div
                        className="relative font-[var(--font-display)] font-bold leading-none tracking-[-0.025em] text-[clamp(32px,3.6vw,52px)]"
                        style={{
                          background: "linear-gradient(135deg, #ffffff, #cbd8ff 60%, #d6cdff)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {s.value}
                      </div>
                      <div className="relative h-px w-8 bg-gradient-to-r from-brand-sky to-brand-violet rounded-full" />
                      <div className="relative text-[12px] leading-[1.45] text-white/72">
                        {s.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <FeatureBands at="after-hero" />

      {/* ─────────── Capabilities ─────────── */}
      {capabilities && (
        <section className="relative py-24 lg:py-32" aria-label={capabilities.heading}>
          <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-14 lg:py-20">
            {capabilities.eyebrow && (
              <Reveal><Eyebrow>{capabilities.eyebrow}</Eyebrow></Reveal>
            )}
            <div className="mt-6 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <Reveal delay={0.10}>
                <h2 className="font-[var(--font-display)] font-bold leading-[1.04] tracking-[-0.025em] text-[clamp(28px,3.8vw,56px)] max-w-[760px] section-accent">
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

            <div className={[
              "mt-14 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5",
              capabilities.displayStyle === "photo" ? "lg:grid-cols-3 lg:gap-6" : "lg:grid-cols-4",
            ].join(" ")}>
              {capabilities.items.map((it, i) => {
                const isPhoto = capabilities.displayStyle === "photo";
                return (
                  <Reveal key={it.title} delay={0.18 + (i % 6) * 0.04}>
                    <div
                      className="group relative h-full rounded-2xl p-[1px] overflow-hidden hover:-translate-y-1 transition-transform duration-500"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(82,184,255,0.30), rgba(176,124,255,0.16) 38%, rgba(255,255,255,0.05) 65%, rgba(255,255,255,0.03))",
                      }}
                    >
                      <div
                        className={[
                          "relative h-full rounded-[calc(1rem-1px)] overflow-hidden flex flex-col",
                          isPhoto ? "gap-0" : "p-7 lg:p-8 gap-5",
                        ].join(" ")}
                        style={{
                          background:
                            "radial-gradient(circle at 100% 0%, rgba(176,124,255,0.10), transparent 55%), radial-gradient(circle at 0% 100%, rgba(82,184,255,0.10), transparent 55%), #0B0B12",
                        }}
                      >
                        {/* Hover wash + corner accent */}
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            background:
                              "radial-gradient(circle at 0% 0%, rgba(82,184,255,0.18), transparent 55%), radial-gradient(circle at 100% 100%, rgba(176,124,255,0.18), transparent 55%)",
                          }}
                        />
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute top-3 right-3 w-1.5 h-1.5 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                          style={{ background: "linear-gradient(135deg, #52b8ff, #b07cff)", boxShadow: "0 0 12px rgba(82,184,255,0.55)" }}
                        />

                        {/* Faint topic-aware watermark behind the copy.
                            Only renders when there's no full-bleed photo. */}
                        {!isPhoto && !it.icon && (
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -bottom-6 -right-6 w-44 h-44 text-white opacity-[0.06] group-hover:opacity-[0.10] transition-opacity duration-500"
                          >
                            <TopicIcon title={it.title} index={i} className="block w-full h-full" />
                          </span>
                        )}

                        {isPhoto && it.icon ? (
                          <div className="relative aspect-[4/3] w-full overflow-hidden">
                            <Image
                              src={it.icon}
                              alt={it.title}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                              unoptimized
                              className="object-cover scale-[1.02] group-hover:scale-[1.08] transition-transform duration-[900ms] ease-out"
                            />
                            {/* layered gradient: deep at bottom for legibility, soft mid for depth */}
                            <div
                              aria-hidden="true"
                              className="absolute inset-0"
                              style={{
                                background:
                                  "linear-gradient(to top, rgba(11,11,18,0.96) 0%, rgba(11,11,18,0.55) 32%, rgba(11,11,18,0.12) 68%, rgba(11,11,18,0.04) 100%)",
                              }}
                            />
                            {/* inner vignette frame */}
                            <div
                              aria-hidden="true"
                              className="pointer-events-none absolute inset-0"
                              style={{ boxShadow: "inset 0 0 80px 20px rgba(11,11,18,0.30)" }}
                            />
                            {/* editorial index */}
                            <span className="absolute top-4 left-5 font-[var(--font-mono)] text-[10px] tracking-[0.28em] text-white/65 uppercase">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            {/* hairline under index */}
                            <span
                              aria-hidden="true"
                              className="absolute top-[1.85rem] left-5 right-5 h-px"
                              style={{
                                background:
                                  "linear-gradient(to right, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 60%, transparent 100%)",
                              }}
                            />
                          </div>
                        ) : (
                          <div className="relative">
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 -translate-x-3 -translate-y-3 w-24 h-24 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                              style={{ background: "radial-gradient(circle, rgba(82,184,255,0.45), rgba(176,124,255,0.2) 50%, transparent 75%)" }}
                            />
                            <div
                              className="relative w-14 h-14 rounded-xl p-2.5 flex items-center justify-center
                                         group-hover:scale-[1.04] transition-transform duration-500"
                              style={{
                                background: "linear-gradient(135deg, rgba(82,184,255,0.22), rgba(176,124,255,0.22))",
                                boxShadow:
                                  "0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.10), 0 10px 28px -8px rgba(82,184,255,0.35)",
                              }}
                            >
                              {it.icon ? (
                                <Image src={it.icon} alt="" aria-hidden="true" width={48} height={48} unoptimized className="object-contain w-full h-full" />
                              ) : (
                                <span
                                  className="block w-full h-full text-white"
                                  style={{ filter: "drop-shadow(0 2px 6px rgba(82,184,255,0.45))" }}
                                >
                                  <TopicIcon title={it.title} index={i} className="block w-full h-full" />
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        <div className={isPhoto ? "relative px-6 lg:px-7 pt-6 pb-7 flex flex-col gap-3.5" : "contents"}>
                          {isPhoto ? (
                            <div className="relative flex items-center justify-between">
                              <div
                                className="h-px w-10 rounded-full transition-all duration-500 group-hover:w-16"
                                style={{ background: "linear-gradient(to right, #52b8ff, #b07cff)" }}
                              />
                              <span
                                aria-hidden="true"
                                className="text-white/45 group-hover:text-white group-hover:translate-x-1 transition-all duration-500 text-[15px] leading-none font-light"
                              >
                                →
                              </span>
                            </div>
                          ) : (
                            <div className="relative h-px w-10 bg-gradient-to-r from-brand-sky to-brand-violet rounded-full" />
                          )}
                          <h3
                            className={[
                              "relative font-[var(--font-display)] font-semibold text-white leading-[1.2]",
                              isPhoto
                                ? "tracking-[-0.018em] text-[clamp(17px,1.45vw,21px)]"
                                : "tracking-[-0.012em] text-[clamp(16px,1.3vw,19px)]",
                            ].join(" ")}
                          >
                            {it.title}
                          </h3>
                          <p
                            className={[
                              "relative leading-[1.65] text-white/68",
                              isPhoto ? "text-[13.5px]" : "text-[13px]",
                            ].join(" ")}
                          >
                            {it.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <FeatureBands at="after-capabilities" />

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
                <h2 className="font-[var(--font-display)] font-bold leading-[1.04] tracking-[-0.025em] text-[clamp(28px,3.8vw,56px)] max-w-[760px] section-accent">
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

            <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {solutions.items.map((it, i) => {
                const isPhoto = solutions.displayStyle === "photo";
                return (
                  <Reveal key={it.title} delay={0.18 + (i % 3) * 0.05}>
                    <div className={[
                      "group relative h-full rounded-2xl border border-white/10 bg-[rgba(10,10,14,0.55)] flex flex-col overflow-hidden hover:border-white/25 transition-all duration-300",
                      isPhoto ? "gap-0" : "p-7 lg:p-8 gap-5",
                    ].join(" ")}>
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: "radial-gradient(circle at 0% 0%, rgba(82,184,255,0.10), transparent 60%), radial-gradient(circle at 100% 100%, rgba(176,124,255,0.10), transparent 60%)" }}
                      />
                      {isPhoto && it.image ? (
                        <div className="relative aspect-[5/4] w-full overflow-hidden">
                          <Image src={it.image} alt={it.title} fill sizes="(max-width: 640px) 100vw, 33vw" unoptimized className="object-cover group-hover:scale-[1.04] transition-transform duration-500" />
                          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[rgba(10,10,14,0.85)] to-transparent" />
                        </div>
                      ) : it.image ? (
                        <div className="relative w-16 h-16 rounded-full flex items-center justify-center"
                             style={{ background: "radial-gradient(circle at 40% 30%, rgba(82,184,255,0.22), rgba(176,124,255,0.16) 70%, transparent)", boxShadow: "0 0 0 1px rgba(255,255,255,0.08)" }}>
                          <Image src={it.image} alt={it.title} width={48} height={48} unoptimized className="object-contain max-w-full max-h-full" />
                        </div>
                      ) : (
                        <span className="font-[var(--font-mono)] text-[10px] tracking-[0.22em] text-brand-sky uppercase">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      )}
                      <div className={isPhoto ? "relative p-6 flex flex-col gap-3" : "contents"}>
                        <h3 className="relative font-[var(--font-display)] font-bold tracking-[-0.012em] text-[clamp(16px,1.3vw,19px)] text-white">
                          {it.title}
                        </h3>
                        <p className="relative text-[13px] leading-[1.6] text-white/70">{it.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
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
                <h2 className="font-[var(--font-display)] font-bold leading-[1.04] tracking-[-0.025em] text-[clamp(28px,3.8vw,56px)] max-w-[760px] section-accent">
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

            <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
              {industries.items.map((it, i) => (
                <Reveal key={it.title} delay={0.16 + (i % 4) * 0.05}>
                  <div
                    className="group relative h-full rounded-2xl p-[1px] overflow-hidden hover:-translate-y-1 transition-transform duration-500"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(82,184,255,0.30), rgba(176,124,255,0.16) 38%, rgba(255,255,255,0.05) 65%, rgba(255,255,255,0.03))",
                    }}
                  >
                    <div
                      className="relative h-full rounded-[calc(1rem-1px)] overflow-hidden p-5 lg:p-6 flex gap-5 items-start"
                      style={{
                        background:
                          "radial-gradient(circle at 100% 0%, rgba(176,124,255,0.10), transparent 55%), radial-gradient(circle at 0% 100%, rgba(82,184,255,0.10), transparent 55%), #0B0B12",
                      }}
                    >
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: "radial-gradient(circle at 0% 0%, rgba(82,184,255,0.18), transparent 55%), radial-gradient(circle at 100% 100%, rgba(176,124,255,0.18), transparent 55%)" }}
                      />
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute top-3 right-3 w-1.5 h-1.5 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: "linear-gradient(135deg, #52b8ff, #b07cff)", boxShadow: "0 0 12px rgba(82,184,255,0.55)" }}
                      />
                      {/* Faint topic watermark when no photo */}
                      {!it.image && (
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute -bottom-6 -right-6 w-44 h-44 text-white opacity-[0.06] group-hover:opacity-[0.10] transition-opacity duration-500"
                        >
                          <TopicIcon title={it.title} index={i} className="block w-full h-full" />
                        </span>
                      )}

                      {it.image ? (
                        <div className="relative shrink-0 w-[120px] h-[120px] lg:w-[140px] lg:h-[140px] overflow-hidden group-hover:scale-[1.04] transition-transform duration-500"
                             style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}>
                          <Image
                            src={it.image}
                            alt={it.title}
                            fill
                            sizes="140px"
                            unoptimized
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="relative shrink-0">
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 w-24 h-24 -translate-x-2 -translate-y-2 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                            style={{ background: "radial-gradient(circle, rgba(82,184,255,0.45), rgba(176,124,255,0.2) 50%, transparent 75%)" }}
                          />
                          <div
                            className="relative w-20 h-20 flex items-center justify-center p-3 group-hover:scale-[1.04] transition-transform duration-500"
                            style={{
                              clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                              background: "linear-gradient(135deg, rgba(82,184,255,0.28), rgba(176,124,255,0.28))",
                              boxShadow: "0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.10), 0 10px 28px -8px rgba(82,184,255,0.35)",
                            }}
                          >
                            <span
                              className="block w-full h-full text-white"
                              style={{ filter: "drop-shadow(0 2px 6px rgba(82,184,255,0.45))" }}
                            >
                              <TopicIcon title={it.title} index={i} className="block w-full h-full" />
                            </span>
                          </div>
                        </div>
                      )}
                      <div className="relative flex flex-col gap-2 min-w-0 flex-1">
                        <div className="h-px w-8 bg-gradient-to-r from-brand-sky to-brand-violet rounded-full" />
                        <h3 className="font-[var(--font-display)] font-bold tracking-[-0.012em] text-[clamp(16px,1.3vw,19px)] text-white">
                          {it.title}
                        </h3>
                        {it.desc && <p className="text-[13px] leading-[1.6] text-white/72">{it.desc}</p>}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <ExtraBanners at="after-industries" />
      <FeatureBands at="after-industries" />

      {/* ─────────── Challenges (where projects get stuck) ─────────── */}
      {challenges && challenges.displayStyle === "slider" && (
        <ChallengesSlider data={challenges} />
      )}
      {challenges && challenges.displayStyle !== "slider" && (
        <section className="relative py-24 lg:py-32" aria-label={challenges.heading}>
          <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-14 lg:py-20">
            <div className="text-center">
              {challenges.eyebrow && (
                <Reveal>
                  <div className="flex justify-center">
                    <Eyebrow>{challenges.eyebrow}</Eyebrow>
                  </div>
                </Reveal>
              )}
              <Reveal delay={0.10}>
                <h2 className="mt-6 font-[var(--font-display)] font-bold leading-[1.04] tracking-[-0.025em] text-[clamp(30px,4vw,56px)] max-w-[900px] mx-auto">
                  {challenges.heading}
                </h2>
              </Reveal>
              {challenges.body && (
                <Reveal delay={0.20}>
                  <p className="mt-6 text-[clamp(15px,1.2vw,17px)] leading-[1.65] text-white/85 max-w-[720px] mx-auto">
                    {challenges.body}
                  </p>
                </Reveal>
              )}
            </div>
            <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {challenges.items.map((it, i) => (
                <Reveal key={it.title} delay={0.18 + (i % 3) * 0.05}>
                  <div className="group relative h-full rounded-2xl border border-white/10 bg-[rgba(10,10,14,0.55)] flex flex-col overflow-hidden hover:border-white/25 transition-all duration-300">
                    {it.image && (
                      <div className="relative aspect-[5/3] w-full overflow-hidden">
                        <Image src={it.image} alt={it.title} fill sizes="(max-width: 640px) 100vw, 33vw" unoptimized className="object-cover group-hover:scale-[1.04] transition-transform duration-500" />
                        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[rgba(10,10,14,0.85)] to-transparent" />
                      </div>
                    )}
                    <div className="p-6 lg:p-7 flex flex-col gap-3">
                      <span className="font-[var(--font-mono)] text-[10px] tracking-[0.22em] text-brand-sky uppercase">
                        STEP {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-[var(--font-display)] font-bold tracking-[-0.012em] text-[clamp(17px,1.4vw,20px)] text-white">
                        {it.title}
                      </h3>
                      <p className="text-[13.5px] leading-[1.6] text-white/70">{it.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <ExtraBanners at="after-challenges" />
      <FeatureBands at="after-challenges" />

      {/* ─────────── Impact (real business outcomes) ─────────── */}
      {impact && (
        <section className="relative py-24 lg:py-32" aria-label={impact.heading}>
          <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-14 lg:py-20">
            {impact.eyebrow && (
              <Reveal><Eyebrow>{impact.eyebrow}</Eyebrow></Reveal>
            )}
            <div className="mt-6 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <Reveal delay={0.10}>
                <h2 className="font-[var(--font-display)] font-bold leading-[1.04] tracking-[-0.025em] text-[clamp(28px,3.8vw,56px)] max-w-[760px] section-accent">
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
            {impact.image ? (
              <div className="mt-14 grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-8 lg:gap-12 items-start">
                <Reveal>
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10">
                    <Image src={impact.image} alt="" aria-hidden="true" fill sizes="(max-width: 1024px) 100vw, 40vw" unoptimized className="object-cover" />
                  </div>
                </Reveal>
                <ul className="flex flex-col gap-4 list-none p-0 m-0">
                  {impact.items.map((it, i) => (
                    <Reveal key={it.title} delay={0.10 + (i % 5) * 0.05}>
                      <li className="group relative rounded-2xl border border-white/10 bg-[rgba(10,10,14,0.55)] p-6 flex gap-4 hover:border-white/25 transition-all duration-300">
                        <span
                          aria-hidden="true"
                          className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ background: "linear-gradient(135deg, rgba(82,184,255,0.30), rgba(176,124,255,0.30))", boxShadow: "0 0 0 1px rgba(255,255,255,0.08)" }}
                        >
                          {it.icon ? (
                            <Image src={it.icon} alt="" aria-hidden="true" width={22} height={22} unoptimized className="object-contain" />
                          ) : (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                              <path d="M12 2l2.9 6.8L22 9.6l-5.5 4.9 1.7 7.2L12 17.9 5.8 21.7 7.5 14.5 2 9.6l7.1-.8L12 2z" fill="white" />
                            </svg>
                          )}
                        </span>
                        <div className="min-w-0">
                          <h3 className="font-[var(--font-display)] font-bold tracking-[-0.012em] text-[16px] text-white">
                            {it.title}
                          </h3>
                          <p className="mt-2 text-[13.5px] leading-[1.6] text-white/70">{it.desc}</p>
                        </div>
                      </li>
                    </Reveal>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                {impact.items.map((it, i) => {
                  // Subtle, per-card colour tint cycle. Matches the live page's
                  // pastel-on-dark "Economics" treatment without going neon.
                  const tints = [
                    { ring: "rgba(82,184,255,0.45)", glow: "rgba(82,184,255,0.18)" },
                    { ring: "rgba(176,124,255,0.45)", glow: "rgba(176,124,255,0.18)" },
                    { ring: "rgba(120,196,255,0.45)", glow: "rgba(120,196,255,0.18)" },
                    { ring: "rgba(140,144,255,0.45)", glow: "rgba(140,144,255,0.18)" },
                    { ring: "rgba(82,184,255,0.45)", glow: "rgba(82,184,255,0.18)" },
                    { ring: "rgba(176,124,255,0.45)", glow: "rgba(176,124,255,0.18)" },
                  ];
                  const tint = tints[i % tints.length];
                  return (
                    <Reveal key={it.title} delay={0.18 + (i % 3) * 0.05}>
                      <div
                        className="group relative h-full overflow-hidden rounded-2xl p-7 lg:p-8 flex flex-col gap-4
                                   border border-white/10 hover:border-white/25
                                   transition-all duration-300 hover:-translate-y-0.5"
                        style={{
                          background:
                            `linear-gradient(155deg, rgba(255,255,255,0.05) 0%, rgba(10,10,16,0.85) 55%), ` +
                            `radial-gradient(120% 80% at 0% 0%, ${tint.glow}, transparent 60%)`,
                          boxShadow: `inset 0 1px 0 rgba(255,255,255,0.06), 0 16px 40px -22px ${tint.glow}`,
                        }}
                      >
                        {/* Numbered badge */}
                        <div className="flex items-center justify-between">
                          <span
                            aria-hidden="true"
                            className="inline-flex items-center justify-center w-10 h-10 rounded-full font-[var(--font-mono)] text-[12px] font-medium text-white"
                            style={{
                              background: `linear-gradient(135deg, ${tint.ring}, rgba(176,124,255,0.35))`,
                              boxShadow: `0 0 0 1px rgba(255,255,255,0.10), 0 0 22px -6px ${tint.glow}`,
                            }}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {it.icon && (
                            <Image
                              src={it.icon}
                              alt=""
                              aria-hidden="true"
                              width={28}
                              height={28}
                              unoptimized
                              className="opacity-80 group-hover:opacity-100 transition-opacity"
                            />
                          )}
                        </div>

                        <h3 className="font-[var(--font-display)] font-bold tracking-[-0.012em] text-[clamp(17px,1.5vw,21px)] text-white leading-[1.18]">
                          {it.title}
                        </h3>
                        <p className="text-[13.5px] leading-[1.6] text-white/70">{it.desc}</p>

                        {/* Hairline gradient at the top edge */}
                        <span
                          aria-hidden="true"
                          className="absolute top-0 left-0 right-0 h-px"
                          style={{
                            background: `linear-gradient(90deg, transparent 0%, ${tint.ring} 35%, ${tint.ring} 65%, transparent 100%)`,
                          }}
                        />
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ─────────── Why Choose ─────────── */}
      {whyChoose && whyChoose.displayStyle === "slider" && (
        <WhyChooseSlider data={whyChoose} />
      )}
      {whyChoose && whyChoose.displayStyle !== "slider" && (
        <section className="relative py-24 lg:py-32" aria-label={whyChoose.heading}>
          <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-14 lg:py-20">
            {whyChoose.eyebrow && (
              <Reveal><Eyebrow>{whyChoose.eyebrow}</Eyebrow></Reveal>
            )}
            <div className="mt-6 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <Reveal delay={0.10}>
                <h2 className="font-[var(--font-display)] font-bold leading-[1.04] tracking-[-0.025em] text-[clamp(28px,3.8vw,56px)] max-w-[680px] section-accent">
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

            {whyChoose.image ? (
              <div className="mt-14 grid grid-cols-1 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] gap-6 lg:gap-8 items-start">
                <Reveal>
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 lg:sticky lg:top-24">
                    <Image src={whyChoose.image} alt="" aria-hidden="true" fill sizes="(max-width: 1024px) 100vw, 40vw" unoptimized className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,14,0.85)] via-[rgba(10,10,14,0.1)] to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-[rgba(82,184,255,0.18)]" />
                  </div>
                </Reveal>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {whyChoose.items.map((it, i) => (
                    <Reveal key={it.title} delay={0.12 + (i % 2) * 0.06}>
                      <div className="group relative h-full rounded-2xl border border-white/10 bg-[rgba(10,10,14,0.65)] p-6 lg:p-7 flex flex-col gap-4 overflow-hidden hover:border-white/25 transition-all duration-300">
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{ background: "radial-gradient(circle at 100% 0%, rgba(82,184,255,0.10), transparent 60%), radial-gradient(circle at 0% 100%, rgba(176,124,255,0.10), transparent 60%)" }}
                        />
                        <div className="relative flex items-start justify-between gap-3">
                          {it.icon ? (
                            <div className="shrink-0 w-12 h-12 rounded-xl p-2 flex items-center justify-center"
                                 style={{ background: "linear-gradient(135deg, rgba(82,184,255,0.22), rgba(176,124,255,0.22))", boxShadow: "0 0 0 1px rgba(255,255,255,0.07)" }}>
                              <Image src={it.icon} alt="" aria-hidden="true" width={40} height={40} unoptimized className="object-contain w-full h-full" />
                            </div>
                          ) : (
                            <span className="font-[var(--font-mono)] text-[10px] tracking-[0.22em] text-brand-sky uppercase">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                          )}
                          <span
                            aria-hidden="true"
                            className="shrink-0 w-7 h-7 rounded-full border border-white/15 flex items-center justify-center text-white/55 group-hover:text-white group-hover:border-white/35 transition-colors"
                          >
                            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                              <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
                            </svg>
                          </span>
                        </div>
                        <h3 className="relative font-[var(--font-display)] font-bold tracking-[-0.012em] text-[clamp(16px,1.3vw,19px)] text-white">
                          {it.title}
                        </h3>
                        <p className="relative text-[13.5px] leading-[1.6] text-white/70">{it.desc}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            ) : (
            <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
              {whyChoose.items.map((it, i) => (
                <Reveal key={it.title} delay={0.18 + (i % 3) * 0.06}>
                  <div
                    className="group relative h-full rounded-2xl p-[1px] overflow-hidden hover:-translate-y-1 transition-transform duration-500"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(82,184,255,0.30), rgba(176,124,255,0.16) 38%, rgba(255,255,255,0.05) 65%, rgba(255,255,255,0.03))",
                    }}
                  >
                    <div
                      className="relative h-full rounded-[calc(1rem-1px)] overflow-hidden p-7 lg:p-9 flex flex-col gap-5"
                      style={{
                        background:
                          "radial-gradient(circle at 100% 0%, rgba(82,184,255,0.12), transparent 55%), radial-gradient(circle at 0% 100%, rgba(176,124,255,0.12), transparent 55%), #0B0B12",
                      }}
                    >
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: "radial-gradient(circle at 50% 0%, rgba(82,184,255,0.18), transparent 55%), radial-gradient(circle at 50% 100%, rgba(176,124,255,0.18), transparent 55%)" }}
                      />
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute top-3 right-3 w-1.5 h-1.5 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: "linear-gradient(135deg, #52b8ff, #b07cff)", boxShadow: "0 0 12px rgba(82,184,255,0.55)" }}
                      />
                      {it.icon && (
                        <div className="relative">
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 -translate-x-3 -translate-y-3 w-24 h-24 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                            style={{ background: "radial-gradient(circle, rgba(82,184,255,0.45), rgba(176,124,255,0.2) 50%, transparent 75%)" }}
                          />
                          <div
                            className="relative w-14 h-14 rounded-xl p-2.5 flex items-center justify-center group-hover:scale-[1.04] transition-transform duration-500"
                            style={{
                              background: "linear-gradient(135deg, rgba(82,184,255,0.22), rgba(176,124,255,0.22))",
                              boxShadow: "0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.10), 0 10px 28px -8px rgba(82,184,255,0.35)",
                            }}
                          >
                            <Image src={it.icon} alt="" aria-hidden="true" width={48} height={48} unoptimized className="object-contain w-full h-full" />
                          </div>
                        </div>
                      )}
                      <div className="relative h-px w-10 bg-gradient-to-r from-brand-sky to-brand-violet rounded-full" />
                      <h3 className="relative font-[var(--font-display)] font-bold tracking-[-0.012em] text-[clamp(18px,1.5vw,22px)] text-white">
                        {it.title}
                      </h3>
                      <p className="relative text-[14px] leading-[1.60] text-white/72">{it.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            )}
          </div>
        </section>
      )}

      {/* ─────────── Product Demo (tabbed videos) ─────────── */}
      {productDemo && <ProductDemo data={productDemo} />}

      {/* ─────────── Tech Stack (tabbed logo cards) ─────────── */}
      {techStack && <TechStackTabbed data={techStack} />}

      <ExtraBanners at="after-techStack" />
      <FeatureBands at="after-techStack" />

      {/* ─────────── Process / Methodology ─────────── */}
      {process && process.displayStyle === "grid" && <ProcessGrid data={process} />}
      {process && process.displayStyle !== "grid" && <ProcessSlider data={process} />}

      <ExtraBanners at="after-process" />
      <FeatureBands at="after-process" />

      {/* ─────────── Case Studies (tabbed) ─────────── */}
      {caseStudies && <CaseStudiesTabbed data={caseStudies} />}

      {/* ─────────── Trusted Partners ─────────── */}
      {content.industryLeaderBanner && <IndustryLeaderBanner />}
      {!content.hideTrustedPartners && !content.industryLeaderBanner && <TrustedPartnersGrid />}

      <FeatureBands at="before-faq" />

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

      <FeatureBands at="before-closing" />

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
