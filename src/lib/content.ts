/**
 * content.ts — Single source of truth for all copy on the Elchai Group site.
 *
 * Source: elchai-content.md (Firecrawl scrape of https://www.elchaigroup.com/).
 * Every heading, paragraph, project name, stat label and FAQ answer is
 * preserved verbatim. Do not paraphrase. If a section reuses copy (e.g. the
 * industries marquee that duplicates its list), the duplication is kept so the
 * scroll behaviour matches the source.
 *
 * Structure mirrors the section order of the original homepage.
 */

// ---------------------------------------------------------------------------
// Site-wide
// ---------------------------------------------------------------------------

export const site = {
  brand: 'Elchai Group',
  url: 'https://www.elchaigroup.com/',
  email: 'info@elchaigroup.com',
  phone: '+971 4 883 7176',
  phoneHref: 'tel:+97148837176',
  whatsapp: 'https://web.whatsapp.com/send?phone=+971501080066',
  telegram: 'https://t.me/+971501080066',
  copyright: '© Elchai All rights reserved 2026',
  languages: [
    { label: 'العربية', code: 'ar' },
    { label: 'English', code: 'en' },
    { label: 'Italiano', code: 'it' },
    { label: 'Español', code: 'es' },
  ],
} as const;

// ---------------------------------------------------------------------------
// Primary navigation (mega menus)
// ---------------------------------------------------------------------------

export const nav = {
  blockchain: {
    label: 'Blockchain',
    columns: [
      {
        title: 'Blockchain',
        items: [
          { label: 'WEB 3', href: '/web3-development-company/' },
          { label: 'Metaverse', href: '/metaverse-development/' },
          { label: 'Enterprise Solutions', href: '#' },
          { label: 'DeFi', href: '#' },
          { label: 'Smart Contracts', href: '/smart-contract/' },
          { label: 'NFT', href: '/nft-marketplace-development/' },
          { label: 'Tokenization', href: '/rwa/' },
          { label: 'Infrastructure', href: '#' },
        ],
      },
      {
        title: 'Services',
        items: [
          { label: 'Blockchain Consultation', href: '/blockchain-consulting-services/' },
          { label: 'Blockchain Development', href: '/blockchain-development/' },
          { label: 'Real World Asset Tokenization', href: '/rwa/' },
          { label: 'DeFi Development', href: '/defi-development/' },
          { label: 'DApp Development', href: '/dapp-development/' },
          { label: 'Layer 1', href: '/layer-1/' },
          { label: 'Layer 2', href: '/layer-2/' },
        ],
      },
    ],
  },
  cryptocurrency: {
    label: 'Cryptocurrency',
    columns: [
      {
        title: 'Cryptocurrency',
        items: [
          { label: 'Crypto Wallet', href: '#' },
          { label: 'Crypto Trading Platforms', href: '#' },
          { label: 'ICO/STO/IDO Platform', href: '#' },
        ],
      },
      {
        title: 'Wallets',
        items: [
          { label: 'Crypto Wallet', href: '/crypto-wallet-development-company/' },
          { label: 'Custodial Wallets', href: '/custodial-wallet/' },
        ],
      },
      {
        title: 'Exchanges',
        items: [
          { label: 'Decentralized Exchanges (DEXs)', href: '/decentralized-exchange/' },
          { label: 'Centralized Exchanges (CEXs)', href: '/centralized-exchange/' },
        ],
      },
      {
        title: 'Launch',
        items: [
          { label: 'ICO Development', href: '/ico-development/' },
          { label: 'Coin Development', href: '/meme-coin-development/' },
          { label: 'IDO Development', href: '/ido-development/' },
        ],
      },
    ],
  },
  ai: {
    label: 'Artificial Intelligence',
    columns: [
      {
        title: 'AI Solutions',
        items: [
          { label: 'AI Assistants', href: '/ai-assistant-development/' },
          { label: 'AI Integration', href: '/ai-integration/' },
          { label: 'AI Automation', href: '/ai-automation/' },
          { label: 'AI Development', href: '/ai-development/' },
          { label: 'AI tool Development', href: '/ai-tool/' },
          { label: 'AI Consulting', href: '/ai-consulting-services/' },
          { label: 'Computer Vision', href: '/computer-vision-software-development/' },
          { label: 'LLM Development', href: '/llm-development-partner/' },
          { label: 'RAG Development', href: '/rag-development-company/' },
          { label: 'RPA Development', href: '/rpa-development-partner/' },
        ],
      },
      {
        title: 'Machine Learning',
        items: [
          { label: 'ML Development', href: '/machine-learning-development/' },
          { label: 'Hire ChatGPT Developer', href: '/generative-ai-development/' },
          { label: 'Agentic AI', href: '/ai-agent-development/' },
          { label: 'Voice Assistant', href: '/ai-voice-assist/' },
        ],
      },
      {
        title: 'Industries',
        items: [
          { label: 'AI In Healthcare', href: '/ai-healthcare-software-development/#' },
          { label: 'AI In Logistics', href: '/ai-logistics-software/' },
          { label: 'AI In Fintech', href: '/ai-fintech-solutions/' },
          { label: 'AI In Banking', href: '/ai-banking-solutions/' },
          { label: 'AI/ML For Education', href: '/ai-education-software/' },
          { label: 'AI In Real Estate', href: '/ai-real-estate/' },
        ],
      },
      {
        title: 'Generative AI',
        items: [
          { label: 'Generative AI Development', href: '/generative-ai-development/' },
        ],
      },
    ],
  },
  topLevel: [
    { label: 'App Development', href: '/mobile-app-development/' },
    {
      label: 'About Us',
      href: '/about-us/',
      children: [{ label: 'Interns', href: '/interns/' }],
    },
    {
      label: 'Resources',
      href: '#',
      children: [
        { label: 'Blogs', href: '/blog-list/' },
        { label: 'Portfolio', href: '/portfolios/' },
        { label: 'Live Demos', href: '/live-demo/' },
        { label: 'Case Study', href: '/case-study/' },
      ],
    },
  ],
} as const;

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export const hero = {
  headline: 'Driving Digital Transformation with AI & Blockchain Products',
  description:
    'Our product suite enables businesses to innovate, optimise and scale using secure AI and blockchain technologies.',
  bullets: [
    'Custom‑built AI applications tailored to your business needs.',
    'Intelligent products that learn, adapt and automate workflows.',
    'Secure blockchain products that protect data and transactions.',
  ],
  cta: { label: 'Explore Our Product Suite', href: '#solutions' },
  trustedBy: {
    label: 'Trusted Brand', // alt text used by every logo on the marquee
    count: 16,              // number of unique trust logos on the source page
  },
  awards: [
    'Clutch Global 2024',
    'mobile app daily',
    'top development',
    'Top App Development Companies 2025',
    'Clutch Champion',
    'Business of Apps',
  ],
} as const;

