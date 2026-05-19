/**
 * EXAMPLE: How to use SEOHead + Breadcrumbs on a real page
 *
 * HOW IT WORKS (for a 15-year-old):
 * ---------------------------------
 * This file shows how a typical page on the Elchai Group website
 * would use the SEO and Breadcrumb components together.
 *
 * Every page on your site should follow this pattern:
 * 1. Import the SEO component and the config
 * 2. Import the Breadcrumbs component
 * 3. Put SEOHead in the <head> (or use Next.js Head)
 * 4. Put Breadcrumbs at the top of your page content
 * 5. Use the correct H1 tag (only ONE per page)
 *
 * This example shows the AI Development service page.
 */

import React from 'react';

// Your components
import SEOHead, {
  SEOHeadFromConfig,
  OrganizationSchema,
  ServiceSchema,
  FAQSchema,
} from '../components/SEOHead';
import Breadcrumbs, { generateBreadcrumbs } from '../components/Breadcrumbs';

// Your SEO config (all meta tags live here)
import seoConfig from '../seo-config.json';

// ─────────────────────────────────────────────────────
// EXAMPLE 1: Root Layout (wraps ALL pages)
// Put this in your _app.jsx or layout.jsx
// ─────────────────────────────────────────────────────
export function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Organization schema — loaded on EVERY page, just once */}
        <OrganizationSchema />
        {/* Favicon, fonts, etc. go here too */}
      </head>
      <body>
        <header>{/* Your navbar */}</header>
        <main>{children}</main>
        <footer>{/* Your footer */}</footer>
      </body>
    </html>
  );
}

// ─────────────────────────────────────────────────────
// EXAMPLE 2: Service Page (AI Development)
// URL: /services/ai-development
// ─────────────────────────────────────────────────────
export function AIDevServicePage() {
  const path = '/services/ai-development';

  return (
    <>
      {/* 1. SEO meta tags — read from config automatically */}
      <SEOHeadFromConfig config={seoConfig} path={path} />

      {/* 2. Service schema — tells Google this is a service offering */}
      <ServiceSchema
        name="AI Development Services"
        description="Custom AI application development — chatbots, AI agents, automation, NLP, and computer vision solutions."
        url={path}
      />

      {/* 3. Breadcrumbs — visible trail + Google structured data */}
      <Breadcrumbs items={generateBreadcrumbs(path, seoConfig)} />

      {/* 4. Page content — starts with ONE H1 tag */}
      <h1>AI Development Services</h1>

      <p>
        Elchai Group builds custom AI solutions for businesses worldwide...
      </p>

      {/* 5. FAQ section with schema markup */}
      <section>
        <h2>Frequently Asked Questions</h2>

        <FAQSchema
          questions={[
            {
              question: 'What AI services does Elchai Group offer?',
              answer:
                'We build custom AI applications including chatbots, AI agents, automation systems, NLP solutions, and computer vision tools for businesses.',
            },
            {
              question: 'How long does an AI project take?',
              answer:
                'Typical AI projects take 4-12 weeks depending on complexity. A simple chatbot can be delivered in 4 weeks, while a full AI agent system may take 8-12 weeks.',
            },
            {
              question: 'Do you work with international clients?',
              answer:
                'Yes. Elchai Group is based in Dubai but works with clients across the UAE, Europe, Asia, and North America.',
            },
          ]}
        />

        {/* Render the actual FAQ visually too */}
        <details>
          <summary>What AI services does Elchai Group offer?</summary>
          <p>We build custom AI applications including chatbots, AI agents...</p>
        </details>
        <details>
          <summary>How long does an AI project take?</summary>
          <p>Typical AI projects take 4-12 weeks depending on complexity...</p>
        </details>
      </section>
    </>
  );
}

// ─────────────────────────────────────────────────────
// EXAMPLE 3: Blog Post Page
// URL: /blog/how-to-build-smart-contract
// ─────────────────────────────────────────────────────
import { ArticleSchema } from '../components/SEOHead';

export function BlogPostPage() {
  const post = {
    title: 'How to Build a Smart Contract in 2026 — Complete Guide',
    description:
      'Step-by-step guide to building, testing, and deploying a smart contract on Ethereum using Solidity.',
    path: '/blog/how-to-build-smart-contract',
    author: 'SHA',
    publishedDate: '2026-05-19',
    image: 'https://www.elchaigroup.com/images/blog/smart-contract-guide.jpg',
  };

  return (
    <>
      {/* SEO for blog post — note type="article" */}
      <SEOHead
        title={post.title}
        description={post.description}
        path={post.path}
        type="article"
        publishedDate={post.publishedDate}
        author={post.author}
        ogImage={post.image}
        keywords={[
          'how to build smart contract',
          'Solidity tutorial',
          'smart contract development',
        ]}
      />

      {/* Article schema for GEO (AI search engines) */}
      <ArticleSchema
        title={post.title}
        description={post.description}
        url={post.path}
        author={post.author}
        publishedDate={post.publishedDate}
        image={post.image}
      />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: post.title },
        ]}
      />

      {/* Content */}
      <article>
        <h1>{post.title}</h1>
        <p>
          By {post.author} | Published {post.publishedDate}
        </p>
        {/* ... blog content ... */}
      </article>
    </>
  );
}
