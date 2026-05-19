/**
 * tokens.ts — Elchai Group design tokens.
 *
 * Source: elchai-brand-guidelines.pdf (38 pages, ELCHAI GROUP® Brand Guideliness).
 * Brand wins on any conflict with the igloo.inc visual reference.
 *
 * The PDF defines five brand colours, a typography system that names three
 * faces (Montserrat as the brand/primary identity face, Satoshi for display,
 * Inter for body), and a single type ramp. Spacing is not explicitly defined
 * in the PDF — the values below extend the brand with a conservative,
 * 4px-based scale aligned to the type sizes the brand mandates.
 */

// ---------------------------------------------------------------------------
// Colour palette  (brand-guidelines pp. 18–20)
// ---------------------------------------------------------------------------
//
// The brand specifies a tight, high-energy palette inspired by RGB primaries.
// All five swatches are listed exactly as they appear in the guidelines.

export const colors = {
  brightSkyBlue: '#18DEFF', // cyan — primary brand accent
  vividCerulean: '#52B8FF', // azure — supporting accent
  lightLavender: '#B07CFF', // purple — supporting accent
  white: '#FFFFFF',
  black: '#000000',
} as const;

// Semantic aliases for the futuristic, dark-cinematic surface direction.
// `bg` is pure black per the brand; surfaces step up via translucent overlays
// so that 3D scenes (R3F) remain the primary source of depth/light.
export const semantic = {
  bg: colors.black,
  fg: colors.white,
  accentPrimary: colors.brightSkyBlue,   // hero glow, focus rings, CTAs
  accentSecondary: colors.vividCerulean, // mid-emphasis gradients
  accentTertiary: colors.lightLavender,  // tertiary glow, depth refractions
  border: 'rgba(255,255,255,0.08)',
  borderStrong: 'rgba(255,255,255,0.16)',
  surface1: 'rgba(255,255,255,0.03)',    // glassy card base
  surface2: 'rgba(255,255,255,0.06)',    // glassy card hover
  surface3: 'rgba(255,255,255,0.10)',    // elevated panel
  textMuted: 'rgba(255,255,255,0.64)',
  textSubtle: 'rgba(255,255,255,0.48)',
} as const;

// Brand-mandated tint scale (pp. 20). Same percentages applied to each accent.
export const tints = [80, 60, 40, 20, 10] as const;

// Pre-computed gradients used by the cinematic surfaces.
export const gradients = {
  heroAura:
    `radial-gradient(60% 60% at 50% 0%, ${colors.brightSkyBlue}33 0%, transparent 70%)`,
  cyanToLavender:
    `linear-gradient(135deg, ${colors.brightSkyBlue} 0%, ${colors.lightLavender} 100%)`,
  cerulanToCyan:
    `linear-gradient(135deg, ${colors.vividCerulean} 0%, ${colors.brightSkyBlue} 100%)`,
  // Used for refractive/glassy edges in 3D-style sections.
  glassEdge:
    `linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.02) 50%, rgba(255,255,255,0.08) 100%)`,
} as const;

// ---------------------------------------------------------------------------
// Typography  (brand-guidelines pp. 13–16)
// ---------------------------------------------------------------------------
//
// The brand specifies three faces. They are used per-role, not interchangeably.
//   • Montserrat — the brand-identity face. Wordmark, navigation, eyebrows.
//   • Satoshi   — the display/headline face for all marketing surfaces.
//   • Inter     — the body face for paragraphs and UI text.
// All three load from Google Fonts / Fontshare (Satoshi).

export const fonts = {
  brand: {
    family: 'Montserrat',
    fallback: 'system-ui, -apple-system, "Segoe UI", sans-serif',
    weights: { light: 300, regular: 400, medium: 500, bold: 700 },
    role: 'Brand wordmark, navigation, eyebrow / kicker labels',
  },
  display: {
    family: 'Satoshi',
    fallback: 'Montserrat, system-ui, -apple-system, sans-serif',
    weights: { regular: 400, medium: 500, bold: 700, black: 900 },
    role: 'All page headlines and section titles',
  },
  body: {
    family: 'Inter',
    fallback: 'system-ui, -apple-system, "Segoe UI", sans-serif',
    weights: { regular: 400, medium: 500, semibold: 600 },
    role: 'Paragraphs, lists, FAQ answers, form labels',
  },
} as const;

