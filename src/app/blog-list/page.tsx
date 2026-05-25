import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/lib/JsonLd";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { Contact } from "@/components/sections/Contact";
import { ModalsHost } from "@/components/sections/ModalsHost";
import { BackgroundScene } from "@/components/sections/BackgroundScene";
import { CursorSpotlight } from "@/components/primitives/CursorSpotlight";
import { BlogGrid } from "./BlogGrid";
import { BlogHero } from "./BlogHero";
import { listPosts } from "@/lib/blog";

export const metadata = pageMetadata({
  title: "Blog",
  description:
    "Field notes from the Elchai team on AI, blockchain, Web3, NFTs, and the engineering work behind production digital transformation programs.",
  path: "/blog-list",
});

export default async function BlogListPage() {
  const posts = await listPosts();

  // Blog ItemList JSON-LD for SEO/GEO discovery — built from live posts so
  // WordPress edits are reflected without a redeploy.
  const blogListJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Elchai Group Blog",
    url: "https://www.elchaigroup.com/blog-list",
    blogPost: posts.map((p) => ({
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

  return (
    <>
      <JsonLd data={[breadcrumbJsonLd("/blog-list"), blogListJsonLd]} />
      <BackgroundScene variant="resources" />
      <CursorSpotlight />
      <Nav />

      <main className="relative" style={{ zIndex: 1 }}>
        <BlogHero />

        {/* ─────────── Filter + Article grid + Pagination ─────────── */}
        <section className="relative pb-16 lg:pb-24" aria-label="Articles">
          <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-10 lg:py-14">
            <BlogGrid posts={[...posts]} />
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
