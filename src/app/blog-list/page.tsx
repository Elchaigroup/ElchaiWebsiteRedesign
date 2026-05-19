import Link from "next/link";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/lib/JsonLd";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { ModalsHost } from "@/components/sections/ModalsHost";
import { BackgroundScene } from "@/components/sections/BackgroundScene";
import { CursorSpotlight } from "@/components/primitives/CursorSpotlight";
import { Reveal } from "@/components/primitives/Reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { resources } from "@/lib/content";

export const metadata = pageMetadata({
  title: "Blog",
  description: "Articles, deep-dives, and field notes from the Elchai team.",
  path: "/blog-list",
});

export default function BlogListPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("/blog-list")} />
      <BackgroundScene variant="resources" />
      <CursorSpotlight />
      <Nav />

      <main className="relative" style={{ zIndex: 1 }}>
        <section className="relative pt-32 pb-8 lg:pt-36 lg:pb-12" aria-label="Blog hero">
          <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-16 lg:py-20">
            <Reveal>
              <nav aria-label="Breadcrumb" className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-white/45 flex flex-wrap items-center gap-2">
                <Link href="/" className="hover:text-brand-sky transition-colors">Home</Link>
                <span aria-hidden="true" className="text-white/30">/</span>
                <span className="text-brand-sky">Blog</span>
              </nav>
            </Reveal>
            <Reveal delay={0.10}>
              <span className="mt-8 inline-flex items-center gap-2.5 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-white/45">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-sky shadow-[0_0_8px_#18DEFF]" />
                Resources
              </span>
            </Reveal>
            <Reveal delay={0.16}>
              <h1 className="mt-6 font-[var(--font-display)] font-bold leading-[1.04] tracking-[-0.028em] text-[clamp(38px,5.6vw,82px)] max-w-[920px]">
                Field notes from the Elchai team
              </h1>
            </Reveal>
            <Reveal delay={0.22}>
              <p className="mt-6 text-[15px] leading-[1.65] text-white/65 max-w-[640px]">
                Deep-dives on AI, blockchain, and the engineering work behind
                production digital transformation programs.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="relative py-10 lg:py-14" aria-label="Featured articles">
          <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-16 lg:py-20">
            <Reveal>
              <span className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-white/45">
                Featured
              </span>
            </Reveal>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {resources.posts.map((p, i) => (
                <Reveal key={p.href} delay={0.18 + i * 0.08}>
                  <SpotlightCard className="rounded-3xl h-full">
                    <Link href={p.href} className="group flex h-full flex-col gap-6 p-8 lg:p-10">
                      <div className="flex items-center gap-3">
                        <span className="font-[var(--font-mono)] text-[10px] tracking-[0.22em] text-brand-sky uppercase">
                          {p.tag}
                        </span>
                        <span className="text-white/30">·</span>
                        <span className="text-[11px] text-white/70 uppercase tracking-[0.18em]">
                          {p.readTime}
                        </span>
                      </div>
                      <h2 className="font-[var(--font-display)] font-bold leading-[1.20] tracking-[-0.012em] text-[clamp(18px,1.5vw,22px)] text-white/90 group-hover:text-white transition-colors">
                        {p.title}
                      </h2>
                      <span className="mt-auto inline-flex items-center gap-2 text-[12px] text-white/70 group-hover:text-brand-sky transition-colors">
                        Read article
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
                        </svg>
                      </span>
                    </Link>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.40}>
              <div className="mt-16 rounded-3xl glass glass-edge p-8 lg:p-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="max-w-[640px]">
                  <h2 className="font-[var(--font-display)] font-bold leading-[1.10] tracking-[-0.015em] text-[clamp(22px,2.2vw,32px)]">
                    More articles arriving weekly.
                  </h2>
                  <p className="mt-3 text-[14px] leading-[1.65] text-white/70">
                    Subscribe to receive new pieces in your inbox, or talk to
                    us about the topics you&rsquo;d like covered.
                  </p>
                </div>
                <Link href="#consultation" className="cta cta--primary shrink-0">
                  Talk to Us
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
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
