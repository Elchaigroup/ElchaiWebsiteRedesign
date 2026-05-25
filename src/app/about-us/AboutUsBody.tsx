"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/primitives/Reveal";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { useAboutContent } from "@/lib/use-about-content";

const TRUSTED_BRANDS = [
  "/elchai/about/light_elchai_partner_logo_1.webp",
  "/elchai/about/light_elchai_partner_logo_2.webp",
  "/elchai/about/light_elchai_partner_logo_3.webp",
  "/elchai/about/light_elchai_partner_logo_4.webp",
  "/elchai/about/light_elchai_partner_logo_5.webp",
  "/elchai/about/light_elchai_partner_logo_6.webp",
];

const PARTNER_LOGOS = Array.from({ length: 16 }, (_, i) => `/elchai/elchai_partner_logo_${i + 1}.webp`);

export function AboutUsBody() {
  const c = useAboutContent();
  const t = c.ui;

  return (
    <main className="relative" style={{ zIndex: 1 }}>
      {/* Hero */}
      <section className="relative pt-32 pb-8 lg:pt-36 lg:pb-12 overflow-hidden" aria-label={t.breadcrumb}>
        <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-center">
            <div>
              <Reveal>
                <nav aria-label="Breadcrumb" className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-white/45 flex flex-wrap items-center gap-2">
                  <Link href="/" className="hover:text-brand-sky transition-colors">{t.home}</Link>
                  <span aria-hidden="true" className="text-white/30">/</span>
                  <span className="text-brand-sky">{t.breadcrumb}</span>
                </nav>
              </Reveal>
              <Reveal delay={0.10}>
                <span className="mt-8 inline-flex items-center gap-2.5 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-white/45">
                  {t.eyebrow}
                </span>
              </Reveal>
              <Reveal delay={0.16}>
                <h1 className="mt-6 font-[var(--font-display)] font-bold leading-[1.04] tracking-[-0.028em] text-[clamp(38px,5.6vw,82px)] max-w-[1080px]">
                  {t.heading}
                </h1>
              </Reveal>
              <Reveal delay={0.22}>
                <p className="mt-6 text-[15.5px] leading-[1.65] text-white/70 max-w-[680px]">
                  {t.body}
                </p>
              </Reveal>
              <Reveal delay={0.30}>
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <Link href="#our-journey" className="cta cta--primary">
                    {t.primaryCta}
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  </Link>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.28}>
              <div className="relative aspect-[5/4] lg:aspect-[6/5] rounded-3xl overflow-hidden border border-white/[0.08]">
                <Image
                  src="/elchai/about/elchai_about-banner-img_1.webp"
                  alt={t.heroImageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,8,12,0.45)] via-transparent to-transparent" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Trusted brands marquee */}
      <section className="relative py-10" aria-label={t.trustedEyebrow}>
        <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-10">
          <Reveal>
            <div className="flex justify-center">
              <span className="inline-flex items-center gap-2.5 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-white/45">
                {t.trustedEyebrow}
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.10}>
            <div className="mt-8">
              <InfiniteSlider gap={16} speed={48} speedOnHover={18} className="py-2">
                {TRUSTED_BRANDS.map((logo, i) => (
                  <span key={`${logo}-${i}`} className="inline-flex shrink-0 items-center justify-center w-[180px] h-[88px] sm:w-[200px] sm:h-[100px] rounded-xl px-5 border border-white/12 bg-white/[0.04] backdrop-blur-sm">
                    <Image src={logo} alt={t.trustedAlt} width={140} height={70} className="object-contain max-w-full max-h-[60%] w-auto" />
                  </span>
                ))}
              </InfiniteSlider>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="relative py-10 lg:py-14" aria-label={t.statsEyebrow}>
        <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-16 lg:py-20 relative overflow-hidden">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.18]">
            <Image src="/elchai/about/about-counter-bg1.webp" alt="" fill sizes="100vw" className="object-cover" />
          </div>
          <Reveal>
            <span className="inline-flex items-center gap-2.5 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-white/45">
              {t.statsEyebrow}
            </span>
          </Reveal>
          <div className="relative mt-12 grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-5">
            {c.statsTop.map((s) => (
              <Reveal key={s.label}>
                <div className="rounded-2xl border border-white/[0.08] bg-[rgba(10,10,14,0.65)] backdrop-blur px-7 py-9 lg:py-10 h-full flex flex-col justify-between gap-4">
                  <div className="font-[var(--font-display)] font-bold text-brand-sky text-[clamp(32px,3.6vw,52px)] leading-none tracking-[-0.02em]">
                    {s.value}
                  </div>
                  <div className="text-[14.5px] leading-[1.55] text-white/90 font-[var(--font-display)] font-medium [text-shadow:0_1px_2px_rgba(0,0,0,0.55)]">
                    {s.label}
                  </div>
                </div>
              </Reveal>
            ))}
            {c.statsBottom.map((s, i) => (
              <Reveal key={s.label} delay={0.10 + i * 0.05}>
                <div className="relative rounded-2xl border border-white/[0.08] backdrop-blur px-7 py-9 lg:py-10 h-full flex flex-col justify-between gap-4 overflow-hidden" style={{ background: "linear-gradient(160deg, rgba(82,184,255,0.10), rgba(10,10,14,0.65) 60%)" }}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="font-[var(--font-display)] font-bold text-brand-sky text-[clamp(28px,3vw,46px)] leading-none tracking-[-0.02em]">
                      {s.value}
                    </div>
                    <Image src={s.icon} alt="" aria-hidden="true" width={36} height={36} className="opacity-80" />
                  </div>
                  <div className="text-[14px] leading-[1.55] text-white/90 font-[var(--font-display)] font-medium [text-shadow:0_1px_2px_rgba(0,0,0,0.55)]">
                    {s.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="relative py-10 lg:py-14" aria-label={t.teamEyebrow}>
        <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-16 lg:py-20">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-white/45">
              {t.teamEyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.10}>
            <h2 className="mt-6 font-[var(--font-display)] font-bold leading-[1.04] tracking-[-0.025em] text-[clamp(26px,3.4vw,52px)] max-w-[920px] section-accent">
              {t.teamHeading}
            </h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
            {c.team.map((p, i) => (
              <Reveal key={p.name} delay={0.14 + (i % 4) * 0.05}>
                <div className="group relative rounded-2xl border border-white/[0.08] bg-[rgba(10,10,14,0.55)] p-3 h-full flex flex-col gap-3 hover:border-white/[0.18] transition-colors overflow-hidden">
                  <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-white/[0.05]">
                    <Image src={p.photo} alt={`${p.name} — ${p.role}`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 22vw" className="object-cover group-hover:scale-[1.04] transition-transform duration-500" />
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[rgba(10,10,14,0.85)] to-transparent" />
                  </div>
                  <div className="px-3 pb-3 pt-1">
                    <h3 className="font-[var(--font-display)] font-bold tracking-[-0.012em] text-[15.5px] leading-[1.25] text-white">
                      {p.name}
                    </h3>
                    <p className="mt-1 text-[12.5px] leading-[1.5] text-brand-sky">
                      {p.role}
                    </p>
                    <a href={p.linkedin} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 text-[11.5px] uppercase tracking-[0.18em] text-white/55 hover:text-brand-sky transition-colors" aria-label={`${p.name} ${t.linkedinAria}`}>
                      <Image src="/elchai/about/linkedin.webp" alt="" aria-hidden="true" width={14} height={14} />
                      {t.linkedinLabel}
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team composition */}
      <section className="relative py-10 lg:py-14" aria-label={t.widerTeamEyebrow}>
        <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-16 lg:py-20">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-white/45">
              {t.widerTeamEyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.10}>
            <h2 className="mt-6 font-[var(--font-display)] font-bold leading-[1.04] tracking-[-0.025em] text-[clamp(26px,3.4vw,52px)] max-w-[920px]">
              {t.widerTeamHeading}
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {c.teamComposition.map((t2, i) => (
              <Reveal key={t2.title} delay={0.16 + i * 0.06}>
                <div className="rounded-2xl border border-white/[0.08] bg-[rgba(10,10,14,0.55)] p-7 lg:p-8 h-full flex flex-col gap-4">
                  <div className="font-[var(--font-display)] font-bold text-brand-sky text-[clamp(26px,3vw,42px)] leading-none tracking-[-0.02em]">
                    {t2.value}
                  </div>
                  <h3 className="mt-1 font-[var(--font-display)] font-bold tracking-[-0.012em] text-[18px] text-white">
                    {t2.title}
                  </h3>
                  <p className="text-[13.5px] leading-[1.6] text-white/80">
                    {t2.note}
                  </p>
                  <div className="mt-auto flex items-center -space-x-2">
                    {t2.avatars.map((avatar, ai) => (
                      <span key={`${t2.title}-${ai}`} className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-[#0E0E14]" style={{ zIndex: t2.avatars.length - ai }}>
                        <Image src={avatar} alt="" aria-hidden="true" fill sizes="36px" className="object-cover" />
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mid CTA */}
      <section className="relative py-10 lg:py-14" aria-label={t.midCtaButton}>
        <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-[820px]">
              <h2 className="font-[var(--font-display)] font-bold leading-[1.08] tracking-[-0.022em] text-[clamp(24px,2.8vw,42px)]">
                {t.midCtaA}{" "}
                <span className="text-brand-sky">{t.midCtaB}</span>
              </h2>
            </div>
            <Link href="#consultation" className="cta cta--primary shrink-0">
              {t.midCtaButton}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section id="our-journey" className="relative py-10 lg:py-14" aria-label={t.journeyEyebrow}>
        <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-16 lg:py-20">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-white/45">
              {t.journeyEyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.10}>
            <h2 className="mt-6 font-[var(--font-display)] font-bold leading-[1.04] tracking-[-0.025em] text-[clamp(26px,3.4vw,52px)] max-w-[1080px] section-accent">
              {t.journeyHeading}
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-6 text-[15px] leading-[1.65] text-white/65 max-w-[760px]">
              {t.journeyBody}
            </p>
          </Reveal>

          <div className="mt-14 space-y-10 lg:space-y-12">
            {c.journey.map((chapter, ci) => (
              <Reveal key={chapter.year} delay={0.18 + ci * 0.06}>
                <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-6 lg:gap-12 items-start">
                  <div className="lg:sticky lg:top-24">
                    <div className="font-[var(--font-display)] font-bold text-brand-sky text-[clamp(36px,4vw,56px)] leading-none tracking-[-0.02em]">
                      {chapter.year}
                    </div>
                    <span aria-hidden="true" className="mt-4 block h-px w-12 bg-brand-sky/60" />
                  </div>
                  <ul className="space-y-5 list-none p-0 m-0">
                    {chapter.items.map((it) => (
                      <li key={it.title} className="rounded-2xl border border-white/[0.08] bg-[rgba(10,10,14,0.55)] p-6 lg:p-7">
                        <h3 className="font-[var(--font-display)] font-bold tracking-[-0.01em] text-[15.5px] text-white">
                          {it.title}
                        </h3>
                        <p className="mt-2 text-[14.5px] leading-[1.7] text-white/85">
                          {it.body}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Promise */}
      <section className="relative py-10 lg:py-14" aria-label={t.promiseEyebrow}>
        <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-16 lg:py-20">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-white/45">
              {t.promiseEyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.10}>
            <h2 className="mt-6 font-[var(--font-display)] font-bold leading-[1.04] tracking-[-0.025em] text-[clamp(26px,3.4vw,52px)] max-w-[920px] section-accent">
              {t.promiseHeading}
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-6 text-[15px] leading-[1.65] text-white/65 max-w-[680px]">
              {t.promiseBody}
            </p>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {c.reasons.map((r, i) => (
              <Reveal key={r.n} delay={0.16 + i * 0.06}>
                <div className="rounded-3xl glass glass-edge p-7 lg:p-9 h-full flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span aria-hidden="true" className="inline-flex w-14 h-14 rounded-2xl items-center justify-center p-2.5" style={{ background: "radial-gradient(circle at 40% 30%, rgba(82,184,255,0.22), rgba(176,124,255,0.16) 70%, transparent)", boxShadow: "0 0 0 1px rgba(255,255,255,0.08), inset 0 0 20px rgba(82,184,255,0.10)" }}>
                        <Image src={r.icon} alt="" aria-hidden="true" width={40} height={40} className="object-contain" />
                      </span>
                      <span className="font-[var(--font-mono)] text-[11px] tracking-[0.22em] text-brand-sky">
                        {r.n}
                      </span>
                    </div>
                    <span className="font-[var(--font-mono)] text-[10px] tracking-[0.22em] text-white/35">
                      {r.n} {t.counterSuffix}
                    </span>
                  </div>
                  <span aria-hidden="true" className="block h-px w-10 bg-brand-sky/60" />
                  <span className="font-[var(--font-mono)] text-[11px] tracking-[0.20em] uppercase text-white/55">
                    {r.kicker}
                  </span>
                  <h3 className="font-[var(--font-display)] font-bold tracking-[-0.012em] text-[clamp(18px,1.6vw,24px)] text-white">
                    {r.title}
                  </h3>
                  <p className="text-[14px] leading-[1.65] text-white/70">
                    {r.body}
                  </p>
                  <Link href="#consultation" className="mt-auto inline-flex items-center gap-2 text-[13px] tracking-[0.02em] text-white/85 hover:text-brand-sky transition-colors">
                    {t.getInTouch}
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Case studies */}
      <section className="relative py-10 lg:py-14" aria-label={t.caseStudiesEyebrow}>
        <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-16 lg:py-20">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-white/45">
              {t.caseStudiesEyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.10}>
            <h2 className="mt-6 font-[var(--font-display)] font-bold leading-[1.04] tracking-[-0.025em] text-[clamp(26px,3.4vw,52px)] max-w-[920px] section-accent">
              {t.caseStudiesHeading}
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-6 text-[15px] leading-[1.65] text-white/65 max-w-[680px]">
              {t.caseStudiesBody}
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {c.caseStudies.map((cs, i) => (
              <Reveal key={cs.label} delay={0.20 + i * 0.06}>
                <div className="rounded-3xl glass glass-edge p-7 lg:p-9 h-full flex flex-col gap-5 overflow-hidden">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="font-[var(--font-mono)] text-[10px] tracking-[0.22em] text-brand-sky uppercase">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-[var(--font-mono)] text-[11px] tracking-[0.20em] text-white/50 uppercase">
                        {cs.sector}
                      </span>
                    </div>
                    <span className="relative h-9 w-24 shrink-0">
                      <Image src={cs.logo} alt={`${cs.label} logo`} fill sizes="96px" className="object-contain object-right" />
                    </span>
                  </div>
                  <h3 className="font-[var(--font-display)] font-bold tracking-[-0.012em] text-[clamp(22px,2.2vw,32px)] text-white">
                    {cs.label}
                  </h3>
                  <p className="text-[14px] leading-[1.65] text-white/70">
                    {cs.body}
                  </p>
                  <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/[0.06]">
                    <Image src={cs.image} alt={`${cs.label} preview`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-px bg-white/[0.06] rounded-xl overflow-hidden">
                    {cs.stats.map((s) => (
                      <div key={s.label} className="bg-[rgba(10,10,14,0.55)] px-5 py-5">
                        <div className="font-[var(--font-display)] font-bold text-brand-sky text-[clamp(20px,2vw,30px)] leading-none tracking-[-0.02em]">
                          {s.value}
                        </div>
                        <div className="mt-2 font-[var(--font-display)] font-medium text-[13px] leading-[1.5] text-white/90 [text-shadow:0_1px_2px_rgba(0,0,0,0.55)]">
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link href="/case-study" className="mt-auto inline-flex items-center gap-2 text-[13px] tracking-[0.02em] text-white/85 hover:text-brand-sky transition-colors">
                    {t.downloadCs}
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Partners marquee */}
      <section className="relative py-10 lg:py-14" aria-label={t.partnersEyebrow}>
        <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-16 lg:py-20">
          <Reveal>
            <div className="flex justify-center">
              <span className="inline-flex items-center gap-2.5 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-white/45">
                {t.partnersEyebrow}
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.10}>
            <h2 className="mt-6 text-center font-[var(--font-display)] font-bold leading-[1.04] tracking-[-0.025em] text-[clamp(26px,3.4vw,48px)] max-w-[920px] mx-auto">
              {t.partnersHeading}
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-5 text-center text-[15px] leading-[1.65] text-white/65 max-w-[680px] mx-auto">
              {t.partnersBody}
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="mt-10">
              <InfiniteSlider gap={16} speed={48} speedOnHover={18} className="py-2">
                {PARTNER_LOGOS.map((logo) => (
                  <span key={logo} className="inline-flex shrink-0 items-center justify-center w-[180px] h-[88px] sm:w-[200px] sm:h-[100px] rounded-xl px-5 border border-white/10 bg-white">
                    <Image src={logo} alt={t.partnersAlt} width={140} height={70} className="object-contain max-w-full max-h-[60%] w-auto" />
                  </span>
                ))}
              </InfiniteSlider>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative py-10 lg:py-14" aria-label={t.closingEyebrow}>
        <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-[760px]">
              <span className="inline-flex items-center gap-2.5 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-white/45">
                {t.closingEyebrow}
              </span>
              <h2 className="mt-5 font-[var(--font-display)] font-bold leading-[1.06] tracking-[-0.022em] text-[clamp(24px,2.8vw,44px)]">
                {t.closingHeading}
              </h2>
              <p className="mt-4 text-[14.5px] leading-[1.65] text-white/65">
                {t.closingBody}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="#consultation" className="cta cta--primary">
                {t.closingCta}
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </Link>
              <Link href="/case-study" className="cta cta--ghost">
                {t.closingGhost}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