// ---------------------------------------------------------------------------
// Stats
// ---------------------------------------------------------------------------

export const stats = {
  heading: 'Architecting Digital Excellence For 150+ Industry Leaders',
  items: [
    { value: '2,600+', label: 'Business Ventures Transformed' },
    { value: '8+',     label: 'Mission-Critical Government Initiatives' },
    { value: '11+',    label: 'Years of Digital Engineering Excellence' },
    { value: '50+',    label: 'Fortune 100 Technology Partnerships' },
    { value: '25+',    label: 'Enterprise AI Solutions Engineered' },
  ],
} as const;

// ---------------------------------------------------------------------------
// Solutions tabs
// ---------------------------------------------------------------------------

export const solutions = {
  eyebrow: 'Solutions',
  heading:
    'Full- Spectrum Of AI-Powered Solutions Engineered For Global Impact',
  tabs: [
    { id: 'solution1', short: 'Studio',       sub: 'Premium Digital Experiences' },
    { id: 'solution2', short: 'Apps',         sub: 'AI- Powered App Builder' },
    { id: 'solution3', short: 'Intelligence', sub: 'Your AI Development Partner' },
    { id: 'solution4', short: 'Blockchain',   sub: 'Next-Gen Blockchain Innovation' },
  ],
  panels: [
    {
      id: 'solution1',
      title: 'Premium Tech Development Studio',
      description:
        'Deliver enterprise‑grade software solutions using proven development practices.',
      cta: { label: 'Visit Website', href: '#' },
      categories: [
        'AI-Powered App Development',
        'Enterprise Solutions',
        'Software Development',
      ],
      items: ['IOS App', 'Android App', 'Flutter App', 'React Native App', 'PWA App'],
    },
    {
      id: 'solution2',
      title: 'AI- Powered App Builder',
      description:
        'Ready-to-use tech solutions for specific business use cases to launch quickly, without coding.',
      cta: { label: 'Visit Website', href: '/cb-apps/' },
      categories: ['Save Time & Cost', 'Get It Customized Your Way', 'Launch MVP in 2 Days'],
      items: [
        'Ordering & Service\nBooking',
        'Delivery\nManagement',
        'Taxi & Mobility\nSolution',
        'Online\nConsultation',
        'All-in-one\nMarketplace',
      ],
    },
    {
      id: 'solution3',
      title: 'Your AI Development Partner',
      description:
        'Building tailored AI solutions for brands that drive innovation and efficiency.',
      cta: { label: 'Visit Website', href: '#' },
      categories: [
        'Automate Your Workflows',
        'Generate Valuable Insights',
        'Enhance Customer Interaction',
      ],
      items: [
        'AI Strategy &\nConsulting',
        'AI Integration',
        'Machine Learning',
        'Robotic Process Automation',
        'Natural Language Processing',
      ],
    },
    {
      id: 'solution4',
      title: 'Engineering Web3 Excellence',
      description:
        'Create secure blockchain products for transparent and scalable data.',
      cta: { label: 'Visit Website', href: '#' },
      categories: [
        'Enterprise-Grade Security',
        'Robust Smart Contracts',
        'Scalable Decentralized Solutions',
      ],
      items: [
        'Blockchain Integration',
        'Tokenization & NFT\nSolutions',
        'Custom Crypto\nSolutions',
        'Smart Contract\nDesign & Auditing',
        'Full-Scale dApp Development',
      ],
    },
  ],
} as const;

