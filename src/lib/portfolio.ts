/**
 * Portfolio registry — single source of truth for /portfolios.
 *
 * Source: elchaigroup.com/portfolios scrape, 2026-05-21. Asset filenames
 * match the originals under /public/elchai/portfolio so visual parity is
 * trivial to verify.
 */

export type PortfolioCategory =
  | "Healthcare"
  | "Delivery"
  | "Transportation"
  | "Food"
  | "Ecommerce"
  | "Super App"
  | "Legal";

export type PortfolioTag =
  | "Enterprise"
  | "RWA"
  | "DeFi"
  | "Crypto Wallet"
  | "NFT"
  | "Metaverse"
  | "Document Management"
  | "Trading Platform"
  | "Legal Tech AI"
  | "Healthcare AI"
  | "Healthcare"
  | "AI"
  | "Sports"
  | "Super App"
  | "Pickup & Delivery"
  | "Cashback App"
  | "Legal"
  | "Food"
  | "Ecommerce"
  | "Transportation"
  | "Taxi"
  | "On - Demand"
  | "Home Service"
  | "Delivery"
  | "Grocery";

export type PortfolioStoreKind = "play" | "apple" | "website";

export interface PortfolioStore {
  kind: PortfolioStoreKind;
  href: string;
}

export interface PortfolioStat {
  value: string;
  label: string;
}

export interface PortfolioItem {
  slug: string;
  tag: PortfolioTag;
  /** Categories this item belongs to (for filter chips). */
  categories: PortfolioCategory[];
  /** Marketing title shown on card. */
  title: string;
  description: string;
  /** Up to 4 capability bullets shown as pill tags on enterprise cards. */
  features?: string[];
  /** Up to 3 numeric stats shown on SMB cards (downloads, rating, funding). */
  stats?: PortfolioStat[];
  stores: PortfolioStore[];
  /** Optional live demo video URL (YouTube). */
  liveDemo?: string;
  /** Visual assets — paths under /public/elchai/portfolio/. */
  assets: {
    logo: string;
    app: string;
    bg: string;
  };
}

const ASSET_DIR = "/elchai/portfolio";
const a = (file: string) => `${ASSET_DIR}/${file}`;

export const PORTFOLIO_CATEGORIES: ("All" | PortfolioCategory)[] = [
  "All",
  "Healthcare",
  "Delivery",
  "Transportation",
  "Food",
  "Ecommerce",
  "Super App",
  "Legal",
];

