import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/lib/JsonLd";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { ModalsHost } from "@/components/sections/ModalsHost";
import { BackgroundScene } from "@/components/sections/BackgroundScene";
import { CursorSpotlight } from "@/components/primitives/CursorSpotlight";
import { TermsOfServiceBody } from "./TermsOfServiceBody";

export const metadata = pageMetadata({
  title: "Terms of Service",
  description:
    "The terms governing your use of Elchai Group's website, services, and engagements.",
  path: "/terms-of-service",
});

export default function TermsOfServicePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("/terms-of-service")} />
      <BackgroundScene variant="key" />
      <CursorSpotlight />
      <Nav />
      <TermsOfServiceBody />
      <Footer />
      <ModalsHost />
    </>
  );
}
