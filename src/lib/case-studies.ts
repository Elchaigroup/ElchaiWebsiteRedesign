/**
 * Case studies registry — source: elchaigroup.com/case-study, 2026-05-21.
 *
 * Each card on the source page is a pre-rendered image showing logo, app
 * shot, brand name, and category. We mirror that layout: a single image
 * per card plus a "Download Case Study" CTA. The accessibility name is
 * carried in `brand` + `category` so screen readers get meaningful text
 * instead of "case study card image".
 */

export interface CaseStudy {
  slug: string;
  brand: string;
  category: string;
  /** Image lives under /public/elchai/case-study/. */
  image: string;
  /** Where the Download CTA goes. Defaults to a PDF anchor on the source. */
  href?: string;
}

const dir = "/elchai/case-study";

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "sabroson",
    brand: "Sabrosón",
    category: "Food Delivery App",
    image: `${dir}/Sabroson_case_study.webp`,
  },
  {
    slug: "savanna-rags",
    brand: "Savanna Rags",
    category: "Dispatch",
    image: `${dir}/SavannaRags_case-study.webp`,
  },
  {
    slug: "tidy-coop",
    brand: "Tidy Coop",
    category: "Home Service",
    image: `${dir}/TidyCoop_case_study.webp`,
  },
  {
    slug: "salem",
    brand: "Salem",
    category: "Taxi Booking App",
    image: `${dir}/Salem_case_study.webp`,
  },
  {
    slug: "yummy",
    brand: "Yummy",
    category: "Food Delivery",
    image: `${dir}/Yummy_case_study.webp`,
  },
  {
    slug: "mml",
    brand: "MML",
    category: "Delivery App",
    image: `${dir}/MML_case_study.webp`,
  },
  {
    slug: "propertease",
    brand: "PropertEase",
    category: "RWA Tokenization",
    image: `${dir}/PropertEase_case_study.webp`,
  },
  {
    slug: "smart-fit",
    brand: "Smart Fit",
    category: "AI Fitness App",
    image: `${dir}/SmartFit_case_study.webp`,
  },
  {
    slug: "nielsen",
    brand: "Nielsen",
    category: "CRM For Media",
    image: `${dir}/Nielsen_case_study.webp`,
  },
  {
    slug: "bhf",
    brand: "BHF",
    category: "AI Powered Supply Chain App",
    image: `${dir}/ai-in-supply-chain-case.webp`,
  },
  {
    slug: "frescoeats",
    brand: "FrescoEats",
    category: "AI Powered Food Delivery App",
    image: `${dir}/ai-in-food-case-study.webp`,
  },
  {
    slug: "freshmart",
    brand: "FreshMart",
    category: "AI Powered Delivery App",
    image: `${dir}/ai-for-grocery-case-study.webp`,
  },
  {
    slug: "ffa",
    brand: "FFA",
    category: "AI Powered Finance App",
    image: `${dir}/AIAgent_Finance_CaseStudy.webp`,
  },
  {
    slug: "sydeshow",
    brand: "SydeShow",
    category: "AI Powered Ecommerce App",
    image: `${dir}/AI_For_E_Commerce_CaseStudy.webp`,
  },
];
