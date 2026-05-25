import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/sections/Nav";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { ModalsHost } from "@/components/sections/ModalsHost";
import { BackgroundScene } from "@/components/sections/BackgroundScene";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { CursorSpotlight } from "@/components/primitives/CursorSpotlight";
import { ServiceStub } from "./ServiceStub";
import { listServicePages, getServicePage, categoryToTint, categoryToVariant } from "@/lib/service-pages";
import { getServiceDetailContent } from "@/lib/services";
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
        <>
          <ServiceDetail content={detail} slug={slug} />
          <div className="scrim-section relative">
            <Contact />
          </div>
        </>
      ) : (
        <ServiceStub title={page.title} category={page.category} />
      )}

      <Footer />
      <ModalsHost />
    </>
  );
}
