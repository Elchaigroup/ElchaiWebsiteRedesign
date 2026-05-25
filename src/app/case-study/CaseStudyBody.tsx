"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/primitives/Reveal";
import { Contact } from "@/components/sections/Contact";
import { useLocale } from "@/lib/i18n";
import { CASE_STUDIES } from "@/lib/case-studies";

type Copy = {
  home: string;
  breadcrumb: string;
  eyebrow: string;
  heading: string;
  body: string;
  download: string;
  downloadCs: string;
  downloadAria: (brand: string) => string;
};

const COPY: Record<"EN" | "AR" | "IT", Copy> = {
  EN: {
    home: "Home",
    breadcrumb: "Case Studies",
    eyebrow: "Case Studies",
    heading: "Case Studies",
    body:
      "Real engagements, real ship dates. From AI-powered supply-chain rebuilds to multi-country super apps, each card below is a product we took from brief to production with a partner team.",
    download: "Download",
    downloadCs: "Download Case Study",
    downloadAria: (b) => `Download ${b} case study`,
  },
  AR: {
    home: "الرئيسية",
    breadcrumb: "دراسات الحالة",
    eyebrow: "دراسات الحالة",
    heading: "دراسات الحالة",
    body:
      "ارتباطات حقيقية، مواعيد إطلاق حقيقية. من إعادة بناء سلاسل التوريد المدعومة بالذكاء الاصطناعي إلى التطبيقات الفائقة متعددة الدول، كل بطاقة أدناه هي منتج أخذناه من المخطط إلى الإنتاج مع فريق شريك.",
    download: "تنزيل",
    downloadCs: "تنزيل دراسة الحالة",
    downloadAria: (b) => `تنزيل دراسة حالة ${b}`,
  },
  IT: {
    home: "Home",
    breadcrumb: "Case Study",
    eyebrow: "Case Study",
    heading: "Case Study",
    body:
      "Engagement reali, date di rilascio reali. Dalle ricostruzioni della supply chain basate sull'AI alle super-app multi-paese, ogni card qui sotto è un prodotto che abbiamo portato dal brief alla produzione insieme al team partner.",
    download: "Scarica",
    downloadCs: "Scarica il case study",
    downloadAria: (b) => `Scarica il case study di ${b}`,
  },
};

export function CaseStudyBody() {
  const { locale } = useLocale();
  const t = COPY[locale] ?? COPY.EN;

  return (
    <main className="relative" style={{ zIndex: 1 }}>
      <section
        className="relative pt-32 pb-8 lg:pt-36 lg:pb-12"
        aria-label={t.eyebrow}
      >
        <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-14 lg:py-16">
          <Reveal>
            <nav
              aria-label="Breadcrumb"
              className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-white/45 flex flex-wrap items-center gap-2"
            >
              <Link href="/" className="hover:text-brand-sky transition-colors">
                {t.home}
              </Link>
              <span aria-hidden="true" className="text-white/30">/</span>
              <span className="text-brand-sky">{t.breadcrumb}</span>
            </nav>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="mt-8 inline-flex items-center gap-2.5 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-white/45">
              {t.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.16}>
            <h1 className="mt-6 font-[var(--font-display)] font-bold leading-[1.04] tracking-[-0.028em] text-[clamp(38px,5.6vw,82px)] text-center">
              {t.heading}
            </h1>
          </Reveal>
          <Reveal delay={0.22}>
            <p className="mt-6 mx-auto text-[15.5px] leading-[1.7] text-white/70 max-w-[760px] text-center">
              {t.body}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative py-6 lg:py-10" aria-label={t.eyebrow}>
        <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-12 lg:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {CASE_STUDIES.map((cs, i) => (
              <Reveal key={cs.slug} delay={Math.min(i, 5) * 0.04}>
                <article
                  className="group relative rounded-3xl overflow-hidden
                             ring-1 ring-white/[0.06] bg-[rgba(10,10,14,0.45)]
                             shadow-[0_30px_60px_-30px_rgba(0,0,0,0.55)]
                             transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                             hover:-translate-y-1 hover:ring-brand-sky/30
                             hover:shadow-[0_40px_80px_-30px_rgba(36,229,255,0.25)]"
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={cs.image}
                      alt={`${cs.brand} — ${cs.category}`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/85 via-black/30 to-transparent
                                 opacity-0 group-hover:opacity-100 transition-opacity duration-[400ms]"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-6 lg:p-7 flex items-end justify-between gap-3
                                    translate-y-3 opacity-0
                                    group-hover:translate-y-0 group-hover:opacity-100
                                    transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]">
                      <div className="text-white">
                        <div className="font-[var(--font-mono)] text-[10.5px] uppercase tracking-[0.22em] text-brand-sky">
                          {cs.category}
                        </div>
                        <div className="mt-1.5 font-[var(--font-display)] font-bold text-[18px] leading-none">
                          {cs.brand}
                        </div>
                      </div>
                      <Link
                        href={cs.href ?? "#consultation"}
                        aria-label={t.downloadAria(cs.brand)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full
                                   bg-gradient-to-r from-[#7B6CFF] to-[#5B8DF8] text-white text-[12px]
                                   font-medium shadow-[0_8px_20px_-8px_rgba(123,108,255,0.55)]"
                      >
                        {t.download}
                        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <path d="M8 2v9m0 0l-3.5-3.5M8 11l3.5-3.5M3 13.5h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                      </Link>
                    </div>
                  </div>

                  <div className="p-5 lg:p-6 flex items-center justify-between gap-3 bg-[rgba(10,10,14,0.65)] border-t border-white/[0.05]">
                    <div>
                      <div className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-white/45">
                        {cs.category}
                      </div>
                      <div className="mt-1 font-[var(--font-display)] font-semibold text-[15.5px] text-white leading-none">
                        {cs.brand}
                      </div>
                    </div>
                    <Link
                      href={cs.href ?? "#consultation"}
                      className="inline-flex items-center gap-2 text-[12px] text-white/70 hover:text-brand-sky transition-colors"
                    >
                      {t.downloadCs}
                      <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
                      </svg>
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Contact />
    </main>
  );
}
