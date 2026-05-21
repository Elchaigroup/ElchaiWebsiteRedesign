import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/lib/JsonLd";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { Contact } from "@/components/sections/Contact";
import { ModalsHost } from "@/components/sections/ModalsHost";
import { BackgroundScene } from "@/components/sections/BackgroundScene";
import { CursorSpotlight } from "@/components/primitives/CursorSpotlight";
import { Reveal } from "@/components/primitives/Reveal";
import { BlogGrid } from "./BlogGrid";
import { POSTS } from "@/lib/blog-posts";

export const metadata = pageMetadata({
  title: "Blog",
  description:
    "Field notes from the Elchai team on AI, blockchain, Web3, NFTs, and the engineering work behind production digital transformation programs.",
  path: "/blog-list",
});

// Blog ItemList JSON-LD for SEO/GEO discovery
const blogListJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Elchai Group Blog",
  url: "https://www.elchaigroup.com/blog-list",
  blogPost: POSTS.map((p) => ({
    "@type": "BlogPosting",
    headline: p.title,
    datePublished: new Date(p.date).toISOString().slice(0, 10),
    image: `https://www.elchaigroup.com${p.image}`,
    url: `https://www.elchaigroup.com${p.href}`,
    author: { "@type": "Organization", name: "Elchai Group" },
    publisher: {
      "@type": "Organization",
      name: "Elchai Group",
      logo: { "@type": "ImageObject", url: "https://www.elchaigroup.com/elchai/elchai_logo.svg" },
    },
    articleSection: p.category,
  })),
};

export default function BlogListPage() {
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd("/blog-list"), blogListJsonLd]} />
      <BackgroundScene variant="resources" />
      <CursorSpotlight />
      <Nav />

      <main className="relative" style={{ zIndex: 1 }}>
        {/* ─────────── Hero — centered, just "Blog" ─────────── */}
        <section className="relative pt-32 pb-4 lg:pt-36 lg:pb-6" aria-label="Blog">
          <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-10 lg:py-14">
            <Reveal>
              <h1 className="text-center font-[var(--font-display)] font-bold leading-[1.04] tracking-[-0.028em] text-[clamp(40px,5.8vw,80px)]">
                Blog
              </h1>
            </Reveal>
          </div>
        </section>

        {/* ─────────── Filter + Article grid + Pagination ─────────── */}
        <section className="relative pb-16 lg:pb-24" aria-label="Articles">
          <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-10 lg:py-14">
            <BlogGrid posts={[...POSTS]} />
          </div>
        </section>

        {/* ─────────── Contact section (matches source page) ─────────── */}
        <div className="scrim-section relative">
          <Contact />
        </div>
      </main>

      <Footer />
      <ModalsHost />
    </>
  );
}