// ---------------------------------------------------------------------------
// Time-zone banner
// ---------------------------------------------------------------------------

export const timeZone = {
  headline: 'Your {time} Time Zone, Your Terms.',
  description:
    'Our global development teams align to your schedule for\n\nseamless, round-the-clock delivery.',
  cta: { label: 'Start Your Transformation', href: '#' },
} as const;

// ---------------------------------------------------------------------------
// Services grid
// ---------------------------------------------------------------------------

export const services = {
  eyebrow: 'Services',
  heading:
    'We Create New Solutions and Transform Existing Ones with New Gen Technologies To Make Your Business Future-proof',
  kicker: 'Tech Troubles Holding You Back?',
  subheading: 'Let Us Handle The Tech While You Focus on Building Your Core Business',
  cta: { label: 'Book Free Consultation', href: '#' },
  items: [
    {
      title: 'Artificial Intelligence',
      copy: 'Architect intelligent systems that elevate decision-making capabilities and drive operational excellence at scale.',
    },
    {
      title: 'Gen AI',
      copy: 'Deploy cutting-edge AI solutions that revolutionize content creation and redefine user engagement benchmarks.',
    },
    {
      title: 'Blockchain',
      copy: 'Build immutable digital infrastructures that ensure enterprise-grade security and transparent operations.',
    },
    {
      title: 'Machine Learning',
      copy: 'Transform raw data into predictive intelligence that continuously optimizes business performance.',
    },
    {
      title: 'Data Science',
      copy: 'Convert complex data patterns into actionable strategies that accelerate market leadership.',
    },
    {
      title: 'Business Analytics',
      copy: 'Unlock hidden operational insights that drive competitive advantage and fuel strategic growth.',
    },
  ],
  bottomCta: {
    kicker: 'Is Tech Troubles Holding You Back?',
    headline: 'Focus on Growth While We Drive Your Tech Innovation.',
    cta: { label: 'Book 30 Min C-Level Consultation', href: '#' },
  },
} as const;

// ---------------------------------------------------------------------------
// Case studies
// ---------------------------------------------------------------------------

export const caseStudies = {
  eyebrow: 'Case studies',
  heading: 'Catch Innovation in Action With Us',
  description:
    'Peek into the future with our cutting-edge projects that are redefining industries.',
  navigation: [
    { n: 1, title: 'AI Solutions', sub: 'for Health & Fitness' },
    { n: 2, title: 'Wallet',       sub: 'for Fintech' },
    { n: 3, title: 'Metaverse',    sub: 'for Real Estate' },
    { n: 4, title: 'CRM',          sub: 'for Media' },
    { n: 5, title: 'Custom App',   sub: 'for Gaming' },
  ],
  items: [
    {
      slug: 'smartfit',
      tag: 'for Health & Fitness',
      copy: '**Personalized nutrition** and workout recommendations, backed by **advanced AI algorithms, machine learning, and predictive analytics.**',
      stats: [
        { value: '80%',  label: 'User Retention Rate' },
        { value: '20K+', label: 'Meal Plans Generated' },
      ],
      cta: { label: 'Download Case Study', href: '#' },
    },
    {
      slug: 'fintex',
      tag: 'for Fintech',
      copy: 'Developed **a secure multi-chain crypto wallet** with institutional-grade security protocols and smart contract integration.',
      stats: [
        { value: '20%',     label: 'Cryptocurrencies Supported' },
        { value: '$100 K+', label: 'Daily Transaction Volume' },
      ],
      cta: { label: 'Download Case Study', href: '#' },
    },
    {
      slug: 'theuneverse',
      tag: 'for Real Estate',
      copy: "Created an immersive metaverse experience using AR/VR technology and blockchain integration for Dubai's premier real estate market.",
      stats: [
        { value: '1000+', label: 'Virtual Properties Listed' },
        { value: '45%',   label: 'Increase in Property Views' },
      ],
      cta: { label: 'Download Case Study', href: '#' },
    },
    {
      slug: 'nielsen',
      tag: 'for Media & Research',
      copy: 'Transforming complex media data into actionable intelligence, enabling real-time market analysis and predictive audience modeling.',
      stats: [
        { value: '85%', label: 'Faster Analysis Time' },
        { value: '60%', label: 'Faster Decision Making' },
      ],
      cta: { label: 'Download Case Study', href: '#' },
    },
    {
      slug: 'grintafy',
      tag: 'for Gaming',
      copy: 'Unique gaming platform with social features, enabling live tournaments, player statistics, and community engagement.',
      stats: [
        { value: '1M+', label: 'User Downloads' },
        { value: '90%', label: 'User Engagement' },
      ],
      cta: { label: 'Download Case Study', href: '#' },
    },
  ],
} as const;

// ---------------------------------------------------------------------------
// Industries (the source duplicates the list to fuel a marquee — we keep the
// canonical list and let the renderer duplicate at the DOM level.)
// ---------------------------------------------------------------------------

