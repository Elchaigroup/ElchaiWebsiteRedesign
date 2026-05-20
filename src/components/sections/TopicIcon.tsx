/**
 * Topic-aware inline SVG icons used as fallbacks when a capabilities /
 * impact / whyChoose item doesn't carry a real `icon` URL. Lets every
 * card render with a relevant graphic instead of a bare "01" number.
 *
 * Same keyword-matching approach as ChallengesSlider, just expanded with
 * AI / assistant / workflow / service categories.
 */

import * as React from "react";

const ICONS = {
  // ── AI / assistant family ────────────────────────────────────────
  brain: (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M22 12a8 8 0 00-8 8v2a8 8 0 00-4 14 8 8 0 004 14v2a8 8 0 008 8h2V12h-2z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M42 12a8 8 0 018 8v2a8 8 0 014 14 8 8 0 01-4 14v2a8 8 0 01-8 8h-2V12h2z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M16 26h6m-6 12h8M48 26h-6m6 12h-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M10 14h36a4 4 0 014 4v22a4 4 0 01-4 4H22l-10 8V18a4 4 0 014-4z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="20" cy="29" r="2" fill="currentColor" />
      <circle cx="28" cy="29" r="2" fill="currentColor" />
      <circle cx="36" cy="29" r="2" fill="currentColor" />
    </svg>
  ),
  microphone: (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <rect x="24" y="8" width="16" height="28" rx="8" stroke="currentColor" strokeWidth="2.5" />
      <path d="M16 30a16 16 0 0032 0M32 46v8M22 54h20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  devices: (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <rect x="6" y="12" width="40" height="28" rx="3" stroke="currentColor" strokeWidth="2.5" />
      <path d="M6 36h40M22 44h8M18 48h16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="42" y="22" width="16" height="28" rx="3" stroke="currentColor" strokeWidth="2.5" />
      <path d="M48 27h4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  workflow: (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <rect x="6"  y="10" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="2.5" />
      <rect x="44" y="10" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="2.5" />
      <rect x="6"  y="40" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="2.5" />
      <rect x="44" y="40" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="2.5" />
      <path d="M20 17h24M20 47h24M13 24v16M51 24v16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  refresh: (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M32 12a20 20 0 0118 11M50 12v11h-11M32 52a20 20 0 01-18-11M14 52V41h11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  puzzle: (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M14 14h12a2 2 0 002-2 4 4 0 118 0 2 2 0 002 2h12v12a2 2 0 002 2 4 4 0 110 8 2 2 0 00-2 2v12H38a2 2 0 01-2-2 4 4 0 10-8 0 2 2 0 01-2 2H14V38a2 2 0 00-2-2 4 4 0 110-8 2 2 0 002-2V14z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  ),
  gear: (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <circle cx="32" cy="32" r="10" stroke="currentColor" strokeWidth="2.5" />
      <path d="M32 4v8M32 52v8M4 32h8M52 32h8M12 12l6 6M46 46l6 6M52 12l-6 6M18 46l-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  // ── General / fallback family ────────────────────────────────────
  shield:    (<svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><path d="M32 6l22 8v16c0 14-9 23-22 28-13-5-22-14-22-28V14l22-8z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" /><path d="M22 32l8 8 14-14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>),
  cubes:     (<svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><path d="M32 4l22 10v22L32 46 10 36V14L32 4z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" /><path d="M10 14l22 10 22-10M32 24v22" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" /></svg>),
  bridge:    (<svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><circle cx="14" cy="20" r="6" stroke="currentColor" strokeWidth="2.5" /><circle cx="50" cy="20" r="6" stroke="currentColor" strokeWidth="2.5" /><circle cx="14" cy="48" r="6" stroke="currentColor" strokeWidth="2.5" /><circle cx="50" cy="48" r="6" stroke="currentColor" strokeWidth="2.5" /><path d="M20 20h24M20 48h24M14 26v16M50 26v16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /></svg>),
  database:  (<svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><ellipse cx="32" cy="14" rx="22" ry="8" stroke="currentColor" strokeWidth="2.5" /><path d="M10 14v18c0 4.4 9.85 8 22 8s22-3.6 22-8V14M10 32v18c0 4.4 9.85 8 22 8s22-3.6 22-8V32" stroke="currentColor" strokeWidth="2.5" /></svg>),
  lock:      (<svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><rect x="12" y="28" width="40" height="30" rx="4" stroke="currentColor" strokeWidth="2.5" /><path d="M20 28v-8a12 12 0 0124 0v8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /></svg>),
  spark:     (<svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><path d="M32 4l4 16 16 4-16 4-4 16-4-16-16-4 16-4 4-16z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" /></svg>),
  // ── Industry family ──────────────────────────────────────────────
  heart: (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M32 54s-22-12-22-28a12 12 0 0122-7 12 12 0 0122 7c0 16-22 28-22 28z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M22 30h6l3-6 4 12 3-6h6" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  ),
  cart: (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M6 10h8l6 30h28l5-22H18" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx="24" cy="50" r="4" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="44" cy="50" r="4" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  ),
  coin: (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <circle cx="32" cy="32" r="22" stroke="currentColor" strokeWidth="2.5" />
      <path d="M38 22h-8a4 4 0 000 8h4a4 4 0 010 8h-10M32 18v4M32 42v4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  plane: (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M6 36l52-18-12 30-12-12-6 12-4-8-18-4z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  ),
  book: (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M10 14h18a8 8 0 018 8v32a8 8 0 00-8-8H10V14zM54 14H36a8 8 0 00-8 8v32a8 8 0 018-8h18V14z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  ),
  home: (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M8 30L32 8l24 22v24a2 2 0 01-2 2H40V40h-16v16H10a2 2 0 01-2-2V30z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  ),
  truck: (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M4 18h32v24H4V18zm32 6h12l8 10v8H36V24z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="16" cy="48" r="5" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="46" cy="48" r="5" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  ),
  tower: (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M14 12a14 14 0 0036 0M20 18a8 8 0 0024 0M26 24a2 2 0 014-2 2 2 0 014 2M28 28l-6 28M36 28l6 28M24 46h16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  music: (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M26 44V14l24-4v30" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx="20" cy="46" r="6" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="44" cy="42" r="6" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  ),
  car: (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M8 36l4-14a4 4 0 014-3h32a4 4 0 014 3l4 14M4 36h56v12H4V36z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="18" cy="48" r="4" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="46" cy="48" r="4" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  ),
  leaf: (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M52 8C24 8 8 24 8 48a4 4 0 004 4c24 0 40-16 40-44z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M12 52l28-28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
} as const;

type IconKey = keyof typeof ICONS;

const KEYWORD_MAP: Array<[RegExp, IconKey]> = [
  // Industries (most specific first)
  [/healthcare|medical|patient|clinic|pharma|health/i, "heart"],
  [/e[-\s]?commerce|retail|shop|store|catalog/i, "cart"],
  [/finance|bank|fintech|payment|invest/i, "coin"],
  [/travel|hospitality|tourism|booking|flight/i, "plane"],
  [/education|e[-\s]?learning|student|school|university|training/i, "book"],
  [/real estate|property|housing|realty/i, "home"],
  [/logistics|supply chain|shipping|delivery|inventory/i, "truck"],
  [/telecom|telco|utility|utilities|network operator/i, "tower"],
  [/entertainment|media|music|streaming|content/i, "music"],
  [/automotive|auto|vehicle|car|dealership/i, "car"],
  [/agriculture|agri|farm|crop/i, "leaf"],

  // AI / Assistant page
  [/conversational|chat\s*bot|chatbot/i, "chat"],
  [/voice|speech|audio|asr|tts/i, "microphone"],
  [/multichannel|multi[-\s]?channel|omni[-\s]?channel|devices?/i, "devices"],
  [/agent|workflow|automat/i, "workflow"],
  [/continuous learning|learn|model|adapt/i, "refresh"],
  [/integration|enterprise|crm|erp|connect/i, "puzzle"],
  [/maintenance|support|optimiz|monitor/i, "gear"],
  [/custom|tailored|bespoke|nlp|natural language|intelligence|ai\b/i, "brain"],

  // Generic / blockchain
  [/security|compliance|audit|protect|shield/i, "shield"],
  [/block|cube|module|architecture/i, "cubes"],
  [/interop|cross.?chain|bridge|connectivity/i, "bridge"],
  [/data|storage|database|analytic|knowledge base/i, "database"],
  [/privacy|encrypt|secure|key/i, "lock"],
];

function pickKey(title: string, index: number): IconKey {
  for (const [re, key] of KEYWORD_MAP) {
    if (re.test(title)) return key;
  }
  const keys = Object.keys(ICONS) as IconKey[];
  return keys[index % keys.length];
}

export function TopicIcon({
  title,
  index = 0,
  className,
}: {
  title: string;
  index?: number;
  className?: string;
}) {
  const key = pickKey(title, index);
  return <span className={className}>{ICONS[key]}</span>;
}
