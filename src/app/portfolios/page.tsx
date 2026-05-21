import Image from "next/image";
import Link from "next/link";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/lib/JsonLd";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { Contact } from "@/components/sections/Contact";
import { ModalsHost } from "@/components/sections/ModalsHost";
import { BackgroundScene } from "@/components/sections/BackgroundScene";
import { CursorSpotlight } from "@/components/primitives/CursorSpotlight";
import { Reveal } from "@/components/primitives/Reveal";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { PORTFOLIO_GALLERY } from "@/lib/portfolio";

export const metadata = pageMetadata({
  title: "Portfolio — Apps that make a difference",
  description:
    "Explore the AI, blockchain, and product engagements Elchai Group has shipped — across healthcare, delivery, transportation, food, ecommerce, super apps, and legal tech.",
  path: "/portfolios",
});

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
            <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
              {/* Left — copy */}
              <div>
                <Reveal>
                  <nav
                    aria-label="Breadcrumb"
                    className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-white/45 flex flex-wrap items-center gap-2"
                  >
                    <Link href="/" className="hover:text-brand-sky transition-colors">
                      Home
                    </Link>
                    <span aria-hidden="true" className="text-white/30">
                      /
                    </span>
                    <span className="text-brand-sky">Portfolio</span>
                  </nav>
                </Reveal>
                <Reveal delay={0.1}>
                  <span className="mt-8 inline-flex items-center gap-2.5 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-white/45">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-sky shadow-[0_0_8px_#18DEFF]" />
                    Our Portfolio
                  </span>
                </Reveal>
                <Reveal delay={0.16}>
                  <h1 className="mt-6 font-[var(--font-display)] font-bold leading-[1.04] tracking-[-0.028em] text-[clamp(38px,5.6vw,82px)]">
                    We love to make apps{" "}
                    <span className="text-brand-sky">that make a difference.</span>
                  </h1>
                </Reveal>
                <Reveal delay={0.22}>
                  <p className="mt-6 text-[15.5px] leading-[1.65] text-white/70 max-w-[560px]">
                    <strong className="font-semibold text-white/90">
                      Explore why choose Elchai
                    </strong>{" "}
                    to transform your business ideas into reality — products
                    in market across AI, blockchain, healthcare, super apps,
                    and on-demand services.
                  </p>
                </Reveal>
              </div>

              {/* Right — gallery orbit */}
              <div className="relative aspect-square max-w-[460px] mx-auto w-full">
                {/* Central suitcase badge */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="relative w-[44%] aspect-square rounded-full
                               bg-gradient-to-br from-[#7B6CFF] to-[#5B8DF8]
                               flex items-center justify-center
                               shadow-[0_30px_60px_-20px_rgba(123,108,255,0.55)]"
                  >
                    <Image
                      src="/elchai/portfolio/portfolio-suitcase.svg"
                      alt="Portfolio briefcase"
                      width={88}
                      height={88}
                      unoptimized
                      className="w-[55%] h-[55%] object-contain invert"
                    />
                  </div>
                </div>

                {/* Gallery thumbs orbiting around */}
                {PORTFOLIO_GALLERY.map((src, i) => {
                  // Six positions on a circle (every 60°), starting at -90° (top).
                  const angle = (i * 60 - 90) * (Math.PI / 180);
                  const r = 42; // % of half the square
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
                          unoptimized
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

        {/* ─────────── Filter + portfolio grid ─────────── */}
        <section
          className="relative py-10 lg:py-14"
          aria-label="Portfolio projects"
        >
          <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-16 lg:py-20">
            <PortfolioGrid />
          </div>
        </section>

        {/* ─────────── Contact + Our Presence (shared component) ─────────── */}
        <Contact />
      </main>

      <Footer />
      <ModalsHost />
    </>
  );
}
