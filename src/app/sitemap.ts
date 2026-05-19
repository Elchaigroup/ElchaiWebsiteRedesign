import type { MetadataRoute } from "next";

const SITE_URL = "https://www.elchaigroup.com";

// Service-detail slugs that route through `[slug]/page.tsx`. Sourced
// from `src/lib/content.ts` nav. Keep in sync when slugs change.
const SERVICE_SLUGS = [
  // Blockchain
  "web3-development-company",
  "metaverse-development",
  "smart-contract",
  "nft-marketplace-development",
  "rwa",
  "blockchain-consulting-services",
  "blockchain-development",
  "defi-development",
  "dapp-development",
  "layer-1",
  "layer-2",
  // Cryptocurrency
  "crypto-wallet-development-company",
  "custodial-wallet",
  "decentralized-exchange",
  "centralized-exchange",
  "ico-development",
  "meme-coin-development",
  "ido-development",
  // AI
  "ai-assistant-development",
  "ai-integration",
  "ai-automation",
  "ai-development",
  "ai-tool",
  "ai-consulting-services",
  "computer-vision-software-development",
  "llm-development-partner",
  "rag-development-company",
  "rpa-development-partner",
  "machine-learning-development",
  "chat-gpt",
  "ai-agent-2025",
  "ai-voice-assist",
  "ai-logistics-software",
  "ai-fintech-solutions",
  "ai-banking-solutions",
  "ai-education-software",
  "ai-real-estate",
  "generative-ai-development",
  // App development
  "mobile-app-development",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/about-us`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/live-demo`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/portfolios`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/case-study`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/blog-list`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE_URL}/interns`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
  const serviceRoutes: MetadataRoute.Sitemap = SERVICE_SLUGS.map((slug) => ({
    url: `${SITE_URL}/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [...staticRoutes, ...serviceRoutes];
}
