import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/lib/lenis-provider";
import { LangProvider } from "@/lib/i18n";
import { FontLoader } from "@/components/primitives/FontLoader";
import { JsonLd } from "@/lib/JsonLd";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-brand-loaded",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body-loaded",
  display: "swap",
});

const SITE_URL = "https://www.elchaigroup.com";
const SITE_NAME = "Elchai Group";
const SITE_TAGLINE = "Driving Digital Transformation with AI & Blockchain Products";
const SITE_DESC =
  "Elchai Group is a Dubai-based AI and blockchain consultancy. We design, build and scale custom AI agents, generative AI, Web3 platforms, smart contracts and tokenization for enterprises worldwide.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESC,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  publisher: SITE_NAME,
  creator: SITE_NAME,
  keywords: [
    "AI consulting Dubai",
    "blockchain development Dubai",
    "AI agents",
    "generative AI",
    "Web3 development",
    "smart contracts",
    "RWA tokenization",
    "DeFi development",
    "enterprise AI",
    "AI automation",
    "LLM development",
    "RAG development",
    "Elchai Group",
  ],
  category: "technology",
  alternates: {
    // Per-page canonical is set by each route's metadata via the
    // pageMetadata() helper. Keeping the global blank stops every page
    // canonicalising to the homepage (the bug found in the audit).
    languages: { "en-US": "/", "x-default": "/" },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    url: SITE_URL,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESC,
    images: [
      {
        // Dynamic OG image rendered by `src/app/og/route.tsx` via next/og.
        // Returns image/png at 1200×630 — social platforms render it like
        // any static asset. Edit the route to tweak the card layout.
        url: "/og",
        width: 1200,
        height: 630,
        alt: "Elchai Group — AI & Blockchain Consultancy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@elchaigroup",
    creator: "@elchaigroup",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESC,
    images: ["/og"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/elchai/elchai_logo.svg",
    shortcut: "/elchai/elchai_logo.svg",
    apple: "/elchai/elchai_logo.svg",
  },
  formatDetection: { telephone: true, address: true, email: true },
  other: {
    "geo.region": "AE-DU",
    "geo.placename": "Dubai",
  },
};

// JSON-LD constants — hardcoded, no user input → safe to inline via the
// documented Next.js plain-script pattern (nextjs.org/docs/app/guides/json-ld).
// Nodes share `@id` URIs so Google + AI engines can treat the Organization,
// WebSite and ProfessionalService as one linked graph instead of three
// disconnected blobs.
const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;
const LOCAL_ID = `${SITE_URL}/#localbusiness`;

const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: SITE_NAME,
  alternateName: ["Elchai", "ElchAI"],
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/elchai/elchai_logo.svg`,
    width: 512,
    height: 512,
  },
  image: `${SITE_URL}/og`,
  description: SITE_DESC,
  email: "info@elchaigroup.com",
  telephone: "+971-4-883-7176",
  foundingDate: "2016",
  foundingLocation: { "@type": "Place", name: "Dubai, United Arab Emirates" },
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
    },
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      telephone: "+971-4-883-7176",
      email: "info@elchaigroup.com",
    },
  ],
  areaServed: [
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Place", name: "Gulf Cooperation Council" },
    { "@type": "Place", name: "Worldwide" },
  ],
  sameAs: [
    "https://www.linkedin.com/company/elchai-group/",
    "https://x.com/elchaigroup",
    "https://www.instagram.com/elchaigroup/",
    "https://www.crunchbase.com/organization/elchai-group",
    "https://clutch.co/profile/elchai-group",
    "https://www.goodfirms.co/company/elchai-group",
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "Generative AI",
    "Large Language Models",
    "AI Agents",
    "Retrieval Augmented Generation",
    "Computer Vision",
    "Machine Learning",
    "Blockchain",
    "Smart Contracts",
    "DeFi",
    "Web3",
    "Real World Asset Tokenization",
    "Mobile Application Development",
    "Enterprise Software",
  ],
  award: [
    "Clutch Global 2024",
    "Clutch Champion",
    "Top App Development Companies 2025",
    "Business of Apps Award",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    bestRating: "5",
    worstRating: "1",
    ratingCount: 47,
    reviewCount: 47,
  },
  review: [
    {
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      author: { "@type": "Organization", name: "Clutch" },
      publisher: { "@type": "Organization", name: "Clutch" },
      name: "Clutch Global 2024 — Top Blockchain Developers",
      reviewBody:
        "Recognized among the top blockchain development firms globally in the Clutch Global 2024 awards based on verified client interviews and project outcomes.",
    },
    {
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      author: { "@type": "Organization", name: "Clutch" },
      publisher: { "@type": "Organization", name: "Clutch" },
      name: "Clutch Champion 2024",
      reviewBody:
        "Awarded Clutch Champion status for sustained client satisfaction, on-time delivery, and quality of work across AI and blockchain engagements.",
    },
  ],
};

const SITE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": SITE_ID,
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: ["en"],
  publisher: { "@id": ORG_ID },
};

const LOCAL_BUSINESS_JSONLD = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": LOCAL_ID,
  parentOrganization: { "@id": ORG_ID },
  name: SITE_NAME,
  image: `${SITE_URL}/elchai/elchai_logo.svg`,
  telephone: "+971-4-883-7176",
  email: "info@elchaigroup.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "2008, Jumeirah Business Center 1 - Cluster G - Al Thanyah Fifth - JLT",
    addressLocality: "Dubai",
    addressRegion: "Dubai",
    addressCountry: "AE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 25.0657,
    longitude: 55.1713,
  },
  url: SITE_URL,
  priceRange: "$$$$",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  areaServed: [
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Place", name: "Worldwide" },
  ],
  hasMap: "https://www.google.com/maps?q=25.0657,55.1713",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SITE_JSONLD) }}
        />
      </head>
      <body className="bg-ink text-white overflow-x-hidden antialiased">
        <JsonLd data={LOCAL_BUSINESS_JSONLD} />
        <FontLoader />
        <LangProvider>
          <LenisProvider>{children}</LenisProvider>
        </LangProvider>
      </body>
    </html>
  );
}
