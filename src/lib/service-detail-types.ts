/**
 * Structured content shape for service-detail pages.
 *
 * Every section except `hero` is optional. The ServiceDetail template
 * renders only sections that have data, so a page can be as full or as
 * spare as the source material allows.
 */

export type ServiceCta = { label: string; href: string };

export type ServiceDetailContent = {
  slug: string;
  category: string;

  hero: {
    eyebrow?: string;
    heading: string;
    subheading?: string;
    body?: string;
    primaryCta?: ServiceCta;
    ghostCta?: ServiceCta;
    /** Optional photographic background that bleeds behind the hero
     *  copy (matches the VR-headset bg on the live metaverse page). */
    image?: string;
    /** Optional check-bullet list rendered under the hero CTAs
     *  (matches the live RWA-tokenization page intro). */
    bullets?: string[];
    /** Optional row of horizontal service-chip pills shown beneath
     *  the hero copy (matches the live blockchain-consulting page). */
    chips?: string[];
  };

  stats?: Array<{ value: string; label: string; icon?: string }>;

  /** Hide the global "Our Trusted Partners" block — useful on service
   *  pages whose live equivalents don't carry that section (e.g.
   *  metaverse-development). Default: false (block renders). */
  hideTrustedPartners?: boolean;

  /** Render the alternate "Trusted by Industry Leader" gradient banner
   *  (two sliding rows of white logo tiles on a blue→violet gradient)
   *  instead of, or in addition to, the default TrustedPartnersGrid.
   *  Matches the live custodial-wallet treatment. Default: false. */
  industryLeaderBanner?: boolean;

  /** Free-form 2-column image+text bands inserted at named anchor
   *  positions. Each band can optionally render a sub-grid of items
   *  (icon cards or check-marked rows) — covers the "Leading Smart
   *  Contract Partner / Blockchain Smart Contract Development /
   *  Ethereum Smart Contract Services / Hyperledger Smart Contract
   *  Services / Smart Contract Audit" sections on the live
   *  smart-contract page. */
  featureSections?: Array<{
    position:
      | "after-hero"
      | "after-capabilities"
      | "after-industries"
      | "after-challenges"
      | "after-techStack"
      | "after-process"
      | "before-faq"
      | "before-closing";
    layout?: "image-left" | "image-right" | "no-image";
    /** Optional backdrop. "gradient" paints the brand blue→violet
     *  gradient behind the section — matches the NFT-marketplace
     *  "Product Suite" band. Default: transparent. */
    backgroundStyle?: "default" | "gradient";
    eyebrow?: string;
    heading: string;
    body?: string | string[];
    image?: string;
    /** Optional sub-grid rendered below the body. */
    items?: Array<{ title: string; desc?: string; icon?: string; image?: string }>;
    /** "icon-cards" = 3-col grid of icon cards with title + desc.
     *  "check-grid" = compact grid of titles preceded by a check icon.
     *  "image-cards" = 2-col horizontal cards with copy + image
     *    (matches the NFT "Product Suite" pair).
     *  "mini-cards" = 3-col compact icon+label tiles
     *    (matches the NFT "Essential Platform Components").
     *  "logo-grid" = dense grid of logo tiles (white bg, brand mark only)
     *    — matches the blockchain-development "Trusted by Industry Leader".
     *  Default: "icon-cards". */
    itemsLayout?: "icon-cards" | "check-grid" | "image-cards" | "mini-cards" | "logo-grid" | "big-icons" | "workflow-cards";
    /** When itemsLayout is "logo-grid": "light" (default) renders
     *  white tiles for color logos. "dark" renders transparent/dark
     *  tiles for white wordmark SVGs designed for dark backgrounds
     *  (matches the live brand strip below the AI Automation hero). */
    tileTheme?: "light" | "dark";
    cta?: ServiceCta;
  }>;

  capabilities?: {
    eyebrow?: string;
    heading: string;
    body?: string;
    /** "icon" = small gradient-tinted icon in the corner (default).
     *  "photo" = full-bleed photographic image at the top of the card
     *  (matches the metaverse-development live page treatment). */
    displayStyle?: "icon" | "photo";
    items: Array<{ title: string; desc: string; icon?: string }>;
  };

  midBanner?: {
    heading: string;
    cta: ServiceCta;
  };

  /**
   * Additional mid-page CTA banners placed at named anchor points.
   * Use this when a single midBanner (which renders after capabilities)
   * isn't enough — e.g. the live blockchain-consulting page has CTAs
   * after industries, challenges, techStack and process as well.
   */
  extraBanners?: Array<{
    position: "after-industries" | "after-challenges" | "after-techStack" | "after-process";
    heading: string;
    cta: ServiceCta;
  }>;

  industries?: {
    eyebrow?: string;
    heading: string;
    body?: string;
    items: Array<{ title: string; desc?: string; image?: string }>;
  };

  /**
   * Second capability-style section — for pages that distinguish
   * "what we consult on" (capabilities) from "what we build/deliver"
   * (solutions). Renders identically to capabilities but with its own
   * heading + items grid, so a page can show both lists.
   */
  solutions?: {
    eyebrow?: string;
    heading: string;
    body?: string;
    /** "icon" (default) renders gradient-icon cards using each item's
     *  `image` field as a small badge. "photo" renders full-bleed
     *  photographic cards — matches the live NFT-marketplace
     *  "Core Platform Capabilities" section. */
    displayStyle?: "icon" | "photo";
    items: Array<{ title: string; desc: string; image?: string }>;
  };

  whyChoose?: {
    eyebrow?: string;
    heading: string;
    body?: string;
    /** "grid" (default) renders a static card grid.
     *  "slider" renders a horizontal carousel with prev/next arrows
     *  — matches the live metaverse-development page. */
    displayStyle?: "grid" | "slider";
    /** Optional decorative image rendered alongside the grid
     *  (matches the "What Sets Our Approach Apart" layout). */
    image?: string;
    items: Array<{ title: string; desc: string; icon?: string }>;
  };

  /** "Where Blockchain Projects Actually Get Stuck" — common
   *  friction points + how the team helps move through them. */
  challenges?: {
    eyebrow?: string;
    heading: string;
    body?: string;
    /** "grid" (default) renders a static 3-column card grid.
     *  "slider" renders a horizontal scroll-snap rail with prev/next
     *  arrows — matches the live blockchain-consulting page. */
    displayStyle?: "grid" | "slider";
    items: Array<{ title: string; desc: string; image?: string }>;
  };

  /** "The Real Business Impact We Deliver" — outcomes / value props,
   *  presented after the challenges section on the live page. */
  impact?: {
    eyebrow?: string;
    heading: string;
    body?: string;
    /** Optional image rendered on the left of the items list
     *  (matches the "Why Institutions Are Moving RWA On-Chain" layout). */
    image?: string;
    items: Array<{ title: string; desc: string; icon?: string }>;
  };

  techStack?: {
    eyebrow?: string;
    heading: string;
    body?: string;
    /** Items can be plain strings (renders as chips) or
     *  { name, logo } pairs (renders as logo tiles like the live
     *  metaverse-development "Blockchain Tech Stack" tabs). */
    groups: Array<{
      title: string;
      items: Array<string | { name: string; logo: string }>;
    }>;
  };

  /** "Product Demo" — tabbed video showcase with thumbnail + play
   *  button overlay linking out to YouTube. Each tab swaps the active
   *  panel (title, body, thumbnail, video link). Lifted from the live
   *  metaverse-development page. */
  productDemo?: {
    eyebrow?: string;
    heading: string;
    items: Array<{
      tabLabel: string;
      heading: string;
      body: string;
      image: string;
      videoUrl: string;
    }>;
  };

  process?: {
    eyebrow?: string;
    heading: string;
    body?: string;
    /** "slider" (default for blockchain/web3) renders a horizontal
     *  scroll-snap rail with prev/next arrows.
     *  "grid" renders a two-column "title + sphere image | step cards"
     *  layout that matches the live metaverse-development page. */
    displayStyle?: "slider" | "grid";
    /** Optional decorative image rendered alongside the heading
     *  card in "grid" mode (e.g. Concept-Launch.webp). */
    image?: string;
    steps: Array<{ title: string; desc: string }>;
  };

  /** "Catch Innovation in Action With Us" — tabbed case studies
   *  showing flagship engagements. Each tab swaps the right-side
   *  panel (brand, description, stats, CTA). Used to demonstrate
   *  range across industries from a single service-detail page. */
  caseStudies?: {
    eyebrow?: string;
    heading: string;
    highlightedPhrase?: string;
    body?: string;
    items: Array<{
      tabLabel: string;
      brand: string;
      description: string;
      image?: string;
      stats: Array<{ value: string; label: string }>;
      cta?: ServiceCta;
    }>;
  };

  faq?: {
    eyebrow?: string;
    heading: string;
    items: Array<{ q: string; a: string }>;
  };

  closing?: {
    heading: string;
    body?: string;
    cta: ServiceCta;
  };
};
