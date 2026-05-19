import Image from "next/image";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/lib/JsonLd";
import Link from "next/link";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { ModalsHost } from "@/components/sections/ModalsHost";
import { BackgroundScene } from "@/components/sections/BackgroundScene";
import { CursorSpotlight } from "@/components/primitives/CursorSpotlight";
import { Reveal } from "@/components/primitives/Reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { caseStudies } from "@/lib/content";

export const metadata = pageMetadata({
  title: "Case Studies",
  description:
    "How Elchai has helped 150+ businesses since 2016 move from concept to mainnet with AI and blockchain.",
  path: "/case-study",
});

const LOGOS: Record<string, string> = {
  smartfit:    "/elchai/smartfit-logo.svg",
  fintex:      "/elchai/fintex-logo.svg",
  theuneverse: "/elchai/theuneverse-logo.svg",
  nielsen:     "/elchai/nielsen-logo.svg",
  grintafy:    "/elchai/grintafy-logo.svg",
};
const MOCKS: Record<string, string> = {
  smartfit:    "/elchai/smartfit-app.webp",
  fintex:      "/elchai/fintex-app.webp",
  theuneverse: "/elchai/theuneverse-app.webp",
  nielsen:     "/elchai/nielsen-app.webp",
  grintafy:    "/elchai/grintafy-app.webp",
};

export default function CaseStudyIndexPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("/case-study")} />
      <BackgroundScene variant="resources" />
      <CursorSpotlight />
      <Nav />

      <main className="relative" style={{ zIndex: 1 }}>
        <section className="relative pt-32 pb-8 lg:pt-36 lg:pb-12" aria-label="Case studies hero">
          <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-16 lg:py-20">
            <Reveal>
              <nav aria-label="Breadcrumb" className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-white/45 flex flex-wrap items-center gap-2">
                <Link href="/" className="hover:text-brand-sky transition-colors">Home</Link>
                <span aria-hidden="true" className="text-white/30">/</span>
                <span className="text-brand-sky">Case Studies</span>
              </nav>
            </Reveal>
            <Reveal delay={0.10}>
              <span className="mt-8 inline-flex items-center gap-2.5 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-white/45">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-sky shadow-[0_0_8px_#18DEFF]" />
                {caseStudies.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={0.16}>
              <h1 className="mt-6 font-[var(--font-display)] font-bold leading-[1.04] tracking-[-0.028em] text-[clamp(38px,5.6vw,82px)] max-w-[1080px]">
                {caseStudies.heading}
              </h1>
            </Reveal>
            <Reveal delay={0.22}>
              <p className="mt-6 text-[15px] leading-[1.65] text-white/65 max-w-[640px]">
                {caseStudies.description}
              </p>
            </Reveal>
          </div>
        </section>

        <section className="relative py-10 lg:py-14" aria-label="Case study list">
          <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-16 lg:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {caseStudies.items.map((cs, i) => (
                <Reveal key={cs.slug} delay={0.18 + (i % 3) * 0.06}>
                  <SpotlightCard className="rounded-3xl overflow-hidden h-full">
                    <div className="relative aspect-[4/5] bg-[rgba(10,10,14,0.55)]">
                      {MOCKS[cs.slug] && (
                        <Image
                          src={MOCKS[cs.slug]}
                          alt={cs.slug}
                          fill
                          unoptimized
                          className="object-contain p-8"
                        />
                      )}
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background:
                            "radial-gradient(60% 40% at 30% 30%, rgba(24,222,255,0.10), transparent 60%)," +
                            "radial-gradient(50% 50% at 80% 80%, rgba(176,124,255,0.10), transparent 65%)",
                        }}
                      />
                    </div>
                    <div className="p-7 lg:p-8 flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        {LOGOS[cs.slug] && (
                          <Image
                            src={LOGOS[cs.slug]}
                            alt=""
                            width={28}
                            height={28}
                            unoptimized
                            aria-hidden="true"
                            className="w-7 h-7 object-contain"
                          />
                        )}
                        <span className="font-[var(--font-mono)] text-[10px] tracking-[0.22em] text-brand-sky uppercase">
                          {cs.tag}
                        </span>
                      </div>
                      <h2 className="font-[var(--font-display)] font-bold tracking-[-0.012em] text-[clamp(18px,1.5vw,22px)] text-white">
                        {cs.slug.charAt(0).toUpperCase() + cs.slug.slice(1)}
                      </h2>
                      <Link href={cs.cta.href} className="cta cta--ghost mt-2 self-start">
                        {cs.cta.label}
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
                        </svg>
                      </Link>
                    </div>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ModalsHost />
    </>
  );
}
