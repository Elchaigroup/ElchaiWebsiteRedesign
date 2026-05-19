import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { ModalsHost } from "@/components/sections/ModalsHost";
import { BackgroundScene } from "@/components/sections/BackgroundScene";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { CursorSpotlight } from "@/components/primitives/CursorSpotlight";
import { Reveal } from "@/components/primitives/Reveal";
import { listServicePages, getServicePage, categoryToTint, categoryToVariant } from "@/lib/service-pages";
import { getServiceDetailContent } from "@/lib/service-detail-content";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return listServicePages().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) return { title: "Not found" };
  const detail = getServiceDetailContent(slug);
  const base = pageMetadata({
    title: page.title,
    description: detail
      ? detail.hero.subheading ?? detail.hero.body ?? `${page.title} services from Elchai Group.`
      : `${page.title} services from Elchai Group — coming soon.`,
    path: `/${slug}`,
  });
  // Stub pages (no detail content yet) are "Coming soon" placeholders
  // — keep them off the index until the page is real.
  if (!detail) {
    return { ...base, robots: { index: false, follow: true } };
  }
  return base;
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) notFound();
  const tint = categoryToTint(page.category);
  const variant = categoryToVariant(page.category);
  const detail = getServiceDetailContent(slug);

  return (
    <>
      <BackgroundScene tint={tint} variant={variant} />
      <CursorSpotlight />
      <Nav />

      {detail ? (
        <ServiceDetail content={detail} slug={slug} />
      ) : (
        <main className="relative" style={{ zIndex: 1 }}>
          {/* Stub branch is noindex (see generateMetadata above) — no
              structured data is emitted because the page is intentionally
              excluded from Google's index until the detail-content entry
              ships. */}
          <section
            className="relative pt-32 pb-10 lg:pt-36 lg:pb-14"
            aria-label={page.title}
          >
            <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-16 lg:py-20 w-full">
              <Reveal>
                <nav
                  aria-label="Breadcrumb"
                  className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-white/45 flex flex-wrap items-center gap-2"
                >
                  <Link href="/" className="hover:text-brand-sky transition-colors">
                    Home
                  </Link>
                  <span aria-hidden="true" className="text-white/30">/</span>
                  <span className="text-white/65">{page.category}</span>
                  <span aria-hidden="true" className="text-white/30">/</span>
                  <span className="text-brand-sky">{page.title}</span>
                </nav>
              </Reveal>

              <Reveal delay={0.10}>
                <h1
                  className="mt-10 font-[var(--font-display)] font-bold leading-[1.04]
                             tracking-[-0.025em] text-[clamp(34px,5vw,82px)] max-w-[980px]"
                >
                  {page.title}
                </h1>
              </Reveal>

              <Reveal delay={0.20}>
                <div className="mt-12 inline-flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-brand-sky shadow-[0_0_10px_#18DEFF]" />
                  <span className="font-[var(--font-mono)] text-[11px] tracking-[0.22em] text-white/65 uppercase">
                    Coming soon
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.28}>
                <p className="mt-6 text-[15px] leading-[1.65] text-white/65 max-w-[620px]">
                  This page is being prepared. In the meantime, schedule a
                  consultation to discuss your {page.title.toLowerCase()} project
                  directly with our team — or head back to the homepage to see
                  the full Elchai story.
                </p>
              </Reveal>

              <Reveal delay={0.36}>
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <Link href="#consultation" className="cta cta--primary">
                    Book a call
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  </Link>
                  <Link href="/" className="cta cta--ghost">
                    Back to home
                  </Link>
                </div>
              </Reveal>
            </div>
          </section>
        </main>
      )}

      <Footer />
      <ModalsHost />
    </>
  );
}
