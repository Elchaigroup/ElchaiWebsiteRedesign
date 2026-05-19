# Elchai Group — SEO Setup Cheat Sheet

## What's In This Folder

| File | What It Does |
|------|-------------|
| `seo-config.json` | All meta titles, descriptions, slugs, keywords, and breadcrumb paths for every page |
| `components/SEOHead.jsx` | React component that handles all meta tags, Open Graph, Twitter cards, and schema markup |
| `components/Breadcrumbs.jsx` | React breadcrumb component with built-in Google structured data (JSON-LD) |
| `examples/ExamplePageLayout.jsx` | Shows how to use everything together on real pages |

## Slug Structure (Site Map)

```
/                                  Home
/about                             About Us
/services                          Services Hub
/services/ai-development           AI Development
/services/blockchain-development   Blockchain Development
/services/web3-development         Web3 Development
/services/smart-contracts          Smart Contracts
/services/defi-development         DeFi Development
/services/mobile-app-development   Mobile Apps
/services/metaverse-development    Metaverse
/services/tokenization             Tokenization
/products                          Products Hub
/products/tarality                 Tarality Exchange
/products/bb-estate                BB-Estate
/products/blyncc                   Blyncc Payments
/subsidiaries                      Subsidiaries Hub
/subsidiaries/center-ai-vision     CAV
/subsidiaries/dubai-ai-city        Dubai AI City
/subsidiaries/digital-meta-bank    DMB
/case-studies                      Case Studies
/blog                              Blog
/blog/[slug]                       Individual Posts
/contact                           Contact
/careers                           Careers
/partners                          Partners
```

## Schema Markup Checklist

| Schema Type | Where To Use | Component |
|-------------|-------------|-----------|
| Organization | Root layout (every page) | `<OrganizationSchema />` |
| BreadcrumbList | Every page | Built into `<Breadcrumbs />` automatically |
| Service | Each service page | `<ServiceSchema />` |
| FAQPage | Pages with FAQ sections | `<FAQSchema />` |
| Article | Blog posts | `<ArticleSchema />` |

## Quick Rules

1. **Every page needs**: SEOHead + Breadcrumbs + exactly ONE H1
2. **Slugs**: lowercase, hyphens only, no special characters, max 3 levels deep
3. **Meta titles**: under 60 characters, include primary keyword + "Elchai Group"
4. **Meta descriptions**: 120-155 characters, include a call-to-action or value prop
5. **OG Image**: Create a 1200x630 branded image (this was MISSING on the old site)
6. **FAQ schema**: Add to any page with Q&A content — Google shows these directly in search results

## Before You Go Live Checklist

- [ ] OG image created (1200x630) and uploaded
- [ ] All social links in OrganizationSchema are correct
- [ ] Logo URL in config points to real image
- [ ] Twitter handle is correct
- [ ] Canonical URLs all resolve (no 404s)
- [ ] Test with: https://search.google.com/test/rich-results (paste any page URL)
- [ ] Test social sharing: https://www.opengraph.xyz (see your preview cards)
- [ ] Run Lighthouse audit in Chrome DevTools > score should be 90+ for SEO
