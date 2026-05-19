/**
 * Breadcrumbs Component for Elchai Group
 *
 * HOW IT WORKS (for a 15-year-old):
 * ---------------------------------
 * Think of breadcrumbs like the trail of pages you clicked to get here.
 * If you're on the "AI Development" service page, the breadcrumb shows:
 *   Home > Services > AI Development
 *
 * Each one is clickable (except the last one — that's where you already are).
 *
 * This also adds invisible "structured data" (JSON-LD) that Google reads
 * to understand your site structure. Google sometimes shows breadcrumbs
 * directly in search results, which looks way more professional.
 *
 * USAGE:
 * ------
 * import Breadcrumbs from './components/Breadcrumbs';
 *
 * // Simple — just pass the items
 * <Breadcrumbs items={[
 *   { label: "Home", href: "/" },
 *   { label: "Services", href: "/services" },
 *   { label: "AI Development" }  // no href = current page
 * ]} />
 *
 * // Or use the auto-generator from the SEO config
 * <Breadcrumbs items={generateBreadcrumbs("/services/ai-development")} />
 */

import React from 'react';

const SITE_URL = 'https://www.elchaigroup.com';

/**
 * Auto-generate breadcrumb items from a URL path
 * Example: "/services/ai-development" becomes:
 *   [{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "AI Development" }]
 */
export function generateBreadcrumbs(pathname, seoConfig) {
  // If seoConfig is provided and has breadcrumb data, use it
  if (seoConfig?.pages?.[pathname]?.breadcrumb) {
    const labels = seoConfig.pages[pathname].breadcrumb;
    const segments = pathname.split('/').filter(Boolean);

    return labels.map((label, index) => {
      if (index === labels.length - 1) {
        return { label }; // Last item = current page, no link
      }
      if (index === 0) {
        return { label, href: '/' };
      }
      const href = '/' + segments.slice(0, index).join('/');
      return { label, href };
    });
  }

  // Fallback: auto-generate from URL path
  const segments = pathname.split('/').filter(Boolean);
  const items = [{ label: 'Home', href: '/' }];

  segments.forEach((segment, index) => {
    const label = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    if (index === segments.length - 1) {
      items.push({ label }); // Current page — no link
    } else {
      const href = '/' + segments.slice(0, index + 1).join('/');
      items.push({ label, href });
    }
  });

  return items;
}

export default function Breadcrumbs({ items, className = '' }) {
  if (!items || items.length <= 1) return null;

  // Build JSON-LD structured data for Google
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };

  return (
    <>
      {/* Invisible structured data for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Visible breadcrumb navigation */}
      <nav aria-label="Breadcrumb" className={`breadcrumbs ${className}`}>
        <ol
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '0.25rem',
            listStyle: 'none',
            padding: 0,
            margin: '1rem 0',
            fontSize: '0.875rem',
            color: '#6b7280',
          }}
        >
          {items.map((item, index) => (
            <li
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
              }}
            >
              {index > 0 && (
                <span style={{ color: '#d1d5db', margin: '0 0.25rem' }} aria-hidden="true">
                  /
                </span>
              )}
              {item.href ? (
                <a
                  href={item.href}
                  style={{
                    color: '#2563eb',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.target.style.color = '#1d4ed8')}
                  onMouseLeave={(e) => (e.target.style.color = '#2563eb')}
                >
                  {item.label}
                </a>
              ) : (
                <span style={{ color: '#111827', fontWeight: 500 }} aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
