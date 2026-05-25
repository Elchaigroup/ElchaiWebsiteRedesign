import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/lib/JsonLd";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { ModalsHost } from "@/components/sections/ModalsHost";
import { BackgroundScene } from "@/components/sections/BackgroundScene";
import { CursorSpotlight } from "@/components/primitives/CursorSpotlight";
import { PortfolioBody } from "./PortfolioBody";

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
      <PortfolioBody />
      <Footer />
      <ModalsHost />
    </>
  );
}