export const industries = {
  eyebrow: 'Industries',
  heading: 'Engineering Industry-specific Excellence With AI & Innovation',
  cta: { label: 'Live Demo', href: '#' },
  items: [
    { title: 'Automotive',        copy: 'Enable predictive logistics, connected mobility networks, and real-time operational intelligence across global supply chains.' },
    { title: 'Healthcare',        copy: 'Secure interoperable health data flows, improve patient outcomes, and strengthen compliance and institutional trust.' },
    { title: 'Finance',           copy: 'Deliver resilient financial infrastructure with verifiable transactions, automated compliance, and real-time analytics for digital markets.' },
    { title: 'Insurance',         copy: 'Optimize underwriting, claims, and risk management with automated processes and transparent, trusted data networks.' },
    { title: 'E-Commerce',        copy: 'Provide frictionless commerce with verified sourcing, intelligent personalization, and seamless omnichannel operations.' },
    { title: 'Entertainment',     copy: 'Protect digital ownership, track value exchange, and enhance creator-audience ecosystems with secure, transparent frameworks.' },
    { title: 'Manufacturing',     copy: 'Unify production, operations, and supply chains with predictive performance intelligence and verifiable data pipelines' },
    { title: 'Oil & Gas',         copy: 'Increase operational efficiency and accountability through real-time asset tracking and traceable energy workflows.' },
    { title: 'Real Estate',       copy: 'Digitize property lifecycles with verified ownership, transparent transactions, and connected market infrastructure.' },
    { title: 'Government',        copy: 'Strengthen public trust with data-driven governance, secure citizen services, and interoperable digital infrastructure.' },
    { title: 'Travel & Tourism',  copy: 'Deliver seamless travel experiences with intelligent operations, verifiable identities, and real-time ecosystem coordination.' },
    { title: 'Education',         copy: 'Enable trusted learning networks, verifiable credentials, and interoperable academic ecosystems.' },
    { title: 'Food & Restaurant', copy: 'Ensure traceability, authenticity, and sustainable supply chain operations from source to consumer.' },
  ],
} as const;

// ---------------------------------------------------------------------------
// Marquee text band (between industries and "Why")
// ---------------------------------------------------------------------------

export const marqueeText = [
  'Real-World Asset Tokenization (RWA)',
  'Decentralization & Trustless Systems',
  'Metaverse-Driven Digital Economy',
  'Scalable Blockchain Infrastructure',
  'Smart Contracts & Digital Ownership',
] as const;

// ---------------------------------------------------------------------------
// Why Elchai
// ---------------------------------------------------------------------------

export const why = {
  eyebrow: 'Why Elchai Group?',
  heading: 'How We Drive Successful Digital Transformation For You?',
  description:
    'We combine next-gen AI capabilities with our proven track record to catapult your business to new heights, offering:',
  pillars: [
    {
      title: 'AI-Powered Transformation',
      copy: 'From predictive analytics to intelligent automation, we deploy AI to solve complex business challenges and uncover new opportunities.',
    },
    {
      title: 'Human-Centric Approach',
      copy: 'While AI accelerates processes, our seasoned developers ensure the human touch remains at the core, crafting exceptional user experiences.',
    },
    {
      title: 'Future-Proof Scalability',
      copy: 'We build solutions that can adapt and grow with your business.Our AI-powered architecture ensures your platforms scales seamlessly to meet future needs.',
    },
    {
      title: 'Transparent Communication & Collaboration',
      copy: 'Stay informed throughout the entire development process with clear timelines, regular updates, and open communication.',
    },
  ],
} as const;

// ---------------------------------------------------------------------------
// Events
// ---------------------------------------------------------------------------

export const events = {
  eyebrow: 'Events',
  heading: 'Demonstrating Next-Gen Tech Solutions at Global Platforms',
  description:
    'Showcasing the latest advancements in next-generation technology at premier global platforms like GITEX Global. Explore groundbreaking innovations in AI, IoT, blockchain, and more, as industry leaders demonstrate real-world applications that are revolutionizing businesses worldwide.',
  imagesLabel: '4+ Images',
} as const;

// ---------------------------------------------------------------------------
// Clients & partners
// ---------------------------------------------------------------------------

export const partners = {
  eyebrow: 'Clients & Partners',
  heading:
    'From Startups To Enterprises, We Transform Digital Visions At Every Scale',
  description:
    'Partner with experts who transform ideas into market-leading solutions, regardless of your business size or industry.',
  logos: [
    'Family Care Authority',
    'Grintafy',
    'Logisty',
    'NAFFCO',
    'ISUZU',
    'Zajel',
    'Emirates Facilities',
    'REDTAG',
    'Dr. Hakeem Care',
    'du Pay',
    'SOBHA Realty',
    'AW ROSTAMANI',
    'INGENI Health',
    'u-vault',
    'FedEx',
    'solos',
  ],
} as const;

// ---------------------------------------------------------------------------
// Closing CTA banner
// ---------------------------------------------------------------------------

