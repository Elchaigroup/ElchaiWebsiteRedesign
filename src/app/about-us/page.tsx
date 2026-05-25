import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/lib/JsonLd";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { ModalsHost } from "@/components/sections/ModalsHost";
import { BackgroundScene } from "@/components/sections/BackgroundScene";
import { CursorSpotlight } from "@/components/primitives/CursorSpotlight";
import { AboutUsBody } from "./AboutUsBody";
import { aboutContent } from "@/lib/about-content";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "We're Your Digital Technological Partners. Since 2022, we've been helping businesses accelerate their journey to success, backed by the right transformative solutions.",
  path: "/about-us",
});

// Build JSON-LD from the canonical EN team so structured data stays
// stable for crawlers regardless of UI locale.
const personListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Elchai Group Leadership",
  itemListElement: aboutContent.team.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Person",
      name: p.name,
      jobTitle: p.role,
      url: p.linkedin,
      image: `https://www.elchaigroup.com${p.photo}`,
      worksFor: {
        "@type": "Organization",
        name: "Elchai Group",
        url: "https://www.elchaigroup.com",
      },
    },
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.elchaigroup.com" },
    { "@type": "ListItem", position: 2, name: "About Us", item: "https://www.elchaigroup.com/about-us" },
  ],
};

const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Elchai Group",
  url: "https://www.elchaigroup.com/about-us",
  description:
    "We're Your Digital Technological Partners. Since 2022, we've been helping businesses accelerate their journey to success.",
  isPartOf: {
    "@type": "WebSite",
    name: "Elchai Group",
    url: "https://www.elchaigroup.com",
  },
};

export default function AboutUsPage() {
  return (
    <>
      <JsonLd data={[personListJsonLd, breadcrumbJsonLd, aboutPageJsonLd]} />
      <BackgroundScene variant="aboutus" />
      <CursorSpotlight />
      <Nav />
      <AboutUsBody />
      <Footer />
      <ModalsHost />
    </>
  );
}