// Type ramp from the guidelines (p. 16). All sizes are in pixels with the
// brand-prescribed line-height paired in /lh form.
export const type = {
  displayXL:    { font: 'display', size: 72, lh: 90, weight: 700 },
  displayLarge: { font: 'display', size: 48, lh: 60, weight: 700 },
  displaySmall: { font: 'display', size: 32, lh: 38, weight: 700 },
  body:         { font: 'body',    size: 16, lh: 24, weight: 400 },

  // Extensions (not in the PDF, derived to fill the gaps that a homepage with
  // section eyebrows, stat numbers, and small UI requires):
  eyebrow:      { font: 'brand', size: 12, lh: 16, weight: 500, tracking: 0.12 },
  sectionTitle: { font: 'display', size: 56, lh: 64, weight: 700 },
  cardTitle:    { font: 'display', size: 24, lh: 32, weight: 700 },
  bodyLarge:    { font: 'body',    size: 18, lh: 28, weight: 400 },
  bodySmall:    { font: 'body',    size: 14, lh: 20, weight: 400 },
  caption:      { font: 'body',    size: 12, lh: 16, weight: 400 },
  statNumber:   { font: 'display', size: 64, lh: 72, weight: 700 },
} as const;

// ---------------------------------------------------------------------------
// Logo rules  (brand-guidelines pp. 8–12)
// ---------------------------------------------------------------------------

export const logo = {
  minSize: { printMm: 10, digitalPx: 30 },
  safezone:
    'Maintain clear space equal to the height of the wordmark on all sides',
  misuses: [
    'No boxing in',
    'No horizontal skewing',
    'No rearranging marks',
    'No vertical skewing',
    'No changing brand colours',
    'No moving the logomark',
    'No rotation',
    'No strokes',
    'No type-only usage',
  ],
  meaning: {
    futureOriented:
      'Represents our commitment to foreseeing and shaping future trends in the digital world.',
    protectorsOfQuality:
      'Stands for our dedication to maintaining the highest standards in every product and service.',
  },
} as const;

// ---------------------------------------------------------------------------
// Spacing  (extension — not specified in the PDF)
// ---------------------------------------------------------------------------
// 4px-based scale chosen to harmonise with the brand type ramp (16/24/32/48/72).

export const space = {
  0: 0, 1: 4, 2: 8, 3: 12, 4: 16, 5: 24, 6: 32, 7: 48, 8: 64,
  9: 96, 10: 128, 11: 160, 12: 224,
} as const;

// ---------------------------------------------------------------------------
// Layout / radii / motion
// ---------------------------------------------------------------------------

export const radii = {
  none: 0, sm: 6, md: 12, lg: 20, xl: 28, full: 9999,
} as const;

export const breakpoints = {
  sm: 640, md: 768, lg: 1024, xl: 1280, '2xl': 1536,
} as const;

export const container = {
  maxWidth: 1440,
  paddingX: { mobile: 24, tablet: 48, desktop: 80 },
};

export const motion = {
  // Cinematic but never sluggish. Reduced-motion respected at the system level.
  durations: { instant: 80, fast: 180, base: 320, slow: 560, scene: 1200 },
  // Cubic-bezier curves picked for a futuristic-glassy feel.
  easings: {
    standard: 'cubic-bezier(0.22, 1, 0.36, 1)',     // outExpo-like
    enter:    'cubic-bezier(0.16, 1, 0.3, 1)',      // outQuint
    exit:     'cubic-bezier(0.7, 0, 0.84, 0)',      // inExpo
    spring:   'cubic-bezier(0.34, 1.56, 0.64, 1)',  // gentle overshoot
  },
} as const;

// ---------------------------------------------------------------------------
// Voice & values (for ARIA labels, alt-text tone, copy boundaries)
// ---------------------------------------------------------------------------

export const voice = {
  attributes: [
    'Confident', 'Inspiring', 'Approachable', 'Casual',
    'Authoritative', 'Respectful', 'Serious', 'Enthusiastic',
  ],
  values: ['Innovation', 'Quality', 'Integrity', 'Community Focus'],
  mission:
    'Empower businesses and individuals by developing state-of-the-art blockchain solutions and immersive metaverse experiences, driving forward the boundaries of what is possible in Web3 technology and digital interactions.',
  vision:
    'A future where digital and physical realities merge seamlessly, setting the standard for innovation in the metaverse and beyond, creating environments where users can thrive in fully interactive, decentralised platforms.',
} as const;

export type Tokens = {
  colors: typeof colors;
  semantic: typeof semantic;
  gradients: typeof gradients;
  fonts: typeof fonts;
  type: typeof type;
  logo: typeof logo;
  space: typeof space;
  radii: typeof radii;
  breakpoints: typeof breakpoints;
  container: typeof container;
  motion: typeof motion;
  voice: typeof voice;
};

const tokens: Tokens = {
  colors, semantic, gradients, fonts, type, logo,
  space, radii, breakpoints, container, motion, voice,
};

export default tokens;
