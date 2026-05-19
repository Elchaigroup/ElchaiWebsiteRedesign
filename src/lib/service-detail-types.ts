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
  };

  stats?: Array<{ value: string; label: string }>;

  capabilities?: {
    eyebrow?: string;
    heading: string;
    body?: string;
    items: Array<{ title: string; desc: string }>;
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
    items: Array<{ title: string; desc?: string }>;
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
    items: Array<{ title: string; desc: string }>;
  };

  whyChoose?: {
    eyebrow?: string;
    heading: string;
    body?: string;
    items: Array<{ title: string; desc: string }>;
  };

  /** "Where Blockchain Projects Actually Get Stuck" — common
   *  friction points + how the team helps move through them. */
  challenges?: {
    eyebrow?: string;
    heading: string;
    body?: string;
    items: Array<{ title: string; desc: string }>;
  };

  /** "The Real Business Impact We Deliver" — outcomes / value props,
   *  presented after the challenges section on the live page. */
  impact?: {
    eyebrow?: string;
    heading: string;
    body?: string;
    items: Array<{ title: string; desc: string }>;
  };

  techStack?: {
    eyebrow?: string;
    heading: string;
    body?: string;
    groups: Array<{ title: string; items: string[] }>;
  };

  process?: {
    eyebrow?: string;
    heading: string;
    body?: string;
    steps: Array<{ title: string; desc: string }>;
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