export const closingCta = {
  heading: 'It’s Time To Accelerate Your Digital Transformation Journey',
  cta: { label: 'Let’s Build Together', href: '#' },
} as const;

// ---------------------------------------------------------------------------
// Resources / blog
// ---------------------------------------------------------------------------

export const resources = {
  eyebrow: 'Resources',
  heading: 'Resources To Fuel Your Digital-First Innovation Journey',
  cta: { label: 'More Resources', href: '/blog-list/' },
  posts: [
    {
      tag: 'blog',
      title:
        'NFT Business Applications: Digital Asset Innovation Beyond Art and Collectibles',
      readTime: '3 Min Read',
      href: '/blog/nft-business-applications-digital-asset-innovation-beyond-art-and-collectibles',
    },
    {
      tag: 'blog',
      title:
        'AI Machine Learning Solutions: Transforming Data into Competitive...',
      readTime: '3 Min Read',
      href: '/blog/ai-machine-learning-solutions-transforming-data-into-competitive-business-intelligence',
    },
    {
      tag: 'blog',
      title:
        'Web3 Digital Transformation: Decentralized Solutions for Modern...',
      readTime: '5 Min Read',
      href: '/blog/web3-digital-transformation-decentralized-solutions-for-modern-enterprise-architecture',
    },
  ],
} as const;

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------

export const faq = {
  eyebrow: 'FAQ',
  heading: 'Frequently Asked Questions',
  items: [
    {
      n: '01',
      q: 'What blockchain development services do you offer?',
      a: 'We provide end-to-end blockchain solutions from consultation to deployment. Our expertise spans smart contract development with formal verification and security audits, real-world asset tokenization for compliant digital transformation, and infrastructure services including Layer 1 & Layer 2 scaling solutions, cross-chain bridges, and node infrastructure. We work across multiple industries including healthcare, finance, real estate, and education to deliver secure, scalable blockchain applications tailored to your business needs.',
    },
    {
      n: '02',
      q: 'What DeFi and cryptocurrency services do you provide?',
      a: 'Our DeFi capabilities cover the complete spectrum of decentralized finance. We build custom protocols, yield farming and staking platforms, lending and borrowing solutions, and derivatives trading systems. On the cryptocurrency side, we develop secure wallets (custodial, non-custodial, and multi-signature), trading platforms including centralized and decentralized exchanges, and complete token launch solutions for ICO, STO, IDO, and IGO projects. We also create automated trading bots, market-making platforms, and white-label exchange solutions for businesses entering the crypto space.',
    },
    {
      n: '03',
      q: 'Do you build Web3 applications and metaverse platforms?',
      a: 'Absolutely. We specialize in creating immersive Web3 experiences including decentralized applications (DApps), NFT marketplaces, and comprehensive metaverse platforms. Our metaverse solutions include virtual worlds, 3D collaboration spaces, digital asset monetization systems, and industry-specific applications for sectors like healthcare, education, and real estate. We ensure seamless wallet integration and intuitive user experiences that make complex Web3 technology accessible to mainstream users.',
    },
    {
      n: '04',
      q: 'What AI and machine learning solutions do you offer?',
      a: 'We transform business operations through intelligent automation and advanced AI. Our services include custom AI development and integration, machine learning models for predictive analytics, generative AI solutions including custom ChatGPT implementations, and specialized tools like AI assistants, voice interfaces, and computer vision systems. We also develop autonomous agentic AI, retrieval-augmented generation (RAG) systems, and robotic process automation (RPA) solutions. Our AI expertise extends across industries with proven implementations in healthcare diagnostics, financial risk assessment, cybersecurity threat detection, marketing personalization, logistics optimization, and more.',
    },
    {
      n: '05',
      q: 'Can you integrate AI with blockchain technology?',
      a: 'Yes, we excel at combining blockchain and AI to create next-generation applications. We develop intelligent smart contracts that use machine learning for dynamic decision-making, AI-powered analytics for on-chain data, predictive models for real-world asset valuation, and automated trading systems for DeFi protocols. Our integrated approach also includes generative AI for dynamic NFT creation and AI assistants embedded within decentralized applications, giving you the best of both revolutionary technologies.',
    },
    {
      n: '06',
      q: 'Do you offer a free consultation?',
      a: "Yes! We provide a complimentary 30-minute discovery call where we discuss your blockchain, Web3, DeFi, NFT, or AI project in detail. Following this, you'll receive a comprehensive proposal including project scope, recommended technology stack, detailed timeline, and transparent cost breakdown. We also conduct technical feasibility analysis to ensure your vision can be successfully implemented. Schedule your free consultation today to explore how we can transform your business.",
    },
  ],
} as const;

// ---------------------------------------------------------------------------
// Contact
// ---------------------------------------------------------------------------

