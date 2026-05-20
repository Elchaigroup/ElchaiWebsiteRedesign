import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/lib/JsonLd";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { ModalsHost } from "@/components/sections/ModalsHost";
import { BackgroundScene } from "@/components/sections/BackgroundScene";
import { CursorSpotlight } from "@/components/primitives/CursorSpotlight";
import { Reveal } from "@/components/primitives/Reveal";
import { getBlogPost, listBlogPosts } from "@/lib/blog-content";

const SITE_URL = "https://www.elchaigroup.com";

export async function generateStaticParams() {
  return listBlogPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Article not found", robots: { index: false } };
  return pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    keywords: post.keywords,
  });
}

/** Strip markdown bold (`**foo**`) for plain-text JSON-LD body. */
function plain(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, "$1");
}

/**
 * Parse `**bold**` markdown into a React fragment array — no
 * dangerouslySetInnerHTML needed. Content is hardcoded in
 * blog-content.ts but this keeps the rendering path safe regardless.
 */
function renderParagraph(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**")) {
      return (
        <strong key={i} className="text-white">
          {p.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{p}</span>;
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const articleBody = post.sections
    .map((s) => `${s.heading}\n\n${s.body.map(plain).join("\n\n")}`)
    .join("\n\n");

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE_URL}/blog/${post.slug}#article`,
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    headline: post.title,
    description: post.excerpt,
    keywords: post.keywords.join(", "),
    inLanguage: "en",
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    articleBody,
    wordCount: articleBody.split(/\s+/).length,
    author: {
      "@type": "Organization",
      name: post.author,
      url: SITE_URL,
    },
    publisher: { "@id": `${SITE_URL}/#organization` },
    image: `${SITE_URL}/og`,
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(`/blog/${post.slug}`, post.title)} />
      <JsonLd data={articleJsonLd} />
      <BackgroundScene variant="resources" />
      <CursorSpotlight />
      <Nav />

      <main className="relative" style={{ zIndex: 1 }}>
        <article>
          <section
            className="relative pt-32 pb-8 lg:pt-36 lg:pb-12"
            aria-label="Article hero"
          >
            <div className="section-box mx-auto max-w-[920px] px-6 sm:px-12 lg:px-16 py-16 lg:py-20">
              <Reveal>
                <nav
                  aria-label="Breadcrumb"
                  className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-white/45 flex flex-wrap items-center gap-2"
                >
                  <Link href="/" className="hover:text-brand-sky transition-colors">
                    Home
                  </Link>
                  <span aria-hidden="true" className="text-white/30">/</span>
                  <Link href="/blog-list" className="hover:text-brand-sky transition-colors">
                    Blog
                  </Link>
                  <span aria-hidden="true" className="text-white/30">/</span>
                  <span className="text-brand-sky">{post.title}</span>
                </nav>
              </Reveal>
              <Reveal delay={0.10}>
                <span className="mt-8 inline-flex items-center gap-2.5 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-white/45">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-sky shadow-[0_0_8px_#18DEFF]" />
                  {post.hero.eyebrow} · {post.readTime}
                </span>
              </Reveal>
              <Reveal delay={0.16}>
                <h1 className="mt-6 font-[var(--font-display)] font-bold leading-[1.06] tracking-[-0.025em] text-[clamp(32px,4.6vw,60px)]">
                  {post.title}
                </h1>
              </Reveal>
              <Reveal delay={0.22}>
                <p className="mt-6 text-[17px] leading-[1.65] text-white/70">
                  {post.excerpt}
                </p>
              </Reveal>
              <Reveal delay={0.28}>
                <p className="mt-6 text-[12px] text-white/45 font-[var(--font-mono)] uppercase tracking-[0.18em]">
                  Published{" "}
                  <time dateTime={post.publishedAt}>{post.publishedAt}</time>
                  {post.updatedAt !== post.publishedAt && (
                    <>
                      {" · Updated "}
                      <time dateTime={post.updatedAt}>{post.updatedAt}</time>
                    </>
                  )}
                </p>
              </Reveal>
            </div>
          </section>

          <section className="relative py-10 lg:py-14">
            <div className="section-box mx-auto max-w-[920px] px-6 sm:px-12 lg:px-16 py-16 lg:py-20">
              <div className="space-y-12 lg:space-y-16">
                {post.sections.map((s, i) => (
                  <Reveal key={`${s.heading}-${i}`}>
                    <section className="grid grid-cols-1 lg:grid-cols-[80px_1fr] gap-4 lg:gap-12">
                      <div>
                        <span className="font-[var(--font-mono)] text-[11px] tracking-[0.22em] text-brand-sky">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <div>
                        <h2 className="font-[var(--font-display)] font-bold leading-[1.15] tracking-[-0.012em] text-[clamp(22px,2.2vw,30px)]">
                          {s.heading}
                        </h2>
                        <div className="mt-5 space-y-5 text-[16px] leading-[1.72] text-white/80">
                          {s.body.map((para, idx) => (
                            <p key={idx}>{renderParagraph(para)}</p>
                          ))}
                        </div>
                      </div>
                    </section>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.30}>
                <div className="mt-20 rounded-3xl glass glass-edge p-8 lg:p-12">
                  <h2 className="font-[var(--font-display)] font-bold text-[22px] lg:text-[28px]">
                    Have a project in mind?
                  </h2>
                  <p className="mt-3 text-[14px] leading-[1.65] text-white/70 max-w-[560px]">
                    Email info@elchaigroup.com or call +971 4 883 7176 — we
                    respond within one business day.
                  </p>
                  <div className="mt-6">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-[13px] text-brand-sky hover:underline"
                    >
                      Talk to Elchai →
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        </article>
      </main>

      <Footer />
      <ModalsHost />
    </>
  );
}
