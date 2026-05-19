/**
 * service-detail-content — structured content for real service-detail pages.
 *
 * Source: scraped markdown from elchaigroup.com/<slug>/ (kept in
 * /Users/elchai/Documents/019e1be3-…/). Every heading and paragraph is
 * preserved verbatim where practical; bullet descriptions may be lightly
 * trimmed for grid readability.
 *
 * Slugs absent from this registry fall back to the "Coming soon" stub.
 */

import type { ServiceDetailContent } from "./service-detail-types";

const blockchainDevelopment: ServiceDetailContent = {
  slug: "blockchain-development",
  category: "Blockchain · Services",
  hero: {
    eyebrow: "Blockchain Development",
    heading: "Blockchain Development Company",
    subheading:
      "We design immutable, auditable, and scalable blockchain infrastructures that power the next generation of intelligent enterprises.",
    body:
      "As a premier blockchain development partner, Elchai combines technical execution with strategic foresight, helping organizations worldwide streamline operations, enhance transparency, and drive new revenue models in the on-chain era.",
    primaryCta: { label: "Request A Consultation", href: "#consultation" },
    ghostCta: { label: "Explore Capabilities", href: "#capabilities" },
  },
  stats: [
    { value: "200+", label: "Smart Contracts Deployed" },
    { value: "30+",  label: "Industry Use Cases" },
    { value: "100+", label: "Certified Blockchain Developers" },
    { value: "4+",   label: "Years of Blockchain Expertise" },
    { value: "150+", label: "Projects Since 2016" },
  ],
  capabilities: {
    eyebrow: "Capabilities",
    heading: "Our Blockchain Development Capabilities",
    body:
      "End-to-end blockchain development covering everything from early-stage strategy and system design to implementation and integration. Built for real-world scale, regulatory readiness, and long-term performance.",
    items: [
      { title: "Blockchain Strategy & Advisory",        desc: "We map your use case to the right protocols, architecture, and integration strategy. A clear roadmap to scale with no vendor lock-in." },
      { title: "Enterprise Blockchain Networks",        desc: "Build permissioned networks for consortia and regulated industries. Privacy, compliance, and audit-ready systems designed for scale." },
      { title: "Digital Currency & CBDC Solutions",     desc: "Design programmable money infrastructure with secure wallets and national-scale deployment. Future-proof your financial systems." },
      { title: "Institutional & Multi-Chain Wallets",   desc: "Secure custody, multi-party control, and cross-chain asset management. Self-sovereignty for users, compliance for institutions." },
      { title: "Decentralized & Centralized Exchanges", desc: "High-performance trading platforms built for liquidity, margin, and institutional operations. Deploy fast with turnkey options." },
      { title: "Automated Trading & Market Making",     desc: "Bots and platforms to optimize liquidity, manage risk, and capture arbitrage across chains and exchanges." },
      { title: "DeFi Protocols & Yield Platforms",      desc: "Lending, staking, and AMM solutions designed for security, composability, and institutional-grade capital efficiency." },
      { title: "Token Launch & IDO/STO Platforms",      desc: "End-to-end token infrastructure with compliance, vesting, whitelisting, and DEX integration. Launch with confidence." },
      { title: "Asset Tokenization & NFTs",             desc: "Convert real-world assets or collectibles into compliant, programmable digital instruments. Unlock liquidity and provenance." },
      { title: "Smart Contracts & Security Audits",     desc: "Formal verification, security audits, and continuous monitoring. Contracts you can trust with mission-critical assets." },
      { title: "Scaling & Cross-Chain Infrastructure",  desc: "Rollups, ZK proofs, bridges, and oracles for high-performance, private, and interoperable blockchain systems." },
      { title: "DApp Development & Analytics",          desc: "Full-stack decentralized apps with multi-chain support, wallet integration, and actionable on-chain intelligence." },
    ],
  },
  midBanner: {
    heading: "Build Future-Ready Blockchain Applications Tailored For Security, Efficiency, And Growth",
    cta: { label: "Get a Free Consultation", href: "#consultation" },
  },
  industries: {
    eyebrow: "Industries",
    heading: "Cross-industry blockchain expertise",
    body:
      "We deliver blockchain solutions across regulated and emerging sectors, each with distinct technical requirements, compliance frameworks, and integration challenges.",
    items: [
      { title: "Real Estate",       desc: "Property tokenization, fractional ownership platforms, title registry, rental payment automation, and compliant secondary markets." },
      { title: "Healthcare",        desc: "Patient data sovereignty, medical record interoperability, drug traceability, and clinical trial transparency on distributed ledgers." },
      { title: "Banking & Finance", desc: "Payment infrastructure, cross-border settlement, trade finance, regulatory reporting, and integration with core banking systems." },
      { title: "Supply Chain",      desc: "End-to-end provenance tracking, IoT sensor integration, customs documentation, cold chain monitoring, and multi-party coordination." },
      { title: "Gaming",            desc: "Player-owned assets, in-game economies with real value, NFT integration, tournament prize distribution, and cross-game interoperability." },
      { title: "Legal & Compliance",desc: "Tamper-proof audit systems, verifiable document workflows, and on-chain compliance rails tailored to regulatory environments." },
    ],
  },
  whyChoose: {
    eyebrow: "Why Elchai",
    heading: "Why Leading Enterprises Choose Elchai",
    body:
      "Unmatched enterprise blockchain expertise, proven implementation methodologies, and ongoing support to ensure your project's success.",
    items: [
      { title: "End-to-End Development Expertise",     desc: "From strategic architecture to production deployment. We deliver complete blockchain solutions that ensure technical consistency and eliminate vendor fragmentation." },
      { title: "Multi-Chain Deployment Capabilities",  desc: "Our protocol-agnostic approach supports Ethereum, Solana, Polygon, Hyperledger, and leading Layer 2 networks to align technology with business requirements." },
      { title: "Scalable & High-Performance Systems",  desc: "Built for institutional scale. Our infrastructure maintains reliability and performance through network expansion and enterprise adoption." },
      { title: "Optimized Smart Contract Security",    desc: "Formal verification, multi-stage audits, and continuous monitoring deliver enterprise-grade trust for mission-critical contracts." },
      { title: "Seamless Business Integration",        desc: "API-first middleware that bridges blockchain events with ERP, CRM, and custom enterprise applications without disrupting operations." },
      { title: "Proven Industry Track Record",         desc: "Successful deployments across finance, supply chain, healthcare, and government sectors over four-plus years of focused blockchain delivery." },
    ],
  },
  process: {
    eyebrow: "Methodology",
    heading: "How Elchai Builds Blockchain Ecosystems",
    body:
      "A transparent, efficient journey to blockchain implementation with our blockchain development services methodology built for success.",
    steps: [
      { title: "Discovery",     desc: "Comprehensive business analysis identifying friction points, regulatory requirements, and integration challenges. Maps existing workflows against blockchain capabilities and quantifies ROI." },
      { title: "Architecture",  desc: "Technical architects design scalable solutions using proven frameworks like Hyperledger Fabric for enterprise privacy or Ethereum compatibility for public interaction." },
      { title: "Development",   desc: "Agile sprints combined with rigorous security auditing. Code undergoes multiple review cycles, automated testing, and formal verification to ensure production-ready reliability." },
      { title: "Integration",   desc: "Careful API design and data migration strategies. Solutions enhance rather than disrupt current operations, with training and support throughout the transition." },
      { title: "Deployment",    desc: "Phased rollouts in monitored environments with continuous health checks. We maintain 99.9% uptime targets and provide 24/7 technical support post-launch." },
    ],
  },
  techStack: {
    eyebrow: "Tech Stack",
    heading: "Blockchain Technology Stack",
    body: "Production-grade tools and frameworks selected per engagement — protocol-agnostic, audit-friendly, and integration-ready.",
    groups: [
      { title: "Blockchain Frameworks",     items: ["Ethereum", "Polygon", "Solana", "Polkadot", "Cosmos SDK", "Avalanche", "Hyperledger Fabric"] },
      { title: "AI Models & APIs",          items: ["OpenAI", "Fetch.ai", "SingularityNET", "Bittensor"] },
      { title: "Programming Languages",     items: ["Solidity", "Rust", "Go", "TypeScript", "Python"] },
      { title: "Dev Frameworks",            items: ["HardHat", "Foundry", "Truffle", "Next.js", "Node.js"] },
      { title: "Wallets",                   items: ["MetaMask", "Rainbow", "Trust Wallet", "Phantom", "Coinbase"] },
      { title: "Smart-Contract Runtimes",   items: ["EVM", "Solidity", "Vyper", "CosmWasm", "Move"] },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    heading: "Frequently Asked Questions",
    items: [
      {
        q: "How do I choose the right blockchain protocol for my use case?",
        a: "Protocol selection depends on throughput requirements, privacy needs, governance model, and integration constraints. Permissioned networks suit regulated consortiums with confidential data requirements. Public chains work for applications requiring global state verification and composability. We assess transaction volume, finality requirements, regulatory constraints, and existing infrastructure before recommending architecture. Our consultation includes protocol comparison, cost modeling, and technical trade-off analysis.",
      },
      {
        q: "What does blockchain development audit and security review involve?",
        a: "Security analysis includes automated vulnerability scanning, manual code review against industry standards, edge case testing, and economic attack modeling. We examine smart contract logic, access controls, upgrade mechanisms, and integration points. Audit reports detail vulnerability severity, provide remediation guidance, and include verification of fixes.",
      },
      {
        q: "How do blockchain systems integrate with existing enterprise infrastructure?",
        a: "Integration typically occurs through REST APIs, message queues, or ETL pipelines. We build middleware layers that translate between blockchain events and enterprise data models, handle state synchronization, manage transaction retries, and provide real-time monitoring dashboards.",
      },
      {
        q: "What happens after deployment? Who manages the blockchain system?",
        a: "Post-deployment support includes infrastructure monitoring, node maintenance, smart contract upgrades, security patches, and performance optimization. We offer managed services where our team handles operations, or knowledge transfer where your team assumes ownership with our support.",
      },
      {
        q: "How long does enterprise blockchain development typically take?",
        a: "Smart contract development and testing: 6-12 weeks. Complete platform with wallet integration, frontend, and enterprise connectivity: 4-6 months. Multi-party consortium networks with governance frameworks: 6-12 months. We provide detailed project plans after initial architecture review, with milestone-based delivery and regular progress demonstrations.",
      },
    ],
  },
  closing: {
    heading: "Transform The Way You Do Business With High-Performance, Secure, And Scalable Blockchain Applications.",
    body: "Elchai combines technical expertise with strategic vision to help enterprises navigate this transformation successfully.",
    cta: { label: "Let's Build Together", href: "#consultation" },
  },
};

const aiConsultingServices: ServiceDetailContent = {
  slug: "ai-consulting-services",
  category: "Artificial Intelligence · AI Solutions",
  hero: {
    eyebrow: "AI Consulting",
    heading: "AI Consulting That Drives Data-First Strategies",
    subheading: "Transforming Businesses Through Expert AI Consulting Services",
    body:
      "Identify opportunities, design strategy, audit data, and operationalize AI across your organisation — with governance built in from day one.",
    primaryCta: { label: "Book Free Consultation", href: "#consultation" },
    ghostCta: { label: "See Services", href: "#capabilities" },
  },
  stats: [
    { value: "250+", label: "AI Projects Delivered" },
    { value: "100+", label: "AI Engineers" },
    { value: "98%",  label: "Client Retention" },
    { value: "40+",  label: "Industries Served" },
  ],
  capabilities: {
    eyebrow: "Services",
    heading: "AI Consulting Services for Scalable and Informed Solutions",
    body: "Six structured services that take you from opportunity-mapping to governed deployment.",
    items: [
      { title: "AI Opportunity Assessment",        desc: "Analyzes existing operations, market conditions, and data assets to identify areas where AI can create measurable value." },
      { title: "Custom AI Strategy Roadmap",       desc: "Outlines a structured AI adoption plan with defined milestones and performance indicators aligned to organizational objectives." },
      { title: "AI Integration Strategy",          desc: "Details a framework for incorporating AI tools into current systems while maintaining continuity and operational stability." },
      { title: "Data Assessment and Audit",        desc: "Examines data quality, accessibility, and infrastructure readiness to support reliable AI model development and deployment." },
      { title: "Industry-Specific Analysis",       desc: "Performs targeted studies based on industry context to evaluate feasibility, challenges, and potential use cases for AI." },
      { title: "AI Governance and Risk Assessment",desc: "Defines governance standards and risk controls to ensure ethical, compliant, and transparent implementation of AI systems." },
    ],
  },
  midBanner: {
    heading: "Our AI Consulting Services can Transform Your Operations and Maximize Growth.",
    cta: { label: "Book Free Consultation", href: "#consultation" },
  },
  whyChoose: {
    eyebrow: "Why Elchai",
    heading: "Why Should You Consider Elchai for AI Consulting?",
    items: [
      { title: "Holistic AI Ecosystem Approach",  desc: "Strategy, data, models, and deployment treated as one system — not isolated experiments that never reach production." },
      { title: "Experienced AI Professionals",    desc: "100+ engineers with deep expertise across ML, LLMs, computer vision, and applied AI for regulated industries." },
      { title: "Rapid Prototyping & PoC",         desc: "Production-grade proofs of concept delivered in weeks, not quarters, so you de-risk investment before scaling." },
      { title: "Cross-Industry Knowledge",        desc: "Healthcare, finance, retail, manufacturing, logistics — pattern recognition from 40+ verticals shortens your learning curve." },
      { title: "AI–Human Collaboration Focus",    desc: "Systems designed to augment, not replace, your teams — with clear human-in-the-loop checkpoints." },
      { title: "Ongoing System Support",          desc: "Model monitoring, retraining cadence, and incident response so your AI keeps performing as data drifts." },
    ],
  },
  industries: {
    eyebrow: "Industries",
    heading: "Industry-Focused AI Consulting Services",
    items: [
      { title: "Healthcare" },
      { title: "Finance and Banking" },
      { title: "Retail and E-commerce" },
      { title: "Manufacturing" },
      { title: "Automotive" },
      { title: "Logistics & Supply Chain" },
      { title: "Education" },
      { title: "Agriculture" },
      { title: "Real Estate" },
      { title: "Entertainment" },
      { title: "Travel and Hospitality" },
      { title: "Insurance" },
    ],
  },
  techStack: {
    eyebrow: "Stack",
    heading: "Advanced AI Infrastructure Framework",
    groups: [
      { title: "Models & APIs",     items: ["OpenAI", "Anthropic Claude", "Gemini", "Llama", "Mistral", "Cohere"] },
      { title: "Vector Databases",  items: ["Pinecone", "Weaviate", "Qdrant", "Milvus", "pgvector"] },
      { title: "LLM Frameworks",    items: ["LangChain", "LlamaIndex", "Haystack", "DSPy"] },
      { title: "Deployment",        items: ["AWS Bedrock", "Azure OpenAI", "GCP Vertex", "NVIDIA Triton", "Kubernetes"] },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    heading: "AI Consulting — Common Questions",
    items: [
      { q: "What does an AI consulting engagement actually deliver?",
        a: "A use-case shortlist, a data-readiness assessment, an architecture brief, an ROI model and a build/buy roadmap — typically packaged with an executive readout and a 90-day implementation plan." },
      { q: "How long does AI consulting take before we see action?",
        a: "Strategy sprints run 4–6 weeks. PoCs land in 6–12 weeks. Production deployments typically take 4–6 months depending on data complexity and integration footprint." },
      { q: "Do you work with our existing AI stack or recommend a new one?",
        a: "Both. We assess what you have (OpenAI, Anthropic, Vertex, open-weights, in-house) against the use case and recommend the smallest delta to ship — augment rather than rip-and-replace where possible." },
      { q: "How do you handle data privacy and compliance during consulting?",
        a: "Engagements run under NDA with role-based data access. For regulated industries we map to GDPR, UAE PDPL, HIPAA or SOC 2 from day one — and recommend deployment topologies (on-prem, private cloud, regional residency) accordingly." },
      { q: "Can you measure ROI on AI initiatives?",
        a: "Yes. We instrument every PoC with task-level baselines (time, cost, error rate) and post-deploy KPIs. Most engagements ship with a dashboard so leadership can track value capture month over month." },
      { q: "Do you train our team or just deliver code?",
        a: "Both options are available. Enablement engagements pair our engineers with yours through pairing, code review and architecture workshops — knowledge transfer is the explicit deliverable, not a side effect." },
    ],
  },
  closing: {
    heading: "Choose a Professional AI Consulting Company",
    body: "Partner with Elchai to turn AI ambition into measurable outcomes — strategy, data, models, and governance, end-to-end.",
    cta: { label: "Book Free Consultation", href: "#consultation" },
  },
};

const smartContract: ServiceDetailContent = {
  slug: "smart-contract",
  category: "Blockchain · Services",
  hero: {
    eyebrow: "Smart Contracts",
    heading: "Smart Contract Development",
    subheading:
      "Secure, auditable, and self-executing smart contracts that redefine how global businesses transact and scale.",
    body:
      "From on-chain finance to enterprise workflows, we engineer reliability, transparency, and trust into every line of code. Transform your operations with enterprise-grade smart contracts built for precision, compliance, and scale.",
    primaryCta: { label: "Talk to Our Experts", href: "#consultation" },
    ghostCta: { label: "See Services", href: "#capabilities" },
  },
  capabilities: {
    eyebrow: "Services",
    heading: "Enterprise-Grade Smart Contract Development Services",
    body:
      "Secure, optimized, and enterprise-ready smart contracts that power automation across blockchain ecosystems. Designed, built, and audited with precision.",
    items: [
      { title: "Smart Contract Architecture", desc: "Resilient, modular architectures that ensure deterministic execution, upgradeability, and cross-chain compatibility. Rigorous design patterns guarantee security, performance, and compliance." },
      { title: "Smart Contract Development",  desc: "Custom logic aligned with your business model, tokenomics, and operational workflows. From DeFi protocols to enterprise automation, each contract is engineered for reliability and on-chain efficiency." },
      { title: "Smart Contract Audit",        desc: "Comprehensive static and dynamic analysis to identify vulnerabilities, gas inefficiencies, and logic flaws. Audit reports provide actionable insights for production-grade security." },
      { title: "Smart Contract Optimization", desc: "Optimize gas usage, transaction throughput, and computation efficiency to lower operational costs and enhance performance without compromising security or logic integrity." },
    ],
  },
  techStack: {
    eyebrow: "Networks",
    heading: "Multi-Chain Smart Contract Development",
    body: "Production-grade smart contracts deployed across leading public and permissioned networks.",
    groups: [
      { title: "EVM Chains",     items: ["Ethereum", "Polygon", "BNB Smart Chain", "Avalanche", "Arbitrum", "Optimism", "Base"] },
      { title: "Non-EVM Chains", items: ["Solana", "Polkadot", "Tron", "EOS", "Cosmos"] },
      { title: "Enterprise",     items: ["Hyperledger Fabric", "Hyperledger Besu", "Corda", "Quorum"] },
      { title: "Languages",      items: ["Solidity", "Vyper", "Rust", "Move", "Cairo"] },
    ],
  },
  industries: {
    eyebrow: "Industries",
    heading: "Smart Contract Solutions Across Industries",
    items: [
      { title: "Finance & DeFi" },
      { title: "Supply Chain & Logistics" },
      { title: "Real Estate" },
      { title: "Insurance" },
      { title: "Healthcare" },
      { title: "Gaming" },
      { title: "Entertainment" },
      { title: "Legal & Compliance" },
      { title: "Identity & Credentials" },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    heading: "Frequently Asked Questions",
    items: [
      {
        q: "What are smart contracts?",
        a: "Smart contracts are self-executing programs deployed on a blockchain that run exactly as coded when predefined conditions are met. They eliminate intermediaries by enforcing the terms of an agreement automatically and transparently across all parties.",
      },
      {
        q: "How do smart contracts work?",
        a: "Once deployed, a smart contract lives at a blockchain address. When a transaction triggers a function on the contract, every node in the network executes the same code and reaches consensus on the result, producing a tamper-proof state change that all parties can verify.",
      },
      {
        q: "Do smart contracts have owners?",
        a: "Optionally. Contracts can be immutable on deployment (no owner) or include an admin role with explicit, on-chain governance for upgrades, pauses, or parameter changes. The right model depends on your trust assumptions and regulatory posture — we help you choose.",
      },
    ],
  },
  closing: {
    heading: "Elchai Delivers Institutional-Grade Smart Contract Solutions",
    body:
      "Design, develop, and deploy smart contracts that meet enterprise security, compliance, and scalability standards.",
    cta: { label: "Talk to Our Experts", href: "#consultation" },
  },
};

// ─────────────────────────────────────────────────────────────────────────
// Batch 2 (Blockchain category): DeFi · Web3 · NFT · dApp · RWA
// ─────────────────────────────────────────────────────────────────────────

const defiDevelopment: ServiceDetailContent = {
  slug: "defi-development",
  category: "Blockchain · Services",
  hero: {
    eyebrow: "DeFi Development",
    heading: "DeFi Development Company",
    subheading: "The Future of Finance is Already Here",
    body:
      "We build the protocols and platforms that move financial primitives on-chain — lending, exchanges, derivatives, asset management — with the security posture institutional capital demands.",
    primaryCta: { label: "Talk to Our Experts", href: "#consultation" },
    ghostCta: { label: "See Solutions", href: "#capabilities" },
  },
  stats: [
    { value: "4+",   label: "Years of DeFi Expertise" },
    { value: "300+", label: "DeFi Modules Delivered" },
    { value: "1000+",label: "On-Chain Contracts Shipped" },
    { value: "150+", label: "Projects Since 2016" },
  ],
  capabilities: {
    eyebrow: "Solutions",
    heading: "Our DeFi Solution Suite",
    body: "End-to-end DeFi infrastructure built for security, composability, and capital efficiency.",
    items: [
      { title: "DeFi Tokenization",          desc: "Compliant token issuance, vesting, and lifecycle management for utility, governance, and security tokens." },
      { title: "Decentralized Crypto Banking",desc: "Non-custodial accounts, programmable savings, and on-chain credit primitives that mirror traditional banking workflows." },
      { title: "Decentralized Exchange",     desc: "AMMs, order-book DEXs, and hybrid liquidity venues with deep cross-chain reach and MEV-aware design." },
      { title: "Open Lending Protocols",     desc: "Permissionless and permissioned lending markets with risk-isolated pools, oracles, and liquidation engines." },
      { title: "Decentralized Fund Management",desc: "On-chain vaults, structured products, and quant strategies with transparent on-chain accounting." },
      { title: "DeFi Wallet",                desc: "Self-custody and MPC wallets with DeFi-native UX — swaps, staking, lending — built in by default." },
      { title: "DeFi Lottery Development",   desc: "Provably-fair prize protocols using VRF, with sustainable yield-backed prize pools." },
      { title: "Market Consulting",          desc: "Token economics modelling, liquidity strategy, and go-to-market support for new DeFi protocols." },
      { title: "DeFi Insurance Solution",    desc: "Smart-contract cover, parametric insurance, and risk underwriting protocols for the on-chain economy." },
    ],
  },
  whyChoose: {
    eyebrow: "Why Elchai",
    heading: "Why Work With Us?",
    items: [
      { title: "Efficient Development",     desc: "Reusable, audited modules accelerate delivery without compromising on protocol-specific custom logic." },
      { title: "Strategic Documentation",   desc: "Investor-ready protocol specs, threat models, and operator runbooks delivered alongside the code." },
      { title: "Go-to-Market Strategy",     desc: "Token-launch playbooks, liquidity bootstrapping, and partnership routes worked out before mainnet." },
      { title: "Token & Wallet Development",desc: "End-to-end token engineering and integrated wallet experiences for a frictionless user journey." },
      { title: "Long-term Support",         desc: "Monitoring, parameter tuning, and upgrade execution after launch — protocols are products, not projects." },
      { title: "Comprehensive Assessment",  desc: "Pre-engagement risk and feasibility reviews so we agree on what \"done\" looks like before we write a line of code." },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    heading: "DeFi Development — Common Questions",
    items: [
      { q: "What kinds of DeFi protocols do you build?",
        a: "Lending and borrowing markets, AMMs and order-book DEXs, yield aggregators, staking and liquid-staking, synthetic-asset platforms, derivatives, and structured products. We design for composability with existing DeFi primitives." },
      { q: "How long does a DeFi protocol take to ship?",
        a: "An MVP (single-market lending or a basic AMM) typically ships in 10–14 weeks including audits. A multi-feature protocol with cross-chain support and governance commonly takes 4–8 months." },
      { q: "Do you handle smart contract audits?",
        a: "Internal audit, fuzzing, and formal-verification passes are included. For protocols holding > $1M TVL we strongly recommend a third-party audit (Certik, OpenZeppelin, Trail of Bits) and coordinate the engagement on your behalf." },
      { q: "Which chains do you build on?",
        a: "Ethereum, Arbitrum, Optimism, Base, Polygon, BNB Chain, Avalanche, Solana, Cosmos and Polkadot. We can also build on rollup stacks (OP Stack, Arbitrum Orbit) and private/permissioned chains." },
      { q: "How do you secure DeFi protocols against common exploits?",
        a: "Reentrancy guards, oracle-manipulation hardening, slippage protection, pause/circuit breakers, multi-sig admin keys, time-locked upgrades, formal verification for invariants, and rigorous fuzz testing before mainnet." },
      { q: "What about regulatory considerations in the UAE?",
        a: "UAE DeFi work is shaped by VARA and (for fintechs) DFSA frameworks. We design KYC/AML overlays, jurisdictional gating, and regulator-friendly architectures where the project requires them — and brief legal counsel as part of scope." },
    ],
  },
  closing: {
    heading: "Transform Your Financial Infrastructure",
    body: "Talk to our DeFi engineers about the protocol you want to ship.",
    cta: { label: "Book Free Consultation", href: "#consultation" },
  },
};

const web3DevelopmentCompany: ServiceDetailContent = {
  slug: "web3-development-company",
  category: "Blockchain · Blockchain",
  hero: {
    eyebrow: "Web3 Development",
    heading: "Web3 Development Company",
    subheading: "Comprehensive Web3 Development Services for Digital Innovation",
    body:
      "From metaverse platforms to DAO infrastructure and full-stack dApps — we build the on-chain stack that turns Web3 strategies into shipping products.",
    primaryCta: { label: "Ready to Ship?", href: "#consultation" },
    ghostCta: { label: "Explore Services", href: "#capabilities" },
  },
  stats: [
    { value: "100+",   label: "Web3 Projects Delivered" },
    { value: "$300M+", label: "On-Chain Value Secured" },
    { value: "50+",    label: "Protocols Integrated" },
    { value: "99.9%",  label: "System Uptime" },
  ],
  capabilities: {
    eyebrow: "Services",
    heading: "Comprehensive Web3 Development Services",
    items: [
      { title: "Metaverse Development",              desc: "Virtual worlds, 3D commerce environments, and avatar ecosystems with on-chain asset ownership." },
      { title: "Web3 Game Development",              desc: "Play-to-own gaming economies with NFT items, on-chain progression, and cross-game asset portability." },
      { title: "DeFi Protocol Development",          desc: "AMMs, lending, derivatives, and structured products engineered for composability and capital efficiency." },
      { title: "NFT Platform & Marketplace Development",desc: "Custom marketplaces with minting, royalties, auctions, and Layer-2 fee optimization." },
      { title: "Decentralized Exchange Development", desc: "Order-book, AMM, and hybrid DEXs with cross-chain liquidity and MEV protections." },
      { title: "Blockchain Consulting & Protocol Design", desc: "Architecture, tokenomics, and integration strategy reviews from teams that have shipped at scale." },
      { title: "Token Development & Tokenomics Design",  desc: "Utility, governance, and security tokens with mathematically-modelled economic design." },
      { title: "DAO Infrastructure & Governance",    desc: "Voting modules, treasury management, and on-chain governance with off-chain coordination tooling." },
      { title: "Full-Stack dApp Development",        desc: "End-to-end decentralized apps with React/Next.js front-ends and audited smart-contract backends." },
      { title: "Enterprise Blockchain Integration",  desc: "ERP, CRM, and payment-rail integrations that bring on-chain primitives into existing operations." },
      { title: "Wallet & Custody Solutions",         desc: "Self-custody, MPC, and institutional-grade custody platforms with policy and compliance controls." },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    heading: "Web3 Development — Common Questions",
    items: [
      { q: "What does a Web3 development engagement include?",
        a: "Smart-contract development, wallet integration, front-end dApp UX, on-chain analytics, multi-chain deployment, and post-launch monitoring. Token design, governance and audits are scoped per project." },
      { q: "Can you build on multiple chains at once?",
        a: "Yes. We routinely ship to Ethereum + L2s (Arbitrum, Optimism, Base, Polygon), Solana, Cosmos and Polkadot in the same project — with bridge design, cross-chain messaging and unified front-ends." },
      { q: "How is a Web3 project different from a Web2 build?",
        a: "Once deployed, smart contracts are largely immutable. That means hardening, audits, formal verification and an upgrade strategy live in the critical path — not as afterthoughts. We design with that constraint from day one." },
      { q: "Do you support DAO and on-chain governance?",
        a: "Yes — token-weighted voting, conviction voting, multi-sig admin paths, time-locks, and integrated off-chain coordination tooling (Snapshot, Discourse) are part of our standard DAO playbook." },
      { q: "How do you handle wallet UX for non-crypto users?",
        a: "Account abstraction (ERC-4337), email-based wallets, MPC custody, gasless transactions and progressive disclosure — Web3 UX should not require the user to understand seed phrases on day one." },
      { q: "Who owns the IP and the deployed contracts?",
        a: "You do. Source repos, deployment keys, and admin multisigs are handed over at launch. We can retain warm support as a separate engagement, but ownership of the on-chain stack transfers to the client." },
    ],
  },
  closing: {
    heading: "Boost Your Business Performance with AI and Blockchain Integration",
    body: "From idea to mainnet — partner with Elchai to ship the Web3 product your roadmap deserves.",
    cta: { label: "Book Free Consultation", href: "#consultation" },
  },
};

const metaverseDevelopment: ServiceDetailContent = {
  slug: "metaverse-development",
  category: "Blockchain · Blockchain",
  hero: {
    eyebrow: "Metaverse Development",
    heading: "Metaverse Development Company",
    subheading: "Immersive 3D Worlds, On-Chain Ownership, Real-Economy Bridges",
    body:
      "Production-grade metaverse platforms — virtual venues, avatar economies, branded experiences, and the on-chain rails that make digital assets actually owned. Engineered for retention, not just spectacle.",
    primaryCta: { label: "Build Your World", href: "#consultation" },
    ghostCta: { label: "See Capabilities", href: "#capabilities" },
  },
  stats: [
    { value: "30+",   label: "Metaverse Builds Shipped" },
    { value: "5M+",   label: "Avatar Sessions Hosted" },
    { value: "120+",  label: "3D Assets Tokenized" },
    { value: "99.9%", label: "Realtime Uptime" },
  ],
  capabilities: {
    eyebrow: "Capabilities",
    heading: "End-to-End Metaverse Engineering",
    items: [
      { title: "Virtual World Design",          desc: "Concept-to-launch world-building — environments, lighting, narrative flow, and zone economics tuned for retention." },
      { title: "Avatar Systems",                desc: "Rigged, customisable avatars with on-chain identity, wearables, and cross-platform persistence." },
      { title: "On-Chain Asset Ownership",      desc: "Wearables, land plots, vehicles and venues minted as audited NFTs with portable provenance." },
      { title: "Realtime Multiplayer",          desc: "WebRTC + WebSocket meshes engineered for hundreds of concurrent users per shard, with seamless instancing." },
      { title: "Spatial Voice & Chat",          desc: "Proximity-based voice, gesture sync, and text channels — moderation tooling and toxicity controls built in." },
      { title: "Branded Experiences",           desc: "Retail flagships, product launches, conferences, and gated members areas tied to your brand identity." },
      { title: "Token & Economy Design",        desc: "Sink/source modelling, governance tokens, and reward loops engineered with monetary economists." },
      { title: "Mobile, VR & Web Clients",      desc: "Unity, Unreal, and WebGL clients shipped to a single shared backend — meet users on the device they have." },
      { title: "Creator Economy Tooling",       desc: "In-world editors, asset upload pipelines, royalty splits, and revenue-share dashboards for third-party builders." },
      { title: "Enterprise Integrations",       desc: "SSO, CRM, payments, analytics — the boring plumbing that turns a demo into a business." },
      { title: "Performance Engineering",       desc: "LOD systems, occlusion culling, network compression, and asset streaming for stable 60fps at scale." },
    ],
  },
  industries: {
    eyebrow: "Use Cases",
    heading: "Industries Building With Us",
    items: [
      { title: "Retail & Luxury" },
      { title: "Gaming & Entertainment" },
      { title: "Real Estate" },
      { title: "Education & Training" },
      { title: "Events & Conferences" },
      { title: "Fashion & Wearables" },
      { title: "Healthcare Simulation" },
      { title: "Automotive Showrooms" },
      { title: "Music & Live Performance" },
    ],
  },
  whyChoose: {
    eyebrow: "Why Elchai",
    heading: "What Sets Our Metaverse Builds Apart",
    items: [
      { title: "Game-Engine Pedigree", desc: "Engineers from AAA studios and crypto-native teams — both worlds, one roadmap." },
      { title: "On-Chain by Default",  desc: "Asset ownership isn't a marketing checkbox — it's the architecture from day one." },
      { title: "Economy First",        desc: "We design the sink/source loops before the polygons. Worlds that don't deflate." },
      { title: "Multi-Client Native",  desc: "Mobile, VR, web — one backend, three runtimes. Reach, not lock-in." },
    ],
  },
  techStack: {
    eyebrow: "Tech Stack",
    heading: "Production Tools, Not Demoware",
    groups: [
      { title: "Engines & Rendering", items: ["Unity", "Unreal Engine", "Three.js", "Babylon.js", "WebGPU"] },
      { title: "Realtime Backbone",   items: ["Photon", "Mirror", "Colyseus", "WebRTC", "LiveKit"] },
      { title: "On-Chain Layer",      items: ["Solidity", "Cairo", "Move", "Polygon", "Immutable", "Arbitrum"] },
      { title: "Storage & Identity",  items: ["IPFS", "Arweave", "Ceramic", "ENS"] },
    ],
  },
  process: {
    eyebrow: "Process",
    heading: "How We Ship a Metaverse",
    steps: [
      { title: "Discovery & World-Bible",    desc: "Audience, economy, narrative — defined before a single asset is modelled." },
      { title: "Architecture & Tokenomics",  desc: "Backend topology, contract suite, and economic loops modelled and stress-tested." },
      { title: "Prototype & Vertical Slice", desc: "A single playable zone shipped fast — the build-or-kill milestone." },
      { title: "Full Production",            desc: "Parallel content, engineering, and audit workstreams against a fixed launch date." },
      { title: "Soft Launch & Tuning",       desc: "Closed beta, telemetry, balance passes — economy and retention dialled in." },
      { title: "Live Ops",                   desc: "Seasonal content, events, partnerships, and economy management as an ongoing service." },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    heading: "Common Questions About Metaverse Development",
    items: [
      {
        q: "How long does a metaverse build take?",
        a: "Vertical slice in 8–12 weeks; production launch typically 6–9 months depending on world scope, avatar fidelity, and economy complexity. We share a milestone-by-milestone plan after discovery.",
      },
      {
        q: "Do we need our own blockchain?",
        a: "Almost never. We default to established L2s (Polygon, Immutable, Arbitrum) for asset settlement — cheaper, more liquid, and battle-tested. Custom appchains only when token throughput genuinely demands it.",
      },
      {
        q: "What platforms can we target?",
        a: "Web (WebGL/WebGPU), mobile (iOS/Android), and VR headsets (Quest, Vision Pro) from a shared backend. We help pick the right launch surface for your audience — not all three at once.",
      },
      {
        q: "How do we make money from it?",
        a: "Primary-sale assets, secondary-market royalties, in-world subscriptions, sponsored experiences, and creator-economy revenue share. We design the monetisation model alongside the world.",
      },
    ],
  },
  closing: {
    heading: "Ready to Build Your Metaverse?",
    body: "From whitepaper to launch event — partner with Elchai to ship a metaverse that earns its retention.",
    cta: { label: "Book Free Consultation", href: "#consultation" },
  },
};

const nftMarketplaceDevelopment: ServiceDetailContent = {
  slug: "nft-marketplace-development",
  category: "Blockchain · Blockchain",
  hero: {
    eyebrow: "NFT Marketplace",
    heading: "NFT Marketplace Development",
    subheading: "Building Next-Generation Digital Asset Ecosystems",
    body:
      "Production-grade NFT marketplaces that handle real volume — minting, secondary trading, royalties, KYC, and enterprise admin — all built to scale.",
    primaryCta: { label: "Start Your Marketplace", href: "#consultation" },
    ghostCta: { label: "See Features", href: "#capabilities" },
  },
  stats: [
    { value: "4+",   label: "Years of NFT Expertise" },
    { value: "25+",  label: "Marketplaces Launched" },
    { value: "170+", label: "Smart Contracts Audited" },
    { value: "250+", label: "Industry Use Cases" },
  ],
  capabilities: {
    eyebrow: "Features",
    heading: "Key Features Of Our End-To-End NFT Marketplace Development",
    items: [
      { title: "Ownership Authentication",   desc: "Cryptographic proof of provenance with verifiable creator identity and immutable transfer history." },
      { title: "Royalty Automation",         desc: "On-chain royalty enforcement across primary and secondary sales with creator-defined splits." },
      { title: "Immutable Record Keeping",   desc: "Tamper-proof transaction ledger with full-history audit trails for every asset." },
      { title: "Sophisticated Interface Design", desc: "Production UX informed by retail, fashion, and gaming buyer journeys — not generic Web3 boilerplate." },
      { title: "Audited Smart Contracts",    desc: "Multi-stage audits including formal verification, economic attack modelling, and live monitoring." },
      { title: "Advanced Cybersecurity",     desc: "Defense-in-depth: WAF, rate limiting, signature verification, and on-chain anomaly detection." },
      { title: "Digital Auction Systems",    desc: "English, Dutch, sealed-bid, and time-extending auctions with anti-sniping safeguards." },
      { title: "Flexible Payment Integration",desc: "Crypto-native checkout plus fiat on-ramps so buyers never bounce on payment friction." },
      { title: "Regulatory Compliance",      desc: "KYC/AML modules, tax reporting, and jurisdictional rule enforcement built-in from day one." },
      { title: "Enterprise Control Panel",   desc: "Admin tools for collection management, content moderation, fee configuration, and treasury operations." },
      { title: "Minting Infrastructure",     desc: "Lazy-mint, batch-mint, and gasless flows with Layer-2 settlement for high-volume drops." },
    ],
  },
  industries: {
    eyebrow: "Use Cases",
    heading: "Industry Applications & Use Cases",
    items: [
      { title: "Digital Collectibles" },
      { title: "Gaming Ecosystems" },
      { title: "Enterprise Software Licensing" },
      { title: "Supply Chain Tokenization" },
      { title: "Asset Lifecycle Management" },
      { title: "Trading Infrastructure" },
      { title: "Fine Art & Music Rights" },
      { title: "Metaverse Commerce" },
      { title: "Fashion & Luxury Goods" },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    heading: "NFT Marketplace Development — Common Questions",
    items: [
      { q: "Which blockchains are best for NFT marketplaces today?",
        a: "Ethereum + Layer 2s (Arbitrum, Optimism, Base) remain dominant for high-value collectibles. Polygon and Solana are common for higher-throughput, lower-fee experiences. We routinely build multi-chain marketplaces with unified custody." },
      { q: "How long does a custom NFT marketplace take?",
        a: "A focused marketplace (lazy-mint, fixed-price listings, basic royalties) typically takes 10–14 weeks. Auctions, multi-chain support, fiat on-ramps and advanced curation push to 4–6 months." },
      { q: "Do you handle royalty enforcement?",
        a: "Yes. On-chain royalty registries (ERC-2981), allow-list operator filters, and off-chain accounting are options we configure based on your jurisdiction, business model and chain choice." },
      { q: "What about KYC and regulatory compliance?",
        a: "For UAE-licensed and regulated traffic we layer KYC/AML, jurisdictional gating and sanctions screening into the buy/sell flows. Most consumer marketplaces also include creator KYC for payouts." },
      { q: "Can you integrate fiat payments and credit cards?",
        a: "Yes. We integrate established on-ramps (Stripe Crypto, MoonPay, Transak, Wert) for buyer-side fiat, plus payouts to creator bank accounts where the marketplace is the merchant of record." },
      { q: "Do you provide post-launch support?",
        a: "Yes — incident response, smart-contract monitoring, gas-cost optimisation, feature roadmaps and managed analytics. Typically packaged as a retainer post-launch." },
    ],
  },
  closing: {
    heading: "The Elchai Difference",
    body: "Strategic partnerships, audited contracts, and a marketplace stack ready for institutional traffic.",
    cta: { label: "Talk to Our Experts", href: "#consultation" },
  },
};

const dappDevelopment: ServiceDetailContent = {
  slug: "dapp-development",
  category: "Blockchain · Services",
  hero: {
    eyebrow: "dApp Development",
    heading: "dApp Development Company",
    subheading: "Leading the Way in Decentralized Application Development",
    body:
      "Full-stack decentralized applications with audited smart contracts, scalable infrastructure, and Web2-quality user experience.",
    primaryCta: { label: "Start Your dApp", href: "#consultation" },
    ghostCta: { label: "See Capabilities", href: "#capabilities" },
  },
  stats: [
    { value: "50+",   label: "dApps Delivered" },
    { value: "$500M+",label: "Transaction Volume Handled" },
    { value: "10+",   label: "Chains Supported" },
    { value: "5M+",   label: "End Users Served" },
  ],
  capabilities: {
    eyebrow: "Services",
    heading: "End-to-End DApp Development Services",
    body: "From discovery through production support — the full lifecycle of decentralized application delivery.",
    items: [
      { title: "DApp Consulting and Strategy",       desc: "Use-case validation, architecture review, and roadmap planning for new and existing dApp initiatives." },
      { title: "Custom DApp Development",            desc: "Bespoke decentralized applications engineered for your business logic, tokenomics, and user flows." },
      { title: "Decentralized Exchange (DEX) Development", desc: "AMM, order-book, and hybrid DEXs with cross-chain liquidity routing and MEV-aware design." },
      { title: "DApp Integration Services",          desc: "Connect dApps with existing enterprise systems, payment rails, and identity providers." },
      { title: "DApp Migration and Porting",         desc: "Move dApps between chains, upgrade contract versions, and modernize legacy Web3 stacks safely." },
      { title: "DApp Maintenance and Support",       desc: "Monitoring, upgrades, audits, and 24/7 incident response after launch." },
    ],
  },
  industries: {
    eyebrow: "Verticals",
    heading: "Transforming Industries With Custom DApp Development",
    items: [
      { title: "Supply Chain",  desc: "End-to-end provenance, IoT-attested data, and multi-party coordination on-chain." },
      { title: "Healthcare",    desc: "Patient-owned records, drug traceability, and consent-managed data exchange." },
      { title: "Real Estate",   desc: "Tokenized ownership, on-chain title registry, and automated lease payments." },
      { title: "Automotive",    desc: "Vehicle history, parts authenticity, and pay-per-use mobility payments." },
      { title: "Logistics",     desc: "Shipment tracking, customs automation, and cold-chain monitoring." },
      { title: "Insurance",     desc: "Parametric policies, smart-contract claims, and on-chain risk pooling." },
      { title: "Fintech",       desc: "On-chain credit, programmable money, and compliant cross-border settlement." },
    ],
  },
  whyChoose: {
    eyebrow: "Capabilities",
    heading: "Why Build Your dApp With Elchai",
    items: [
      { title: "Enhanced Security",      desc: "Multi-stage audits, formal verification, and continuous monitoring across every contract we ship." },
      { title: "Increased Transparency", desc: "Open architectures and verifiable on-chain state for users, auditors, and regulators." },
      { title: "Operational Efficiency", desc: "Automated workflows that eliminate intermediaries and reduce per-transaction cost." },
      { title: "Regulatory Compliance",  desc: "KYC/AML, jurisdictional rule engines, and audit-ready event logging built-in." },
      { title: "Scalable Architecture",  desc: "Layer-2 settlement, modular service boundaries, and horizontal scaling for millions of users." },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    heading: "dApp Development — Common Questions",
    items: [
      { q: "What is a dApp and how is it different from a regular web app?",
        a: "A decentralized application (dApp) uses smart contracts on a public blockchain for some or all of its business logic. The state is owned by users (via wallets), not the operator — meaning user data and assets survive even if the front-end goes away." },
      { q: "Do users need crypto to use a dApp we build?",
        a: "Not necessarily. We routinely build dApps with account abstraction, gasless transactions, fiat on-ramps and embedded wallets so a first-time user can transact without ever managing seed phrases." },
      { q: "How do you keep our smart contracts secure?",
        a: "Internal audits with Slither/Mythril/Echidna, formal-verification passes for critical invariants, third-party audits for high-TVL contracts, and operational guardrails (pause switches, multi-sig admin, time-locked upgrades)." },
      { q: "Can a dApp be upgraded after deployment?",
        a: "Yes — using proxy patterns (UUPS, transparent proxies), modular registries, or diamond contracts. We design the upgrade story up front so emergency patches and feature releases don't require complete redeployment." },
      { q: "How do you handle off-chain data and integrations?",
        a: "Oracles (Chainlink, RedStone, custom), event-driven indexers (The Graph, Goldsky, in-house subgraphs), and signed-message proofs for off-chain authority. The dApp surfaces both on- and off-chain state coherently." },
      { q: "Who owns the deployed dApp at handover?",
        a: "You. Contract addresses, admin keys (split into multisig), front-end repo, infrastructure config and deployment scripts are all transferred at launch. Support contracts post-launch are optional retainers." },
    ],
  },
  closing: {
    heading: "Scale with Confidence",
    body: "Partner with engineers who ship decentralized applications at institutional scale.",
    cta: { label: "Book Free Consultation", href: "#consultation" },
  },
};

const rwa: ServiceDetailContent = {
  slug: "rwa",
  category: "Blockchain · Blockchain",
  hero: {
    eyebrow: "Real World Asset Tokenization",
    heading: "Real World Asset Tokenization",
    subheading: "Your 360° Asset Tokenization Partner",
    body:
      "Bring real-world assets on-chain with institutional-grade tokenization infrastructure — protocol, registry, compliance, custody, and secondary markets, end-to-end.",
    primaryCta: { label: "Tokenize Your Assets", href: "#consultation" },
    ghostCta: { label: "See Modules", href: "#capabilities" },
  },
  stats: [
    { value: "$5M+",  label: "Assets Tokenized" },
    { value: "50+",   label: "Tokenization Projects" },
    { value: "100%",  label: "Compliance Coverage" },
    { value: "99.9%", label: "System Uptime" },
  ],
  capabilities: {
    eyebrow: "Protocol",
    heading: "Tokenization Starts at the Protocol Layers",
    body: "Modular infrastructure for compliant, institution-ready tokenization of any asset class.",
    items: [
      { title: "Protocol Architecture & ERC Implementation", desc: "Custom token standards (ERC-1400, ERC-3643, ERC-4626) and protocol-level controls aligned to your asset class." },
      { title: "Sovereign Ledger Deployment",   desc: "Permissioned and public-chain deployments configured for jurisdiction-specific regulatory regimes." },
      { title: "Digital Asset Registry Systems",desc: "On-chain registries serving as canonical records of ownership, encumbrance, and transfer history." },
      { title: "Compliance Automation Modules", desc: "Programmable KYC/AML, transfer restrictions, and accreditation checks enforced at the contract level." },
      { title: "Custody Integration Frameworks",desc: "Drop-in integrations with leading qualified custodians, MPC, and multi-sig vault providers." },
      { title: "Identity & Access Infrastructure",desc: "On-chain DIDs, verifiable credentials, and granular permissioning for issuers, investors, and operators." },
      { title: "Cross-Chain Interoperability",  desc: "Bridges, messaging, and atomic settlement across the chains your investors and counterparties already use." },
      { title: "Liquidity Layer Infrastructure",desc: "AMM, order-book, and RFQ rails connecting tokenized assets to compliant secondary venues." },
      { title: "Governance & DAO Architecture", desc: "On-chain voting, treasury controls, and policy engines for tokenized funds and consortia." },
    ],
  },
  whyChoose: {
    eyebrow: "Modules",
    heading: "Core Modules of Our Asset Tokenization Infrastructure",
    items: [
      { title: "Token Standards Layer",          desc: "ERC-20, ERC-1400, ERC-3643, ERC-4626, and bespoke standards designed for your asset characteristics." },
      { title: "Digital Registry & Transfer Agent", desc: "Authoritative on-chain registry with off-chain transfer-agent workflows and reporting." },
      { title: "Compliance Engine",              desc: "Real-time rule evaluation across KYC, accreditation, jurisdiction, and lock-up controls." },
      { title: "Custody & Treasury Core",        desc: "Hot/warm/cold custody orchestration with operational separation and policy enforcement." },
      { title: "Oracle Layer",                   desc: "Verifiable price, NAV, and event feeds — fully decentralized or hybrid based on asset class." },
      { title: "Secondary Market Rail",          desc: "ATS-grade trading rails plumbed into both DeFi venues and regulated secondary markets." },
    ],
  },
  industries: {
    eyebrow: "Industries",
    heading: "Industry-Specific Asset Tokenization",
    items: [
      { title: "Real Estate" },
      { title: "Private Credit" },
      { title: "Commodities" },
      { title: "Treasuries & Bonds" },
      { title: "Funds & Private Equity" },
      { title: "Carbon Credits" },
      { title: "Art & Collectibles" },
      { title: "Infrastructure" },
    ],
  },
  closing: {
    heading: "Ready to Bring Your Assets On-Chain?",
    body:
      "Partner with Elchai to design, build, and operate the tokenization infrastructure your assets demand.",
    cta: { label: "Schedule Your Consultation", href: "#consultation" },
  },
  faq: {
    eyebrow: "FAQ",
    heading: "RWA Tokenization — Common Questions",
    items: [
      { q: "What kinds of real-world assets can be tokenized?",
        a: "Real estate (residential, commercial, REITs), private credit and debt instruments, commodities (gold, energy), invoices and trade receivables, fine art, fund interests, and carbon credits. Suitability depends on the asset's legal wrapper and jurisdiction." },
      { q: "Is RWA tokenization regulated in the UAE?",
        a: "Yes. Virtual asset issuance and custody fall under VARA. Securities-style tokens fall under DFSA (DIFC) or SCA. We design every RWA platform around an explicit regulatory framework — not in a grey zone." },
      { q: "How does ownership work — do investors own the underlying asset?",
        a: "Tokens represent legal claims via a special-purpose vehicle (SPV) or compliant trust structure. The on-chain token, the off-chain legal title and the custody arrangement are designed to stay in sync — that's the work." },
      { q: "How long does it take to launch an RWA platform?",
        a: "An MVP for a single asset class typically takes 4–6 months including legal structuring, KYC integration and primary-market launch. Secondary-market liquidity adds 2–4 months." },
      { q: "What about KYC, AML and accredited-investor checks?",
        a: "We integrate KYC providers (Sumsub, Onfido, Persona), accredited-investor verification flows, ongoing AML transaction monitoring, and jurisdiction-based gating. Compliance is wired into the core flows, not bolted on." },
      { q: "Can investors exit their position?",
        a: "Yes — through scheduled redemption windows, secondary marketplaces, or institutional-grade order books, depending on the asset wrapper and your liquidity strategy. We design the exit path before launch, not after." },
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────
// Batch 3 (Cryptocurrency category): Wallets · Exchanges · Token Launch
// ─────────────────────────────────────────────────────────────────────────

const cryptoWalletDevelopment: ServiceDetailContent = {
  slug: "crypto-wallet-development-company",
  category: "Cryptocurrency · Wallets",
  hero: {
    eyebrow: "Crypto Wallets",
    heading: "Crypto Wallet Development Solutions",
    subheading: "Build Custom Crypto Wallets That Drive Business Growth",
    body:
      "Production-grade wallet infrastructure — self-custody, MPC, multi-sig, and white-label — built for security, regulatory readiness, and a Web2-quality user experience.",
    primaryCta: { label: "Start Your Wallet", href: "#consultation" },
    ghostCta: { label: "See Features", href: "#capabilities" },
  },
  capabilities: {
    eyebrow: "Capabilities",
    heading: "Comprehensive Wallet Features We Offer",
    body: "Every wallet we ship covers the full feature surface institutional and retail users expect.",
    items: [
      { title: "Multi-Chain Support",       desc: "Native support for EVM and non-EVM chains with a unified balance and transaction view across the user's full portfolio." },
      { title: "Self-Custody & MPC",        desc: "Non-custodial wallets backed by MPC or HSM-grade key management with social recovery and account abstraction." },
      { title: "DeFi Integrations",         desc: "Built-in swaps, staking, lending, and bridging through audited protocol integrations." },
      { title: "NFT Management",            desc: "Gallery views, transfer flows, and marketplace integrations for every standard your users care about." },
      { title: "Fiat On/Off Ramps",         desc: "KYC-aware fiat purchase and withdrawal across leading providers with regional coverage." },
      { title: "White-Label Architecture",  desc: "Brandable UI, configurable chain support, and isolated tenancy for fast launch and consistent governance." },
      { title: "Enterprise Admin Panel",    desc: "Policy controls, audit trails, transaction approvals, and compliance reporting for institutional ops." },
      { title: "Hardware Wallet Support",   desc: "Ledger, Trezor, and Keystone integrations for users who pair institutional security with self-custody UX." },
      { title: "Mobile, Web, Extension",    desc: "Native iOS/Android, responsive web, and browser extensions sharing one account abstraction layer." },
    ],
  },
  whyChoose: {
    eyebrow: "Why Elchai",
    heading: "Why Clients Choose Us",
    items: [
      { title: "Security-First Architecture",desc: "Threat modelling, code audits, and continuous penetration testing across every release." },
      { title: "Regulatory Alignment",       desc: "Travel Rule, KYC, and jurisdictional controls integrated from the protocol up." },
      { title: "Web2-Quality UX",            desc: "We design wallets that non-crypto users can navigate — without leaking complexity into the happy path." },
      { title: "Operational Tooling",        desc: "Monitoring, alerting, and treasury dashboards delivered alongside the user-facing app." },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    heading: "Crypto Wallet Development — Common Questions",
    items: [
      { q: "What's the difference between custodial, non-custodial and MPC wallets?",
        a: "Custodial: operator holds keys. Non-custodial: user holds keys (seed phrase or signing device). MPC: keys are split into shares across multiple parties — no single party can sign alone. We build all three and combine them where the product calls for it." },
      { q: "Which chains do your wallets support?",
        a: "EVM chains (Ethereum, Arbitrum, Optimism, Base, Polygon, BNB, Avalanche), Solana, Cosmos SDK chains, Polkadot, and Bitcoin. We can extend to private/permissioned chains and emerging L1s as the roadmap requires." },
      { q: "How long does a custom wallet take to build?",
        a: "A focused custodial or non-custodial wallet for one chain typically ships in 12–16 weeks including app-store releases. Multi-chain, MPC, hardware-wallet integrations and fiat on-ramps add 1–3 months." },
      { q: "Do you handle App Store and Play Store submissions?",
        a: "Yes. We manage the review process end-to-end, including the crypto-app review nuances (KYC requirements, exchange disclosures, regional restrictions). We've shipped wallets through both stores under tight review constraints." },
      { q: "How secure are the wallets you build?",
        a: "Secure enclave key storage (iOS Keychain, Android Keystore, StrongBox), HSM custody for institutional flows, biometric gating, anti-phishing UX, transaction-signing UX hardening, runtime tamper detection and pen-test before launch." },
      { q: "Can you support fiat on/off ramps in our wallet?",
        a: "Yes — we integrate Stripe Crypto, MoonPay, Transak, Wert, Ramp, and local UAE/MENA providers for fiat buy/sell. KYC flow design is part of the engagement." },
    ],
  },
  closing: {
    heading: "Build Custom Crypto Wallets That Drive Business Growth",
    body: "Talk to our wallet engineers about your custodial, non-custodial, or hybrid architecture.",
    cta: { label: "Book Free Consultation", href: "#consultation" },
  },
};

const custodialWallet: ServiceDetailContent = {
  slug: "custodial-wallet",
  category: "Cryptocurrency · Wallets",
  hero: {
    eyebrow: "Custodial Wallets",
    heading: "Custodial Wallet Development Solutions",
    subheading: "Build Custodial Infrastructure That Institutional Partners Trust",
    body:
      "Enterprise-grade custodial wallet infrastructure with HSM-backed key management, policy engines, and the audit trails financial regulators expect.",
    primaryCta: { label: "Talk to Our Experts", href: "#consultation" },
    ghostCta: { label: "See Capabilities", href: "#capabilities" },
  },
  capabilities: {
    eyebrow: "Capabilities",
    heading: "Technical Capabilities That Define Modern Custody Wallet Infrastructure",
    items: [
      { title: "HSM-Backed Key Management",  desc: "FIPS 140-2 Level 3 hardware security modules with sharded, geo-distributed key storage." },
      { title: "MPC & Multi-Sig Controls",   desc: "Policy-driven multi-party computation and threshold-signature workflows for high-value approvals." },
      { title: "Hot/Warm/Cold Tiering",      desc: "Layered custody with automated tier movement based on balance, velocity, and policy rules." },
      { title: "Travel Rule Compliance",     desc: "Originator/beneficiary information exchange with leading Travel Rule networks built-in." },
      { title: "Audit-Ready Logging",        desc: "Tamper-evident operational logs with cryptographic attestation for every signing event." },
      { title: "Real-Time Risk Scoring",     desc: "Sanction screening, transaction monitoring, and behaviour analytics on every flow." },
      { title: "Institutional API",          desc: "REST and FIX APIs designed for trading desks, custodians, and treasury teams." },
      { title: "Disaster Recovery",          desc: "Multi-region failover, shamir-secret-sharing key recovery, and tested incident playbooks." },
    ],
  },
  whyChoose: {
    eyebrow: "Why Elchai",
    heading: "Why Our Clients Trust Elchai",
    items: [
      { title: "Enterprise Security Posture", desc: "Defence-in-depth across hardware, network, application, and operational layers." },
      { title: "Regulatory Readiness",        desc: "SOC 2, ISO 27001, and jurisdictional licensing support baked into the platform." },
      { title: "Proven Delivery",             desc: "Successful deployments for exchanges, funds, and corporate treasuries across regulated markets." },
      { title: "24/7 Operations",             desc: "Dubai-based operations centre with global coverage for incident response and key ceremonies." },
    ],
  },
  closing: {
    heading: "Deploy Faster Without Compromising Control",
    body: "Partner with Elchai to ship custodial infrastructure regulators and counterparties accept.",
    cta: { label: "Schedule a Consultation", href: "#consultation" },
  },
};

const decentralizedExchange: ServiceDetailContent = {
  slug: "decentralized-exchange",
  category: "Cryptocurrency · Exchanges",
  hero: {
    eyebrow: "Decentralized Exchange",
    heading: "Build Your Own Decentralized Exchange",
    subheading: "AMM, order-book, perpetuals, and aggregator DEXs — engineered for performance and security.",
    body:
      "From single-chain AMMs to cross-chain perp DEXs, we build the matching engines, smart contracts, and frontends that institutional traders and retail users actually want to use.",
    primaryCta: { label: "Build Your DEX", href: "#consultation" },
    ghostCta: { label: "See Services", href: "#capabilities" },
  },
  stats: [
    { value: "99.9%+", label: "Smart Contract Uptime" },
    { value: "5,000+", label: "Trading Pairs Deployed" },
    { value: "$4B+",   label: "Cumulative Volume" },
    { value: "0.2%",   label: "Typical Trade Fee" },
  ],
  capabilities: {
    eyebrow: "Services",
    heading: "Custom Development Solutions for Decentralized Exchanges",
    items: [
      { title: "Decentralized Exchange Consultation", desc: "Use-case validation, AMM-vs-orderbook tradeoffs, and chain selection guided by venue economics." },
      { title: "Decentralized Exchange Development",  desc: "Production smart contracts, matching engines, and frontends for retail and institutional flow." },
      { title: "Enterprise Blockchain Development",   desc: "Permissioned DEX rails for institutional consortiums needing on-chain settlement with privacy." },
      { title: "P2P Smart Contract Development",      desc: "Peer-to-peer escrow, atomic swaps, and on-chain dispute resolution for trustless trading." },
      { title: "P2P Exchange Development",            desc: "Full P2P trading platforms with reputation systems, escrow, and fiat ramp integrations." },
      { title: "Hybrid Exchange Development",         desc: "CEX-style UX with on-chain settlement — the best of both worlds for prosumer flow." },
      { title: "Decentralized Exchange Integration",  desc: "API, SDK, and widget integrations so your existing product can become a DEX entry point." },
      { title: "Liquidity Integration Solutions",     desc: "Aggregator routing, market-maker incentive programs, and liquidity-mining design." },
      { title: "Security and Auditing",               desc: "Multi-stage audits, formal verification, and post-launch monitoring for MEV and exploits." },
    ],
  },
  whyChoose: {
    eyebrow: "DEX Variants",
    heading: "Variants of DEX Platforms and Their Core Architectures",
    items: [
      { title: "AMM Decentralized Exchange",   desc: "Constant-product, concentrated-liquidity, and stable-swap pools with custom curve design." },
      { title: "Order Book-Based Spot DEX",    desc: "On-chain matching with off-chain order books for institutional-grade UX." },
      { title: "Perpetual Decentralized Exchange",desc: "Perps with funding rates, cross-margin, and on-chain liquidations." },
      { title: "DeFi DEX Aggregators",         desc: "Multi-venue route optimization across AMMs and order-books for best execution." },
    ],
  },
  closing: {
    heading: "Your DEX, Built with Precision",
    body: "Partner with Elchai to ship a DEX that traders actually choose.",
    cta: { label: "Schedule a Consultation", href: "#consultation" },
  },
};

const centralizedExchange: ServiceDetailContent = {
  slug: "centralized-exchange",
  category: "Cryptocurrency · Exchanges",
  hero: {
    eyebrow: "Centralized Exchange",
    heading: "Scalable, Secure, and Custom Centralized Exchange Development",
    subheading: "Matching engine, custody, compliance, and trading UX — fully integrated.",
    body:
      "End-to-end CEX infrastructure designed for institutional throughput, regulatory readiness, and the user experience retail traders expect.",
    primaryCta: { label: "Launch Your Exchange", href: "#consultation" },
    ghostCta: { label: "See Services", href: "#capabilities" },
  },
  stats: [
    { value: "50M+",  label: "Orders/Day Throughput" },
    { value: "99.99%",label: "Matching Engine Uptime" },
    { value: "1M+",   label: "Concurrent Users Supported" },
    { value: "200+",  label: "Trading Pairs Listed" },
  ],
  capabilities: {
    eyebrow: "Services",
    heading: "End-to-End Development Solutions for Centralized Exchanges",
    items: [
      { title: "Exchange Consulting Services",     desc: "Business model design, jurisdictional strategy, and feasibility studies before a single line of code." },
      { title: "Custom Exchange Development",      desc: "Bespoke matching engines, trading UX, and admin tooling tailored to your venue's flow profile." },
      { title: "Crypto Exchange Software",         desc: "White-label CEX platforms with rapid time-to-market and configurable feature sets." },
      { title: "Exchange Security Solutions",      desc: "Cold-storage architecture, withdrawal whitelisting, anomaly detection, and 24/7 SOC monitoring." },
      { title: "Integration Services & Solutions", desc: "Fiat rails, liquidity providers, market data feeds, and compliance partners plumbed in." },
      { title: "Exchange Maintenance Services",    desc: "Ongoing operations, upgrades, market-making coordination, and incident response." },
    ],
  },
  whyChoose: {
    eyebrow: "Revenue",
    heading: "Various Revenue Streams for Centralized Crypto Exchange",
    items: [
      { title: "Trading Fees",          desc: "Maker/taker fees with VIP tiering and volume-based discounting." },
      { title: "Listing Fees",          desc: "Project listing revenue with diligence-backed token review processes." },
      { title: "Withdrawal Fees",       desc: "Per-asset withdrawal fees with cost-plus pricing for sustainability." },
      { title: "Premium Services",      desc: "OTC desk, prime brokerage, staking, and lending products for sophisticated users." },
      { title: "Fiat Integration Fees", desc: "Revenue share on fiat on/off-ramp flows across jurisdictions." },
      { title: "Market Making Rebates", desc: "Liquidity provider incentives that grow venue depth and tighten spreads." },
    ],
  },
  process: {
    eyebrow: "Process",
    heading: "We Follow a Strategic Process of Centralized Exchange Development",
    steps: [
      { title: "Define Business Vision",     desc: "Articulate the venue thesis, target users, and competitive positioning before scoping technical work." },
      { title: "System Architecture Planning",desc: "Capacity modelling, latency budgets, and security architecture aligned to throughput requirements." },
      { title: "Technology Stack Selection", desc: "Matching engine, message bus, persistence, and observability tooling chosen for the workload profile." },
      { title: "Embed Security Measures",    desc: "Cold storage design, withdrawal controls, and SOC operations built-in from day one — not bolted on later." },
    ],
  },
  closing: {
    heading: "Why Partner with Elchai for Centralized Exchange Development?",
    body:
      "Production CEX delivery with institutional-grade engineering, security, and regulatory awareness.",
    cta: { label: "Schedule a Consultation", href: "#consultation" },
  },
};

const icoDevelopment: ServiceDetailContent = {
  slug: "ico-development",
  category: "Cryptocurrency · Launch",
  hero: {
    eyebrow: "ICO Development",
    heading: "ICO Development Company",
    subheading: "Let's Build Your Token Launch Infrastructure",
    body:
      "From whitepaper to mainnet — token contracts, sale infrastructure, compliance, distribution, and post-launch growth, end-to-end.",
    primaryCta: { label: "Launch Your Token", href: "#consultation" },
    ghostCta: { label: "Explore Services", href: "#capabilities" },
  },
  capabilities: {
    eyebrow: "Roadmap",
    heading: "Your Technical Partner Through Every ICO Milestone",
    items: [
      { title: "Concept Validation & Feasibility", desc: "Token utility design, market validation, and regulatory feasibility before committing engineering capital." },
      { title: "Strategic Roadmap",                desc: "Milestone-based execution plan with go/no-go gates aligned to legal, technical, and growth checkpoints." },
      { title: "Token & Wallet Infrastructure",    desc: "ERC-20/BEP-20 token contracts, vesting schedules, treasury wallets, and investor distribution rails." },
      { title: "Sale Execution & Distribution",    desc: "KYC-gated sale platforms, allocation logic, anti-bot mitigations, and on-chain claim flows." },
      { title: "Pre & Post-Launch Growth",         desc: "Community, market-making, exchange relationships, and listing support coordinated end-to-end." },
      { title: "Regulatory & Risk Management",     desc: "Securities-vs-utility classification, jurisdictional structuring, and compliance documentation." },
      { title: "Whitepaper & Documentation",       desc: "Technical and economic whitepapers, pitch decks, and investor data rooms produced in-house." },
      { title: "White Label ICO Platform",         desc: "Production sale infrastructure deployable in days, configurable by jurisdiction and asset structure." },
    ],
  },
  industries: {
    eyebrow: "Use Cases",
    heading: "Ready to Explore ICO Development for Your Industry?",
    items: [
      { title: "DeFi Protocol Tokens" },
      { title: "Enterprise Blockchain Platforms" },
      { title: "Gaming and Virtual Economies" },
      { title: "Supply Chain Solutions" },
      { title: "Asset Tokenization Platforms" },
      { title: "Healthcare Data Platforms" },
    ],
  },
  whyChoose: {
    eyebrow: "Post-launch",
    heading: "Post-ICO Support and Development",
    items: [
      { title: "Exchange Listing Support",     desc: "Coordinated outreach and integration support across leading CEX and DEX venues." },
      { title: "Ongoing Blockchain Development",desc: "Roadmap delivery, protocol upgrades, and ecosystem product development after the sale closes." },
      { title: "Treasury & Vesting Operations", desc: "Programmatic vesting execution, treasury management, and on-chain disclosure reporting." },
    ],
  },
  closing: {
    heading: "Let's Map Your ICO Development Journey",
    body: "Partner with Elchai to ship a token launch your investors and regulators both respect.",
    cta: { label: "Schedule a Consultation", href: "#consultation" },
  },
};

// ─────────────────────────────────────────────────────────────────────────
// Batch 4 (AI category): Assistants · Integration · Automation · Dev · Gen-AI
// ─────────────────────────────────────────────────────────────────────────

const aiAssistantDevelopment: ServiceDetailContent = {
  slug: "ai-assistant-development",
  category: "Artificial Intelligence · AI Solutions",
  hero: {
    eyebrow: "AI Assistants",
    heading: "AI Assistant Development For Practical Business Outcomes",
    subheading: "Smart AI Assistants That Drive Tangible Results",
    body:
      "Custom AI assistants — sales, support, research, and operations — built on your data, integrated with your systems, and measured by the metrics your business actually cares about.",
    primaryCta: { label: "Start Your Assistant", href: "#consultation" },
    ghostCta: { label: "Explore Capabilities", href: "#capabilities" },
  },
  capabilities: {
    eyebrow: "Services",
    heading: "AI Assistant Development Services",
    items: [
      { title: "Conversational Assistants",   desc: "Customer-facing chat and voice assistants with retrieval-augmented context and graceful fallback handling." },
      { title: "Sales & Lead Qualification",  desc: "Outbound and inbound assistants that score leads, book meetings, and hand off to humans with full context." },
      { title: "Internal Knowledge Assistants",desc: "Enterprise search and Q&A grounded in your documents, wikis, and CRMs with permission-aware retrieval." },
      { title: "Workflow Automation Agents",  desc: "Agentic assistants that orchestrate multi-step tasks across SaaS tools, with human-approval checkpoints." },
      { title: "Coding & DevOps Copilots",    desc: "Internal developer assistants trained on your code patterns, runbooks, and deployment infrastructure." },
      { title: "Research & Analyst Agents",   desc: "Long-running agents that synthesize reports from web, internal, and structured data sources." },
    ],
  },
  whyChoose: {
    eyebrow: "Functionality",
    heading: "The Core Functionalities of Our AI Assistants",
    items: [
      { title: "Grounded Retrieval",        desc: "RAG pipelines with vector + lexical hybrid search keep answers anchored to your actual data." },
      { title: "Tool Use & Function Calling",desc: "Structured tool invocation with schema validation so assistants act, not just talk." },
      { title: "Memory & Personalisation",  desc: "Per-user and per-session memory with explicit scoping for privacy and compliance." },
      { title: "Evaluation & Observability",desc: "Automated eval suites and conversation analytics tracking the metrics that matter to your team." },
    ],
  },
  closing: {
    heading: "Start Building Smarter AI Assistants",
    body: "Partner with engineers who ship AI assistants into production — not demos.",
    cta: { label: "Book Free Consultation", href: "#consultation" },
  },
};

const aiIntegration: ServiceDetailContent = {
  slug: "ai-integration",
  category: "Artificial Intelligence · AI Solutions",
  hero: {
    eyebrow: "AI Integration",
    heading: "AI Integration Engineered for Tangible Business Outcomes",
    subheading: "Plug AI into the tools your team already uses.",
    body:
      "ChatGPT, Salesforce, QuickBooks, Adobe, and your custom systems — connected via reliable AI integration layers with observability, evaluation, and cost controls built-in.",
    primaryCta: { label: "Integrate AI", href: "#consultation" },
    ghostCta: { label: "See Integrations", href: "#capabilities" },
  },
  stats: [
    { value: "100+", label: "AI Integrations Delivered" },
    { value: "40+",  label: "Tools Connected" },
    { value: "95%",  label: "Client Retention" },
    { value: "50+",  label: "Industries Served" },
  ],
  capabilities: {
    eyebrow: "Integrations",
    heading: "Our Suite of AI Integration Solutions",
    items: [
      { title: "ChatGPT Integration",         desc: "OpenAI integrations with structured outputs, function calling, and cost-aware caching across your apps." },
      { title: "Salesforce Conversational AI",desc: "AI layered on top of Salesforce records — lead scoring, summarization, and agent assist embedded in flow." },
      { title: "QuickBooks AI Integration",   desc: "Finance copilots over QuickBooks data — categorization, anomaly detection, and forecast assistance." },
      { title: "Generative AI Integration",   desc: "Embed Claude, Gemini, Llama, and proprietary models behind a unified, swappable interface." },
      { title: "Adaptive AI Integration",     desc: "Models that learn from production feedback with explicit human-in-the-loop training loops." },
      { title: "Adobe AI Integration",        desc: "Creative workflow integrations with Adobe Firefly, Photoshop APIs, and asset pipelines." },
    ],
  },
  whyChoose: {
    eyebrow: "Capabilities",
    heading: "AI Integration That Drives Measurable Impact",
    items: [
      { title: "Generative AI",                  desc: "Production patterns for content, code, summarization, and conversation grounded in your data." },
      { title: "Machine Learning",               desc: "Custom predictive models integrated into your ops, marketing, and product analytics surfaces." },
      { title: "Computer Vision",                desc: "Image and video analysis pipelines integrated with your CMS, manufacturing line, or security stack." },
      { title: "Deep Learning",                  desc: "Sequence models, transformers, and bespoke architectures for problems off-the-shelf models miss." },
      { title: "Natural Language Processing",    desc: "Entity, intent, sentiment, and classification pipelines integrated with CRMs and support tools." },
      { title: "Robotic Process Automation",     desc: "AI-augmented RPA that handles unstructured input instead of breaking on it." },
    ],
  },
  closing: {
    heading: "Future-Proof Your Enterprise",
    body: "Talk to our integration engineers about the AI capabilities your stack is missing.",
    cta: { label: "Book Free Consultation", href: "#consultation" },
  },
};

const aiAutomation: ServiceDetailContent = {
  slug: "ai-automation",
  category: "Artificial Intelligence · AI Solutions",
  hero: {
    eyebrow: "AI Automation",
    heading: "AI Automation for Scalable Business Operations",
    subheading: "AI Automation Engineered to Accelerate Enterprise Growth",
    body:
      "End-to-end automation engineered with AI at the core — workflows, decisions, and operations re-wired for the era of agentic systems.",
    primaryCta: { label: "Automate With AI", href: "#consultation" },
    ghostCta: { label: "See Outcomes", href: "#capabilities" },
  },
  stats: [
    { value: "70%", label: "Decrease in Manual Workload" },
    { value: "3×",  label: "Increase in Lead Conversions" },
    { value: "10K+",label: "Annual Team Hours Reclaimed" },
    { value: "45%", label: "Rise in Production Efficiency" },
  ],
  capabilities: {
    eyebrow: "Capabilities",
    heading: "Engineering Intelligent Automation for Real Business Outcomes",
    items: [
      { title: "Workflow Automation",        desc: "End-to-end automation across Slack, Salesforce, Notion, and the SaaS sprawl your team already lives in." },
      { title: "Agentic AI Systems",         desc: "Multi-step planning, tool use, and human-approval gates — agents that work safely in production." },
      { title: "Document Processing",        desc: "OCR + LLM extraction with structured output schemas for invoices, contracts, and forms." },
      { title: "Customer Operations",        desc: "Triage, ticket routing, and resolution suggestions integrated into Zendesk, Intercom, and Front." },
      { title: "Sales & Marketing Automation",desc: "Outbound personalization, lead enrichment, and pipeline scoring driven by RAG over your CRM." },
      { title: "Finance & Back-Office",      desc: "AP/AR automation, expense categorization, and reconciliation with human-review for exceptions." },
    ],
  },
  techStack: {
    eyebrow: "Stack",
    heading: "AI Automation Built on Advanced Engineering Stack",
    groups: [
      { title: "AI & Machine Learning",    items: ["OpenAI", "Anthropic Claude", "Gemini", "Llama", "Hugging Face"] },
      { title: "Robotic Process Automation",items: ["UiPath", "Automation Anywhere", "Power Automate", "Zapier", "n8n"] },
      { title: "Cloud AI Services",        items: ["AWS Bedrock", "Azure OpenAI", "GCP Vertex", "NVIDIA Triton"] },
      { title: "Workflow & Integration",   items: ["LangChain", "LangGraph", "Temporal", "Airflow", "Make"] },
      { title: "Data & Analytics",         items: ["Snowflake", "Databricks", "BigQuery", "dbt", "Looker"] },
    ],
  },
  closing: {
    heading: "Accelerate Operations with Intelligent AI Automation",
    body: "Partner with Elchai to ship automations that survive contact with production reality.",
    cta: { label: "Book Free Consultation", href: "#consultation" },
  },
};

const aiDevelopment: ServiceDetailContent = {
  slug: "ai-development",
  category: "Artificial Intelligence · AI Solutions",
  hero: {
    eyebrow: "AI Development",
    heading: "AI Development",
    subheading: "Custom AI engineered for measurable business outcomes.",
    body:
      "From strategy through MLOps — Elchai builds, deploys, and operates AI systems that move the metrics your leadership team actually tracks.",
    primaryCta: { label: "Build Your AI", href: "#consultation" },
    ghostCta: { label: "See Capabilities", href: "#capabilities" },
  },
  stats: [
    { value: "100+",  label: "AI Models in Production" },
    { value: "98.7%", label: "Model Reliability" },
    { value: "50+",   label: "AI Engineers" },
    { value: "4+",    label: "Years of AI Delivery" },
  ],
  capabilities: {
    eyebrow: "Services",
    heading: "Our Suite of AI Solutions",
    items: [
      { title: "AI Strategy & Consulting",                 desc: "Use-case discovery, ROI modelling, and adoption roadmaps before a single training job runs." },
      { title: "Data Engineering & Analytics",             desc: "ETL, feature stores, and analytics infrastructure that make AI projects actually trainable." },
      { title: "Machine Learning & Predictive Modeling",   desc: "Custom regression, classification, ranking, and time-series models tuned for production." },
      { title: "Generative AI & LLM Solutions",            desc: "RAG, fine-tuning, evaluation, and serving infrastructure for in-house and hybrid LLM systems." },
      { title: "Computer Vision & Video Intelligence",     desc: "Object detection, action recognition, OCR, and document AI deployed at edge or cloud." },
      { title: "Conversational AI & NLP",                  desc: "Intent, entity, summarization, and conversation systems across text and voice channels." },
      { title: "Autonomous Systems & Robotics Integration",desc: "Perception, planning, and control stacks for autonomous vehicles, robotics, and IoT." },
      { title: "MLOps & Continuous Improvement",           desc: "Model serving, monitoring, retraining cadence, and drift detection so your AI keeps performing." },
      { title: "AI Security & Ethical Compliance",         desc: "Threat modelling, red-teaming, bias evaluation, and policy enforcement across model lifecycle." },
    ],
  },
  industries: {
    eyebrow: "Verticals",
    heading: "Industry Specific AI Expertise",
    items: [
      { title: "Healthcare" },
      { title: "Finance and Banking" },
      { title: "Manufacturing" },
      { title: "Automotive" },
      { title: "Logistics & Supply Chain" },
      { title: "Retail and E-commerce" },
      { title: "Energy" },
      { title: "Real Estate" },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    heading: "AI Development — Common Questions",
    items: [
      { q: "What kinds of AI projects do you build?",
        a: "Conversational agents, generative AI applications, RAG and document search, computer-vision pipelines, classical ML models, automation flows and bespoke LLM applications. We work across the stack — from PoC to production." },
      { q: "Which models and providers do you work with?",
        a: "OpenAI, Anthropic, Google Vertex AI, AWS Bedrock, Azure OpenAI, and open-weight models (Llama, Mistral, Qwen). We pick per use case based on quality, cost, latency, data-residency and licensing constraints — not on vendor preference." },
      { q: "How do you scope a custom AI project?",
        a: "A 1–2 week discovery: map the workflow, audit data, identify success metrics, prototype 1–2 approaches, and write a build/buy recommendation. The output is a costed proposal and PoC plan, not a slide deck." },
      { q: "How do you measure if an AI feature is working?",
        a: "We instrument task-level KPIs (accuracy, completion rate, escalation rate, cost-per-task), regression evals against a held-out set, and live telemetry in a model-observability stack (LangSmith, Langfuse, Arize, or in-house). Quality is measured, not asserted." },
      { q: "Can the AI run on our infrastructure for data privacy?",
        a: "Yes. Private VPC deployments, on-prem inference, BYOK on hyperscalers and air-gapped configurations are all common. Architecture is chosen up front based on data classification and regulatory regime." },
      { q: "Will the AI replace our employees?",
        a: "In our experience, AI agents reliably automate routine sub-tasks within a job — not entire jobs. We design with human-in-the-loop checkpoints so subject-matter experts review, correct and retain control over high-stakes outputs." },
    ],
  },
  closing: {
    heading: "Ready to explore AI for your business?",
    body: "Schedule a discovery call with our AI engineering team.",
    cta: { label: "Book Free Consultation", href: "#consultation" },
  },
};

const generativeAiDevelopment: ServiceDetailContent = {
  slug: "generative-ai-development",
  category: "Artificial Intelligence · Generative AI",
  hero: {
    eyebrow: "Generative AI",
    heading: "Generative AI Development Company",
    subheading: "Harnessing Next-Generation AI for Scalable Innovation",
    body:
      "From consulting through fine-tuning, RAG, and production deployment — Elchai delivers Gen-AI systems that hold up to real-world scale and scrutiny.",
    primaryCta: { label: "Start Your Gen-AI Project", href: "#consultation" },
    ghostCta: { label: "See Capabilities", href: "#capabilities" },
  },
  stats: [
    { value: "50+",  label: "Gen-AI Deployments" },
    { value: "30%",  label: "Average Cost Reduction" },
    { value: "40+",  label: "LLMs Fine-Tuned" },
    { value: "85%+", label: "Model Eval Pass Rate" },
  ],
  capabilities: {
    eyebrow: "Capabilities",
    heading: "Range of Generative AI Solutions We Develop",
    items: [
      { title: "Generative AI Consulting",        desc: "Use-case prioritization, model selection, and economics modelling for production Gen-AI roadmaps." },
      { title: "Generative AI Model Development", desc: "Custom architectures and training pipelines for domain-specific generative tasks." },
      { title: "Generative AI Replication",       desc: "Self-hosted alternatives to commercial APIs for data-residency and cost-control requirements." },
      { title: "ChatGPT-3/4 & LLM Integrations",  desc: "Production integration with OpenAI, Anthropic, Gemini, and open-weight models behind unified interfaces." },
      { title: "Generative Adversarial Networks", desc: "GAN architectures for image, video, and synthetic data generation use cases." },
      { title: "Model Integration & Deployment",  desc: "Inference serving, autoscaling, and observability for production Gen-AI workloads." },
      { title: "Fine-Tuning Models",              desc: "SFT, RLHF, DPO, and continued-pretraining with rigorous evaluation pipelines." },
      { title: "RPA + Generative AI",             desc: "Hybrid automation combining deterministic RPA with generative reasoning for unstructured inputs." },
      { title: "Gen-AI Support & Maintenance",    desc: "Model monitoring, drift detection, eval-set maintenance, and refresh cadence." },
    ],
  },
  techStack: {
    eyebrow: "Stack",
    heading: "Generative AI Engineering Stack",
    groups: [
      { title: "Architectures",         items: ["Deep Learning", "Fine Tuning", "Transformer Architectures", "GANs", "RAG"] },
      { title: "Models",                items: ["GPT-4o", "Claude 4.6", "Gemini 1.5", "Llama 3", "Mistral", "Mixtral"] },
      { title: "Training Frameworks",   items: ["PyTorch", "Hugging Face Transformers", "TRL", "DeepSpeed", "Axolotl"] },
      { title: "Serving Infrastructure",items: ["vLLM", "Triton", "TGI", "AWS Bedrock", "Azure OpenAI"] },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    heading: "Generative AI Development — Common Questions",
    items: [
      { q: "What does 'generative AI development' actually include?",
        a: "Building applications around foundation models — chat experiences, content generators, agentic workflows, multimodal pipelines (image, audio, video) and copilots embedded in existing products. Includes prompt design, eval harnesses and observability." },
      { q: "How do we choose between OpenAI, Anthropic, and open-weight models?",
        a: "Per use case. We benchmark cost, latency, instruction-following, domain accuracy, license, residency requirements and tooling support. Often the answer is a multi-model stack with routing, not a single vendor lock-in." },
      { q: "When should we fine-tune vs prompt-engineer vs RAG?",
        a: "Prompt-engineer first (cheap, fast). RAG when answers must be grounded in your private data. Fine-tune when you need consistent style/tone or a narrow task at lower latency and cost. Often the production answer is RAG + light fine-tuning." },
      { q: "How do you prevent hallucinations?",
        a: "Retrieval grounding, citation requirements in the output schema, eval suites that score grounding rate, structured-output constraints, refusal training for out-of-scope queries, and human-in-the-loop review on high-stakes answers." },
      { q: "Can we deploy generative AI without sending data to OpenAI/Anthropic?",
        a: "Yes — via Azure OpenAI / Bedrock (data stays in your tenant), or via fully self-hosted open-weight models (Llama, Mistral, Qwen) on your own GPUs. We routinely ship in both modes." },
      { q: "What's the typical cost of a generative-AI feature in production?",
        a: "Highly use-case dependent. We budget per request (tokens × $/token + retrieval + eval overhead) and surface unit economics before scale. Most production features stabilise at $0.001–$0.05 per request with caching and routing." },
    ],
  },
  closing: {
    heading: "Advance Your Operations Through Generative AI Development",
    body: "Partner with Elchai to turn generative AI ambition into shipping product.",
    cta: { label: "Book Free Consultation", href: "#consultation" },
  },
};

// ─────────────────────────────────────────────────────────────────────────
// Batch 5 (AI Industries): Banking · Fintech · Logistics · Real Estate · Education
// ─────────────────────────────────────────────────────────────────────────

const aiBankingSolutions: ServiceDetailContent = {
  slug: "ai-banking-solutions",
  category: "Artificial Intelligence · Industries",
  hero: {
    eyebrow: "AI in Banking",
    heading: "AI in Banking Solutions",
    subheading: "AI Banking Solutions Built for Secure, Scalable Financial Operations",
    body:
      "From fraud detection and credit decisioning to customer experience and back-office automation — Elchai delivers AI systems engineered for the precision and compliance regulated banks demand.",
    primaryCta: { label: "Book Free Consultation", href: "#consultation" },
    ghostCta: { label: "See Capabilities", href: "#capabilities" },
  },
  capabilities: {
    eyebrow: "Features",
    heading: "AI Banking Features Designed for Accuracy, Compliance, and Efficiency",
    items: [
      { title: "Fraud Detection & AML",        desc: "Real-time transaction scoring with explainable models tuned to your historical fraud patterns and regulatory regime." },
      { title: "Credit Decisioning",           desc: "Custom underwriting models with auditable feature attribution and challenger-model comparison." },
      { title: "Customer Intelligence",        desc: "Segmentation, churn, next-best-action, and CLV models powering retention and cross-sell programs." },
      { title: "Conversational Banking",       desc: "Voice and chat assistants with secure auth, transaction execution, and human handoff for complex flows." },
      { title: "Document Intelligence",        desc: "OCR + LLM extraction for KYC, loan applications, and trade documents with confidence-aware human review." },
      { title: "Risk & Compliance Automation", desc: "Sanctions screening, suspicious activity reporting, and regulatory change monitoring augmented with AI." },
    ],
  },
  industries: {
    eyebrow: "Use Cases",
    heading: "AI Banking Solutions for Every Sector",
    items: [
      { title: "Retail Banking" },
      { title: "Commercial Banking" },
      { title: "Wealth Management" },
      { title: "Investment Banking" },
      { title: "Insurance" },
      { title: "Trade Finance" },
      { title: "Payments" },
      { title: "Capital Markets" },
    ],
  },
  closing: {
    heading: "Transform Banking Operations with Intelligent, Reliable AI Systems",
    body: "Partner with engineers who understand both AI and the regulatory environment your bank operates in.",
    cta: { label: "Schedule a Consultation", href: "#consultation" },
  },
};

const aiFintechSolutions: ServiceDetailContent = {
  slug: "ai-fintech-solutions",
  category: "Artificial Intelligence · Industries",
  hero: {
    eyebrow: "AI in Fintech",
    heading: "AI-Powered Fintech Solutions",
    subheading: "AI Fintech Solutions Designed for Secure, Intelligent Financial Innovation",
    body:
      "Custom AI engineered for fintech use cases — lending, payments, wealthtech, and embedded finance — with compliance, security, and explainability built in.",
    primaryCta: { label: "Book Free Consultation", href: "#consultation" },
    ghostCta: { label: "See Capabilities", href: "#capabilities" },
  },
  capabilities: {
    eyebrow: "Features",
    heading: "AI Fintech Features Built for Accuracy, Compliance, and Scalability",
    items: [
      { title: "Alternative Credit Scoring",   desc: "Models that combine traditional and alternative data with explainability and fair-lending controls." },
      { title: "Payment Intelligence",         desc: "Real-time scoring for chargebacks, false positives, and merchant risk across high-volume payment flows." },
      { title: "Robo-Advisory & Wealth AI",    desc: "Portfolio construction, rebalancing, and personalised advice with regulatory-grade audit trails." },
      { title: "Embedded Finance AI",          desc: "Risk, underwriting, and personalisation APIs for fintech platforms and BaaS partners." },
      { title: "RegTech Automation",           desc: "KYC, KYB, AML, and ongoing monitoring automated with AI and human-in-the-loop exceptions." },
      { title: "Conversational Finance",       desc: "Customer-facing AI assistants integrated with account, transaction, and product data securely." },
    ],
  },
  industries: {
    eyebrow: "Verticals",
    heading: "AI Fintech Solutions Designed for Every Financial Sector",
    items: [
      { title: "Lending" },
      { title: "Payments" },
      { title: "Insurtech" },
      { title: "Wealthtech" },
      { title: "RegTech" },
      { title: "BNPL" },
      { title: "Crypto Finance" },
      { title: "B2B Finance" },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    heading: "AI for Fintech — Common Questions",
    items: [
      { q: "How is AI used inside fintechs and banks today?",
        a: "Document automation (statements, IDs, KYC), fraud and AML transaction monitoring, underwriting and credit scoring, customer-support agents, treasury and FP&A copilots, and compliance/legal review assistants. Lots of high-leverage back-office work." },
      { q: "Is AI in fintech compliant in the UAE?",
        a: "It can be — but compliance is the work. CBUAE expects model-risk governance, explainability and audit trails. DFSA fintech licenses require documented controls. We map every deployment to the relevant regulatory framework before shipping." },
      { q: "How do you handle PII and customer data?",
        a: "Tokenization at ingest, PII redaction before LLM calls, regional data residency (UAE / EU), private VPC deployments, BYOK encryption, and audit logging of every model interaction. Compliance is wired into the architecture, not bolted on." },
      { q: "Can AI replace our fraud team?",
        a: "Not entirely — but it triages and escalates. We typically reduce manual-review load 40–70% by surfacing the highest-risk cases with explanations, while routine cases auto-clear. Analysts focus on the ambiguous middle." },
      { q: "How do you measure ROI on AI in financial operations?",
        a: "Per-case automation rate, false-positive reduction, time-to-decision, average handle time, recoveries from fraud reduction, and cost per processed document. We instrument these from day one with weekly reporting." },
      { q: "Do you integrate with our core banking system?",
        a: "Yes. Common targets include Temenos, Finacle, Mambu, Thought Machine, Fiserv DNA and homegrown cores — via APIs, file drops or middleware. Integration depth is scoped per engagement." },
    ],
  },
  closing: {
    heading: "Improve Financial Operations with Smart, Reliable AI Technology",
    body: "Talk to our fintech AI engineers about the systems your roadmap actually needs.",
    cta: { label: "Schedule a Consultation", href: "#consultation" },
  },
};

const aiLogisticsSoftware: ServiceDetailContent = {
  slug: "ai-logistics-software",
  category: "Artificial Intelligence · Industries",
  hero: {
    eyebrow: "AI in Logistics",
    heading: "AI Development for Logistics",
    subheading: "AI-Driven Systems for Modern Logistics",
    body:
      "Route optimization, demand forecasting, fleet intelligence, and warehouse automation — AI engineered for the throughput and resilience real logistics networks demand.",
    primaryCta: { label: "Book Free Consultation", href: "#consultation" },
    ghostCta: { label: "See Capabilities", href: "#capabilities" },
  },
  capabilities: {
    eyebrow: "Capabilities",
    heading: "How Can AI Help You In Logistics?",
    items: [
      { title: "Route & Load Optimization",  desc: "Real-time routing across multi-leg journeys with constraint satisfaction for time windows, weight, and cost." },
      { title: "Demand Forecasting",         desc: "Probabilistic forecasting at SKU/region/day granularity to drive inventory and capacity decisions." },
      { title: "Predictive Maintenance",     desc: "Fleet and equipment health monitoring with anomaly detection and failure prediction before downtime." },
      { title: "Warehouse Automation",       desc: "Computer-vision quality checks, slotting optimization, and pick-path planning integrated with WMS." },
      { title: "Last-Mile Intelligence",     desc: "Delivery success prediction, time-window optimization, and driver assist for urban density." },
      { title: "Supply Chain Visibility",    desc: "AI-powered ETA prediction, exception detection, and proactive customer notification across the chain." },
    ],
  },
  industries: {
    eyebrow: "Use Cases",
    heading: "Logistics AI Use Cases We Ship",
    items: [
      { title: "Fleet Management" },
      { title: "Freight & Carrier Operations" },
      { title: "Warehouse & 3PL" },
      { title: "Cold Chain Logistics" },
      { title: "Last-Mile Delivery" },
      { title: "Cross-Border & Customs" },
    ],
  },
  closing: {
    heading: "Ready to Engineer AI Systems for Your Logistics Network?",
    body: "Partner with Elchai to ship AI that survives contact with the dock, the highway, and the warehouse floor.",
    cta: { label: "Schedule a Consultation", href: "#consultation" },
  },
};

const aiRealEstate: ServiceDetailContent = {
  slug: "ai-real-estate",
  category: "Artificial Intelligence · Industries",
  hero: {
    eyebrow: "AI in Real Estate",
    heading: "AI-Powered Real Estate Solutions",
    subheading: "Complete Real Estate Systems Designed for Data-Driven Decisions",
    body:
      "Property valuation, virtual tours, lead intelligence, and portfolio analytics — AI engineered for residential, commercial, and proptech operators.",
    primaryCta: { label: "Book Free Consultation", href: "#consultation" },
    ghostCta: { label: "See Capabilities", href: "#capabilities" },
  },
  capabilities: {
    eyebrow: "Features",
    heading: "Real Estate Intelligence That Turns Data Into Measurable Outcomes",
    items: [
      { title: "Smart Property Valuation Platform", desc: "Automated valuation models combining MLS, public records, and proprietary signals with confidence intervals." },
      { title: "Virtual Property Tours & AI Assistant", desc: "Immersive 3D walkthroughs paired with AI agents that answer prospect questions in real time." },
      { title: "Lead Scoring & Routing",            desc: "Inbound lead qualification, intent detection, and intelligent routing to the right agent or team." },
      { title: "Portfolio Analytics",               desc: "Tenant churn prediction, rent optimization, and asset performance modeling for commercial owners." },
      { title: "Document Intelligence",             desc: "Lease abstraction, contract review, and compliance checks across portfolios at scale." },
      { title: "Market Forecasting",                desc: "Local market dynamics, supply/demand modelling, and pricing recommendations for investment teams." },
    ],
  },
  closing: {
    heading: "Build Smarter Real Estate Systems with Custom AI Solutions",
    body: "Talk to engineers who have shipped AI for real estate operators, brokerages, and proptech platforms.",
    cta: { label: "Schedule a Consultation", href: "#consultation" },
  },
};

const aiEducationSoftware: ServiceDetailContent = {
  slug: "ai-education-software",
  category: "Artificial Intelligence · Industries",
  hero: {
    eyebrow: "AI in Education",
    heading: "AI-Powered Education Software",
    subheading: "AI/ML systems engineered for learning at scale.",
    body:
      "Personalised learning, automated grading, content generation, and learning analytics — built for schools, EdTech platforms, and corporate learning programs.",
    primaryCta: { label: "Book Free Consultation", href: "#consultation" },
    ghostCta: { label: "See Capabilities", href: "#capabilities" },
  },
  capabilities: {
    eyebrow: "Capabilities",
    heading: "AI Capabilities for Modern Education Platforms",
    items: [
      { title: "Personalised Learning Paths", desc: "Adaptive content recommendation based on mastery models, learning velocity, and engagement signals." },
      { title: "AI Tutoring Assistants",       desc: "Subject-grounded AI tutors that explain, quiz, and remediate without leaking complete answers." },
      { title: "Automated Grading",            desc: "Rubric-based grading for open-ended responses with confidence-aware human review queues." },
      { title: "Content Generation",           desc: "Curriculum-aligned question, lesson, and exercise generation with educator approval loops." },
      { title: "Learning Analytics",           desc: "Cohort and individual-level analytics surfacing intervention opportunities for teachers and admins." },
      { title: "Accessibility & Translation",  desc: "Multilingual content, captioning, and accessibility features that broaden program reach." },
    ],
  },
  closing: {
    heading: "Engineer the Next Generation of Learning Experiences",
    body: "Partner with Elchai to ship AI that improves outcomes for learners, not just engagement metrics.",
    cta: { label: "Schedule a Consultation", href: "#consultation" },
  },
};

// ─────────────────────────────────────────────────────────────────────────
// Batch 6 (AI advanced): ChatGPT · Agents · ML · LLM · Computer Vision
// ─────────────────────────────────────────────────────────────────────────

// Kept (but not registered) as a draft for future /generative-ai-development
// refresh — see the REGISTRY entry below.
const _chatGptDraft: ServiceDetailContent = {
  slug: "chat-gpt",
  category: "Artificial Intelligence · Machine Learning",
  hero: {
    eyebrow: "Hire ChatGPT Developers",
    heading: "Hire ChatGPT Developers",
    subheading: "ChatGPT Development Experts That Empower 500+ Businesses Across the UAE & Beyond",
    body:
      "Senior engineers experienced in OpenAI integration, fine-tuning, RAG, and production deployment — ready to embed in your team and ship.",
    primaryCta: { label: "Hire Developers", href: "#consultation" },
    ghostCta: { label: "See Expertise", href: "#capabilities" },
  },
  capabilities: {
    eyebrow: "Expertise",
    heading: "Comprehensive ChatGPT Development Expertise for Every Requirement",
    items: [
      { title: "ChatGPT Consultation",      desc: "Use-case discovery, model selection, and architecture design grounded in production realities." },
      { title: "ChatGPT Integration",       desc: "Production OpenAI integrations with retries, cost-aware caching, and structured-output validation." },
      { title: "ChatGPT Customization",     desc: "Domain-specific prompts, tool schemas, and guardrails tailored to your data and policies." },
      { title: "ChatGPT Development",       desc: "Full applications and agents built around the OpenAI stack, end-to-end." },
      { title: "Fine-Tuning GPT Models",    desc: "SFT and preference-tuning with rigorous eval suites — ship custom models that outperform stock GPT on your tasks." },
      { title: "OpenAI Embeddings & Plugins",desc: "Semantic search, classification, and plugin development backed by OpenAI's embedding and tool APIs." },
    ],
  },
  whyChoose: {
    eyebrow: "Why Elchai",
    heading: "Why Elchai's ChatGPT Developers?",
    items: [
      { title: "Proven ChatGPT Expertise",       desc: "Production deployments across regulated and high-throughput environments — not demos." },
      { title: "Tailored AI Solutions",          desc: "Every engagement starts with discovery; we build for your data, your workflows, your metrics." },
      { title: "Data Security & Compliance",     desc: "On-prem options, data-residency awareness, and audit-ready logging across every flow." },
      { title: "Dedicated Support & Maintenance",desc: "Long-term partnerships, not throw-it-over-the-wall delivery — we own the outcome with you." },
    ],
  },
  closing: {
    heading: "Want to Hire ChatGPT Developers?",
    body: "Talk to Elchai about senior ChatGPT engineers ready to ship.",
    cta: { label: "Book Free Consultation", href: "#consultation" },
  },
};

const aiAgentDevelopment: ServiceDetailContent = {
  slug: "ai-agent-development",
  category: "Artificial Intelligence · Machine Learning",
  hero: {
    eyebrow: "Agentic AI",
    heading: "Intelligent AI Agents That Think, Learn, and Act",
    subheading: "AI Agents for Every Business Function You Want to Automate",
    body:
      "Production-grade agentic systems — multi-step planning, tool use, memory, and human-in-the-loop gates — engineered to operate safely in your environment.",
    primaryCta: { label: "Build Your Agent", href: "#consultation" },
    ghostCta: { label: "See Capabilities", href: "#capabilities" },
  },
  stats: [
    { value: "250+", label: "Agents Deployed" },
    { value: "78%",  label: "Task Completion Rate" },
    { value: "92%",  label: "Customer Satisfaction" },
    { value: "47%",  label: "Operational Cost Reduction" },
  ],
  capabilities: {
    eyebrow: "Capabilities",
    heading: "Automate Your Business Workflows with Custom AI Agents",
    items: [
      { title: "Customer Journey Mapping",            desc: "Agents that orchestrate full customer journeys with context-aware routing across touchpoints." },
      { title: "Real-Time Sentiment Detection",       desc: "Conversation sentiment scoring with empathic response shaping and human escalation triggers." },
      { title: "Proactive Issue Handling",            desc: "Agents that detect problems before users report them and take pre-approved corrective actions." },
      { title: "Multi-Intent Dialogue Management",    desc: "Robust dialogue state across interleaved intents — agents that don't lose the plot mid-conversation." },
      { title: "Contextual Product Suggestions",      desc: "Recommendation engines that ground in your catalog, inventory, and customer history." },
      { title: "Human Escalation Framework",          desc: "Confidence-aware handoff to humans with full context, summary, and recommended actions." },
      { title: "Voice and Tone Adjustment",           desc: "Brand-aligned voice modeling with channel-appropriate register switching." },
      { title: "Cross-Platform Conversation Continuity",desc: "Sessions that span web chat, mobile, email, and voice without losing thread." },
      { title: "Performance Analytics Automation",    desc: "Automated quality scoring, drift detection, and continuous-improvement reporting." },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    heading: "AI Agent Development — Common Questions",
    items: [
      { q: "What is an AI agent and how is it different from a chatbot?",
        a: "An agent plans multi-step actions, calls tools (APIs, databases, search), holds memory across turns and acts on the world — not just answers. A chatbot replies; an agent gets things done within explicit guardrails." },
      { q: "What kinds of work can agents reliably do today?",
        a: "Customer support triage, sales-pipeline research, document workflows (KYC, contract review), code refactors with eval gates, ops runbooks, internal-tool orchestration, and structured-data extraction. High-stakes outputs still need human review." },
      { q: "How do you keep agents from going off the rails?",
        a: "Tool allow-lists, per-tool permission scopes, human-in-the-loop approvals for risky actions, output schemas with validation, eval suites that gate deployment, runtime guardrails (PII redaction, content filters) and full audit logs of every decision." },
      { q: "How long does it take to ship a production agent?",
        a: "A scoped agent (1–3 tools, 1 happy path) ships in 6–10 weeks. A multi-tool agent with memory, guardrails and human escalation runs 12–20 weeks. We deliberately scope tight on the first launch and expand from there." },
      { q: "Which frameworks and models do you use?",
        a: "LangGraph, OpenAI Agents SDK, Anthropic's tool use, custom orchestrators where needed. Models are picked per task — Claude/Sonnet/Opus for reasoning-heavy paths, GPT-4o for fast tool calling, open-weight for private-data tasks." },
      { q: "Can the agent learn from feedback over time?",
        a: "Yes — through structured feedback loops (thumbs/edits stored as evals), retrieval over a growing knowledge base, periodic re-prompting and (where ROI is clear) fine-tuning. We design the feedback loop alongside the agent itself." },
    ],
  },
  closing: {
    heading: "Deploy AI Agents That Power Smooth Online Experiences",
    body: "Partner with Elchai to ship agents that operate safely, transparently, and at scale.",
    cta: { label: "Book Free Consultation", href: "#consultation" },
  },
};

const machineLearningDevelopment: ServiceDetailContent = {
  slug: "machine-learning-development",
  category: "Artificial Intelligence · Machine Learning",
  hero: {
    eyebrow: "Machine Learning",
    heading: "Machine Learning Development Partner",
    subheading: "Building Intelligent Systems That Learn, Predict, and Scale",
    body:
      "Custom ML systems — from prototype through production MLOps — engineered to drive measurable business outcomes, not just publish a model card.",
    primaryCta: { label: "Build Your ML System", href: "#consultation" },
    ghostCta: { label: "See Capabilities", href: "#capabilities" },
  },
  capabilities: {
    eyebrow: "Solutions",
    heading: "Machine Learning Solutions for Real-World Business Problems",
    items: [
      { title: "Predictive Modeling",          desc: "Regression, classification, and time-series models tuned for production accuracy and latency budgets." },
      { title: "Recommendation Systems",       desc: "Collaborative filtering, content-based, and hybrid recommenders with cold-start and ranking optimization." },
      { title: "Anomaly Detection",            desc: "Real-time outlier detection for fraud, security, and operational monitoring use cases." },
      { title: "Natural Language Processing",  desc: "Entity, intent, sentiment, and classification pipelines for unstructured text at scale." },
      { title: "Computer Vision Models",       desc: "Object detection, segmentation, and OCR models deployed at edge or cloud." },
      { title: "MLOps & Continuous Training",  desc: "Feature stores, model registries, automated retraining, and drift-aware serving infrastructure." },
    ],
  },
  whyChoose: {
    eyebrow: "Why Elchai",
    heading: "Smarter Models, Faster Decisions, Measurable Business Impact",
    items: [
      { title: "Production-First Engineering",  desc: "We ship into your stack with monitoring and rollback — not into a notebook." },
      { title: "Data-Quality Discipline",       desc: "Rigorous data validation and labelling workflows so models don't fail silently." },
      { title: "Eval-Driven Development",       desc: "Automated eval suites and challenger-champion comparisons across every release." },
      { title: "MLOps from Day One",            desc: "Feature stores, registry, and observability set up before the first model trains." },
    ],
  },
  closing: {
    heading: "Turn Data Into Decisions with Machine Learning That Performs",
    body: "Partner with Elchai for ML systems engineered for production scale.",
    cta: { label: "Book Free Consultation", href: "#consultation" },
  },
};

const llmDevelopmentPartner: ServiceDetailContent = {
  slug: "llm-development-partner",
  category: "Artificial Intelligence · Machine Learning",
  hero: {
    eyebrow: "LLM Development",
    heading: "LLM Development Partner",
    subheading: "Building Language Intelligence Tailored to Your Business",
    body:
      "Custom LLM systems — fine-tuning, RAG, evaluation, deployment, and monitoring — engineered for control, cost, and quality in production.",
    primaryCta: { label: "Start Your LLM Project", href: "#consultation" },
    ghostCta: { label: "See Capabilities", href: "#capabilities" },
  },
  capabilities: {
    eyebrow: "Capabilities",
    heading: "LLM Capabilities Engineered for Performance and Control",
    items: [
      { title: "Custom Fine-Tuning",        desc: "SFT, DPO, and continued-pretraining with rigorous evaluation across base and challenger models." },
      { title: "RAG Architecture",          desc: "Hybrid retrieval (lexical + vector) with reranking and citation surfacing for grounded responses." },
      { title: "Model Evaluation",          desc: "Automated eval pipelines combining LLM-as-judge with human rater workflows and regression tracking." },
      { title: "Inference Optimization",    desc: "vLLM, TGI, and Triton serving with batching, KV cache, and quantization for cost and latency targets." },
      { title: "Safety & Alignment",        desc: "Red-team testing, policy enforcement, and refusal calibration tuned to your risk posture." },
      { title: "On-Prem & Sovereign LLM",   desc: "Self-hosted alternatives to commercial APIs for data-residency and IP-protection requirements." },
    ],
  },
  industries: {
    eyebrow: "Verticals",
    heading: "Industries Benefiting from Custom LLM Solutions",
    items: [
      { title: "Finance & Banking" },
      { title: "Healthcare & Life Sciences" },
      { title: "Legal & Compliance" },
      { title: "Retail & E-Commerce" },
      { title: "Education & Training" },
      { title: "Manufacturing & Supply Chain" },
      { title: "Energy & Utilities" },
      { title: "Media & Publishing" },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    heading: "LLM Development — Common Questions",
    items: [
      { q: "When should we fine-tune a model vs use prompting + RAG?",
        a: "Fine-tune for: consistent style/tone, lower latency on a narrow task, lower cost at scale, or restricted-environment deployment. Otherwise RAG + good prompting is faster, cheaper to iterate, and easier to maintain." },
      { q: "Which fine-tuning approaches do you use?",
        a: "SFT (supervised fine-tuning), preference tuning (DPO, ORPO, RLHF), LoRA/QLoRA for parameter-efficient adaptation, continued pre-training where domain shift is severe. We pick per dataset size, latency budget and target hardware." },
      { q: "How do you measure if a fine-tuned LLM is better than the baseline?",
        a: "A held-out eval set with task-specific scorers (exact match, semantic similarity, structured-output validation, LLM-as-judge for subjective dimensions). We compare against the un-tuned model under identical prompts before declaring victory." },
      { q: "Can you deploy LLMs in our private infrastructure?",
        a: "Yes — self-hosted on GPUs (vLLM, TGI, Triton), Azure OpenAI / Bedrock for hyperscaler-tenant deployment, or air-gapped where security demands it. Architecture is chosen up front based on data classification." },
      { q: "What does an LLM project typically cost?",
        a: "PoC: $25–75K. Production fine-tune + serving: $75–250K depending on data prep, eval rigour and integration footprint. We surface a fixed-price scope after a 1-week discovery sprint." },
      { q: "How do you handle ongoing model maintenance?",
        a: "Drift monitoring against eval sets, scheduled re-evals when foundation models update, retraining pipelines triggered by feedback data thresholds, and version-controlled prompt/model artifacts so rollback is a one-click operation." },
    ],
  },
  closing: {
    heading: "Build Language Models That Understand Your Business",
    body: "Talk to Elchai's LLM engineering team about custom fine-tuning, RAG, and deployment.",
    cta: { label: "Book Free Consultation", href: "#consultation" },
  },
};

const computerVisionSoftwareDevelopment: ServiceDetailContent = {
  slug: "computer-vision-software-development",
  category: "Artificial Intelligence · Machine Learning",
  hero: {
    eyebrow: "Computer Vision",
    heading: "Computer Vision Software Development",
    subheading: "Empowering Visual Intelligence Across Business Operations",
    body:
      "Production computer-vision systems — detection, segmentation, OCR, video analytics — engineered for edge and cloud deployment at industrial scale.",
    primaryCta: { label: "Start Your CV Project", href: "#consultation" },
    ghostCta: { label: "See Industries", href: "#capabilities" },
  },
  capabilities: {
    eyebrow: "Capabilities",
    heading: "Core Capabilities That Define Our Vision Systems",
    items: [
      { title: "Object Detection & Tracking",  desc: "Real-time detection with multi-object tracking for surveillance, retail, and industrial monitoring." },
      { title: "Image Segmentation",           desc: "Semantic and instance segmentation for medical imaging, manufacturing QA, and autonomous systems." },
      { title: "OCR & Document AI",            desc: "Extraction pipelines combining classical OCR with VLM reasoning for messy real-world documents." },
      { title: "Video Analytics",              desc: "Action recognition, event detection, and timeline summarisation for security and broadcast workflows." },
      { title: "Edge Deployment",              desc: "Quantized models running on Jetson, mobile, and embedded targets with cloud sync." },
      { title: "Multimodal VLM Integration",   desc: "Combining vision models with LLMs for grounded reasoning over images and video." },
    ],
  },
  industries: {
    eyebrow: "Industries",
    heading: "Industries Using Computer Vision Solutions",
    items: [
      { title: "Manufacturing" },
      { title: "Healthcare & Medical Imaging" },
      { title: "Retail & E-Commerce" },
      { title: "Automotive & Mobility" },
      { title: "Agriculture & Agritech" },
      { title: "Security & Surveillance" },
      { title: "Construction & Infrastructure" },
      { title: "Logistics & Warehousing" },
    ],
  },
  closing: {
    heading: "Transform Visual Data Into Intelligent Actions",
    body: "Partner with engineers who ship computer vision into production environments — not labs.",
    cta: { label: "Book Free Consultation", href: "#consultation" },
  },
};

// ─────────────────────────────────────────────────────────────────────────
// Batch 7: RAG · RPA · Voice · AI Tool · Blockchain Consulting
// ─────────────────────────────────────────────────────────────────────────

const ragDevelopmentCompany: ServiceDetailContent = {
  slug: "rag-development-company",
  category: "Artificial Intelligence · Machine Learning",
  hero: {
    eyebrow: "RAG Systems",
    heading: "RAG Development Company",
    subheading: "Connecting Knowledge to Intelligence Through RAG Architecture",
    body:
      "Retrieval-augmented generation systems engineered for grounded, citable, production-grade answers — across your private data, public sources, or both.",
    primaryCta: { label: "Build Your RAG System", href: "#consultation" },
    ghostCta: { label: "See Architecture", href: "#capabilities" },
  },
  capabilities: {
    eyebrow: "Architecture",
    heading: "Core Components of Elchai's RAG Architecture",
    items: [
      { title: "Hybrid Retrieval",            desc: "Vector + lexical search with reranking and metadata filtering for high-precision retrieval over messy real-world corpora." },
      { title: "Embeddings Pipeline",         desc: "Chunking, embedding model selection, and refresh cadence engineered for your content velocity." },
      { title: "Citation & Provenance",       desc: "Source-aware generation with surfaced citations — answers users and auditors can trace." },
      { title: "Access-Aware Retrieval",      desc: "Permission-checked retrieval honoring your ACLs across documents, knowledge bases, and tools." },
      { title: "Eval & Monitoring",           desc: "Automated retrieval and generation evals tracking precision, recall, faithfulness, and answer quality." },
      { title: "Multi-Source Orchestration",  desc: "RAG over structured DBs, unstructured docs, web sources, and APIs through a unified retrieval layer." },
    ],
  },
  industries: {
    eyebrow: "Verticals",
    heading: "Industries Using RAG-Enhanced AI Systems",
    items: [
      { title: "Finance & Banking" },
      { title: "Healthcare & Pharma" },
      { title: "Legal & Compliance" },
      { title: "E-Commerce & Retail" },
      { title: "Manufacturing & Supply Chain" },
      { title: "Education & Research" },
      { title: "Energy & Utilities" },
      { title: "Government & Public Sector" },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    heading: "RAG Development — Common Questions",
    items: [
      { q: "What is RAG and why is it the dominant pattern for enterprise AI?",
        a: "Retrieval-Augmented Generation grounds an LLM's responses in your private knowledge base at query time, with citations back to the source. It reduces hallucinations, keeps data private, and updates instantly when the underlying documents change — without retraining." },
      { q: "What types of data sources can you connect?",
        a: "PDFs, Word, PowerPoint, Confluence, SharePoint, Notion, Google Drive, Slack archives, ticketing systems, databases, code repositories, and web content. We build connectors per source with incremental sync, ACL preservation and PII handling." },
      { q: "How long does a RAG implementation take?",
        a: "PoC on a small corpus: 4–6 weeks. Production RAG with a connector portfolio, evals, citations, hybrid search and observability: 8–14 weeks depending on data complexity and ACL requirements." },
      { q: "Hybrid search vs pure vector — which is better?",
        a: "Hybrid almost always wins. Lexical (BM25) is unbeatable for exact-match queries (codes, names, SKUs). Vector excels at semantic queries. We combine both with reciprocal rank fusion, then re-rank with a cross-encoder or LLM judge." },
      { q: "How do you preserve document permissions in the RAG layer?",
        a: "ACLs are indexed alongside chunks and enforced at retrieval time so users only see what they're entitled to. Group-level inheritance, share-link rules and time-based access are all supported via filterable metadata." },
      { q: "How do you measure RAG quality in production?",
        a: "Grounding rate (does the answer cite retrieved context?), retrieval recall and precision against a labelled eval set, answer faithfulness scored by an LLM judge, and user feedback signals (thumbs, edits, follow-up queries). We instrument all four from day one." },
    ],
  },
  closing: {
    heading: "Transform Static Models Into Knowledge-Aware Systems",
    body: "Talk to Elchai's RAG engineers about grounding AI in your organisation's knowledge.",
    cta: { label: "Book Free Consultation", href: "#consultation" },
  },
};

const rpaDevelopmentPartner: ServiceDetailContent = {
  slug: "rpa-development-partner",
  category: "Artificial Intelligence · Machine Learning",
  hero: {
    eyebrow: "RPA Solutions",
    heading: "RPA Development Partner",
    subheading: "Engineering Intelligent Automation for Smarter Operations",
    body:
      "AI-augmented robotic process automation — workflows that handle unstructured inputs, route exceptions intelligently, and scale without breaking.",
    primaryCta: { label: "Build Your RPA", href: "#consultation" },
    ghostCta: { label: "See Capabilities", href: "#capabilities" },
  },
  capabilities: {
    eyebrow: "Capabilities",
    heading: "RPA Solutions That Deliver Real Business Value",
    items: [
      { title: "Cognitive Data Extraction",  desc: "OCR + LLM extraction with structured output schemas that handle messy real-world documents reliably." },
      { title: "Workflow Orchestration",     desc: "Cross-system workflows with retry, timeout, and human-approval gates for safe execution." },
      { title: "Real-Time Analytics",        desc: "Live dashboards on automation throughput, exception rates, and ROI across every flow." },
      { title: "AI-Enhanced Decision Logic", desc: "Embed ML scoring into RPA workflows — automation that judges, not just clicks." },
      { title: "Secure Data Handling",       desc: "Encrypted credentials, audit-logged operations, and role-based access for every step." },
      { title: "Cross-Platform Integration", desc: "Connect SAP, Salesforce, NetSuite, ServiceNow, and the long tail of internal systems." },
      { title: "Exception Management",       desc: "Confidence-aware exception routing with human handoff and learning loops." },
      { title: "Version Control & Rollback", desc: "Workflow definitions versioned and deployable like code — rollback in seconds, not days." },
    ],
  },
  closing: {
    heading: "Automation That Works, Accuracy That Lasts, Results That Scale",
    body: "Partner with Elchai to ship RPA that survives the next quarter, not just the demo.",
    cta: { label: "Book Free Consultation", href: "#consultation" },
  },
};

const aiVoiceAssist: ServiceDetailContent = {
  slug: "ai-voice-assist",
  category: "Artificial Intelligence · Machine Learning",
  hero: {
    eyebrow: "Voice AI",
    heading: "AI Voice Assistant Development",
    subheading: "Voice Assistants That Understand and Adapt to Business Logic",
    body:
      "Production voice AI — STT, TTS, intent routing, and tool use — engineered for customer support, sales, and operational workflows.",
    primaryCta: { label: "Build Your Voice AI", href: "#consultation" },
    ghostCta: { label: "See Capabilities", href: "#capabilities" },
  },
  capabilities: {
    eyebrow: "Capabilities",
    heading: "AI-Driven Voice Capabilities for Modern Workflows",
    items: [
      { title: "Multilingual STT",          desc: "Speech-to-text across 30+ languages with code-switching, custom vocabulary, and noise robustness." },
      { title: "Natural TTS",               desc: "Production text-to-speech with voice cloning, prosody control, and SSML for natural delivery." },
      { title: "Conversational Routing",    desc: "Intent classification, slot filling, and dialogue management tuned to your business processes." },
      { title: "Telephony Integration",     desc: "Twilio, Vonage, and direct SIP integrations for inbound and outbound voice flows." },
      { title: "Tool Use & Execution",      desc: "Voice agents that look up account data, take actions, and confirm changes — not just answer FAQs." },
      { title: "Real-Time Streaming",       desc: "Low-latency streaming inference with barge-in handling for natural-feeling conversations." },
    ],
  },
  whyChoose: {
    eyebrow: "Why Elchai",
    heading: "Why Partner With Us for AI Voice Assistant Development?",
    items: [
      { title: "Experience Across Industries",  desc: "Voice agents shipped across support, sales, healthcare intake, and field operations." },
      { title: "Tailored Voice Solutions",      desc: "Brand-aligned voice design, register switching, and persona consistency across every channel." },
      { title: "Effortless System Integration", desc: "Voice flows that talk to your CRM, ERP, and ticketing without bespoke glue code." },
      { title: "Advanced AI & Language Tech",   desc: "Best-in-class STT, TTS, and LLM stacks composed for accuracy and cost." },
      { title: "Built to Scale",                desc: "Multi-tenant architecture with per-tenant configuration and observability built-in." },
    ],
  },
  closing: {
    heading: "Get Smarter Voice AI Systems That Understand, Respond, and Scale Effortlessly.",
    body: "Talk to Elchai's voice AI engineers about the agents your workflows need.",
    cta: { label: "Book Free Consultation", href: "#consultation" },
  },
};

const aiTool: ServiceDetailContent = {
  slug: "ai-tool",
  category: "Artificial Intelligence · AI Solutions",
  hero: {
    eyebrow: "AI Tool Development",
    heading: "Build Powerful AI Tools That Drive Businesses Forward",
    subheading: "Over 35 AI Tools Engineered, Launched, and Scaled Globally",
    body:
      "From idea through MVP to revenue-generating SaaS — Elchai builds and scales AI tools for builders, agencies, and enterprises.",
    primaryCta: { label: "Start Your AI Tool", href: "#consultation" },
    ghostCta: { label: "See Who We Build For", href: "#capabilities" },
  },
  industries: {
    eyebrow: "Who We Build For",
    heading: "AI Tool Development for Visionary Builders",
    items: [
      { title: "Solo Entrepreneurs & Consultants" },
      { title: "Startups & Early-Stage Companies" },
      { title: "Digital Agencies & Service Providers" },
      { title: "SaaS Companies & Tech Startups" },
      { title: "Enterprise & Established Businesses" },
      { title: "Industry Specialists & Domain Experts" },
    ],
  },
  capabilities: {
    eyebrow: "Capabilities",
    heading: "AI Tool Development Tailored for Diverse Industry Innovations",
    items: [
      { title: "MVP-to-Product",           desc: "From wireframe to revenue-generating SaaS — full-stack delivery with payments, auth, and analytics." },
      { title: "Flexible Pricing Architecture",desc: "Subscription, usage-based, and hybrid pricing systems with metering, dunning, and Stripe integration." },
      { title: "Brand-First UX",           desc: "Design that doesn't look AI-generated — distinct visual identity built for the market you target." },
      { title: "Production Infrastructure", desc: "Scalable AI infra (vLLM, Bedrock, Vertex) with cost controls, fallbacks, and observability." },
      { title: "Compliance Ready",         desc: "SOC 2 readiness, GDPR posture, and data-residency support engineered from day one." },
      { title: "Growth Instrumentation",   desc: "PostHog, segment events, and funnel analytics wired in so you can measure what's working." },
    ],
  },
  closing: {
    heading: "Turn Your AI Product Idea Into a Fully Functional, Market-Ready Tool",
    body: "Partner with Elchai to ship the AI tool that's been sitting on your roadmap.",
    cta: { label: "Book Free Consultation", href: "#consultation" },
  },
};

const blockchainConsultingServices: ServiceDetailContent = {
  slug: "blockchain-consulting-services",
  category: "Blockchain · Services",
  hero: {
    eyebrow: "Blockchain Consulting",
    heading: "Your Trusted Blockchain Consulting Partner",
    subheading: "Strategic Roadmap · Compliance Solutions · Business Integration · Blockchain Platform Selection",
    body:
      "Work with our specialized blockchain consultants to drive digital transformation and seamlessly integrate blockchain technology into your business infrastructure.",
    primaryCta: { label: "Schedule Your Consultation", href: "#consultation" },
    ghostCta: { label: "See Services", href: "#capabilities" },
  },
  stats: [
    { value: "$120M+", label: "Client Investment Secured" },
    { value: "92%",    label: "Client Implementation Success Rate" },
    { value: "40+",    label: "Regulatory Frameworks Navigated" },
    { value: "75%",    label: "Average Cost Reduction Identified" },
    { value: "18+",    label: "Industries Transformed" },
    { value: "150+",   label: "Blockchain Consulting Engagements Completed" },
  ],
  capabilities: {
    eyebrow: "Consulting Services",
    heading: "Full-Spectrum Blockchain Consulting and Technical Delivery",
    body:
      "Most blockchain projects die in the gap between strategy and shipping. We close that gap. Protocol design, smart contract development, security hardening, and deployment infrastructure that goes live and stays live.",
    items: [
      { title: "Strategic Guidance & Team Enablement",       desc: "Our consultants embed with your organization to spot genuine blockchain opportunities and build the internal capabilities your teams need to own the execution." },
      { title: "Tailored Integration Architecture",          desc: "We begin by mapping your operational landscape. Then we architect blockchain solutions that align with your existing workflows while creating space for what's next." },
      { title: "Accelerated PoC Development",                desc: "Proof matters more than promises. We build focused prototypes that validate your blockchain thesis quickly, giving decision-makers concrete evidence before scaling investment." },
      { title: "Regulatory Navigation & Security Design",    desc: "The details that keep executives awake: compliance frameworks, audit mechanisms, and defense-in-depth protocols that make your blockchain deployment both lawful and resilient." },
      { title: "End-to-End Implementation Partnership",      desc: "From whiteboard sketches to production environments, we're your technical partner. Our approach ensures your blockchain solution ships on schedule and operates reliably." },
      { title: "Technical Leadership With Business Context", desc: "Effective blockchain consulting requires dual fluency: deep protocol knowledge paired with commercial awareness. We architect solutions built for both technical excellence and market reality." },
      { title: "Enterprise Blockchain Advisory",             desc: "We help established organizations navigate the signal-to-noise problem in Web3, identifying authentic value creation opportunities specific to your industry and operations." },
      { title: "Purpose-Built Application Engineering",      desc: "Smart contracts, DeFi infrastructure, tokenization layers—our developers build blockchain applications precisely engineered for your operational requirements and risk profile." },
      { title: "Legacy System Connectivity",                 desc: "Blockchain creates maximum value when integrated thoughtfully. We bridge distributed ledger protocols with your current tech stack to amplify transparency, security, and efficiency." },
    ],
  },
  midBanner: {
    heading: "Ready to convert blockchain potential into deployed capability? Let's design your implementation roadmap.",
    cta: { label: "Book A Strategy Session", href: "#consultation" },
  },
  extraBanners: [
    {
      position: "after-industries",
      heading: "Can't See Where Blockchain Fits? We'll Show You The Exact Use Cases That Create Value In Your Sector.",
      cta: { label: "Schedule A Discovery Call", href: "#consultation" },
    },
    {
      position: "after-challenges",
      heading: "Get Past The Obstacles. Work With Consultants Who've Successfully Navigated These Challenges Hundreds Of Times.",
      cta: { label: "Book Your Consultation", href: "#consultation" },
    },
    {
      position: "after-techStack",
      heading: "Reduce Risk Through Strategic Consulting That Solves Compliance, Security, And Scalability Before They Become Problems.",
      cta: { label: "Explore Our Solutions", href: "#consultation" },
    },
    {
      position: "after-process",
      heading: "Work With Certified Experts Who Understand Both Blockchain Technology And Your Industry's Unique Requirements.",
      cta: { label: "Let's Build Together", href: "#consultation" },
    },
  ],
  solutions: {
    eyebrow: "Solutions",
    heading: "Complete Blockchain Solutions That Drive Business Value",
    body:
      "Our development expertise spans the entire Web3 ecosystem, delivering solutions that create competitive advantages and open new revenue channels.",
    items: [
      { title: "Decentralized Applications",  desc: "dApps that handle the complexity of multi-party operations. We architect applications where trust comes from code, not intermediaries, giving you transparent workflows and secure settlement." },
      { title: "Digital Currencies",          desc: "Custom cryptocurrency platforms built for your specific requirements. Payment systems, exchange infrastructure, or programmable value storage engineered to perform exactly how your business needs it to." },
      { title: "Crypto Tokens",               desc: "Token systems that do real work in your platform. Utility access, governance rights, economic incentives. We design the token model and write contracts that make your digital assets function properly." },
      { title: "NFT Platforms",               desc: "Non-fungible token infrastructure for authenticated digital ownership. Whether you're working with collectibles, credentials, or intellectual property, we build the systems that prove provenance and enable trading." },
      { title: "Asset Tokenization",          desc: "Platforms that bring fractional ownership on-chain. We build the infrastructure for issuing security tokens, managing compliance, and creating liquidity for assets that traditionally don't move easily." },
      { title: "Cryptocurrency Wallets",      desc: "Secure wallet solutions that people can actually use. We balance strong key management and recovery systems with interfaces that don't require a cryptography degree to understand." },
      { title: "Metaverse Environments",      desc: "Virtual spaces where blockchain handles ownership and identity. We develop persistent digital worlds for commerce, collaboration, and community building with economic models that benefit participants." },
      { title: "Decentralized Organizations", desc: "DAO infrastructure for governance without central control. We build voting systems, proposal mechanisms, and treasury management that let communities make decisions and execute them together." },
    ],
  },
  industries: {
    eyebrow: "Industries",
    heading: "Industry Expertise That Understands Your Market",
    body:
      "We've solved blockchain challenges across every major sector, giving us deep knowledge of industry-specific regulations, workflows, and opportunities.",
    items: [
      { title: "Property & Real Estate Innovation", desc: "Strategic advice on implementing secure property transaction systems and developing tokenization frameworks for enhanced liquidity." },
      { title: "Healthcare & Life Sciences",        desc: "Expert guidance on HIPAA-compliant blockchain solutions for medical records management and secure data sharing protocols." },
      { title: "Financial Services & Banking",      desc: "Strategic roadmaps for DeFi integration, regulatory compliance, and development of secure cross-border transaction systems." },
      { title: "Consumer Retail & E-commerce",      desc: "Advisory services on supply chain transparency, anti-counterfeiting measures, and blockchain-based loyalty program development." },
      { title: "Logistics & Supply Networks",       desc: "Consultation on end-to-end traceability implementation, smart contract automation, and blockchain-based supplier verification frameworks." },
      { title: "Sports & Athletic Organizations",   desc: "Strategic planning for fan token ecosystems, blockchain-based ticketing solutions, and digital collectible monetization strategies." },
      { title: "Media & Entertainment",             desc: "Advisory on royalty distribution systems, content rights management, and blockchain-powered creator economy models." },
      { title: "Hospitality & Travel",              desc: "Consulting on digital identity solutions, decentralized booking platforms, and blockchain loyalty program implementation." },
      { title: "Interactive Gaming",                desc: "Strategic guidance on NFT integration, play-to-earn ecosystem design, and virtual asset marketplace development." },
    ],
  },
  challenges: {
    eyebrow: "Friction Points",
    heading: "Where Blockchain Projects Actually Get Stuck",
    body:
      "Building on-chain is different, here's where teams hit friction and how we help you move through it.",
    items: [
      { title: "Feasibility Analysis",       desc: "Before you spend six months and half your budget, let's validate the thesis. We analyze whether blockchain actually solves your problem or if you're using distributed tech where a database would work better. Honest technical and economic assessment before you commit." },
      { title: "Compliance Architecture",    desc: "Regulations weren't written for Web3, but you still need to follow them. We navigate the legal complexity of your blockchain deployment, token classification, data residency, financial regulations, so you stay compliant without killing the project's core value proposition." },
      { title: "Knowledge Transfer",         desc: "Building decentralized systems requires different mental models than traditional software. We embed with your developers to transfer real blockchain expertise. Gas optimization, contract security, oracle integration, the knowledge stays with your team after we're gone." },
      { title: "Security Hardening",         desc: "Smart contracts are permanent and public, one vulnerability means funds lost forever. We run security reviews that find issues before mainnet. Threat modeling, audit processes, and monitoring infrastructure that catches problems when they're still fixable." },
      { title: "Implementation Mapping",     desc: "Most blockchain roadmaps are either too vague or impossibly detailed. We build implementation plans that sequence your build correctly. What ships first, what dependencies matter, where integration points break, mapped to your timeline and technical capacity." },
      { title: "Throughput Optimization",    desc: "Transaction volume kills more projects than bad code does. We architect scaling solutions that match your throughput needs. Layer 2 design, state optimization, infrastructure that handles peak load without collapsing or costing a fortune in gas." },
    ],
  },
  impact: {
    eyebrow: "Business Impact",
    heading: "The Real Business Impact We Deliver",
    body:
      "Working with us means more than just implementing technology. It means transforming operations, reducing costs, and creating new competitive advantages.",
    items: [
      { title: "Deep Technical Understanding",       desc: "We help you separate blockchain signals from noise, identifying where distributed ledgers create genuine value versus where traditional databases work better." },
      { title: "Operational Efficiency Gains",       desc: "Eliminating intermediaries, automating reconciliation, and streamlining multi-party processes. Our implementations typically reduce operational costs by more than half." },
      { title: "Process Automation Excellence",      desc: "Smart contracts execute business logic automatically, removing manual intervention, human error, and processing delays from critical workflows." },
      { title: "Market Positioning Advantages",      desc: "Early blockchain adopters gain a reputation for innovation while building technical capabilities competitors will spend years trying to match." },
      { title: "Enterprise-Grade Protection",        desc: "Distributed architecture, cryptographic security, and immutable audit trails create security postures traditional systems simply cannot replicate." },
      { title: "Confidential Information Management",desc: "Share data with partners without exposing underlying details. Our privacy-preserving blockchain architectures enable collaboration while protecting sensitive information." },
    ],
  },
  whyChoose: {
    eyebrow: "Why Elchai",
    heading: "What Sets Our Approach Apart",
    body:
      "We've built our reputation on delivering results, not promises. Here's why leading enterprises choose us for critical blockchain initiatives.",
    items: [
      { title: "Recognized Industry Authority", desc: "Years of hands-on experience across hundreds of implementations gives us pattern recognition others simply don't have. We've seen what works and what fails." },
      { title: "Customized For Your Context",   desc: "No templates, no generic solutions. Every engagement produces strategies and systems designed specifically for your business model and competitive environment." },
      { title: "Complete Service Portfolio",    desc: "One partner from initial consultation through post-launch optimization. No handoffs to other vendors, no gaps in service delivery." },
      { title: "Security-Obsessed Culture",     desc: "We assume breach and design accordingly. Multi-layer security, comprehensive audits, and defense-in-depth thinking protect your implementations from day one." },
      { title: "Proven ROI Delivery",           desc: "Our implementations generate measurable returns. Cost reductions, revenue increases, efficiency gains. We track metrics and prove value." },
      { title: "Always-Available Expertise",    desc: "Technical challenges don't wait for office hours. Our global team provides round-the-clock support ensuring your blockchain infrastructure stays operational." },
    ],
  },
  techStack: {
    eyebrow: "Platforms",
    heading: "Technology Stack Mastery Across Leading Platforms",
    body:
      "We work with every major blockchain framework, selecting the right technology for your specific requirements rather than forcing one-size-fits-all solutions.",
    groups: [
      {
        title: "Supported Networks",
        items: [
          "Binance", "Arbitrum", "Ethereum", "zkSync", "Avalanche", "Starknet", "R3 Corda",
          "Solana", "Optimism", "Polkadot", "Polygon zkEVM", "Cardano", "Hyperledger Fabric", "Quorum",
        ],
      },
    ],
  },
  process: {
    eyebrow: "Methodology",
    heading: "Our Tested Implementation Methodology",
    body:
      "Successful blockchain projects follow disciplined processes, here's exactly how we take concepts to production.",
    steps: [
      { title: "Problem Definition",       desc: "What exactly are we solving? We identify core challenges, break problems into components, and determine if blockchain is the optimal solution." },
      { title: "Strategic Exploration",    desc: "Deep dive into business objectives through collaborative workshops, emerging with targeted strategies that connect blockchain capabilities to desired outcomes." },
      { title: "Specification Development",desc: "Comprehensive requirements documentation, competitive landscape analysis, and detailed implementation roadmaps that guide the entire project." },
      { title: "Architecture Creation",    desc: "Custom technical designs integrating blockchain with existing systems, ensuring solutions meet both current needs and future scalability requirements." },
      { title: "Solution Building",        desc: "Disciplined development following approved specifications, creating production-ready platforms with clean code and comprehensive documentation." },
      { title: "Quality Assurance",        desc: "Rigorous testing including security audits, performance validation, and user acceptance verification ensures flawless operation at launch." },
      { title: "Production Launch",        desc: "Controlled deployment with monitoring, ensuring stable operation and complete stakeholder satisfaction from day one." },
      { title: "Ongoing Evolution",        desc: "Continuous support, regular updates, and rapid issue resolution keeping your blockchain infrastructure optimized and current." },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    heading: "Blockchain Consulting — Common Questions",
    items: [
      { q: "Where does blockchain consulting usually start?",
        a: "A discovery sprint: business goals, use cases, regulatory constraints, data flows and a candidate-architecture review. The output is a costed, sequenced roadmap — not a 'maybe blockchain' deliberation." },
      { q: "How do you decide if a use case actually needs blockchain?",
        a: "We test three criteria: multi-party trust, auditable shared state and decentralised settlement. If two-of-three apply and the cost/benefit clears the bar, blockchain is in scope. Otherwise we recommend a conventional database — honestly." },
      { q: "Which blockchain platform do you typically recommend?",
        a: "Public chains (Ethereum, L2s) for open ecosystems and tokenisation. Permissioned chains (Hyperledger Fabric, Quorum) for regulated enterprise consortia. Hybrid for RWA tokenisation. The right answer comes out of discovery, not vendor preference." },
      { q: "How do you handle UAE-specific regulatory exposure?",
        a: "We map every project to VARA (virtual assets), DFSA (DIFC fintech), CBUAE (banking), SCA (securities) and ADGM as relevant. Compliance design is integrated with technical architecture from day one, not bolted on at the end." },
      { q: "How long does a consulting engagement run?",
        a: "Strategy sprints: 4–6 weeks. Architecture and roadmap with vendor selection: 8–12 weeks. Embedded execution support is scoped separately — typically a 3–6 month retainer alongside the build team." },
      { q: "Do you implement after the strategy, or just advise?",
        a: "Both options are available. Many clients run strategy with us and execution with their internal team (we transition). Others retain Elchai for delivery. The handover plan is part of every consulting engagement." },
    ],
  },
  closing: {
    heading: "Transform Your Business With Consulting Focused On Measurable Value Creation And Genuine ROI.",
    body: "Work With Certified Experts Who Understand Both Blockchain Technology And Your Industry's Unique Requirements.",
    cta: { label: "Start Your Journey", href: "#consultation" },
  },
};

// ─────────────────────────────────────────────────────────────────────────
// Batch 8: Layer 1/2 · Token · Meme Coin · IDO
// ─────────────────────────────────────────────────────────────────────────

const layer1: ServiceDetailContent = {
  slug: "layer-1",
  category: "Blockchain · Services",
  hero: {
    eyebrow: "Layer 1",
    heading: "Layer 1 Blockchain Development",
    subheading: "Engineer Sovereign Chains, Consensus, and Validator Networks",
    body:
      "Build production-grade L1 protocols — consensus design, cryptoeconomics, execution environments, and validator infrastructure delivered by senior engineers.",
    primaryCta: { label: "Talk to Our L1 Team", href: "#consultation" },
    ghostCta: { label: "See Services", href: "#capabilities" },
  },
  stats: [
    { value: "200+",   label: "Smart Contracts Deployed" },
    { value: "3,000+", label: "Validator Nodes Managed" },
    { value: "30+",    label: "L1 Engagements" },
    { value: "8+",     label: "Years Protocol Expertise" },
  ],
  capabilities: {
    eyebrow: "Capabilities",
    heading: "Our Suite Of Comprehensive Layer 1 Development",
    items: [
      { title: "Protocol Design & Architecture",     desc: "End-to-end protocol design with formal specifications, threat models, and economic security analysis." },
      { title: "Consensus Mechanism Engineering",    desc: "BFT, PoS, PoA, and hybrid consensus implementations tuned to throughput, finality, and decentralization requirements." },
      { title: "Cryptoeconomic Design",              desc: "Token economics, validator incentives, slashing, and inflation models with simulation-backed validation." },
      { title: "Execution Environment Integration",  desc: "EVM, WASM, and custom VM execution layers — including state migration and developer tooling." },
      { title: "Network Protocol Optimization",      desc: "P2P networking, gossip protocols, and bandwidth optimization for high-throughput chains." },
      { title: "Interoperability Protocol Development", desc: "IBC, cross-chain messaging, and bridge protocols designed for security and composability." },
      { title: "Validator Network Architecture",     desc: "Validator onboarding, monitoring, key management, and operational tooling for production networks." },
      { title: "On-Chain Governance Systems",        desc: "Treasury, parameter, and protocol governance modules with safe-upgrade patterns." },
    ],
  },
  closing: {
    heading: "Build the L1 Your Ecosystem Needs",
    body: "Partner with protocol engineers who have shipped production Layer 1 networks.",
    cta: { label: "Book Free Consultation", href: "#consultation" },
  },
};

const layer2: ServiceDetailContent = {
  slug: "layer-2",
  category: "Blockchain · Services",
  hero: {
    eyebrow: "Layer 2",
    heading: "Layer 2 Blockchain Development",
    subheading: "Rollups, ZK Proofs, and Scaling Infrastructure",
    body:
      "Production L2 development — optimistic and ZK rollups, sequencer infrastructure, data availability, bridges, and fee markets engineered for institutional scale.",
    primaryCta: { label: "Talk to Our L2 Team", href: "#consultation" },
    ghostCta: { label: "See Services", href: "#capabilities" },
  },
  stats: [
    { value: "200+",  label: "Rollup Contracts Deployed" },
    { value: "3000+", label: "Nodes Operated" },
    { value: "30+",   label: "L2 Engagements" },
    { value: "8+",    label: "Years Scaling Expertise" },
  ],
  capabilities: {
    eyebrow: "Capabilities",
    heading: "Our Comprehensive Layer 2 Development Suite",
    items: [
      { title: "Rollup Architecture & Design",      desc: "End-to-end rollup design with state-machine specification, fraud-proof or validity-proof choice, and security analysis." },
      { title: "Optimistic Rollup Implementation",  desc: "Production OR implementations with fraud proofs, dispute resolution, and bonded sequencer operation." },
      { title: "Zero-Knowledge Rollup Engineering", desc: "ZK-EVM and ZK-app-chain development with circuit design, proving infrastructure, and verifier contracts." },
      { title: "Sequencer Infrastructure Design",   desc: "Centralized, decentralized, and shared sequencer architectures with MEV-aware ordering policies." },
      { title: "Data Availability Strategy",        desc: "Calldata, blobspace (EIP-4844), and external DA layers — designed for cost, censorship-resistance, and security." },
      { title: "Bridge & Settlement Architecture",  desc: "Native and third-party bridge integrations with proof systems, monitoring, and emergency exit guarantees." },
      { title: "Fee Market Engineering",            desc: "EIP-1559-style fee markets, gas accounting, and revenue distribution policies for L2 economies." },
      { title: "State Migration & Compatibility",   desc: "EVM-equivalence, state import, and seamless migration paths for dApps moving from L1 to L2." },
    ],
  },
  closing: {
    heading: "Scale Your Chain With Production-Grade L2 Infrastructure",
    body: "Talk to Elchai's rollup engineers about the L2 architecture your project needs.",
    cta: { label: "Book Free Consultation", href: "#consultation" },
  },
};

const tokenDevelopment: ServiceDetailContent = {
  slug: "token-development",
  category: "Blockchain · Blockchain",
  hero: {
    eyebrow: "Token Development",
    heading: "Crypto Token Development Company",
    subheading: "Unlock new revenue streams with custom token development.",
    body:
      "Utility, security, NFT, and DeFi tokens — engineered with on-chain economics, compliance, and lifecycle management from day one.",
    primaryCta: { label: "Develop Your Token", href: "#consultation" },
    ghostCta: { label: "See Services", href: "#capabilities" },
  },
  capabilities: {
    eyebrow: "Services",
    heading: "Varied Custom Token Development Services",
    items: [
      { title: "ERC-20 Token Development",        desc: "Production ERC-20 tokens with vesting, treasury controls, and audit-ready event logging." },
      { title: "NFT Token Development",           desc: "ERC-721 and ERC-1155 collections with metadata management, lazy minting, and royalty enforcement." },
      { title: "Security Token Development",      desc: "ERC-1400 and ERC-3643 security tokens with KYC, accreditation, and jurisdictional rule enforcement." },
      { title: "DeFi Token Development",          desc: "Tokens engineered for staking, governance, and liquidity-mining integrations across DeFi protocols." },
      { title: "Cross-Chain Token Development",   desc: "Native multi-chain tokens with mint/burn bridges, supply reconciliation, and unified governance." },
      { title: "Token Wallet Development",        desc: "Custom wallet integrations with token-specific UX for vesting, claiming, and governance flows." },
      { title: "ICO/IDO/STO Token Launch",        desc: "Compliant sale infrastructure with allocation logic, KYC gating, and on-chain claim flows." },
      { title: "Tron Token Development",          desc: "TRC-10 and TRC-20 token development with Tron-native ecosystem integrations." },
    ],
  },
  closing: {
    heading: "Develop Commercial-Driven Tokens to Strengthen Your Market Position",
    body: "Talk to Elchai's token engineers about the right standard and architecture for your project.",
    cta: { label: "Book Free Consultation", href: "#consultation" },
  },
};

const memeCoinDevelopment: ServiceDetailContent = {
  slug: "meme-coin-development",
  category: "Cryptocurrency · Launch",
  hero: {
    eyebrow: "Meme Coin",
    heading: "Your Strategic Partner in Meme Coin Development",
    subheading: "Launch fun, viral, community-driven tokens — engineered safely.",
    body:
      "Meme coins built for virality with the operational discipline of institutional projects: audited contracts, anti-bot mitigations, and sustainable tokenomics.",
    primaryCta: { label: "Launch Your Meme Coin", href: "#consultation" },
    ghostCta: { label: "See Why", href: "#capabilities" },
  },
  stats: [
    { value: "30+", label: "Meme Coin Launches" },
    { value: "50+", label: "Communities Built" },
    { value: "15+", label: "Exchange Listings" },
    { value: "80%", label: "Listed Within 30 Days" },
  ],
  capabilities: {
    eyebrow: "Why Meme",
    heading: "Why Launch a Meme Coin With Elchai",
    items: [
      { title: "High Return Potential",       desc: "Cultural momentum drives outsized growth — when paired with disciplined economics and audited contracts." },
      { title: "Entertainment That Converts", desc: "Story-first launches that build community, not just token charts." },
      { title: "Scalable Mass Adoption",      desc: "Low-friction onboarding, multi-chain availability, and creator-tooling for viral momentum." },
      { title: "Low Entry Barrier",           desc: "Affordable token economics designed for retail and community participation from day one." },
      { title: "Seamless Accessibility",      desc: "DEX integrations, fiat ramps, and wallet experiences designed for non-crypto-native users." },
      { title: "Creative Freedom",            desc: "Brand, narrative, and ecosystem design owned by you — we engineer the rails." },
    ],
  },
  closing: {
    heading: "Complete Meme Coin Development Solutions",
    body: "Partner with engineers who balance virality with the technical discipline serious projects deserve.",
    cta: { label: "Book Free Consultation", href: "#consultation" },
  },
};

const idoDevelopment: ServiceDetailContent = {
  slug: "ido-development",
  category: "Cryptocurrency · Launch",
  hero: {
    eyebrow: "IDO Development",
    heading: "IDO Development Company",
    subheading: "Your Complete IDO Development Partner",
    body:
      "Initial DEX Offering infrastructure — token contracts, sale logic, KYC integration, distribution, and post-launch growth — engineered for compliant, successful launches.",
    primaryCta: { label: "Launch Your IDO", href: "#consultation" },
    ghostCta: { label: "See Infrastructure", href: "#capabilities" },
  },
  capabilities: {
    eyebrow: "Infrastructure",
    heading: "IDO Infrastructure Powering DeFi Innovation Across Verticals",
    items: [
      { title: "Decentralized Applications That Deliver Results", desc: "Front-end and smart-contract layers production-tuned for sale day spikes and ongoing claim flows." },
      { title: "Enterprise-Ready Web3 Infrastructure",            desc: "KYC-gated allocation, anti-bot mitigations, and emergency pause systems for safe launches." },
      { title: "Strategic Blockchain Implementation Expertise",   desc: "Chain and DEX venue selection guided by liquidity profile, user base, and regulatory considerations." },
    ],
  },
  industries: {
    eyebrow: "Verticals",
    heading: "Launch with Tailored IDO Infrastructure for Your Vertical",
    items: [
      { title: "DeFi Protocols & DEX Platforms" },
      { title: "GameFi & Metaverse Economies" },
      { title: "NFT Marketplaces" },
      { title: "Real Estate & Asset Tokenization" },
      { title: "Supply Chain & Logistics" },
      { title: "AI & Data Platforms" },
    ],
  },
  closing: {
    heading: "Ready to Launch Your IDO?",
    body: "Talk to Elchai about the launch infrastructure your token deserves.",
    cta: { label: "Book Free Consultation", href: "#consultation" },
  },
};

// ─────────────────────────────────────────────────────────────────────────
// Batch 9 (Company): About Us · Mobile App Development
// ─────────────────────────────────────────────────────────────────────────

const aboutUs: ServiceDetailContent = {
  slug: "about-us",
  category: "Company",
  hero: {
    eyebrow: "About Us",
    heading: "We're Your Digital Technological Partners",
    subheading: "We've Empowered Businesses, Countries, and Industries.",
    body:
      "Elchai is a Dubai-based digital transformation partner combining strategic foresight with senior engineering. We help organisations design and build the AI and blockchain systems that drive their next chapter.",
    primaryCta: { label: "Work With Us", href: "#consultation" },
    ghostCta: { label: "Meet The Team", href: "#capabilities" },
  },
  stats: [
    { value: "80+", label: "Businesses Empowered" },
    { value: "80+", label: "Countries Served" },
    { value: "80+", label: "Engineers" },
    { value: "80+", label: "AI & Blockchain Projects" },
  ],
  capabilities: {
    eyebrow: "Values",
    heading: "What We Stand For",
    items: [
      { title: "Engineering Excellence",   desc: "Senior engineers who have shipped production AI and blockchain systems at institutional scale — not generalists with a Web3 sticker." },
      { title: "Strategic Foresight",      desc: "Technology choices grounded in your P&L. We architect for the business you're becoming, not just the demo you need." },
      { title: "Transparent Delivery",     desc: "Open roadmaps, weekly demos, and milestone-based delivery. You always know what's shipped, what's next, and why." },
      { title: "Long-Term Partnership",    desc: "We're invested in outcomes, not engagements. Many client relationships span years across multiple programmes." },
      { title: "Regulatory Awareness",     desc: "Compliance, jurisdiction, and security designed into the architecture from day one — not bolted on at audit time." },
      { title: "Global Footprint, Dubai Roots", desc: "Headquartered in Dubai with operating presence across Europe, the Gulf, and beyond. 24/7 coverage across time zones." },
    ],
  },
  whyChoose: {
    eyebrow: "Team",
    heading: "Leadership You Can Talk To",
    items: [
      { title: "Founders With Domain Depth",  desc: "Operators who have built and exited technology businesses across finance, blockchain, and enterprise software." },
      { title: "Senior Engineering Bench",    desc: "Architects and tech leads with decade-plus experience across production systems handling real volume." },
      { title: "Cross-Disciplinary Capacity", desc: "Strategy, design, engineering, and operations under one roof — no handoffs between consultancies and delivery partners." },
    ],
  },
  closing: {
    heading: "Build the Next Chapter With Elchai",
    body: "Talk to our leadership about your AI, blockchain, or digital transformation programme.",
    cta: { label: "Schedule a Consultation", href: "#consultation" },
  },
};

const mobileAppDevelopment: ServiceDetailContent = {
  slug: "mobile-app-development",
  category: "App Development",
  hero: {
    eyebrow: "Mobile App Development",
    heading: "Elite Mobile App Development Partner for Scale and Intelligence",
    subheading: "Driving Commercial Success, Powered by Intelligence",
    body:
      "Native and cross-platform mobile applications engineered with AI capabilities built-in, secure backends, and the operational discipline production apps require.",
    primaryCta: { label: "Start Your App", href: "#consultation" },
    ghostCta: { label: "See Capabilities", href: "#capabilities" },
  },
  capabilities: {
    eyebrow: "Capabilities",
    heading: "Complete Mobile App Development Solutions",
    items: [
      { title: "Native iOS Development",          desc: "Swift/SwiftUI apps engineered for App Store excellence — performance, design polish, and platform-native UX." },
      { title: "Native Android Development",      desc: "Kotlin/Jetpack Compose applications with Material 3 design and modern Android architecture patterns." },
      { title: "Cross-Platform Development",      desc: "React Native and Flutter apps with shared codebases that don't compromise on native feel or performance." },
      { title: "AI-Powered Mobile Features",      desc: "On-device and cloud AI integrations — vision, NLP, recommendations — engineered for mobile constraints." },
      { title: "Backend & API Engineering",       desc: "Scalable backends, real-time sync, and offline-first architectures designed for mobile from the API up." },
      { title: "DevOps & Release Engineering",    desc: "Fastlane, EAS, and CI/CD pipelines that ship to TestFlight, Play Console, and OTA channels reliably." },
      { title: "App Store Optimization",          desc: "Submission readiness, ASO copy, screenshot design, and review-response playbooks." },
      { title: "Performance & Monitoring",        desc: "Crash reporting, performance instrumentation, and analytics built-in from launch day." },
    ],
  },
  whyChoose: {
    eyebrow: "Why Elchai",
    heading: "Talk to Developers Who've Scaled Businesses",
    items: [
      { title: "Senior Mobile Engineers",   desc: "Architects who have shipped apps with millions of installs across regulated and consumer markets." },
      { title: "AI-Native Mobile Stack",    desc: "We integrate AI as a core capability, not an add-on — from on-device inference to RAG-powered features." },
      { title: "End-to-End Delivery",       desc: "Strategy through store submission through ongoing operations under a single team." },
      { title: "Performance Discipline",    desc: "Cold-start, scroll, and animation budgets enforced from the first commit — not optimized at the end." },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    heading: "Mobile App Development — Common Questions",
    items: [
      { q: "Native, React Native or Flutter — what do you recommend?",
        a: "Native (SwiftUI / Kotlin) for performance-critical, OS-feature-heavy or strict-platform apps. React Native or Flutter for cross-platform speed with near-native UX. We recommend per project, not as a default — and explain the trade-offs honestly." },
      { q: "How long does it take to ship a mobile app?",
        a: "An MVP: 12–16 weeks. A polished v1 with backend, auth, payments and analytics: 16–24 weeks. Add 2–4 weeks for App Store / Play Store review, marketing assets and onboarding flows." },
      { q: "Do you handle App Store and Play Store submissions?",
        a: "Yes — including the metadata, screenshots, App Privacy / Data Safety disclosures, review escalations and post-launch updates. We've shipped through both stores under strict review constraints (crypto, finance, medical)." },
      { q: "Will my app work offline?",
        a: "Yes, if the use case calls for it. Local-first data layers (SQLite, Realm, Watermelon), conflict-resolution strategies, and sync engines (e.g. PowerSync, Y.js) are common in our offline-aware builds." },
      { q: "How do you handle performance on low-end devices?",
        a: "Budgets set at design (cold-start < 2s, scroll 60fps, animation 60fps) and enforced via CI perf checks on real devices. We test on iPhone SE and a low-tier Android, not just flagship hardware." },
      { q: "Who owns the app and source code at launch?",
        a: "You. Source repos, signing keys, store accounts and infrastructure transfer to your team. Post-launch retainers (maintenance, feature work, ASO) are optional and scoped separately." },
    ],
  },
  closing: {
    heading: "Seeking a Mobile App Development Partner Aligned With Your Industry Vision?",
    body: "Talk to Elchai's mobile engineering team about your next launch.",
    cta: { label: "Book Free Consultation", href: "#consultation" },
  },
};

// ─────────────────────────────────────────────────────────────────────────
// Registry
// ─────────────────────────────────────────────────────────────────────────

const REGISTRY: Record<string, ServiceDetailContent> = {
  [blockchainDevelopment.slug]: blockchainDevelopment,
  [aiConsultingServices.slug]: aiConsultingServices,
  [smartContract.slug]: smartContract,
  [defiDevelopment.slug]: defiDevelopment,
  [web3DevelopmentCompany.slug]: web3DevelopmentCompany,
  [metaverseDevelopment.slug]: metaverseDevelopment,
  [nftMarketplaceDevelopment.slug]: nftMarketplaceDevelopment,
  [dappDevelopment.slug]: dappDevelopment,
  [rwa.slug]: rwa,
  [cryptoWalletDevelopment.slug]: cryptoWalletDevelopment,
  [custodialWallet.slug]: custodialWallet,
  [decentralizedExchange.slug]: decentralizedExchange,
  [centralizedExchange.slug]: centralizedExchange,
  [icoDevelopment.slug]: icoDevelopment,
  [aiAssistantDevelopment.slug]: aiAssistantDevelopment,
  [aiIntegration.slug]: aiIntegration,
  [aiAutomation.slug]: aiAutomation,
  [aiDevelopment.slug]: aiDevelopment,
  [generativeAiDevelopment.slug]: generativeAiDevelopment,
  [aiBankingSolutions.slug]: aiBankingSolutions,
  [aiFintechSolutions.slug]: aiFintechSolutions,
  [aiLogisticsSoftware.slug]: aiLogisticsSoftware,
  [aiRealEstate.slug]: aiRealEstate,
  [aiEducationSoftware.slug]: aiEducationSoftware,
  // chatGpt removed — /chat-gpt 301-redirects to /generative-ai-development
  // (see next.config.ts). The const stays in this file so the existing
  // capability copy is preserved as a draft if /generative-ai-development
  // is later refreshed with the ChatGPT-specific content.
  [aiAgentDevelopment.slug]: aiAgentDevelopment,
  [machineLearningDevelopment.slug]: machineLearningDevelopment,
  [llmDevelopmentPartner.slug]: llmDevelopmentPartner,
  [computerVisionSoftwareDevelopment.slug]: computerVisionSoftwareDevelopment,
  [ragDevelopmentCompany.slug]: ragDevelopmentCompany,
  [rpaDevelopmentPartner.slug]: rpaDevelopmentPartner,
  [aiVoiceAssist.slug]: aiVoiceAssist,
  [aiTool.slug]: aiTool,
  [blockchainConsultingServices.slug]: blockchainConsultingServices,
  [layer1.slug]: layer1,
  [layer2.slug]: layer2,
  [tokenDevelopment.slug]: tokenDevelopment,
  [memeCoinDevelopment.slug]: memeCoinDevelopment,
  [idoDevelopment.slug]: idoDevelopment,
  [aboutUs.slug]: aboutUs,
  [mobileAppDevelopment.slug]: mobileAppDevelopment,
};

export function getServiceDetailContent(slug: string): ServiceDetailContent | null {
  return REGISTRY[slug] ?? null;
}

export function listServiceDetailSlugs(): string[] {
  return Object.keys(REGISTRY);
}
