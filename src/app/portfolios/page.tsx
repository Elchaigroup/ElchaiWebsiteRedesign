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
import { caseStudies, partners } from "@/lib/content";

export const metadata = pageMetadata({
  title: "Portfolio",
  description:
    "Selected products and platforms Elchai has shipped with partners across AI, blockchain, and digital transformation.",
  path: "/portfolios",
});

const APP_MOCKS: Record<string, string> = {
  smartfit:    "/elchai/smartfit-app.webp",
  fintex:      "/elchai/fintex-app.webp",
  theuneverse: "/elchai/theuneverse-app.webp",
  nielsen:     "/elchai/nielsen-app.webp",
  grintafy:    "/elchai/grintafy-app.webp",
};

const APP_LOGOS: Record<string, string> = {
  smartfit:    "/elchai/smartfit-logo.svg",
  fintex:      "/elchai/fintex-logo.svg",
  theuneverse: "/elchai/theuneverse-logo.svg",
  nielsen:     "/elchai/nielsen-logo.svg",
  grintafy:    "/elchai/grintafy-logo.svg",
};

// Each case-study card gets a soft gradient tint behind the mockup to
// echo the brand's visual rhythm without distracting from the app shot.
const CARD_TINTS: Record<string, string> = {
  smartfit:
    "radial-gradient(60% 50% at 25% 20%, rgba(24,222,255,0.18), transparent 60%), " +
    "radial-gradient(50% 50% at 85% 80%, rgba(176,124,255,0.14), transparent 65%)",
  fintex:
    "radial-gradient(55% 50% at 80% 20%, rgba(82,184,255,0.20), transparent 60%), " +
    "radial-gradient(60% 50% at 15% 80%, rgba(36,229,255,0.14), transparent 65%)",
  theuneverse:
    "radial-gradient(60% 60% at 50% 30%, rgba(176,124,255,0.20), transparent 65%), " +
    "radial-gradient(50% 50% at 80% 80%, rgba(24,222,255,0.12), transparent 65%)",
  nielsen:
    "radial-gradient(55% 50% at 20% 30%, rgba(36,229,255,0.18), transparent 60%), " +
    "radial-gradient(55% 55% at 80% 75%, rgba(59,130,246,0.14), transparent 65%)",
  grintafy:
    "radial-gradient(60% 55% at 70% 25%, rgba(139,92,246,0.18), transparent 60%), " +
    "radial-gradient(55% 55% at 25% 80%, rgba(82,184,255,0.14), transparent 65%)",
};