export const contact = {
  eyebrow: 'Contact Us',
  heading: 'Have a project idea? Get in touch!',
  presenceLabel: 'Our Presence',
  primary: {
    flag: 'UAE',
    city: 'Dubai',
    address:
      '2008, Jumeirah Business Center 1 - Cluster G - Al Thanyah Fifth - Jumeirah Lakes Towers - Dubai - United Arab Emirates',
    addressHref: 'https://maps.app.goo.gl/2Hm2K5nvS7sVFrxz7?g_st=ic',
    email: 'info@elchaigroup.com',
    phone: '+971 4 883 7176',
    pitch:
      'Partner with our experts and turn your visionary ideas into scalable, market-leading solutions',
    cta: { label: 'Lets Connect', href: '#' },
  },
  legend: [
    { label: 'Direct Operations and Strategic Control', href: '#Strategic' },
    { label: 'Active Partner and Affiliate Locations',  href: '#Affiliate' },
  ],
  offices: [
    { country: 'United Arab Emirates', city: 'Dubai',     flag: 'United-Arab-Emirates' },
    { country: 'Belgium',              city: 'Brussels',  flag: 'Belgium' },
    { country: 'Albania',              city: 'Tirana',    flag: 'Albania' },
    { country: 'Sultanate of Oman',    city: 'Muscat',    flag: 'Sultanate-of-Oman' },
    { country: 'United Arab Emirates', city: 'Abu Dhabi', flag: 'United-Arab-Emirates' },
    { country: 'Hungary',              city: 'Budapest',  flag: 'Hungary' },
    { country: 'Italy',                city: 'Milan',     flag: 'Italy' },
  ],
} as const;

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

export const footer = {
  columns: [
    {
      title: 'Blockchain & Web3',
      items: [
        { label: 'Blockchain Development',      href: '/blockchain-development/' },
        { label: 'DeFi Development',            href: '/defi-development/' },
        { label: 'Smart Contracts',             href: '/smart-contract/' },
        { label: 'NFT Marketplace Development', href: '/nft-marketplace-development/' },
        { label: 'Tokenization Solutions',      href: '/token-development/' },
        { label: 'DApp Development',            href: '/dapp-development/' },
        { label: 'Web3 Development',            href: '/web3-development-company/' },
        { label: 'Layer 1',                     href: '/layer-1/' },
        { label: 'Layer 2',                     href: '/layer-2/' },
        { label: 'Real World Asset Tokenization', href: '/rwa/' },
      ],
    },
    {
      title: 'Cryptocurrency',
      items: [
        { label: 'Crypto Wallet Development', href: '/crypto-wallet-development-company/' },
        { label: 'ICO/STO/IDO Platforms',     href: '/ico-development/' },
      ],
    },
    {
      title: 'Metaverse Solutions',
      items: [
        { label: 'Metaverse Development', href: '/metaverse-development/' },
      ],
    },
    {
      title: 'AI Development',
      items: [
        { label: 'AI Consulting',              href: '/ai-consulting-services/' },
        { label: 'Generative AI Development',  href: '/generative-ai-development/' },
        { label: 'AI Integration & Automation', href: '/ai-automation/' },
        { label: 'AI Assistant Development',   href: '/ai-assistant-development/' },
        { label: 'Agentic AI',                 href: '/ai-agent-development/' },
      ],
    },
    {
      title: 'ML & Advanced AI',
      items: [
        { label: 'Machine Learning Development', href: '/machine-learning-development/' },
        { label: 'Computer Vision',              href: '/computer-vision-software-development/' },
        { label: 'LLM Development',              href: '/llm-development-partner/' },
        { label: 'RAG Systems',                  href: '/rag-development-company/' },
        { label: 'RPA Solutions',                href: '/rpa-development-partner/' },
        { label: 'Voice Assistants',             href: '/ai-voice-assist/' },
      ],
    },
    {
      title: 'App Development',
      items: [
        { label: 'Mobile App Development', href: '/mobile-app-development/' },
      ],
    },
    {
      title: 'Company',
      items: [
        { label: 'About Us',       href: '/about-us/' },
        { label: 'Blogs',          href: '/blog-list/' },
        { label: 'Portfolios',     href: '/portfolios/' },
        { label: 'Live Demos',     href: '/live-demo/' },
        { label: 'Case Study',     href: '/case-study/' },
        { label: 'Privacy Policy', href: '/privacy-policy/' },
      ],
    },
  ],
  social: {
    heading: 'Follow us on',
    links: [
      { label: 'facebook',  href: 'https://www.facebook.com/profile.php?id=100089887845364' },
      { label: 'twitter',   href: 'https://x.com/elchaigroup' },
      { label: 'linkedin',  href: 'https://www.linkedin.com/company/elchai-group/' },
      { label: 'instagram', href: 'https://www.instagram.com/elchaigroup/#' },
    ],
  },
  copyright: '© Elchai All rights reserved 2026',
} as const;

// ---------------------------------------------------------------------------
// Modals
// ---------------------------------------------------------------------------

export const modals = {
  whatsapp: {
    heading: 'Whatsapp Updates',
    defaultDial: '+47',
    submit: 'Submit',
  },
  consultation: {
    pretitle: 'Schedule Your Consultation Today!',
    heading: 'Build Your Next Project With Industry Experts',
    description:
      'Leverage cutting-edge technology and proven expertise to transform your business.',
    email: 'info@elchaigroup.com',
    formHeading:
      '**Fill out the form below,** and our team will reach out to discuss your project.',
    confidentialityNote:
      'All information you provide will remain confidential.',
    quickActions: [
      { label: 'WhatsApp', href: 'https://web.whatsapp.com/send?phone=+971501080066' },
      { label: 'Telegram', href: 'https://t.me/+97150108%200066' },
    ],
  },
} as const;

