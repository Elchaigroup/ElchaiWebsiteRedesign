/**
 * SEOHead Component for Elchai Group
 *
 * HOW IT WORKS (for a 15-year-old):
 * ---------------------------------
 * Every web page has an invisible <head> section that Google and social media
 * platforms read. This component automatically fills in:
 *
 * 1. META TITLE — the blue clickable text in Google results
 * 2. META DESCRIPTION — the paragraph under it in Google
 * 3. OPEN GRAPH (og:) — what shows up when someone shares your link on
 *    LinkedIn, WhatsApp, Facebook, etc. (the preview card with image + text)
 * 4. TWITTER CARDS — same thing but for X/Twitter
 * 5. CANONICAL URL — tells Google "this is the REAL version of this page"
 *    (prevents duplicate content issues)
 * 6. STRUCTURED DATA — invisible JSON that tells Google exactly what your
 *    company is, what you do, where you are (Organization schema)
 *
 * WHY THIS MATTERS FOR ELCHAI GROUP:
 * The old site was MISSING og:image, og:url, and twitter:image.
 * That means when someone shared elchaigroup.com on LinkedIn —
 * it showed NO preview image. That's a huge missed opportunity
 * because LinkedIn is where your B2B clients are.
 *
 * USAGE:
 * ------
 * // In any page component:
 * import SEOHead from './components/SEOHead';
 *
 * export default function AboutPage() {
 *   return (
 *     <>
 *       <SEOHead
 *         title="About Elchai Group | Our Story, Team & Mission"
 *         description="Learn about Elchai Group — founded in Dubai..."
 *         path="/about"
 *         keywords={["Elchai Group about", "AI blockchain company Dubai"]}
 *       />
 *       <main>... your page content ...</main>
 *     </>
 *   );
 * }
 *
 * // Or use the config-driven approach (recommended):
 * import { SEOHeadFromConfig } from './components/SEOHead';
 * import seoConfig from '../seo-config.json';
 *
 * export default function AboutPage() {
 *   return (
 *     <>
 *       <SEOHeadFromConfig config={seoConfig} path="/about" />
 *       <main>... your page content ...</main>
 *     </>
 *   );
 * }
 */

import React from 'react';

// ─── DEFAULT SITE INFO ───────────────────────────────
const DEFAULTS = {
  siteName: 'Elchai Group',
  siteUrl: 'https://www.elchaigroup.com',
  ogImage: 'https://www.elchaigroup.com/images/og-default.jpg',
  twitterHandle: '@ElchaiGroup',
  locale: 'en_US',
  logo: 'https://www.elchaigroup.com/images/elchai-logo.png',
};

// ─── MAIN SEO COMPONENT ─────────────────────────────
export default function SEOHead({
  title,
  description,
  path = '/',
  ogImage,
  keywords = [],
  type = 'website',       // 'website' for pages, 'article' for blog posts
  publishedDate,          // for blog posts
  modifiedDate,           // for blog posts
  author,                 // for blog posts
  noIndex = false,        // set true for pages you don't want Google to index
}) {
  const canonicalUrl = `${DEFAULTS.siteUrl}${path}`;
  const image = ogImage || DEFAULTS.ogImage;

  return (
    <>
      {/* ── Basic Meta Tags ─────────────────────── */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      <link rel="canonical" href={canonicalUrl} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* ── Open Graph (Facebook, LinkedIn, WhatsApp) ── */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={DEFAULTS.siteName} />
      <meta property="og:locale" content={DEFAULTS.locale} />

      {/* ── Twitter / X Cards ────────────────────── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={DEFAULTS.twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* ── Article-specific (blog posts) ─────────── */}
      {type === 'article' && publishedDate && (
        <meta property="article:published_time" content={publishedDate} />
      )}
      {type === 'article' && modifiedDate && (
        <meta property="article:modified_time" content={modifiedDate} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
    </>
  );
}

// ─── CONFIG-DRIVEN VERSION ───────────────────────────
// Reads from seo-config.json so you don't repeat yourself
export function SEOHeadFromConfig({ config, path }) {
  const pageConfig = config?.pages?.[path];
  if (!pageConfig) {
    console.warn(`SEOHead: No config found for path "${path}"`);
    return null;
  }

  return (
    <SEOHead
      title={pageConfig.title}
      description={pageConfig.description}
      path={path}
      keywords={pageConfig.keywords || []}
    />
  );
}

// ─── ORGANIZATION SCHEMA ─────────────────────────────
// Drop this ONCE in your root layout (e.g., _app.jsx or layout.jsx)
// It tells Google: "This is a company. Here's our name, logo, location, etc."
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Elchai Group',
    alternateName: 'ElchAI',
    url: DEFAULTS.siteUrl,
    logo: DEFAULTS.logo,
    foundingDate: '2018',
    description:
      'AI, Blockchain & Web3 development company based in Dubai, building products like Tarality, BB-Estate, and Blyncc.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dubai',
      addressCountry: 'AE',
    },
    sameAs: [
      'https://www.linkedin.com/company/elchaigroup',
      'https://twitter.com/ElchaiGroup',
      'https://www.crunchbase.com/organization/elchai-group',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'info@elchaigroup.com',
      contactType: 'customer support',
    },
    knowsAbout: [
      'Artificial Intelligence',
      'Blockchain Development',
      'Web3',
      'Smart Contracts',
      'DeFi',
      'Tokenization',
      'Metaverse',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── FAQ SCHEMA HELPER ───────────────────────────────
// Use this on pages that have FAQ sections
// Google can show these as expandable Q&A right in search results!
//
// Usage:
//   <FAQSchema questions={[
//     { question: "What does Elchai Group do?", answer: "We build AI and blockchain..." },
//     { question: "Where is Elchai Group based?", answer: "Dubai, UAE..." },
//   ]} />
export function FAQSchema({ questions }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── SERVICE SCHEMA HELPER ───────────────────────────
// Use on service pages so Google understands what you offer
//
// Usage:
//   <ServiceSchema
//     name="AI Development Services"
//     description="Custom AI application development..."
//     url="/services/ai-development"
//   />
export function ServiceSchema({ name, description, url }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: name,
    provider: {
      '@type': 'Organization',
      name: 'Elchai Group',
      url: DEFAULTS.siteUrl,
    },
    name,
    description,
    url: `${DEFAULTS.siteUrl}${url}`,
    areaServed: {
      '@type': 'Place',
      name: 'Worldwide',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── BLOG POST SCHEMA HELPER ─────────────────────────
// Use on individual blog posts for GEO (AI search optimization)
//
// Usage:
//   <ArticleSchema
//     title="How to Build a Smart Contract"
//     description="Step-by-step guide..."
//     url="/blog/how-to-build-smart-contract"
//     author="SHA"
//     publishedDate="2026-05-19"
//     image="https://www.elchaigroup.com/images/blog/smart-contract.jpg"
//   />
export function ArticleSchema({ title, description, url, author, publishedDate, modifiedDate, image }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: `${DEFAULTS.siteUrl}${url}`,
    image: image || DEFAULTS.ogImage,
    author: {
      '@type': 'Person',
      name: author || 'Elchai Group Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Elchai Group',
      logo: {
        '@type': 'ImageObject',
        url: DEFAULTS.logo,
      },
    },
    datePublished: publishedDate,
    dateModified: modifiedDate || publishedDate,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
