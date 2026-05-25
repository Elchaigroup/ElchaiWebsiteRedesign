import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/lib/JsonLd";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { ModalsHost } from "@/components/sections/ModalsHost";
import { BackgroundScene } from "@/components/sections/BackgroundScene";
import { CursorSpotlight } from "@/components/primitives/CursorSpotlight";
import { CaseStudyBody } from "./CaseStudyBody";

export const metadata = pageMetadata({
  title: "Case Studies — Real product outcomes",
  description:
    "How Elchai Group has helped partners go from concept to mainnet across AI, blockchain, food delivery, transportation, ecommerce, and more.",
  path: "/case-study",
});

export default function CaseStudyIndexPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("/case-study")} />
      <BackgroundScene variant="resources" />
      <CursorSpotlight />
      <Nav />
      <CaseStudyBody />
      <Footer />
      <ModalsHost />
    </>
  );
}
