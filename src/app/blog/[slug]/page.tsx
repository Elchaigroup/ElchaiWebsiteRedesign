import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/lib/JsonLd";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { ModalsHost } from "@/components/sections/ModalsHost";
import { BackgroundScene } from "@/components/sections/BackgroundScene";
import { CursorSpotlight } from "@/components/primitives/CursorSpotlight";
import { BlogPostBody } from "./BlogPostBody";
import { getPostBySlug, getRelatedPosts, listPostSlugs } from "@/lib/blog";

export async function generateStaticParams() {
  const slugs = await listPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
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
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(slug, 3);

  const postUrl = `https://www.elchaigroup.com${post.href}`;
  // BlogPost shape varies (registry vs blog-content). Safely surface optional fields.
  const maybeExcerpt = (post as { excerpt?: string }).excerpt;
  const maybeUpdated = (post as { updatedAt?: string }).updatedAt;
  // Fallback description: first paragraph clamped to ~155 chars.
  const firstParagraph = post.body[0] ?? "";
  const fallbackDescription =
    firstParagraph.length > 155
      ? `${firstParagraph.slice(0, firstParagraph.lastIndexOf(" ", 152))}…`
      : firstParagraph;
  const description = maybeExcerpt ?? fallbackDescription;
  const publishedISO = new Date(post.date).toISOString().slice(0, 10);
  const modifiedISO = maybeUpdated
    ? new Date(maybeUpdated).toISOString().slice(0, 10)
    : publishedISO;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${postUrl}#article`,
    headline: post.title,
    ...(description ? { description } : {}),
    datePublished: publishedISO,
    dateModified: modifiedISO,
    image: `https://www.elchaigroup.com${post.image}`,
    url: postUrl,
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
    articleSection: post.category,
    inLanguage: "en",
    author: {
      "@type": "Organization",
      "@id": "https://www.elchaigroup.com/#organization",
      name: "Elchai Group",
      url: "https://www.elchaigroup.com",
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://www.elchaigroup.com/#organization",
      name: "Elchai Group",
      logo: { "@type": "ImageObject", url: "https://www.elchaigroup.com/elchai/elchai_logo.svg" },
    },
    isPartOf: {
      "@type": "Blog",
      "@id": "https://www.elchaigroup.com/blog-list#blog",
      name: "Elchai Group Insights",
      url: "https://www.elchaigroup.com/blog-list",
    },
    keywords: [post.category, "AI", "blockchain", "Web3", "Dubai", "GCC"].join(", "),
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "[data-blog-lead]"],
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
      <BlogPostBody post={post} related={related} />
      <Footer />
      <ModalsHost />
    </>
  );
}
