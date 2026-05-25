"use client";

import Link from "next/link";
import { Reveal } from "@/components/primitives/Reveal";
import { useLocale } from "@/lib/i18n";

type Copy = {
  home: string;
  comingSoon: string;
  body: (title: string) => string;
  bookCall: string;
  backHome: string;
};

const COPY: Record<"EN" | "AR" | "IT", Copy> = {
  EN: {
    home: "Home",
    comingSoon: "Coming soon",
    body: (t) =>
      `This page is being prepared. In the meantime, schedule a consultation to discuss your ${t.toLowerCase()} project directly with our team — or head back to the homepage to see the full Elchai story.`,
    bookCall: "Book a call",
    backHome: "Back to home",
  },
  AR: {
    home: "الرئيسية",
    comingSoon: "قريباً",
    body: (t) =>
      `هذه الصفحة قيد الإعداد. في غضون ذلك، احجز جلسة استشارية لمناقشة مشروع ${t} الخاص بك مباشرة مع فريقنا — أو ارجع إلى الصفحة الرئيسية لمشاهدة قصة Elchai الكاملة.`,
    bookCall: "احجز مكالمة",
    backHome: "العودة إلى الرئيسية",
  },
  IT: {
    home: "Home",
    comingSoon: "Disponibile a breve",
    body: (t) =>
      `Questa pagina è in fase di preparazione. Nel frattempo, pianifica una consulenza per discutere il tuo progetto ${t.toLowerCase()} direttamente con il nostro team — o torna alla homepage per scoprire la storia completa di Elchai.`,
    bookCall: "Prenota una chiamata",
    backHome: "Torna alla home",
  },
};

export function ServiceStub({ title, category }: { title: string; category: string }) {
  const { locale } = useLocale();
  const t = COPY[locale] ?? COPY.EN;

  return (
    <main className="relative" style={{ zIndex: 1 }}>
      <section
        className="relative pt-32 pb-10 lg:pt-36 lg:pb-14"
        aria-label={title}
      >
        <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-16 lg:py-20 w-full">
          <Reveal>
            <nav
              aria-label="Breadcrumb"
              className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-white/45 flex flex-wrap items-center gap-2"
            >
              <Link href="/" className="hover:text-brand-sky transition-colors">
                {t.home}
              </Link>
              <span aria-hidden="true" className="text-white/30">/</span>
              <span className="text-white/65">{category}</span>
              <span aria-hidden="true" className="text-white/30">/</span>
              <span className="text-brand-sky">{title}</span>
            </nav>
          </Reveal>

          <Reveal delay={0.10}>
            <h1
              className="mt-10 font-[var(--font-display)] font-bold leading-[1.04]
                         tracking-[-0.025em] text-[clamp(34px,5vw,82px)] max-w-[980px]"
            >
              {title}
            </h1>
          </Reveal>

          <Reveal delay={0.20}>
            <div className="mt-12 inline-flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-brand-sky shadow-[0_0_10px_#18DEFF]" />
              <span className="font-[var(--font-mono)] text-[11px] tracking-[0.22em] text-white/65 uppercase">
                {t.comingSoon}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.28}>
            <p className="mt-6 text-[15px] leading-[1.65] text-white/65 max-w-[620px]">
              {t.body(title)}
            </p>
          </Reveal>

          <Reveal delay={0.36}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link href="#consultation" className="cta cta--primary">
                {t.bookCall}
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </Link>
              <Link href="/" className="cta cta--ghost">
                {t.backHome}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