export default function PortfolioPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("/portfolios")} />
      <BackgroundScene variant="resources" />
      <CursorSpotlight />
      <Nav />

      <main className="relative" style={{ zIndex: 1 }}>
        {/* ─────────── Hero ─────────── */}
        <section
          className="relative pt-32 pb-8 lg:pt-36 lg:pb-12"
          aria-label="Portfolio hero"
        >
          <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-16 lg:py-20">
            <Reveal>
              <nav
                aria-label="Breadcrumb"
                className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-white/45 flex flex-wrap items-center gap-2"
              >
                <Link href="/" className="hover:text-brand-sky transition-colors">
                  Home
                </Link>
                <span aria-hidden="true" className="text-white/30">/</span>
                <span className="text-brand-sky">Portfolio</span>
              </nav>
            </Reveal>
            <Reveal delay={0.10}>
              <span
                className="mt-8 inline-flex items-center gap-2.5 font-[var(--font-mono)]
                           text-[11px] uppercase tracking-[0.22em] text-white/45"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-sky shadow-[0_0_8px_#18DEFF]" />
                Portfolio
              </span>
            </Reveal>
            <Reveal delay={0.16}>
              <h1
                className="mt-6 font-[var(--font-display)] font-bold leading-[1.04]
                           tracking-[-0.028em] text-[clamp(38px,5.6vw,82px)] max-w-[1080px]"
              >
                Products and platforms we&rsquo;ve shipped.
              </h1>
            </Reveal>
            <Reveal delay={0.22}>
              <p className="mt-6 text-[15.5px] leading-[1.65] text-white/70 max-w-[680px]">
                A curated selection of the AI, blockchain, and product
                engagements we&rsquo;ve taken from concept to production —
                each one in market, owned by the team that ships it.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ─────────── Featured projects ─────────── */}
        <section className="relative py-10 lg:py-14" aria-label="Featured projects">
          <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-16 lg:py-20">
            <Reveal>
              <span
                className="inline-flex items-center gap-2.5 font-[var(--font-mono)]
                           text-[11px] uppercase tracking-[0.22em] text-white/45"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-sky shadow-[0_0_8px_#18DEFF]" />
                Featured Projects
              </span>
            </Reveal>
            <Reveal delay={0.10}>
              <h2
                className="mt-6 font-[var(--font-display)] font-bold leading-[1.04]
                           tracking-[-0.025em] text-[clamp(26px,3.4vw,52px)] max-w-[920px]"
              >
                The work, in motion.
              </h2>
            </Reveal>

            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-7">
              {caseStudies.items.map((cs, i) => (
                <Reveal key={cs.slug} delay={0.18 + (i % 2) * 0.06}>
                  <div className="group rounded-3xl overflow-hidden border border-white/[0.08] hover:border-white/[0.18] bg-[rgba(10,10,14,0.45)] transition-colors h-full flex flex-col">
                    {/* Mockup panel */}
                    <div
                      className="relative aspect-[4/3] overflow-hidden"
                      style={{ background: CARD_TINTS[cs.slug] ?? "rgba(10,10,14,0.55)" }}
                    >
                      {APP_MOCKS[cs.slug] && (
                        <Image
                          src={APP_MOCKS[cs.slug]}
                          alt={`${cs.slug} application mockup`}
                          fill
                          unoptimized
                          className="object-contain p-8 lg:p-12 transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                        />
                      )}
                    </div>

                    {/* Copy panel */}
                    <div className="p-7 lg:p-9 flex flex-col gap-5 grow">
                      <div className="flex items-center gap-3">
                        {APP_LOGOS[cs.slug] && (
                          <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white shadow-[0_4px_12px_-4px_rgba(0,0,0,0.4)] shrink-0">
                            <Image
                              src={APP_LOGOS[cs.slug]}
                              alt=""
                              width={28}
                              height={28}
                              unoptimized
                              aria-hidden="true"
                              className="w-7 h-7 object-contain"
                            />
                          </span>
                        )}
                        <div>
                          <h3 className="font-[var(--font-display)] font-bold tracking-[-0.012em] text-[clamp(20px,1.8vw,26px)] text-white capitalize leading-none">
                            {cs.slug}
                          </h3>
                          <span className="mt-1.5 inline-block font-[var(--font-mono)] text-[10.5px] tracking-[0.22em] text-brand-sky uppercase">
                            {cs.tag}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-px rounded-xl overflow-hidden bg-white/[0.06]">
                        {cs.stats.map((s) => (
                          <div
                            key={s.label}
                            className="bg-[rgba(10,10,14,0.55)] px-5 py-4"
                          >
                            <div className="font-[var(--font-display)] font-bold text-brand-sky text-[clamp(20px,1.8vw,28px)] leading-none tracking-[-0.02em]">
                              {s.value}
                            </div>
                            <div className="mt-2 text-[11.5px] leading-[1.45] text-white/60">
                              {s.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      <Link
                        href={cs.cta.href}
                        className="mt-auto inline-flex items-center gap-2 text-[12px] tracking-[0.05em] text-white/70 group-hover:text-brand-sky transition-colors"
                      >
                        <span
                          aria-hidden="true"
                          className="inline-block h-px bg-white/30 group-hover:bg-brand-sky w-6 group-hover:w-10
                                     transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                        />
                        {cs.cta.label}
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────── Trusted By World's Leading Brands ─────────── */}
        <section className="relative py-10 lg:py-14" aria-label="Trusted brands">
          <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-16 lg:py-20">
            <Reveal>
              <span
                className="inline-flex items-center gap-2.5 font-[var(--font-mono)]
                           text-[11px] uppercase tracking-[0.22em] text-white/45"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-sky shadow-[0_0_8px_#18DEFF]" />
                Trusted brands
              </span>
            </Reveal>
            <Reveal delay={0.10}>
              <h2 className="mt-6 font-[var(--font-display)] font-bold leading-[1.04] tracking-[-0.025em] text-[clamp(26px,3.4vw,52px)] max-w-[820px]">
                Trusted by world&rsquo;s leading brands.
              </h2>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 lg:gap-4">
                {Array.from({ length: 16 }, (_, i) => i + 1).map((n) => (
                  <div
                    key={`home-${n}`}
                    className="group relative h-24 lg:h-28 rounded-2xl bg-white p-5 flex items-center justify-center
                               shadow-[0_10px_30px_-15px_rgba(0,0,0,0.55)]
                               ring-1 ring-white/10
                               transition-all duration-[300ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                               hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_rgba(36,229,255,0.30)]
                               hover:ring-brand-sky/40"
                  >
                    <Image
                      src={`/elchai/elchai_home_logo_${n}.svg`}
                      alt={`Brand ${n}`}
                      width={150}
                      height={50}
                      unoptimized
                      className="object-contain max-h-12 w-auto opacity-85 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ─────────── Clients & Partners — WHITE logo cards ─────────── */}
        <section className="relative py-10 lg:py-14" aria-label="Clients and partners">
          <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-16 lg:py-20">
            <Reveal>
              <span
                className="inline-flex items-center gap-2.5 font-[var(--font-mono)]
                           text-[11px] uppercase tracking-[0.22em] text-white/45"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-sky shadow-[0_0_8px_#18DEFF]" />
                Clients &amp; Partners
              </span>
            </Reveal>
            <Reveal delay={0.10}>
              <h2 className="mt-6 font-[var(--font-display)] font-bold leading-[1.04] tracking-[-0.025em] text-[clamp(26px,3.4vw,52px)] max-w-[820px]">
                Proud success partners to businesses of all sizes.
              </h2>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-6 text-[15px] leading-[1.65] text-white/65 max-w-[680px]">
                We&rsquo;ve been the technology backbone for startups and
                enterprises alike, driving innovation at every scale.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
                {partners.logos.map((name, i) => (
                  <div
                    key={name}
                    title={name}
                    className="group relative h-28 lg:h-32 rounded-2xl bg-white p-5 flex items-center justify-center
                               shadow-[0_10px_30px_-15px_rgba(0,0,0,0.55)]
                               ring-1 ring-white/10
                               transition-all duration-[300ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                               hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_rgba(36,229,255,0.30)]
                               hover:ring-brand-sky/40"
                  >
                    <Image
                      src={`/elchai/elchai_partner_logo_${i + 1}.webp`}
                      alt={name}
                      width={160}
                      height={60}
                      unoptimized
                      className="object-contain max-h-16 w-auto opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.34}>
              <div className="mt-16 flex flex-wrap items-center gap-3">
                <Link href="#consultation" className="cta cta--primary">
                  Discuss Your Project
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                </Link>
                <Link href="/case-study" className="cta cta--ghost">
                  See Case Studies
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
      <ModalsHost />
    </>
  );
}
