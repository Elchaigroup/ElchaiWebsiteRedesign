import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/lib/JsonLd";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { ModalsHost } from "@/components/sections/ModalsHost";
import { BackgroundScene } from "@/components/sections/BackgroundScene";
import { CursorSpotlight } from "@/components/primitives/CursorSpotlight";
import { PrivacyPolicyBody } from "./PrivacyPolicyBody";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Elchai Group collects, uses, and safeguards your personal information.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("/privacy-policy")} />
      <BackgroundScene variant="key" />
      <CursorSpotlight />
      <Nav />
      <PrivacyPolicyBody />
      <Footer />
      <ModalsHost />
    </>
  );
}
