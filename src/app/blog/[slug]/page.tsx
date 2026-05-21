import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/lib/JsonLd";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { Contact } from "@/components/sections/Contact";
import { ModalsHost } from "@/components/sections/ModalsHost";
import { BackgroundScene } from "@/components/sections/BackgroundScene";
import { CursorSpotlight } from "@/components/primitives/CursorSpotlight";
import { Reveal } from "@/components/primitives/Reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { POSTS, getPostBySlug, getRelatedPosts } from "@/lib/blog-posts";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not found" };
  return pageMetadata({
    title: post.title,
    description: post.body[0]?.slice(0, 200) ?? "",
    path: post.href,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: new Date(post.date).toISOString().slice(0, 10),
    image: `https://www.elchaigroup.com${post.image}`,
    url: `https://www.elchaigroup.com${post.href}`,
    articleSection: post.category,
    author: { "@type": "Organization", name: "Elchai Group" },
    publisher: {
      "@type": "Organization",
      name: "Elchai Group",
      logo: { "@type": "ImageObject", url: "https://www.elchaigroup.com/elchai/elchai_logo.svg" },
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.elchaigroup.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.elchaigroup.com/blog-list" },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://www.elchaigroup.com${post.href}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={[articleJsonLd, breadcrumbJsonLd]} />
      <BackgroundScene variant="resources" />
      <CursorSpotlight />
      <Nav />

      <main className="relative" style={{ zIndex: 1 }}>
        {/* ─────────── Hero ─────────── */}
        <article>
          <section className="relative pt-32 pb-8 lg:pt-36 lg:pb-12" aria-label={post.title}>
            <div className="section-box mx-auto max-w-[1100px] px-6 sm:px-12 lg:px-20 py-12 lg:py-16">
              <Reveal>
                <nav
                  aria-label="Breadcrumb"
                  className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-white/45 flex flex-wrap items-center gap-2"
                >
                  <Link href="/" className="hover:text-brand-sky transition-colors">Home</Link>
                  <span aria-hidden="true" className="text-white/30">/</span>
                  <Link href="/blog-list" className="hover:text-brand-sky transition-colors">Blog</Link>
                  <span aria-hidden="true" className="text-white/30">/</span>
                  <span className="text-brand-sky truncate max-w-[420px]">{post.category}</span>
                </nav>
              </Reveal>
              <Reveal delay={0.10}>
                <div className="mt-8 inline-flex items-center gap-2 rounded-md bg-[rgba(10,10,14,0.85)] backdrop-blur px-3 py-1.5 text-[10.5px] uppercase tracking-[0.18em] text-brand-sky font-[var(--font-mono)]">
                  {post.category}
                </div>
              </Reveal>
              <Reveal delay={0.16}>
                <h1 className="mt-5 font-[var(--font-display)] font-bold leading-[1.06] tracking-[-0.025em] text-[clamp(32px,4.4vw,60px)]">
                  {post.title}
                </h1>
              </Reveal>
              <Reveal delay={0.22}>
                <div className="mt-6 flex items-center gap-3">
                  <span className="relative w-9 h-9 rounded-full overflow-hidden border border-white/10 shrink-0">
                    <Image src="/elchai/blog/author-avatar.jpg" alt="" aria-hidden="true" fill sizes="36px" unoptimized className="object-cover" />
                  </span>
                  <span className="font-[var(--font-display)] text-[13px] text-white/85">Elchai</span>
                  <span aria-hidden="true" className="text-white/25">·</span>
                  <span className="font-[var(--font-mono)] text-[11px] tracking-[0.10em] text-white/55">
                    {post.date}
                  </span>
                </div>
              </Reveal>

              {/* Cover image */}
              <Reveal delay={0.28}>
                <div className="relative aspect-[16/9] w-full mt-10 rounded-3xl overflow-hidden border border-white/[0.08]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 1100px) 100vw, 1100px"
                    priority
                    unoptimized
                    className="object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[rgba(10,10,14,0.65)] to-transparent" />
                </div>
              </Reveal>
            </div>
          </section>

          {/* ─────────── Body ─────────── */}
          <section className="relative pb-16 lg:pb-24" aria-label="Article body">
            <div className="section-box mx-auto max-w-[820px] px-6 sm:px-10 lg:px-12 py-8 lg:py-12">
              <div className="flex flex-col gap-7">
                {post.body.map((para, i) => (
                  <Reveal key={i} delay={0.06 + (i % 4) * 0.04}>
                    {para.length < 220 && i > 0 ? (
                      <div className="relative rounded-2xl border-l-2 border-brand-sky/60 bg-[rgba(82,184,255,0.05)] pl-6 pr-6 py-5">
                        <p className="font-[var(--font-display)] text-[clamp(16px,1.4vw,19px)] leading-[1.55] text-white/90 italic">
                          {para}
                        </p>
                      </div>
                    ) : (
                      <p className="text-[clamp(15px,1.2vw,17.5px)] leading-[1.75] text-white/80">
                        {para}
                      </p>
                    )}
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.20}>
                <div className="mt-14 flex items-center justify-between gap-4 border-t border-white/10 pt-8">
                  <Link
                    href="/blog-list"
                    className="inline-flex items-center gap-2 text-[13px] text-white/65 hover:text-brand-sky transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M13 8H3M8 13l-5-5 5-5" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                    Back to all articles
                  </Link>
                  <Link href="#consultation" className="cta cta--primary !rounded-full !px-5 !py-2.5 !text-[12.5px]">
                    Talk to us
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  </Link>
                </div>
              </Reveal>
            </div>
          </section>
        </article>

        {/* ─────────── Related articles ─────────── */}
        {related.length > 0 && (
          <section className="relative py-10 lg:py-14" aria-label="Recent blogs">
            <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-12 lg:py-16">
              <Reveal>
                <div className="flex justify-center">
                  <span className="inline-flex items-center gap-2.5 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-white/45">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-sky shadow-[0_0_8px_#18DEFF]" />
                    Recent Blogs
                  </span>
                </div>
              </Reveal>
              <Reveal delay={0.10}>
                <h2 className="mt-6 text-center font-[var(--font-display)] font-bold leading-[1.06] tracking-[-0.018em] text-[clamp(26px,3vw,42px)]">
                  Keep Reading
                </h2>
              </Reveal>

              <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {related.map((p, i) => (
                  <Reveal key={p.slug} delay={0.12 + i * 0.06}>
                    <SpotlightCard className="rounded-3xl h-full overflow-hidden">
                      <Link href={p.href} className="group flex h-full flex-col">
                        <div className="relative aspect-[16/10] w-full overflow-hidden">
                          <Image
                            src={p.image}
                            alt={p.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 33vw"
                            unoptimized
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                          />
                          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[rgba(10,10,14,0.85)] to-transparent" />
                          <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-md bg-[rgba(10,10,14,0.85)] backdrop-blur px-3 py-1.5 text-[10.5px] uppercase tracking-[0.18em] text-brand-sky font-[var(--font-mono)]">
                            {p.category}
                          </span>
                        </div>
                        <div className="flex h-full flex-col gap-4 p-6 lg:p-7">
                          <h3 className="font-[var(--font-display)] font-bold leading-[1.20] tracking-[-0.012em] text-[clamp(16px,1.4vw,20px)] text-white/90 group-hover:text-white transition-colors line-clamp-3">
                            {p.title}
                          </h3>
                          <div className="mt-auto flex items-center gap-3">
                            <span className="relative w-8 h-8 rounded-full overflow-hidden border border-white/10 shrink-0">
                              <Image src="/elchai/blog/author-avatar.jpg" alt="" aria-hidden="true" fill sizes="32px" unoptimized className="object-cover" />
                            </span>
                            <span className="font-[var(--font-display)] text-[12.5px] text-white/85">Elchai</span>
                            <span aria-hidden="true" className="text-white/25">·</span>
                            <span className="font-[var(--font-mono)] text-[11px] tracking-[0.10em] text-white/55">
                              {p.date}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </SpotlightCard>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─────────── Contact section ─────────── */}
        <div className="scrim-section relative">
          <Contact />
        </div>
      </main>

      <Footer />
      <ModalsHost />
    </>
  );
}
