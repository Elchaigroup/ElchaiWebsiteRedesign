import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/lib/JsonLd";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { ModalsHost } from "@/components/sections/ModalsHost";
import { BackgroundScene } from "@/components/sections/BackgroundScene";
import { CursorSpotlight } from "@/components/primitives/CursorSpotlight";
import { ContactPageBody } from "./ContactPageBody";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Talk to Elchai Group. Email info@elchaigroup.com or call +971 4 883 7176 for AI and blockchain engagement enquiries.",
  path: "/contact",
});

const SITE_URL = "https://www.elchaigroup.com";

const CONTACT_PAGE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${SITE_URL}/contact#contactpage`,
  url: `${SITE_URL}/contact`,
  name: "Contact Elchai Group",
  description:
    "Contact information and consultation request form for Elchai Group, a Dubai-based AI and blockchain consultancy.",
  mainEntity: {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Elchai Group",
    email: "info@elchaigroup.com",
    telephone: "+971-4-883-7176",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "2008, Jumeirah Business Center 1 - Cluster G - Al Thanyah Fifth - Jumeirah Lakes Towers",
      addressLocality: "Dubai",
      addressRegion: "Dubai",
      addressCountry: "AE",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: "+971-4-883-7176",
        email: "info@elchaigroup.com",
        areaServed: ["AE", "GCC", "Worldwide"],
        availableLanguage: ["en", "ar", "it"],
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
      },
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: "+971-4-883-7176",
        email: "info@elchaigroup.com",
        availableLanguage: ["en"],
      },
    ],
  },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("/contact")} />
      <JsonLd data={CONTACT_PAGE_JSONLD} />
      <BackgroundScene variant="key" />
      <CursorSpotlight />
      <Nav />
      <ContactPageBody />
      <Footer />
      <ModalsHost />
    </>
  );
}