// ---------------------------------------------------------------------------
// Interns — verbatim from elchaigroup.com/interns/
// ---------------------------------------------------------------------------

export const interns = {
  hero: {
    eyebrow: 'Welcome to Elchai World Internships',
    heading: 'Launch Your Career with Elchai World Internships',
    body: 'Gain real-world experience, work alongside industry experts, and build skills that actually matter.',
    primaryCta: { label: 'Apply Now', href: 'https://www.elchaigroup.com/?page_id=30951' },
    ghostCta: { label: 'Explore the Programme', href: '#programmes' },
    stats: [
      { value: '12+', label: 'Active Interns' },
      { value: '6+',  label: 'Departments' },
      { value: '5+',  label: 'Nationalities' },
      { value: '3',   label: 'Intern Batches' },
    ],
  },
  overview: {
    eyebrow: 'Internship Details',
    heading: 'Internship Programme Overview',
    body: "Our internship programme is designed to give you hands-on experience in a fast-paced, real-world environment. From day one, you'll contribute to meaningful projects, collaborate with experienced professionals, and develop skills that prepare you for your future career.",
    items: [
      {
        value: '3 Months (Flexible Start)',
        title: 'Duration',
        desc: 'Internship duration with flexible intake batches throughout the year.',
      },
      {
        value: 'Dubai HQ',
        title: 'Location',
        desc: 'Based in Dubai HQ with hybrid work flexibility depending on role.',
      },
      {
        value: '6+ Departments',
        title: 'Departments',
        desc: 'Marketing, Design, Tech, Finance, Operations, Research',
      },
      {
        value: 'Open Intake',
        title: 'Eligibility',
        desc: 'Open to university students and recent graduates from all disciplines',
      },
    ],
  },
  programmes: {
    eyebrow: 'Our Programmes',
    heading: 'Explore Our Internship Programmes',
    body: 'Six specialised tracks giving you hands-on experience in the skills the industry actually needs.',
    tracks: [
      { title: 'Marketing & Growth',          desc: 'Digital marketing, performance campaigns, branding, and content strategy.' },
      { title: 'Design & Creative',           desc: 'UI/UX, graphic design, branding, and visual storytelling.' },
      { title: 'Technology & Development',    desc: 'Web development, product building, and QA testing.' },
      { title: 'Finance & Strategy',          desc: 'Financial analysis, business strategy, and research.' },
      { title: 'Operations',                  desc: 'Business operations, process management, and execution.' },
      { title: 'Research & Innovation',       desc: 'Market research, idea validation, and innovation projects.' },
      { title: 'AI & Machine Learning',       desc: 'Model building, data analysis, automation, and real-world AI applications.' },
      { title: 'Web3 & Blockchain',           desc: 'Smart contracts, dApps, crypto ecosystems, and decentralized technologies.' },
      { title: 'Data Analytics & Business Intelligence', desc: 'Data visualization, dashboards, reporting, and insight-driven decision making.' },
      { title: 'Cybersecurity & Ethical Hacking',        desc: 'Security fundamentals, threat analysis, and protecting digital systems.' },
      { title: 'Product Management',          desc: 'Product strategy, user journeys, roadmap planning, and cross-team execution.' },
      { title: 'Cloud Computing & DevOps',    desc: 'Cloud platforms, deployment pipelines, infrastructure, and system scalability.' },
    ],
  },
  why: {
    eyebrow: 'Why Join Us',
    heading: 'Why Choose Elchai World?',
    body: 'More than just an internship — a launchpad for your career built on real work, real mentors, and real impact.',
    pillars: [
      { title: 'Real Projects',     desc: 'Work on impactful, live business challenges that make a measurable difference from your very first week.' },
      { title: 'Mentorship',        desc: 'Learn directly from experienced professionals who are invested in your growth and career development.' },
      { title: 'Skill Development', desc: 'Build practical, job-ready skills across your discipline through hands-on tasks and structured learning.' },
      { title: 'Global Exposure',   desc: 'Collaborate with a diverse, international team spanning multiple nationalities, backgrounds, and disciplines.' },
    ],
  },
  meet: {
    eyebrow: 'Meet The Interns',
    heading: 'Meet Our Interns',
    body: 'A diverse group of ambitious individuals bringing fresh ideas, creativity, and energy to our teams.',
    profiles: [
      { name: 'Abhishek Aju',   role: 'Growth & Marketing',      photo: 'https://www.elchaigroup.com/wp-content/uploads/2026/05/Abisheik-1.jpeg' },
      { name: 'Sanjula Hewage', role: 'QA Tester',               photo: 'https://www.elchaigroup.com/wp-content/uploads/2026/05/Shujal.jpeg' },
      { name: 'Hajra',          role: 'AI Automation & Research', photo: 'https://www.elchaigroup.com/wp-content/uploads/2026/05/Hajra-1.jpeg' },
      { name: 'Tamara',         role: 'AI Automation & Research', photo: 'https://www.elchaigroup.com/wp-content/uploads/2026/05/Tamara.jpeg' },
      { name: 'Rubin',          role: 'AI Automation & Research', photo: 'https://www.elchaigroup.com/wp-content/uploads/2026/05/Rubin-1.jpeg' },
      { name: 'Sara',           role: 'AI Automation & Research', photo: 'https://www.elchaigroup.com/wp-content/uploads/2026/05/Sara.jpeg' },
      { name: 'Naseeha',        role: 'AI Automation & Research', photo: 'https://www.elchaigroup.com/wp-content/uploads/2026/05/Naseeha.jpeg' },
      { name: 'Shazin',         role: 'AI Automation & Research', photo: 'https://www.elchaigroup.com/wp-content/uploads/2026/05/Shahzin.jpeg' },
    ],
    linkedinUrl: 'https://www.linkedin.com/company/86452260/',
  },
  life: {
    heading: 'Life at Elchai',
    body: 'From hackathons and workshops to mentorship sessions and team events, our interns are constantly learning, building, and growing.',
    photos: [
      { alt: 'Team meeting',       src: 'https://www.elchaigroup.com/wp-content/uploads/2026/05/Team.jpg' },
      { alt: 'Office work',        src: 'https://www.elchaigroup.com/wp-content/uploads/2026/05/Brainstorm-session.jpg' },
      { alt: 'Brainstorm session', src: 'https://www.elchaigroup.com/wp-content/uploads/2026/05/Mentor-session.jpeg' },
      { alt: 'Working at desk',    src: 'https://www.elchaigroup.com/wp-content/uploads/2026/05/Working-at-desk.jpeg' },
      { alt: 'Workshop day',       src: 'https://www.elchaigroup.com/wp-content/uploads/2026/05/Workshop-day.jpeg' },
      { alt: 'Collab work',        src: 'https://www.elchaigroup.com/wp-content/uploads/2026/05/Collab-work.jpeg' },
      { alt: 'Office event',       src: 'https://www.elchaigroup.com/wp-content/uploads/2026/05/IMG_4495-scaled.jpg' },
      { alt: 'Speaker event',      src: 'https://www.elchaigroup.com/wp-content/uploads/2026/05/IMG_4378-scaled.jpg' },
    ],
  },
  internLife: {
    eyebrow: 'Intern Life',
    heading: 'What Our Interns Get Up To',
    body: 'From hackathons to mentorship sessions — a glimpse into daily intern life.',
    pillars: [
      { title: 'Build & Create',         desc: 'Hackathons & innovation challenges, plus live project execution on real business problems from day one.' },
      { title: 'Learn & Grow',           desc: 'Weekly mentorship sessions with senior leaders and structured skill-building workshops across all disciplines.' },
      { title: 'Connect & Collaborate',  desc: 'Cross-team collaboration activities and monthly industry speaker sessions featuring leaders from across the business world.' },
    ],
  },
  activities: {
    eyebrow: 'Activities',
    heading: 'What Our Interns Get Up To',
    body: "From hackathons to mentorship sessions — here's a look at what's happening across the programme.",
    items: [
      {
        n: '01',
        title: 'Intern Hackathon Event',
        body: 'A 48-hour design and development sprint where intern teams pitch solutions to real company challenges. The winning team presents directly to the executive board and has the opportunity to see their concept taken into production.',
      },
      {
        n: '02',
        title: 'Weekly Mentorship Sessions Workshop',
        body: 'Each week, interns are paired with a senior team member for a structured 1-on-1 session focused on career development, project feedback, and practical industry insights tailored to their discipline.',
      },
      {
        n: '03',
        title: 'Live Brand Campaign Project',
        body: 'Interns collaborate cross-functionally to plan and execute a real brand campaign — covering strategy, content creation, channel execution, and post-launch performance analysis.',
      },
      {
        n: '04',
        title: 'Industry Speaker Series Event',
        body: 'Monthly sessions featuring guest speakers from across entrepreneurship, technology, finance, and creative leadership — offering candid perspectives and actionable advice from professionals at the top of their fields.',
      },
    ],
  },
  closing: {
    eyebrow: 'Join The Programme',
    heading: 'Ready to Start Your Journey?',
    body: 'Applications are open. Take the first step towards real-world experience, mentorship, and building something that matters.',
    primaryCta: { label: 'Apply Now', href: 'https://www.elchaigroup.com/?page_id=30951' },
    contactCta: { label: 'Contact Us', href: 'mailto:careers@elchaigroup.com' },
  },
} as const;

// ---------------------------------------------------------------------------
// Aggregate export — single source of truth
// ---------------------------------------------------------------------------

const content = {
  site, nav, hero, stats, solutions, timeZone, services,
  caseStudies, industries, marqueeText, why, events, partners, closingCta,
  resources, faq, contact, footer, modals, interns,
} as const;

export type SiteContent = typeof content;
export default content;
