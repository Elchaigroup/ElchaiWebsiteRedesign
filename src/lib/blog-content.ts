/**
 * Blog content registry. Each entry powers the /blog/[slug] route, the
 * Article JSON-LD it emits, and the resources rail on the homepage.
 * Hand-edited content — keep paragraphs scannable so AI answer engines
 * (ChatGPT Search, Perplexity, Google AI Overviews) can extract them.
 */
export type BlogSection = {
  heading: string;
  body: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  readTime: string;
  publishedAt: string; // ISO date
  updatedAt: string; // ISO date
  author: string;
  hero: { eyebrow: string };
  sections: BlogSection[];
  keywords: string[];
};

const POSTS: BlogPost[] = [
  {
    slug: "nft-business-applications-digital-asset-innovation-beyond-art-and-collectibles",
    title:
      "NFT Business Applications: Digital Asset Innovation Beyond Art and Collectibles",
    excerpt:
      "Non-fungible tokens have outgrown the JPEG era. Today they underpin loyalty programs, ticketing, supply-chain provenance, real-estate fractionalization and identity. Here is how enterprises are deploying NFTs in production.",
    tag: "Blockchain",
    readTime: "3 Min Read",
    publishedAt: "2026-04-08",
    updatedAt: "2026-05-12",
    author: "Elchai Group",
    hero: { eyebrow: "Field notes · Blockchain" },
    keywords: [
      "NFT business applications",
      "enterprise NFT",
      "NFT use cases",
      "tokenization",
      "digital assets",
    ],
    sections: [
      {
        heading: "The market moved past art",
        body: [
          "When people hear NFT, most still picture profile-picture collections and six-figure auctions. That phase is over. The serious capital and most of the engineering work has shifted to industrial use cases — provenance, access control, programmable royalties, fractional ownership of real-world assets, and on-chain customer relationships.",
          "Across our 2024 and 2025 engagements, fewer than 5% of NFT projects were aesthetic. The rest were instruments — credentials, tickets, warranties, deeds, and loyalty primitives that needed a unique on-chain anchor.",
        ],
      },
      {
        heading: "Where NFTs are creating real value",
        body: [
          "**Loyalty and membership.** Brands issue transferable or soulbound tokens that act as tiered membership. Holders unlock pricing, early access, or revenue shares. Unlike points in a database, the token is portable, programmable and verifiable.",
          "**Ticketing.** Each ticket is a unique NFT with embedded transfer rules, royalty splits to the original issuer on resale, and on-chain proof of attendance. Scalper economics break when royalties are enforced in-protocol.",
          "**Supply-chain provenance.** Each batch, container, or unit gets an NFT that accumulates verifiable events — origin, custody handoffs, inspection signatures — so end-customers and regulators can audit the chain without trusting any single intermediary.",
          "**Real-estate and fund fractionalization.** A property or LP interest is wrapped in a regulated SPV, then issued as fractional NFTs that can be held, transferred or used as collateral on-chain, subject to whitelist controls.",
          "**Credentials and identity.** Verifiable diplomas, professional licences and KYC attestations issued as soulbound NFTs let counterparties check facts without re-collecting documents.",
        ],
      },
      {
        heading: "What enterprise builds actually look like",
        body: [
          "A production NFT build is rarely about the ERC-721 contract. It is about the surrounding system — KYC gates, royalty engines, custody and recovery, off-chain metadata storage, legal wrappers, and integration with existing CRMs, ERPs and identity providers.",
          "We usually start with a regulatory and tax review (because the wrong jurisdiction can void the model), then design the on-chain primitives, then build the off-chain APIs that customer-facing teams will actually use. Most enterprise NFT programs reach production in 10–16 weeks.",
        ],
      },
      {
        heading: "Three questions before you build",
        body: [
          "1. **Is the unique identifier load-bearing?** If your use case works fine with a database row and a signed receipt, you do not need an NFT. The cost of on-chain state only makes sense when uniqueness, portability or programmability matter.",
          "2. **Who is the custodian?** Enterprise users will not manage seed phrases. Plan for embedded wallets, social recovery or institutional custody from day one.",
          "3. **What is the legal wrapper?** For anything that represents real-world value, the SPV, prospectus and transfer-agent architecture matter more than the contract code.",
        ],
      },
      {
        heading: "Talk to us",
        body: [
          "Elchai Group has shipped NFT-backed loyalty, ticketing, RWA and credential systems for enterprises in the UAE, GCC and Europe. If you are scoping a program, email info@elchaigroup.com or call +971 4 883 7176.",
        ],
      },
    ],
  },
  {
    slug: "ai-machine-learning-solutions-transforming-data-into-competitive-business-intelligence",
    title:
      "AI & Machine Learning Solutions: Transforming Data into Competitive Business Intelligence",
    excerpt:
      "The companies winning with AI are not the ones with the biggest models — they are the ones who turned their data into reliable, observable, evaluated systems. Here is the playbook.",
    tag: "AI",
    readTime: "3 Min Read",
    publishedAt: "2026-03-22",
    updatedAt: "2026-05-10",
    author: "Elchai Group",
    hero: { eyebrow: "Field notes · AI" },
    keywords: [
      "AI solutions",
      "machine learning",
      "business intelligence",
      "enterprise AI",
      "RAG",
      "LLM evaluation",
    ],
    sections: [
      {
        heading: "Models are commoditized — evaluation is the moat",
        body: [
          "In 2026, every team can call Claude, GPT-4o, Gemini or a tuned open-weights model. What separates the production winners from the demoware crowd is not model choice — it is the eval harness, the observability stack, and the data pipeline feeding the system.",
          "The companies that turned AI into a real advantage built three things: golden datasets they own, automated regressions that run on every prompt change, and a feedback loop where production traffic continuously refreshes the eval set.",
        ],
      },
      {
        heading: "The four-layer stack we ship",
        body: [
          "**Layer 1 — Data.** Cleanroom ingestion, deduplication, lineage tracking. If you cannot answer where a fact came from, the LLM cannot either.",
          "**Layer 2 — Retrieval.** Hybrid search (BM25 + dense vectors), reranking, and metadata filters tuned to the actual question distribution.",
          "**Layer 3 — Reasoning.** Prompt scaffolding, structured outputs (JSON schema or function-calling), and tool use for anything that needs ground truth.",
          "**Layer 4 — Evaluation.** Offline eval suites, online A/B harnesses, LLM-as-judge with human spot-checks, and dashboards the product team actually reads.",
        ],
      },
      {
        heading: "Where the ROI shows up first",
        body: [
          "**Internal knowledge.** A well-built RAG over your wiki, tickets and decisions returns hours per employee per week. ROI is usually visible within one quarter.",
          "**Customer support.** Hybrid agent-plus-human flows where AI drafts and routes, humans approve. CSAT goes up, not down, when done right.",
          "**Document processing.** Contracts, invoices, KYC packs, claims. Structured extraction with eval-gated confidence routing handles the majority and escalates the rest.",
          "**Sales enablement.** Pre-call briefs, account research, follow-up drafts. The wedge most sales orgs underinvest in.",
        ],
      },
      {
        heading: "What we will not let clients ship",
        body: [
          "No eval harness, no production. No observability, no production. No grounding citations on factual answers, no production. These are not opinions — they are the failure modes that turn AI projects into rollbacks.",
        ],
      },
      {
        heading: "Talk to us",
        body: [
          "If you have data and a hypothesis and want to know what an honest 8-week pilot looks like, email info@elchaigroup.com or call +971 4 883 7176.",
        ],
      },
    ],
  },
  {
    slug: "web3-digital-transformation-decentralized-solutions-for-modern-enterprise-architecture",
    title:
      "Web3 Digital Transformation: Decentralized Solutions for Modern Enterprise Architecture",
    excerpt:
      "Web3 is no longer a parallel internet — it is a set of primitives enterprises are bolting onto existing systems for settlement, identity and provenance. Here is how mature programs are architected.",
    tag: "Blockchain",
    readTime: "5 Min Read",
    publishedAt: "2026-02-14",
    updatedAt: "2026-05-08",
    author: "Elchai Group",
    hero: { eyebrow: "Field notes · Web3" },
    keywords: [
      "Web3 enterprise",
      "decentralized architecture",
      "blockchain integration",
      "RWA tokenization",
      "stablecoins",
      "enterprise crypto",
    ],
    sections: [
      {
        heading: "Web3 is integration, not replacement",
        body: [
          "The mature enterprise pattern in 2026 is not to rebuild on a new stack. It is to identify the few system boundaries where decentralization actually pays — settlement, multi-party reconciliation, digital ownership, and identity — and integrate those primitives behind existing APIs.",
          "Your CRM, ERP and warehouse stay where they are. A thin on-chain layer underneath handles the parts where trust between counterparties is expensive.",
        ],
      },
      {
        heading: "Four high-leverage use cases",
        body: [
          "**Cross-border settlement.** Stablecoin rails settle invoices and treasury flows in minutes instead of days, at a fraction of correspondent-banking cost, with full audit trail. UAE entities have particularly clean regulatory pathways here.",
          "**RWA tokenization.** Treasuries, private credit, real estate and commodities wrapped in regulated SPVs and represented on-chain unlock 24/7 secondary markets, programmable distributions, and instant collateral mobility.",
          "**Supply-chain provenance.** Multi-party flows where every participant signs events into a shared ledger remove reconciliation work and expose tampering. Pharma, food and luxury all benefit.",
          "**Verifiable identity.** Zero-knowledge credentials let banks, regulators and counterparties verify facts (age, residency, accreditation, license) without re-collecting documents.",
        ],
      },
      {
        heading: "The reference architecture",
        body: [
          "Most production Web3 enterprise programs share the same shape: an EVM-compatible L2 for cost (Arbitrum, Base, Polygon zkEVM), institutional custody (Fireblocks, Copper, BitGo), an oracle layer for off-chain truth (Chainlink, Pyth, or private oracles), and account abstraction so end-users never see a seed phrase.",
          "On top of that sits the policy engine — KYC gates, transfer restrictions, role-based access, and compliance hooks — and a service layer that wraps everything behind familiar REST/GraphQL APIs.",
        ],
      },
      {
        heading: "Regulatory posture matters more than tech choice",
        body: [
          "In 2026, the difference between a Web3 program that scales and one that gets paused is usually regulatory architecture, not engineering. UAE (VARA, ADGM), Singapore (MAS), Switzerland (FINMA) and the EU (MiCA) all offer workable but different paths. We pick jurisdiction and product structure before we pick chain.",
        ],
      },
      {
        heading: "When not to use Web3",
        body: [
          "If only one party needs to be trusted and there is no settlement, ownership or multi-party reconciliation problem, a database is the right answer. We turn down work that does not pass this test.",
        ],
      },
      {
        heading: "Talk to us",
        body: [
          "Elchai Group has architected and shipped Web3 programs for banks, family offices, fintechs and government-adjacent entities in the UAE and GCC. Email info@elchaigroup.com or call +971 4 883 7176 to scope yours.",
        ],
      },
    ],
  },
];

const _bySlug: Record<string, BlogPost> = Object.fromEntries(
  POSTS.map((p) => [p.slug, p]),
);

export function listBlogPosts(): BlogPost[] {
  return POSTS;
}

export function getBlogPost(slug: string): BlogPost | null {
  return _bySlug[slug] ?? null;
}