export const PORTFOLIO_GALLERY: string[] = [
  a("portfolio-gallery-img_1.webp"),
  a("portfolio-gallery-img_2.webp"),
  a("portfolio-gallery-img_3.webp"),
  a("portfolio-gallery-img_4.webp"),
  a("portfolio-gallery-img_5.webp"),
  a("portfolio-gallery-img_6.webp"),
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    slug: "skillswap",
    tag: "Enterprise",
    categories: [],
    title: "AI-Powered Skill Exchange Platform",
    description:
      "A peer-to-peer learning platform enabling users to exchange skills, collaborate in real time, and build knowledge-driven communities.",
    features: [
      "Smart skill matching",
      "Real-time collaboration",
      "Peer learning ecosystem",
      "Community-driven growth",
    ],
    stores: [{ kind: "website", href: "#consultation" }],
    liveDemo: "https://youtu.be/KX_rSsgN3EQ",
    assets: {
      logo: a("Skillswap-logo.webp"),
      app: a("Skillswap-app1.webp"),
      bg: a("Skillswap-bg.webp"),
    },
  },
  {
    slug: "luminadoc",
    tag: "Enterprise",
    categories: [],
    title: "AI Document Intelligence Platform",
    description:
      "An AI-powered document management solution that automates analysis, extraction, and organization of complex digital documents.",
    features: [
      "Intelligent document analysis",
      "Automated data extraction",
      "Smart content categorization",
      "Advanced document search",
    ],
    stores: [{ kind: "website", href: "#consultation" }],
    liveDemo: "https://youtu.be/uDLA3fp44RM",
    assets: {
      logo: a("luminadoc-logo.webp"),
      app: a("luminadoc-app.webp"),
      bg: a("luminadoc-bg.webp"),
    },
  },
  {
    slug: "center-ai-vision",
    tag: "Enterprise",
    categories: [],
    title: "Enterprise AI Vision & Analytics",
    description:
      "A scalable AI vision platform delivering real-time visual analysis and actionable insights across enterprise operations.",
    features: [
      "Real-time visual analytics",
      "Computer vision intelligence",
      "Scalable AI infrastructure",
      "Actionable operational insights",
    ],
    stores: [{ kind: "website", href: "#consultation" }],
    liveDemo: "https://youtu.be/qDwS2RzeRwg",
    assets: {
      logo: a("center-AI-Vision-logo.webp"),
      app: a("Enterprise-AI-Vision-image.webp"),
      bg: a("Enterprise-bg.webp"),
    },
  },
  {
    slug: "digital-banking",
    tag: "Enterprise",
    categories: [],
    title: "Metaverse-Enabled Digital Banking",
    description:
      "A next-generation digital banking platform combining immersive virtual environments with secure financial services.",
    features: [
      "Immersive virtual banking",
      "Secure digital transactions",
      "Metaverse financial services",
      "Digital asset management",
    ],
    stores: [{ kind: "website", href: "#consultation" }],
    liveDemo: "https://youtu.be/ajTne1nW2pE",
    assets: {
      logo: a("Digital_Banking_logo.webp"),
      app: a("DigitalBanking-image.webp"),
      bg: a("Enterprise-bg.webp"),
    },
  },
  {
    slug: "solos",
    tag: "RWA",
    categories: [],
    title: "Tokenizing Real-World Assets for the Digital Age",
    description:
      "Advanced platform bridging physical assets with blockchain technology, making real-world asset investment accessible through fractional ownership and secure tokenization.",
    features: [
      "Asset tokenization",
      "Fractional ownership",
      "Automated compliance",
      "Smart dividend distribution",
    ],
    stores: [{ kind: "website", href: "https://solosfi.com/" }],
    assets: {
      logo: a("solos-logo.webp"),
      app: a("solos-app.webp"),
      bg: a("solos-bg.webp"),
    },
  },
  {
    slug: "hommies",
    tag: "DeFi",
    categories: [],
    title: "Empowering Communities Through Decentralized Finance",
    description:
      "A groundbreaking DeFi ecosystem that revolutionizes community finance with secure document management and innovative financial solutions. The platform bridges traditional finance with blockchain technology, making DeFi accessible to middle-class communities.",
    features: [
      "Secure document storage",
      "Decentralized marketplace",
      "Advanced staking mechanism",
      "Community DAO governance",
    ],
    stores: [{ kind: "website", href: "https://www.hommiestoken.com/" }],
    assets: {
      logo: a("hommies-logo.webp"),
      app: a("hommies-app.webp"),
      bg: a("hommies-bg.webp"),
    },
  },
  {
    slug: "coinosh",
    tag: "Crypto Wallet",
    categories: [],
    title: "Your Gateway to Multi-Chain Crypto Management",
    description:
      "A next-generation cryptocurrency wallet offering seamless multi-chain transactions and integrated DeFi capabilities. Built with military-grade security and an intuitive interface for both beginners and advanced users.",
    features: [
      "Multi-cryptocurrency support",
      "Cross-chain transactions",
      "Real-time portfolio tracking",
      "Fiat-to-crypto gateway",
    ],
    stores: [
      {
        kind: "apple",
        href: "https://apps.apple.com/in/app/coinbox-wallet/id1643090324",
      },
    ],
    assets: {
      logo: a("coinosh-logo.webp"),
      app: a("coinosh-app.webp"),
      bg: a("coinosh-bg.webp"),
    },
  },
  {
    slug: "cryptonmedia",
    tag: "NFT",
    categories: [],
    title: "Where Digital Art Meets Blockchain Innovation",
    description:
      "A comprehensive NFT marketplace enabling creators and collectors to mint, trade, and manage digital assets across multiple blockchains. Features advanced trading mechanisms and automated royalty distribution.",
    features: [
      "One-click NFT minting",
      "Dynamic auction system",
      "Cross-chain trading",
      "Creator tools suite",
    ],
    stores: [{ kind: "website", href: "#consultation" }],
    assets: {
      logo: a("cryptonmedia-logo.webp"),
      app: a("cryptonmedia-app.webp"),
      bg: a("cryptonmedia-bg.webp"),
    },
  },
  {
    slug: "universe",
    tag: "Metaverse",
    categories: [],
    title: "Step Into the Future of Digital Reality",
    description:
      "An immersive metaverse platform combining AR/VR technology with blockchain to create engaging virtual experiences. Enables digital asset ownership and social interactions in a fully realized virtual world.",
    features: [
      "3D virtual environments",
      "Digital asset marketplace",
      "Virtual event hosting",
      "Cross-platform accessibility",
    ],
    stores: [{ kind: "website", href: "https://theuniverseye.com/" }],
    liveDemo: "https://youtu.be/C7BE7S34zgUE",
    assets: {
      logo: a("universe-logo.webp"),
      app: a("universe-app.webp"),
      bg: a("universe-bg.webp"),
    },
  },
  {
    slug: "u-vault",
    tag: "Document Management",
    categories: [],
    title: "Blockchain-Powered Document Security Solution",
    description:
      "Enterprise-grade document management platform leveraging blockchain technology for unmatched security and verification capabilities.",
    features: [
      "Encrypted storage",
      "QR code verification",
      "Access control",
      "Audit trail system",
    ],
    stores: [{ kind: "website", href: "https://u-vault.io/" }],
    assets: {
      logo: a("vault-logo.webp"),
      app: a("vault-app.webp"),
      bg: a("vault-bg.webp"),
    },
  },
  {
    slug: "deficlub",
    tag: "DeFi",
    categories: [],
    title: "Next-Generation Decentralized Rewards Platform",
    description:
      "A revolutionary platform combining DeFi features with transparent MLM structures, powered by smart contracts for automated and fair reward distribution.",
    features: [
      "Smart contract MLM",
      "Auto reward distribution",
      "Multi-level referrals",
      "Real-time analytics",
    ],
    stores: [{ kind: "website", href: "https://deficlub.biz/" }],
    assets: {
      logo: a("deficlub-logo.webp"),
      app: a("deficlub-app.webp"),
      bg: a("deficlub-bg.webp"),
    },
  },
  {
    slug: "amexa",
    tag: "Trading Platform",
    categories: [],
    title: "Where Traditional Finance Meets Crypto Innovation",
    description:
      "A comprehensive trading platform that seamlessly integrates traditional forex with decentralized finance, featuring advanced social trading capabilities and robust security measures.",
    features: [
      "Forex-crypto integration",
      "Copy trading system",
      "Multi-currency wallet",
      "P2P trading platform",
    ],
    stores: [{ kind: "website", href: "http://amexa.exchange/" }],
    assets: {
      logo: a("amexa-logo.webp"),
      app: a("amexa-app.webp"),
      bg: a("amexa-bg.webp"),
    },
  },
  {
    slug: "inlexso",
    tag: "Legal Tech AI",
    categories: ["Legal"],
    title: "Revolutionizing Legal Documentation Through AI",
    description:
      "A cutting-edge legal transcription platform that leverages advanced AI to transform court proceedings and legal consultations into precise, searchable documents. Features industry-leading accuracy and automated analysis capabilities.",
    features: [
      "Real-time transcription",
      "Multi-speaker recognition",
      "Automated legal citation detection",
      "Intelligent search system",
    ],
    stores: [
      {
        kind: "website",
        href: "https://inlexso.co.za/accurate-transcriptions/",
      },
    ],
    assets: {
      logo: a("inlexso-logo.webp"),
      app: a("inlexso-app.webp"),
      bg: a("inlexso-bg.webp"),
    },
  },
  {
    slug: "ingeni",
    tag: "Healthcare AI",
    categories: ["Healthcare"],
    title: "AI-Powered Healthcare Companion for Elderly Care",
    description:
      "A revolutionary healthcare assistant that transforms elderly care management through advanced voice AI and intelligent automation. This innovative solution seamlessly integrates healthcare monitoring, medication management, and emergency response into one intuitive platform.",
    features: [
      "Voice-powered health monitoring",
      "Smart medication tracking",
      "Intelligent appointment management",
      "Emergency response system",
    ],
    stores: [{ kind: "website", href: "https://ingenihealth.com/" }],
    assets: {
      logo: a("ingeni-logo.webp"),
      app: a("ingeni-app.webp"),
      bg: a("ingeni-bg.webp"),
    },
  },
  {
    slug: "nursing",
    tag: "Healthcare",
    categories: ["Healthcare"],
    title: "Healthcare Services in the UAE",
    description:
      "A mobile platform connecting patients with professional home nursing services. It offers a range of healthcare services at home, improving accessibility to quality medical care.",
    stats: [
      { value: "10+", label: "Downloads" },
      { value: "5/5", label: "Avg. Rating" },
    ],
    stores: [],
    assets: {
      logo: a("portfolio-log-Nursing.webp"),
      app: a("portfolio-app-Nursing.webp"),
      bg: a("portfolio-app-Nursing-bg.webp"),
    },
  },
  {
    slug: "bobble-ai",
    tag: "AI",
    categories: [],
    title: "AI-Powered Keyboard App in the US",
    description:
      "An intelligent keyboard application that enhances communication with AI-driven features such as contextual emoji suggestions, personalized stickers, and predictive text, making typing more expressive and efficient.",
    stats: [
      { value: "5Cr+", label: "Downloads" },
      { value: "4.2/5", label: "Avg. Rating" },
    ],
    stores: [
      {
        kind: "play",
        href: "https://play.google.com/store/apps/details?id=com.touchtalent.bobbleapp&hl=en_IN&gl=US",
      },
      {
        kind: "apple",
        href: "https://apps.apple.com/in/app/bobble-gif-stickers-keyboard/id972432964",
      },
    ],
    assets: {
      logo: a("portfolio-logo-bobble.webp"),
      app: a("portfolio-app-bobble.webp"),
      bg: a("portfolio-app-bobble-bg.webp"),
    },
  },
  {
    slug: "grintafy",
    tag: "Sports",
    categories: [],
    title: "Popular Sports App in Saudi Arabia",
    description:
      "An exclusive football-centric app that allows users to create detailed player profiles, organize matches with friends, and connect with other enthusiasts. It's tailored to foster a vibrant football community in the region.",
    stats: [
      { value: "1M+", label: "Downloads" },
      { value: "4.6/5", label: "Avg. Rating" },
      { value: "$1M+", label: "Funding Raised" },
    ],
    stores: [
      {
        kind: "apple",
        href: "https://apps.apple.com/us/app/grintafy-%D9%82%D8%B1%D9%86%D8%AA%D8%A7%D9%81%D8%A7%D9%8A/id1278333539?ls=1",
      },
      {
        kind: "play",
        href: "https://play.google.com/store/apps/details?id=com.grintafyplayer&hl=en&pli=1",
      },
    ],
    assets: {
      logo: a("portfolio-log-grintafy.webp"),
      app: a("portfolio-app-grintafy.webp"),
      bg: a("portfolio-app-grintafy-bg.webp"),
    },
  },
  {
    slug: "yumm",
    tag: "Super App",
    categories: ["Super App"],
    title: "Multi-Service Super App for Venezuela",
    description:
      "A comprehensive platform that combines food delivery, ride-hailing, and various other services in one app. It's designed to simplify daily life by offering multiple solutions in a single interface.",
    stats: [
      { value: "1M+", label: "Downloads" },
      { value: "4.6/5", label: "Avg. Rating" },
      { value: "$69M", label: "Funding Raised" },
    ],
    stores: [
      {
        kind: "play",
        href: "https://play.google.com/store/apps/details?id=com.yummy.customer",
      },
    ],
    assets: {
      logo: a("portfolio-log-yumm.webp"),
      app: a("portfolio-app-yumm.webp"),
      bg: a("portfolio-app-yumm-bg.webp"),
    },
  },
  {
    slug: "zajel",
    tag: "Pickup & Delivery",
    categories: ["Delivery"],
    title: "Driver's Order Management and Navigation",
    description:
      "Comprehensive App for Drivers to Collect Payments, Track Orders, and Navigate to Customer Locations with Real-Time Updates and Efficient Routing",
    stats: [
      { value: "100+", label: "Downloads" },
      { value: "4.8/5", label: "Avg. Rating" },
    ],
    stores: [
      {
        kind: "play",
        href: "https://play.google.com/store/apps/details?id=com.zajeldriver&hl=en_IN&gl=US",
      },
    ],
    assets: {
      logo: a("portfolio-logo-Zajel.webp"),
      app: a("portfolio-app-Zajel.webp"),
      bg: a("portfolio-app-Zajel-bg.webp"),
    },
  },
  {
    slug: "homie",
    tag: "Cashback App",
    categories: [],
    title: "Community-Powered Cashback Platform in the UAE",
    description:
      "This unique app allow users discover, share, and earn cashback within their community, fostering a collaborative approach to finding the best deals on local products and services while maximizing returns on purchases.",
    stats: [
      { value: "100+", label: "Downloads" },
      { value: "5/5", label: "Avg. Rating" },
    ],
    stores: [
      {
        kind: "play",
        href: "https://play.google.com/store/apps/details?id=com.gohomie.app&hl=en",
      },
      { kind: "apple", href: "https://apps.apple.com/in/app/homie/id6450675083" },
    ],
    assets: {
      logo: a("portfolio-logo-Homie.webp"),
      app: a("portfolio-app-Homie.webp"),
      bg: a("portfolio-app-Homie-bg.webp"),
    },
  },
  {
    slug: "attorney-shield",
    tag: "Legal",
    categories: ["Legal"],
    title: "Comprehensive Legal Services Marketplace in the USA",
    description:
      "This groundbreaking app simplifies the process of finding and consulting with attorneys, offers legal document templates, and provides educational resources, democratizing access to legal services for the general public.",
    stats: [
      { value: "1K+", label: "Downloads" },
      { value: "5/5", label: "Avg. Rating" },
    ],
    stores: [
      {
        kind: "play",
        href: "https://play.google.com/store/apps/details?id=com.app.attorney.shield",
      },
      {
        kind: "apple",
        href: "https://apps.apple.com/us/app/attorney-shield-inc/id6477914618?uo=2",
      },
    ],
    assets: {
      logo: a("portfolio-logo-attorney.webp"),
      app: a("portfolio-app-attorney.webp"),
      bg: a("portfolio-app-attorney-bg.webp"),
    },
  },
  {
    slug: "hey-buddy",
    tag: "Food",
    categories: ["Food"],
    title: "Food Ordering Solution in the US",
    description:
      "A user-friendly app that simplifies the process of ordering food from local restaurants. It offers a wide range of cuisines, easy payment options, and real-time order tracking for a seamless experience.",
    stats: [
      { value: "1K+", label: "Downloads" },
      { value: "4.5/5", label: "Avg. Rating" },
    ],
    stores: [
      {
        kind: "apple",
        href: "https://apps.apple.com/in/app/hey-buddy-application/id1611729424",
      },
    ],
    assets: {
      logo: a("portfolio-log-buddy.webp"),
      app: a("portfolio-app-buddy.webp"),
      bg: a("portfolio-app-buddy-bg.webp"),
    },
  },
  {
    slug: "sabroson",
    tag: "Food",
    categories: ["Food"],
    title: "Simplifying Food Delivery & Pickup in Mexico",
    description:
      "Started with the goal to make food ordering, pickup and delivery efficient in Mexico, Sabrosón brings together multiple restaurants on one platform.",
    stats: [
      { value: "10K+", label: "Downloads" },
      { value: "4.5/5", label: "Avg. Rating" },
    ],
    stores: [
      {
        kind: "apple",
        href: "https://apps.apple.com/us/app/sabros%C3%B3n-app/id1635962198",
      },
      {
        kind: "play",
        href: "https://play.google.com/store/apps/details?id=com.sabroson.orders",
      },
    ],
    assets: {
      logo: a("portfolio-logo-sabroson.webp"),
      app: a("portfolio-app-sabroson.webp"),
      bg: a("portfolio-app-sabroson-bg.webp"),
    },
  },
  {
    slug: "meat",
    tag: "Food",
    categories: ["Food"],
    title: "Online Meat Delivery in Dubai",
    description:
      "A specialized app catering to meat lovers, offering a wide selection of fresh, high-quality meats delivered directly to customers' doorsteps. It ensures convenience without compromising on product quality.",
    stats: [
      { value: "1K+", label: "Downloads" },
      { value: "4.8/5", label: "Avg. Rating" },
    ],
    stores: [],
    assets: {
      logo: a("portfolio-logo-meat.webp"),
      app: a("portfolio-app-meat.webp"),
      bg: a("portfolio-app-meat-bg.webp"),
    },
  },
  {
    slug: "one-basket",
    tag: "Ecommerce",
    categories: ["Ecommerce"],
    title: "E-commerce Marketplace for Africa",
    description:
      "A comprehensive online shopping solution catering to the diverse market. It connects local and international sellers with consumers, offering a wide range of products and secure transaction options.",
    stats: [
      { value: "50+", label: "Downloads" },
      { value: "5/5", label: "Avg. Rating" },
    ],
    stores: [],
    assets: {
      logo: a("portfolio-log-One_Basket.webp"),
      app: a("portfolio-app-One_Basket.webp"),
      bg: a("portfolio-app-One_Basket-bg.webp"),
    },
  },
  {
    slug: "aybiz",
    tag: "Ecommerce",
    categories: ["Ecommerce"],
    title: "E-commerce Solution for Kuwait",
    description:
      "A one-stop online shopping platform offering a wide range of products from local and international brands. It provides a seamless shopping experience with secure payment options and efficient delivery.",
    stats: [
      { value: "5K+", label: "Downloads" },
      { value: "5/5", label: "Avg. Rating" },
    ],
    stores: [
      {
        kind: "play",
        href: "https://play.google.com/store/apps/details?id=com.aybiz.aybiz&hl=en_US",
      },
      { kind: "apple", href: "https://apps.apple.com/us/app/aybiz/id1066635411" },
    ],
    assets: {
      logo: a("portfolio-log-Aybiz.webp"),
      app: a("portfolio-app-Aybiz.webp"),
      bg: a("portfolio-app-Aybiz-bg.webp"),
    },
  },
  {
    slug: "destination-ops",
    tag: "Transportation",
    categories: ["Transportation"],
    title: "Taxi Booking App in the US",
    description:
      "An efficient ride-hailing solution connecting passengers with drivers across cities. It offers features like fare estimates, driver ratings, and multiple ride options to ensure a comfortable travel experience.",
    stats: [
      { value: "500+", label: "Downloads" },
      { value: "5/5", label: "Avg. Rating" },
    ],
    stores: [
      {
        kind: "apple",
        href: "https://apps.apple.com/us/app/destinationops-app/id1581966430",
      },
    ],
    assets: {
      logo: a("portfolio-logo-Destination_Ops.webp"),
      app: a("portfolio-app-Destination_Ops.webp"),
      bg: a("portfolio-app-Destination_Ops-bg.webp"),
    },
  },
  {
    slug: "aau-jaau",
    tag: "Transportation",
    categories: ["Transportation"],
    title: "Taxi Service App in Nepal",
    description:
      "A convenient transportation platform for booking rides in cities. It aims to improve urban mobility by connecting passengers with reliable drivers, offering transparent pricing and easy booking.",
    stats: [
      { value: "5K+", label: "Downloads" },
      { value: "4.8/5", label: "Avg. Rating" },
    ],
    stores: [
      {
        kind: "play",
        href: "https://play.google.com/store/apps/details?id=com.aauJau.order&pli=1",
      },
      {
        kind: "apple",
        href: "https://apps.apple.com/in/app/aau-jaau/id6443467982",
      },
    ],
    assets: {
      logo: a("portfolio-logo-AAU_JAAu.webp"),
      app: a("portfolio-app-AAU_JAAu.webp"),
      bg: a("portfolio-app-AAU_JAAu-bg.webp"),
    },
  },
  {
    slug: "ullaz",
    tag: "Transportation",
    categories: ["Transportation"],
    title: "Ride-Hailing App for Africa",
    description:
      "A user-friendly taxi booking platform designed to improve urban mobility. It offers convenient ride options, transparent pricing, and a seamless connection between passengers and drivers.",
    stats: [
      { value: "100+", label: "Downloads" },
      { value: "5/5", label: "Avg. Rating" },
    ],
    stores: [
      {
        kind: "play",
        href: "https://play.google.com/store/apps/details?id=com.ullazOrder&hl=en_GB&gl=US",
      },
      {
        kind: "apple",
        href: "https://apps.apple.com/in/app/ullaz-app/id1604764852",
      },
    ],
    assets: {
      logo: a("portfolio-logo-ullaz.webp"),
      app: a("portfolio-app-ullaz.webp"),
      bg: a("portfolio-app-ullaz-bg.webp"),
    },
  },
  {
    slug: "dot-taxi",
    tag: "Taxi",
    categories: ["Transportation"],
    title: "Taxi App in Germany",
    description:
      "A versatile platform for booking taxis for transportation. allows users to view available taxis in their area, compare prices from different taxi companies, and book a ride in a few easy steps.",
    stats: [
      { value: "100+", label: "Downloads" },
      { value: "4.8/5", label: "Avg. Rating" },
    ],
    stores: [
      {
        kind: "play",
        href: "https://play.google.com/store/apps/details?id=com.dotTaxi.order&hl=en&gl=GB",
      },
    ],
    assets: {
      logo: a("portfolio-logo-dot_taxi.webp"),
      app: a("portfolio-app-dot_taxi.webp"),
      bg: a("portfolio-app-dot_taxi-bg.webp"),
    },
  },
  {
    slug: "pickitt",
    tag: "On - Demand",
    categories: [],
    title: "On-Demand Services in the UAE",
    description:
      "A versatile app connecting residents with a wide range of on-demand services and local businesses. From home services to personal care, it offers a one-stop solution for various daily needs.",
    stats: [
      { value: "1K+", label: "Downloads" },
      { value: "4.8/5", label: "Avg. Rating" },
    ],
    stores: [
      {
        kind: "play",
        href: "https://play.google.com/store/apps/details?id=com.user.pickitt",
      },
      {
        kind: "apple",
        href: "https://apps.apple.com/in/app/pickitt/id1549206418",
      },
    ],
    assets: {
      logo: a("portfolio-logo-pickitt.webp"),
      app: a("portfolio-app-pickitt.webp"),
      bg: a("portfolio-app-pickitt-bg.webp"),
    },
  },
  {
    slug: "speedy",
    tag: "Super App",
    categories: ["Super App"],
    title: "Multi-Domain Service App in the US",
    description:
      "A versatile application providing various on-demand services, ranging from food delivery to home services. It aims to be a one-stop solution for multiple daily needs.",
    stats: [
      { value: "500+", label: "Downloads" },
      { value: "5/5", label: "Avg. Rating" },
    ],
    stores: [
      {
        kind: "play",
        href: "https://play.google.com/store/apps/details?id=com.speedydelivery.orders",
      },
      {
        kind: "apple",
        href: "https://apps.apple.com/us/app/speedy-delivery-pickup/id1659838417",
      },
    ],
    assets: {
      logo: a("portfolio-logo-speedy.webp"),
      app: a("portfolio-app-speedy.webp"),
      bg: a("portfolio-app-speedy-bg.webp"),
    },
  },
  {
    slug: "awamer",
    tag: "Super App",
    categories: ["Super App"],
    title: "Multi-Service Super App in Qatar",
    description:
      "An all-in-one platform offering various services to enhance daily life for residents. From food delivery to bill payments, it aims to be a comprehensive solution for multiple lifestyle needs in a single app.",
    stats: [
      { value: "10+", label: "Downloads" },
      { value: "5/5", label: "Avg. Rating" },
    ],
    stores: [
      {
        kind: "play",
        href: "https://play.google.com/store/apps/details?id=com.awamer.order&hl=en&gl=GB",
      },
    ],
    assets: {
      logo: a("portfolio-logo-awamer.webp"),
      // Awamer reuses the Speedy app screenshot on the live page.
      app: a("portfolio-app-speedy.webp"),
      bg: a("portfolio-app-awamer-bg.webp"),
    },
  },
  {
    slug: "tidy",
    tag: "Home Service",
    categories: [],
    title: "Home Services Platform in the US",
    description:
      "An efficient app that links homeowners with vetted cleaning and maintenance service providers. It simplifies the process of booking reliable home services, from regular cleaning to specialized maintenance tasks.",
    stats: [
      { value: "100+", label: "Downloads" },
      { value: "4.5/5", label: "Avg. Rating" },
    ],
    stores: [
      {
        kind: "play",
        href: "https://play.google.com/store/apps/details?id=com.tidycoop",
      },
      {
        kind: "apple",
        href: "https://apps.apple.com/us/app/tidy-coop/id1634164819",
      },
    ],
    assets: {
      logo: a("portfolio-logo-tidy.webp"),
      app: a("portfolio-app-tidy.webp"),
      bg: a("portfolio-app-tidy-bg.webp"),
    },
  },
  {
    slug: "protein-house",
    tag: "Food",
    categories: ["Food"],
    title: "Fitness-Focused Meal Delivery Service in the USA",
    description:
      "This specialized food delivery app focuses on protein-rich, nutritionally optimized meals. It offers a diverse menu of fitness-friendly options, enabling users to maintain their dietary goals without compromising on taste or convenience.",
    stats: [
      { value: "1K+", label: "Downloads" },
      { value: "4.5/5", label: "Avg. Rating" },
    ],
    stores: [
      {
        kind: "play",
        href: "https://play.google.com/store/apps/details?id=com.protein_house_react",
      },
    ],
    assets: {
      logo: a("portfolio-log-Protein_house.webp"),
      app: a("portfolio-app-Protein_house.webp"),
      bg: a("portfolio-app-Protein_house-bg.webp"),
    },
  },
  {
    slug: "parcelworks",
    tag: "Delivery",
    categories: ["Delivery"],
    title: "Logistics Solution in Dubai",
    description:
      "An efficient pickup and delivery service streamlining parcel management. It offers features like real-time tracking, flexible scheduling, and secure handling to enhance the logistics experience.",
    stats: [
      { value: "1K+", label: "Downloads" },
      { value: "4.9/5", label: "Avg. Rating" },
    ],
    stores: [
      {
        kind: "play",
        href: "https://play.google.com/store/apps/details?id=com.parcelworks.orders",
      },
      {
        kind: "apple",
        href: "https://apps.apple.com/us/app/parcel-works-driver-app/id6448753627",
      },
    ],
    assets: {
      logo: a("portfolio-logo-Parcelworks.webp"),
      app: a("portfolio-app-Parcelworks.webp"),
      bg: a("portfolio-app-Parcelworks-bg.webp"),
    },
  },
  {
    slug: "tiimo",
    tag: "Delivery",
    categories: ["Delivery"],
    title: "Pickup & Delivery App for Canada",
    description:
      "A versatile platform connecting users with local businesses for convenient pickup and delivery services. It covers a wide range of goods, from groceries to electronics, making daily errands easier for busy individuals.",
    stats: [
      { value: "10+", label: "Downloads" },
      { value: "5/5", label: "Avg. Rating" },
    ],
    stores: [
      {
        kind: "play",
        href: "https://play.google.com/store/apps/details?id=com.tiimo.orderApp",
      },
      {
        kind: "apple",
        href: "https://apps.apple.com/in/app/tiimo-delivery-services/id6447431420",
      },
    ],
    assets: {
      logo: a("portfolio-logo-tumo.webp"),
      app: a("portfolio-app-tumo.webp"),
      bg: a("portfolio-app-tumo-bg.webp"),
    },
  },
  {
    slug: "nitto-sadai",
    tag: "Grocery",
    categories: [],
    title: "Grocery Delivery App in France",
    description:
      "A convenient online grocery shopping platform that offers a wide range of products from local and international brands, with efficient delivery options to simplify daily shopping needs.",
    stats: [
      { value: "100+", label: "Downloads" },
      { value: "5/5", label: "Avg. Rating" },
    ],
    stores: [
      {
        kind: "apple",
        href: "https://apps.apple.com/us/app/nittosadai/id6444884195",
      },
    ],
    assets: {
      logo: a("portfolio-logo-nitto_sadai.webp"),
      app: a("portfolio-app-nitto_sadai.webp"),
      bg: a("portfolio-app-nitto_sadai-bg.webp"),
    },
  },
];
