"use client";

import Image from "next/image";
import Link from "next/link";
import { Contact } from "@/components/sections/Contact";
import { Reveal } from "@/components/primitives/Reveal";
import { Parallax } from "@/components/primitives/Parallax";
import { Accordion } from "@/components/ui/accordion";
import { useContent } from "@/lib/use-content";
import { useLocale } from "@/lib/i18n";

const LINKEDIN_LABELS: Record<"EN" | "AR" | "IT", string> = {
  EN: "Follow on LinkedIn",
  AR: "تابعنا على LinkedIn",
  IT: "Seguici su LinkedIn",
};

export function InternsBody() {
  const { interns } = useContent();
  const { locale } = useLocale();
  const accordionItems = interns.activities.items.map((it) => ({
    id: it.n,
    question: it.title,
    answer: it.body,
  }));

  return (
    <>
      <main className="relative" style={{ zIndex: 1 }}>
        {/* ─────────── Hero ─────────── */}
        <section
          className="relative pt-40 pb-24 lg:pt-48 lg:pb-32"
          aria-label="Interns hero"
        >
          <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-14 lg:py-20">
            <Reveal>
              <span
                className="inline-flex items-center gap-2.5 font-[var(--font-mono)]
                           text-[11px] uppercase tracking-[0.22em] text-white/45"
              >
                {interns.hero.eyebrow}
              </span>
            </Reveal>

            <Reveal delay={0.10}>
              <h1
                className="mt-8 font-[var(--font-display)] font-bold leading-[1.02]
                           tracking-[-0.028em] text-[clamp(38px,6.4vw,98px)] max-w-[1100px]"
              >
                {interns.hero.heading}
              </h1>
            </Reveal>

            <Reveal delay={0.20}>
              <p className="mt-8 text-[17px] leading-[1.55] text-white/65 max-w-[640px]">
                {interns.hero.body}
              </p>
            </Reveal>

            <Reveal delay={0.28}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Link
                  href={interns.hero.primaryCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta cta--primary"
                >
                  {interns.hero.primaryCta.label}
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                </Link>
                <Link href={interns.hero.ghostCta.href} className="cta cta--ghost">
                  {interns.hero.ghostCta.label}
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.36}>
              <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden max-w-[940px]">
                {interns.hero.stats.map((s) => (
                  <div key={s.label} className="bg-[rgba(10,10,14,0.6)] p-6 lg:p-8">
                    <div className="font-[var(--font-display)] font-bold leading-none tracking-[-0.02em] text-[clamp(34px,3.6vw,52px)] text-white">
                      {s.value}
                    </div>
                    <div className="mt-3 font-[var(--font-display)] font-medium text-[14px] leading-[1.5] text-white/90 max-w-[180px] [text-shadow:0_1px_2px_rgba(0,0,0,0.55)]">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ─────────── Programme Overview ─────────── */}
        <section
          id="overview"
          className="relative py-24 lg:py-32"
          aria-label="Programme overview"
        >
          <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-14 lg:py-20">
            <Reveal>
              <span className="inline-flex items-center gap-2.5 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-white/45">
                {interns.overview.eyebrow}
              </span>
            </Reveal>
            <div className="mt-6 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <Reveal delay={0.10}>
                <h2 className="font-[var(--font-display)] font-bold leading-[1.04] tracking-[-0.025em] text-[clamp(28px,3.8vw,56px)] max-w-[680px]">
                  {interns.overview.heading}
                </h2>
              </Reveal>
              <Reveal delay={0.20}>
                <p className="text-[15px] leading-[1.65] text-white/65 max-w-[460px]">
                  {interns.overview.body}
                </p>
              </Reveal>
            </div>

            <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {interns.overview.items.map((it, i) => (
                <Reveal key={it.title} delay={0.20 + i * 0.06}>
                  <div className="h-full rounded-2xl glass glass-edge p-7 lg:p-8 flex flex-col gap-5">
                    <div className="font-[var(--font-display)] font-medium leading-[1.18] tracking-[-0.012em] text-[clamp(20px,1.7vw,26px)] text-brand-sky">
                      {it.value}
                    </div>
                    <h3 className="font-[var(--font-display)] font-bold text-[15px] tracking-[-0.005em] text-white">
                      {it.title}
                    </h3>
                    <p className="text-[14px] leading-[1.55] text-white/70">{it.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────── Programmes (12 tracks) ─────────── */}
        <section
          id="programmes"
          className="relative py-24 lg:py-32"
          aria-label="Internship programmes"
        >
          <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-14 lg:py-20">
            <Reveal>
              <span className="inline-flex items-center gap-2.5 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-white/45">
                {interns.programmes.eyebrow}
              </span>
            </Reveal>
            <div className="mt-6 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <Reveal delay={0.10}>
                <h2 className="font-[var(--font-display)] font-bold leading-[1.04] tracking-[-0.025em] text-[clamp(28px,3.8vw,56px)] max-w-[680px]">
                  {interns.programmes.heading}
                </h2>
              </Reveal>
              <Reveal delay={0.20}>
                <p className="text-[15px] leading-[1.65] text-white/65 max-w-[440px]">
                  {interns.programmes.body}
                </p>
              </Reveal>
            </div>

            <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
              {interns.programmes.tracks.map((t, i) => (
                <Reveal key={t.title} delay={0.18 + (i % 6) * 0.04}>
                  <div className="h-full bg-[rgba(10,10,14,0.6)] p-7 lg:p-8 flex flex-col gap-4">
                    <span className="font-[var(--font-mono)] text-[10px] tracking-[0.22em] text-brand-sky uppercase">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-[var(--font-display)] font-bold tracking-[-0.012em] text-[clamp(17px,1.4vw,20px)] text-white">
                      {t.title}
                    </h3>
                    <p className="text-[14px] leading-[1.65] text-white/85">{t.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────── Why Choose ─────────── */}
        <section
          className="relative py-24 lg:py-32"
          aria-label="Why join us"
        >
          <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-14 lg:py-20">
            <Reveal>
              <span className="inline-flex items-center gap-2.5 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-white/45">
                {interns.why.eyebrow}
              </span>
            </Reveal>
            <div className="mt-6 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <Reveal delay={0.10}>
                <h2 className="font-[var(--font-display)] font-bold leading-[1.04] tracking-[-0.025em] text-[clamp(28px,3.8vw,56px)] max-w-[620px]">
                  {interns.why.heading}
                </h2>
              </Reveal>
              <Reveal delay={0.20}>
                <p className="text-[15px] leading-[1.65] text-white/65 max-w-[460px]">
                  {interns.why.body}
                </p>
              </Reveal>
            </div>

            <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
              {interns.why.pillars.map((p, i) => (
                <Reveal key={p.title} delay={0.18 + i * 0.06}>
                  <div className="h-full bg-[rgba(10,10,14,0.6)] p-8 lg:p-12 flex flex-col gap-4">
                    <h3 className="font-[var(--font-display)] font-bold tracking-[-0.012em] text-[clamp(20px,1.7vw,26px)] text-white">
                      {p.title}
                    </h3>
                    <p className="text-[15px] leading-[1.60] text-white/70 max-w-[520px]">
                      {p.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────── Meet The Interns ─────────── */}
        <section
          className="relative py-24 lg:py-32"
          aria-label="Meet the interns"
        >
          <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-14 lg:py-20">
            <Reveal>
              <span className="inline-flex items-center gap-2.5 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-white/45">
                {interns.meet.eyebrow}
              </span>
            </Reveal>
            <div className="mt-6 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <Reveal delay={0.10}>
                <h2 className="font-[var(--font-display)] font-bold leading-[1.04] tracking-[-0.025em] text-[clamp(28px,3.8vw,56px)] max-w-[620px]">
                  {interns.meet.heading}
                </h2>
              </Reveal>
              <Reveal delay={0.20}>
                <p className="text-[15px] leading-[1.65] text-white/65 max-w-[460px]">
                  {interns.meet.body}
                </p>
              </Reveal>
            </div>

            <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {interns.meet.profiles.map((p, i) => (
                <Reveal key={p.name} delay={0.16 + (i % 4) * 0.05}>
                  <figure className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[rgba(10,10,14,0.55)]">
                    <div className="relative aspect-[4/5]">
                      <Image
                        src={p.photo}
                        alt={p.name}
                        fill
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[rgba(10,10,14,0.92)] via-transparent to-transparent"
                      />
                    </div>
                    <figcaption className="absolute inset-x-0 bottom-0 p-5">
                      <h3 className="font-[var(--font-display)] font-bold text-[17px] leading-tight text-white">
                        {p.name}
                      </h3>
                      <p className="mt-1 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-brand-sky">
                        {p.role}
                      </p>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────── Life at Elchai (gallery) ─────────── */}
        <section
          className="relative py-24 lg:py-32"
          aria-label="Life at Elchai"
        >
          <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-14 lg:py-20">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <div>
                <Reveal>
                  <h2 className="font-[var(--font-display)] font-bold leading-[1.04] tracking-[-0.025em] text-[clamp(28px,3.8vw,56px)] max-w-[620px]">
                    {interns.life.heading}
                  </h2>
                </Reveal>
                <Reveal delay={0.10}>
                  <p className="mt-5 text-[15px] leading-[1.65] text-white/65 max-w-[560px]">
                    {interns.life.body}
                  </p>
                </Reveal>
              </div>
              <Reveal delay={0.20}>
                <Link
                  href={interns.meet.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta cta--ghost"
                >
                  {LINKEDIN_LABELS[locale] ?? LINKEDIN_LABELS.EN}
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                </Link>
              </Reveal>
            </div>

            <Reveal delay={0.28}>
              <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
                {interns.life.photos.map((ph, i) => (
                  <div
                    key={ph.src}
                    className={`relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[rgba(10,10,14,0.55)] ${
                      i === 0 || i === 5 ? "row-span-2 aspect-[4/6]" : "aspect-[4/3]"
                    }`}
                  >
                    <Image
                      src={ph.src}
                      alt={ph.alt}
                      fill
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.04]"
                    />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ─────────── Intern Life pillars ─────────── */}
        <section
          className="relative py-24 lg:py-32"
          aria-label="What our interns get up to"
        >
          <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-14 lg:py-20">
            <Reveal>
              <span className="inline-flex items-center gap-2.5 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-white/45">
                {interns.internLife.eyebrow}
              </span>
            </Reveal>
            <div className="mt-6 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <Reveal delay={0.10}>
                <h2 className="font-[var(--font-display)] font-bold leading-[1.04] tracking-[-0.025em] text-[clamp(28px,3.8vw,56px)] max-w-[620px]">
                  {interns.internLife.heading}
                </h2>
              </Reveal>
              <Reveal delay={0.20}>
                <p className="text-[15px] leading-[1.65] text-white/65 max-w-[460px]">
                  {interns.internLife.body}
                </p>
              </Reveal>
            </div>

            <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
              {interns.internLife.pillars.map((p, i) => (
                <Reveal key={p.title} delay={0.18 + i * 0.06}>
                  <div className="h-full bg-[rgba(10,10,14,0.6)] p-8 lg:p-10 flex flex-col gap-4">
                    <span className="font-[var(--font-mono)] text-[10px] tracking-[0.22em] text-brand-sky uppercase">
                      0{i + 1} · {p.title.split(" ")[0]}
                    </span>
                    <h3 className="font-[var(--font-display)] font-bold tracking-[-0.012em] text-[clamp(20px,1.6vw,24px)] text-white">
                      {p.title}
                    </h3>
                    <p className="text-[14px] leading-[1.60] text-white/70">{p.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────── Activities (accordion) ─────────── */}
        <section
          className="relative py-24 lg:py-32"
          aria-label="Programme activities"
        >
          <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-14 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start">
              <div className="lg:sticky lg:top-24">
                <Reveal>
                  <span className="inline-flex items-center gap-2.5 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-white/45">
                    {interns.activities.eyebrow}
                  </span>
                </Reveal>
                <Reveal delay={0.10}>
                  <h2 className="mt-6 font-[var(--font-display)] font-bold leading-[1.04] tracking-[-0.025em] text-[clamp(28px,3.8vw,56px)] max-w-[460px]">
                    {interns.activities.heading}
                  </h2>
                </Reveal>
                <Reveal delay={0.20}>
                  <p className="mt-5 text-[15px] leading-[1.65] text-white/65 max-w-[420px]">
                    {interns.activities.body}
                  </p>
                </Reveal>
              </div>

              <Reveal delay={0.28}>
                <Accordion items={accordionItems} />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ─────────── Closing CTA ─────────── */}
        <section
          className="relative py-24 lg:py-32"
          aria-label="Apply to the internship programme"
        >
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
                <Reveal>
                  <span className="inline-flex items-center gap-2.5 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-brand-sky">
                    {interns.closing.eyebrow}
                  </span>
                </Reveal>
                <Parallax amount={30}>
                  <Reveal delay={0.10}>
                    <h2 className="font-[var(--font-display)] font-bold leading-[1.04] tracking-[-0.028em] text-[clamp(32px,4.6vw,68px)] max-w-[820px]">
                      {interns.closing.heading}
                    </h2>
                  </Reveal>
                </Parallax>
                <Reveal delay={0.20}>
                  <p className="text-[15px] leading-[1.65] text-white/70 max-w-[560px]">
                    {interns.closing.body}
                  </p>
                </Reveal>
                <Reveal delay={0.28}>
                  <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
                    <Link
                      href={interns.closing.primaryCta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cta cta--primary"
                    >
                      {interns.closing.primaryCta.label}
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
                      </svg>
                    </Link>
                    <Link href={interns.closing.contactCta.href} className="cta cta--ghost">
                      {interns.closing.contactCta.label}
                    </Link>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
        <Contact />
      </main>
    </>
  );
}
