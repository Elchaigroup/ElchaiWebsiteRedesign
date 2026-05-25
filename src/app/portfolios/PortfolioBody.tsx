"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/primitives/Reveal";
import { Contact } from "@/components/sections/Contact";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { useLocale } from "@/lib/i18n";
import { PORTFOLIO_GALLERY } from "@/lib/portfolio";

type Copy = {
  home: string;
  breadcrumb: string;
  eyebrow: string;
  headingA: string;
  headingB: string;
  bodyLead: string;
  bodyRest: string;
  briefcaseAlt: string;
};

const COPY: Record<"EN" | "AR" | "IT", Copy> = {
  EN: {
    home: "Home",
    breadcrumb: "Portfolio",
    eyebrow: "Our Portfolio",
    headingA: "We love to make apps ",
    headingB: "that make a difference.",
    bodyLead: "Explore why choose Elchai",
    bodyRest:
      " to transform your business ideas into reality — products in market across AI, blockchain, healthcare, super apps, and on-demand services.",
    briefcaseAlt: "Portfolio briefcase",
  },
  AR: {
    home: "الرئيسية",
    breadcrumb: "أعمالنا",
    eyebrow: "أعمالنا",
    headingA: "نحب أن نصنع تطبيقات ",
    headingB: "تُحدث فرقاً.",
    bodyLead: "اكتشف لماذا تختار Elchai",
    bodyRest:
      " لتحويل أفكارك التجارية إلى واقع — منتجات في السوق عبر الذكاء الاصطناعي والبلوكتشين والرعاية الصحية والتطبيقات الفائقة وخدمات الطلب الفوري.",
    briefcaseAlt: "حقيبة الأعمال",
  },
  IT: {
    home: "Home",
    breadcrumb: "Portfolio",
    eyebrow: "Il nostro portfolio",
    headingA: "Amiamo creare app ",
    headingB: "che fanno la differenza.",
    bodyLead: "Scopri perché scegliere Elchai",
    bodyRest:
      " per trasformare le tue idee di business in realtà — prodotti sul mercato in ambito AI, blockchain, sanità, super-app e servizi on-demand.",
    briefcaseAlt: "Valigetta del portfolio",
  },
};

export function PortfolioBody() {
  const { locale } = useLocale();
  const t = COPY[locale] ?? COPY.EN;

  return (
    <main className="relative" style={{ zIndex: 1 }}>
      <section
        className="relative pt-32 pb-8 lg:pt-36 lg:pb-12"
        aria-label={t.eyebrow}
      >
        <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
            <div>
              <Reveal>
                <nav
                  aria-label="Breadcrumb"
                  className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-white/45 flex flex-wrap items-center gap-2"
                >
                  <Link href="/" className="hover:text-brand-sky transition-colors">
                    {t.home}
                  </Link>
                  <span aria-hidden="true" className="text-white/30">
                    /
                  </span>
                  <span className="text-brand-sky">{t.breadcrumb}</span>
                </nav>
              </Reveal>
              <Reveal delay={0.1}>
                <span className="mt-8 inline-flex items-center gap-2.5 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-white/45">
                  {t.eyebrow}
                </span>
              </Reveal>
              <Reveal delay={0.16}>
                <h1 className="mt-6 font-[var(--font-display)] font-bold leading-[1.04] tracking-[-0.028em] text-[clamp(38px,5.6vw,82px)]">
                  {t.headingA}
                  <span className="text-brand-sky">{t.headingB}</span>
                </h1>
              </Reveal>
              <Reveal delay={0.22}>
                <p className="mt-6 text-[15.5px] leading-[1.65] text-white/70 max-w-[560px]">
                  <strong className="font-semibold text-white/90">
                    {t.bodyLead}
                  </strong>
                  {t.bodyRest}
                </p>
              </Reveal>
            </div>

            <div className="relative aspect-square max-w-[460px] mx-auto w-full">
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="relative w-[44%] aspect-square rounded-full
                             bg-gradient-to-br from-[#7B6CFF] to-[#5B8DF8]
                             flex items-center justify-center
                             shadow-[0_30px_60px_-20px_rgba(123,108,255,0.55)]"
                >
                  <Image
                    src="/elchai/portfolio/portfolio-suitcase.svg"
                    alt={t.briefcaseAlt}
                    width={88}
                    height={88}
                    className="w-[55%] h-[55%] object-contain invert"
                  />
                </div>
              </div>

              {PORTFOLIO_GALLERY.map((src, i) => {
                const angle = (i * 60 - 90) * (Math.PI / 180);
                const r = 42;
                const x = 50 + r * Math.cos(angle);
                const y = 50 + r * Math.sin(angle);
                return (
                  <Reveal key={src} delay={0.25 + i * 0.06}>
                    <div
                      className="absolute w-[22%] aspect-square rounded-2xl overflow-hidden
                                 ring-1 ring-white/15 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.7)]
                                 bg-white/[0.04] backdrop-blur"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <Image
                        src={src}
                        alt=""
                        fill
                        aria-hidden="true"
                        className="object-cover"
                      />
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section
        className="relative py-10 lg:py-14"
        aria-label={t.breadcrumb}
      >
        <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-16 lg:py-20">
          <PortfolioGrid />
        </div>
      </section>

      <Contact />
    </main>
  );
}
