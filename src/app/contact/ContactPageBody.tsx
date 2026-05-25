"use client";

import Link from "next/link";
import { Reveal } from "@/components/primitives/Reveal";
import { Contact } from "@/components/sections/Contact";
import { useLocale } from "@/lib/i18n";

type Copy = {
  home: string;
  breadcrumb: string;
  eyebrow: string;
  heading: string;
  body: string;
  emailHeading: string;
  emailHint: string;
  phoneHeading: string;
  phoneHint: string;
  officeHeading: string;
  officeAddress: string;
};

const COPY: Record<"EN" | "AR" | "IT", Copy> = {
  EN: {
    home: "Home",
    breadcrumb: "Contact",
    eyebrow: "Talk to us",
    heading: "Start a conversation with Elchai Group",
    body: "Tell us about your AI or blockchain initiative. We respond within one business day with next steps and a discovery call.",
    emailHeading: "Email",
    emailHint: "For new business and partnerships",
    phoneHeading: "Phone",
    phoneHint: "Mon–Fri, 09:00–18:00 GST",
    officeHeading: "Office",
    officeAddress:
      "2008, Jumeirah Business Center 1 — Cluster G, Al Thanyah Fifth, Jumeirah Lakes Towers, Dubai, UAE",
  },
  AR: {
    home: "الرئيسية",
    breadcrumb: "اتصل بنا",
    eyebrow: "تحدث معنا",
    heading: "ابدأ محادثة مع مجموعة Elchai",
    body: "أخبرنا عن مبادرتك في الذكاء الاصطناعي أو البلوكتشين. نرد خلال يوم عمل واحد بالخطوات التالية ومكالمة استكشافية.",
    emailHeading: "البريد الإلكتروني",
    emailHint: "للأعمال الجديدة والشراكات",
    phoneHeading: "الهاتف",
    phoneHint: "الإثنين–الجمعة، 09:00–18:00 بتوقيت الخليج",
    officeHeading: "المكتب",
    officeAddress:
      "2008، مركز جميرا للأعمال 1 — كلاستر G، الثنية الخامسة، أبراج بحيرات جميرا، دبي، الإمارات العربية المتحدة",
  },
  IT: {
    home: "Home",
    breadcrumb: "Contatti",
    eyebrow: "Parla con noi",
    heading: "Avvia una conversazione con Elchai Group",
    body: "Raccontaci della tua iniziativa di AI o blockchain. Rispondiamo entro un giorno lavorativo con i prossimi passi e una call esplorativa.",
    emailHeading: "Email",
    emailHint: "Per nuovi business e partnership",
    phoneHeading: "Telefono",
    phoneHint: "Lun–Ven, 09:00–18:00 GST",
    officeHeading: "Ufficio",
    officeAddress:
      "2008, Jumeirah Business Center 1 — Cluster G, Al Thanyah Fifth, Jumeirah Lakes Towers, Dubai, UAE",
  },
};

export function ContactPageBody() {
  const { locale } = useLocale();
  const t = COPY[locale] ?? COPY.EN;

  return (
    <main className="relative" style={{ zIndex: 1 }}>
      <section
        className="relative pt-32 pb-8 lg:pt-36 lg:pb-12"
        aria-label={t.breadcrumb}
      >
        <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-16 lg:py-20">
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
          <Reveal delay={0.10}>
            <span className="mt-8 inline-flex items-center gap-2.5 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-white/45">
              {t.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.16}>
            <h1 className="mt-6 font-[var(--font-display)] font-bold leading-[1.04] tracking-[-0.028em] text-[clamp(38px,5.6vw,82px)] max-w-[920px]">
              {t.heading}
            </h1>
          </Reveal>
          <Reveal delay={0.22}>
            <p className="mt-6 text-[15px] leading-[1.65] text-white/65 max-w-[640px]">
              {t.body}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative py-10 lg:py-14" aria-label={t.breadcrumb}>
        <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <Reveal>
              <article className="rounded-3xl glass glass-edge p-8">
                <h2 className="font-[var(--font-display)] font-bold text-[20px]">{t.emailHeading}</h2>
                <p className="mt-4 text-[14px] text-white/70">{t.emailHint}</p>
                <p className="mt-3">
                  <Link
                    href="mailto:info@elchaigroup.com"
                    className="text-brand-sky hover:underline text-[15px]"
                  >
                    info@elchaigroup.com
                  </Link>
                </p>
              </article>
            </Reveal>

            <Reveal delay={0.10}>
              <article className="rounded-3xl glass glass-edge p-8">
                <h2 className="font-[var(--font-display)] font-bold text-[20px]">{t.phoneHeading}</h2>
                <p className="mt-4 text-[14px] text-white/70">{t.phoneHint}</p>
                <p className="mt-3">
                  <Link
                    href="tel:+97148837176"
                    className="text-brand-sky hover:underline text-[15px]"
                  >
                    +971 4 883 7176
                  </Link>
                </p>
              </article>
            </Reveal>

            <Reveal delay={0.20}>
              <article className="rounded-3xl glass glass-edge p-8">
                <h2 className="font-[var(--font-display)] font-bold text-[20px]">{t.officeHeading}</h2>
                <p className="mt-4 text-[14px] text-white/70">
                  {t.officeAddress}
                </p>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <Contact />
    </main>
  );
}
