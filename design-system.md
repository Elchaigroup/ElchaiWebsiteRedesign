# Elchai Design System

> Distilled from the locked hero (`mockups/01-hero-H-chromeribbon.html`) and the
> brand foundation in `src/lib/tokens.ts`. Every value below is concrete — the
> rest of the build cites this file rather than re-deciding.
>
> If two sources disagree, the **brand wins**. PDF brand guidelines beat
> hero aesthetics beat tooling defaults.

---

## 0. Source of truth & scope

| File | Owns |
|---|---|
| `src/lib/tokens.ts` | Brand palette, type families, logo rules, voice. The semantic foundation. |
| `src/lib/content.ts` | All copy. Verbatim from the source. Never paraphrase. |
| `design-system.md` (this file) | Visual + interaction rules built on top of tokens. The "how" — sizes, easings, scrims, motion timing. |
| `mockups/01-hero-H-chromeribbon.html` | Locked reference for hero — when in doubt, match its decisions. |

`CHANGES.md` tracks every copy edit made to the source.

---

## 1. Typography

### 1.1 Font roles

Three faces. Strict role assignment — never swap.

| Token | Family | Loaded from | Role |
|---|---|---|---|
| `font-brand` | **Montserrat** (300/400/500/600/700) | Google Fonts | Wordmark, navigation labels, eyebrow / kicker chips, button labels, mono-styled meta. |
| `font-display` | **Satoshi** (400/500/700/900) | Fontshare | All page headlines and section titles. |
| `font-body` | **Inter** (300/400/500/600) | Google Fonts | Paragraphs, list items, FAQ answers, form labels, body UI. |

System fallback chain (every role): `system-ui, -apple-system, "Segoe UI", sans-serif`.

### 1.2 Display ramp (Satoshi)

| Level | Size (clamp) | Line-height | Letter-spacing | Weight | Used for |
|---|---|---|---|---|---|
| `display-xl` | `clamp(48px, 8.2vw, 124px)` | `0.96` | `-0.028em` | **700 (bold)** | Hero headline — single page-defining moment |
| `display-lg` | `clamp(40px, 5.6vw, 88px)` | `1.04` | `-0.025em` | 700 | Major section titles (e.g. "Solutions", "Industries") |
| `display-md` | `clamp(28px, 3.0vw, 44px)` | `1.12` | `-0.015em` | 700 | Sub-section titles, FAQ heading |
| `display-sm` | `clamp(24px, 2.2vw, 32px)` | `1.16` | `-0.010em` | 700 | Card titles, CTA banner headlines |

**Rules.**
- Hero headline (`display-xl`) is **exactly once** per page.
- "AI & Blockchain" gets the `bg-clip-text` cyan→lavender gradient — no other phrase does.
- Never use Satoshi at weight 300; minimum is 400.
- Never set Satoshi all-caps at `display-xl` or larger — at that scale the geometry breaks. Title case only.

### 1.3 Body ramp (Inter)

| Level | Size | Line-height | Weight | Used for |
|---|---|---|---|---|
| `body-lg` | 19px | 1.55 | 400 | Hero description, lead paragraphs |
| `body` | 16px | 1.55 | 400 | All paragraph text |
| `body-sm` | 14px | 1.50 | 400 | Card bodies, secondary copy |
| `body-xs` | 13px | 1.50 | 400 | Footer items, fine print |
| `bullet` | 15px | 1.50 | 400 | Hero bullets, FAQ answers |

Default body colour: `rgba(255,255,255,0.75)` on dark surfaces. Never pure white for body paragraphs (too aggressive on dark).

### 1.4 Brand/label ramp (Montserrat)

Used for short, structured UI text. Always tracked and usually uppercase.

| Level | Size | Letter-spacing | Case | Weight | Used for |
|---|---|---|---|---|---|
| `eyebrow` | 11px | `0.18em` | uppercase | 500 | Section eyebrow, pill chip text |
| `nav-item` | 13px | `0` | normal | 500 | Nav links inside the pill |
| `button` | 15px | `0.04em` | normal | 500 | Primary / ghost CTA labels |
| `meta` | 11px | `0.22em` | uppercase | 500 | Tabular meta (clocks, coords, version) |
| `eyebrow-sm` | 10px | `0.30em` | uppercase | 500 | "Scroll" hint, footer-level meta |

### 1.5 Typography rules

- **One face per role.** Don't put Inter into a headline or Satoshi into a body paragraph.
- **The cyan→lavender gradient on "AI & Blockchain"** is the ONLY place a brand-coloured text fill appears in the hero. Other emphasis uses weight, size or `rgba(255,255,255,0.5)` dim — not colour.
- **Line-height tightens as size grows.** Display-xl uses 0.96; body uses 1.55. Don't apply body line-height to a headline (it'll look stretched).
- **Negative tracking on display** (`-0.028em` at xl) compensates for optical loosening at large sizes.
- **No font-variant: small-caps, no text-decoration: underline** on the editorial side. Inline links can use a custom animated underline (see §8.10).

---

## 2. Color system

### 2.1 Brand tokens (PDF, pp. 18–20)

```
--brand-sky:      #18DEFF   // Bright Sky Blue — primary accent
--brand-cerulean: #52B8FF   // Vivid Cerulean   — supporting accent
--brand-lavender: #B07CFF   // Light Lavender  — supporting accent
--white:          #FFFFFF
--black:          #000000
```

Tint scale (PDF p. 20): 80 / 60 / 40 / 20 / 10 % — applied to each accent as needed.

### 2.2 Semantic aliases

The dark surface is the spine — every aliased value below sits on a near-black canvas.

```
--bg:            #000000          // page surface
--fg:            #FFFFFF          // headline text only
--text-strong:   rgba(255,255,255,0.85)   // bullet items, in-card titles
--text-default:  rgba(255,255,255,0.75)   // body paragraphs
--text-muted:    rgba(255,255,255,0.55)   // nav, eyebrow, meta labels
--text-subtle:   rgba(255,255,255,0.40)   // dim tail of body, footer
--text-faint:    rgba(255,255,255,0.20)   // separators, hint text

--surface-1:     rgba(255,255,255,0.025)  // glass card base
--surface-2:     rgba(255,255,255,0.05)   // glass card hover
--surface-3:     rgba(255,255,255,0.08)   // elevated panel

--border:        rgba(255,255,255,0.08)   // hairline divider, card border
--border-strong: rgba(255,255,255,0.16)   // primary card border, focus

--accent-primary:   #18DEFF       // CTAs, focus ring, gradient start
--accent-secondary: #52B8FF       // mid-emphasis gradients
--accent-tertiary:  #B07CFF       // gradient end, lavender rim
```

### 2.3 Restraint rule — brand colours are *accents*, not floods

The locked hero proves this: on a 1440×900 canvas, brand-coloured *pixels* occupy < 8% of the area. Everywhere else is black + white + transparency.

| Where brand colour **may** appear | Where brand colour **must not** appear |
|---|---|
| The "AI & Blockchain" gradient span in the headline | Body paragraphs |
| Live-dot indicators (cyan with cyan glow) | Card backgrounds |
| Primary CTA `:hover` (white → cyan) | Section dividers |
| The 3D ribbon's iridescent reflections | Eyebrow pill background |
| Hairline highlights on focus rings | Nav link text |
| The bullet-circle ring + check icon | Body bullets text |
| Stat counter "+" suffix | Headline (except the gradient span) |
| Marquee item separators (`·`) — optional | Long runs of UI chrome |

**Rule of thumb.** If a section has zero coloured pixels for the first half-second of viewing, you've probably got the balance right. The brand colours are emphasis, not theme.

### 2.4 Specific surface assignments

| Surface | Colour | Notes |
|---|---|---|
| Page body | `#000000` | Pure black. No off-black greys at the page level. |
| Hero canvas backdrop | `#000000` behind 3D | Canvas alpha:true; renderer.toneMappingExposure: 1.10 |
| Nav pill | `surface-1` + `glass blur(20px)` | See §5.1 |
| Cards (default) | `surface-1` + `border` 1px | Hover: `surface-2` + `border-strong` |
| Modals | `rgba(8,8,12,0.85)` + `blur(28px) saturate(150%)` | Strongest blur in the system |
| Footer | `#04040a` (a single deliberate exception to "pure black") | Anchors the page bottom |

---

## 3. Spacing scale

### 3.1 Base unit & scale

**4 px base.** Use only these values; nothing in between.

```
space-0  = 0
space-1  = 4
space-2  = 8
space-3  = 12
space-4  = 16
space-5  = 24
space-6  = 32
space-7  = 48
space-8  = 64
space-9  = 96
space-10 = 128
space-11 = 160
space-12 = 224
```

Tailwind equivalents: `p-0` `p-1` `p-2` `p-3` `p-4` `p-6` `p-8` `p-12` `p-16` `p-24` `p-32` `p-40` `p-56`.

### 3.2 Section vertical padding

| Viewport | `py` |
|---|---|
| < 640 px (mobile) | `80px` (space-8 + space-2) |
| 640–1024 px (tablet) | `96px` (space-9) |
| ≥ 1024 px (desktop) | `120px` (space-10 − space-2) |

Hero section is an exception — uses `pt-40 pb-28` (160 / 112) to give the headline room.

### 3.3 Content gutters & gaps

| Use | Value |
|---|---|
| Container max-width | 1440px (general), 1320px (nav pill) |
| Container horizontal padding | 24px mobile / 48px tablet / 80px desktop (`px-6 sm:px-12 lg:px-20`) |
| Headline → description gap | 32px (`mt-8`) |
| Description → bullets gap | 32px |
| Bullets → CTA gap | 40px (`mt-10`) |
| Grid row gap inside section | 16px for tile grids, 48–64px for narrative grids |
| Grid column gap | 16px tile / 32px narrative |
| Card internal padding | 32px desktop / 24px mobile |

---

## 4. Layout primitives

### 4.1 Breakpoints (Tailwind defaults — explicit)

```
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px
```

Mobile-first. Hero collapses 12-col → 1-col below `lg`.

### 4.2 Container widths

| Context | Max-width |
|---|---|
| Default content rail | 1440 px |
| Nav pill | 1320 px |
| Headline copy column | 820 px |
| Body paragraph column | 560 px |
| Modal | 720 px |

### 4.3 Grid systems

**12-column** is the default. Sections compose into one of three patterns:

- **7 + 5** (asymmetric editorial) — Hero. Copy on cols 1–7, supporting visual / aside on cols 8–12.
- **6 + 6** (balanced) — Partnership block, "About" sections.
- **3 × 4 / 4 × 3** (uniform tiles) — Services grid (3 cols × 2 rows = 6 services), industries grid (4 cols × 4 rows).
- **Centered single column** — Time-zone banner, closing CTA, FAQ heading.

### 4.4 When to use which

| Pattern | Use when | Don't use when |
|---|---|---|
| 7+5 | One concept needs editorial weight + one supporting graphic | The supporting visual is decorative (use background instead) |
| 6+6 | Two equally-weighted ideas next to each other | Either side is information-dense (will feel cramped) |
| Tile grid | ≥4 parallel items at the same hierarchy | Items vary in importance (use a list with hierarchy instead) |
| Centered | A single declarative statement is the entire section | A section has multiple voices |

---

## 5. Surface treatment

### 5.1 Glass

Used on: nav, eyebrow pills, modal shells, hero in-canvas chrome. **Not used** on body paragraphs or section backdrops.

```css
.glass {
  background: rgba(255,255,255,0.035);
  border: 1px solid rgba(255,255,255,0.08);
  backdrop-filter: blur(20px) saturate(140%);
  -webkit-backdrop-filter: blur(20px) saturate(140%);
}
```

**`.glass-edge` companion** — adds an additional gradient hairline along the top:

```css
.glass-edge::before {
  content:""; position: absolute; inset: 0; padding: 1px; border-radius: inherit;
  background: linear-gradient(180deg,
    rgba(255,255,255,0.22),
    rgba(255,255,255,0.02) 60%,
    rgba(255,255,255,0.08));
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
```

Blur values by use:
| Element | Blur | Saturate |
|---|---|---|
| Nav pill | 20px | 140% |
| Eyebrow pill | 20px | 140% |
| Card hover state | 14px | 130% |
| Modal | 28px | 150% |

**Rule.** Never blur > 28px (visible banding). Never use glass on text-dense paragraphs (legibility tanks).

### 5.2 Scrim — for copy over busy backgrounds

When type sits directly over the 3D ribbon or any high-contrast backdrop:

```css
/* Desktop: left-biased horizontal scrim */
.copy-scrim {
  position: absolute; inset: 0; pointer-events: none; z-index: 1;
  background: linear-gradient(90deg,
    rgba(0,0,0,0.78) 0%,
    rgba(0,0,0,0.50) 28%,
    rgba(0,0,0,0.15) 52%,
    transparent 70%);
}

/* Mobile: vertical (top dim, bottom dim) */
@media (max-width: 1024px) {
  .copy-scrim {
    background: linear-gradient(180deg,
      rgba(0,0,0,0.20) 0%,
      rgba(0,0,0,0.55) 25%,
      rgba(0,0,0,0.80) 60%);
  }
}
```

### 5.3 Vignette + hero edges

Top and bottom of the hero anchor with a vignette so the section bleeds into the page above/below:

```css
.hero-edges::before {
  content:""; position: absolute; inset: 0; pointer-events: none; z-index: 2;
  background: linear-gradient(180deg,
    rgba(0,0,0,0.55) 0%,
    transparent 14%,
    transparent 78%,
    rgba(0,0,0,0.95) 100%);
}
```

3D post-processing vignette runs inside the shader pass at `uVignetteAmount: 0.50`.

### 5.4 Grain

System-wide grain texture, fixed, very low opacity. One declaration in the global stylesheet, never per-section:

```css
body::before {
  content:""; position: fixed; inset: 0;
  pointer-events: none; z-index: 60;
  opacity: 0.035;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml;utf8,<svg ...feTurbulence baseFrequency='0.85' numOctaves='2' .../>");
}
```

Grain inside three.js post is independent (`uGrainAmount: 0.04`) — the two grains stack additively and that's intentional; it gives the page a continuous film texture across canvas and DOM.

### 5.5 Elevation hierarchy

No CSS `z-index` larger than 70. Reserved bands:

| z-index | Purpose |
|---|---|
| 0 | Canvas (3D backdrop) |
| 1 | Scrims, in-section overlays |
| 2 | Hero-edges, vignette |
| 10 | Hero content (text, CTAs) |
| 30 | Side rails, scene navigators |
| 40 | Section-pinned UI |
| 50 | Nav |
| 60 | Page-level overlays (grain, scanlines) |
| 70 | Debug FPS pill, variant tag |
| 99+ | Modal layer (open state only) |

---

## 6. Motion system

### 6.1 Easings

```ts
const ease = {
  standard:    'cubic-bezier(0.22, 1, 0.36, 1)',   // out-expo-like. Default for everything.
  enter:       'cubic-bezier(0.16, 1, 0.30, 1)',   // out-quint. Sharper finish for reveals.
  exit:        'cubic-bezier(0.70, 0, 0.84, 0)',   // in-expo. Departing UI (modal close).
  spring:      'cubic-bezier(0.34, 1.56, 0.64, 1)', // gentle overshoot. Hover only.
  linearLoop:  'linear',                            // continuous loops (marquee, drift)
};
```

**Default to `ease.standard`.** Reach for the others only when behaviour explicitly calls for it.

### 6.2 Duration ranges

| Band | Range | Use |
|---|---|---|
| `instant` | 80–120 ms | Cursor follow, dot pulse beat |
| `micro` | 150–250 ms | Hover state changes, focus ring fade, button colour |
| `meso` | 320–560 ms | Card lift-on-hover, accordion expand, tab change |
| `macro` | 800–1200 ms | Scroll-reveal fade-up, modal enter, page transitions |
| `scene` | 6–60 s | 3D camera drift, light orbit, marquee loop, breathing |

Specific cited durations:
- Reveal stagger: `900 ms` per element, delays in `120 ms` increments
- Pulse dot cycle: `2400 ms`
- 3D camera drift period: `55 s`
- 3D light orbit period: `28 s`
- Marquee loops: `40–70 s` depending on logo count

### 6.3 Reveal patterns

Every above-the-fold element fades up in sequence on page load. Below-the-fold elements use `IntersectionObserver` triggered at 0.15 ratio. Pattern:

```css
[data-fm="fade-up"] {
  opacity: 0;
  transform: translateY(28px);
  animation: fadeUp 900ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: var(--fm-delay, 0ms);
}
@keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }
```

Stagger delays inside a hero:

| Element | Delay |
|---|---|
| Eyebrow pill | 60 ms |
| Headline | 180 ms |
| Description | 300 ms |
| Bullets | 420 ms |
| Primary CTA | 560 ms |
| Scroll cue | 1000 ms |

Other elements use the same `data-fm` attribute pattern — the Step 5 build will swap the CSS animation for Framer Motion variants with the same timing.

### 6.4 Continuous motion

| Loop | Period | Where |
|---|---|---|
| Camera drift (3D) | 55 s | Hero canvas |
| Light orbit (3D) | 28 s | Hero canvas (per light) |
| Pulse dot | 2.4 s | Eyebrow pills, status dots |
| Marquee logos | 40 s | Trust strip, partners |
| Marquee text | 50 s | Inter-section text band |
| Breath scale | 12 s | Reserved for sections that need atmospheric pulse |

### 6.5 Reduced-motion fallback

`prefers-reduced-motion: reduce` — system-wide rule:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation: none !important;
    transition: none !important;
  }
  #three-canvas { display: none; }   /* swap to static brand-gradient fallback */
}
```

Inside the JS module, the same media query is checked at boot to skip three.js entirely and paint a static radial-gradient backdrop matching the brand palette.

---

## 7. 3D usage policy

### 7.1 The hero is THE 3D moment

There is **one** `<canvas>` on the page. It lives in the hero. The chrome ribbon is the Elchai signature; the rest of the page reads as careful 2D editorial. This is non-negotiable — every previous attempt at adding additional 3D scenes (variants B / C / D) read as a tech-demo, not a product.

### 7.2 What other sections may use

| Technique | Allowed | Used by |
|---|---|---|
| CSS gradient morph (animated `background-position`) | yes | Closing CTA, ambient backdrops |
| SVG path morph / `animate` | yes | Connector lines, decorative wires |
| Parallax via scroll-tied `transform: translateY()` | yes | Featured project cards, partnership ring |
| Auto-scrolling marquees (translateX loop) | yes | Trust logos, partners, inter-section text bands |
| Stagger reveals (fade-up, blur-out) | yes | Every section |
| CSS-only orbit / spin (`@keyframes spin`) | yes | Decorative rings, clock dial in time-zone section |
| Lottie / Rive | maybe | Industry icons — only if needed and only with brand palette |

### 7.3 What other sections must NOT add

- A second `<canvas>` element on the page.
- Any `three.js` import outside `/components/Hero/`.
- Per-card glass spheres, refractive boxes, particle backdrops, etc.
- WebGL shader effects on text (CSS background-clip is the only "shadery" headline treatment).
- Video files > 2 MB as section backdrops.
- Embedded iframes (Codepen, sketchfab, Spline) — kills performance and consistency.

If a section wants "more 3D feel," the answer is **better parallax + better gradient + better timing**, not another scene.

---

## 8. Component patterns

### 8.1 Nav pill

```
- Fixed, top: 16 px, centered (max-width: 1320 px)
- glass + glass-edge, rounded-full
- Padding: 8 8 8 24
- Items: h-9 (36px) px-4 rounded-full text-[13px] (Montserrat 500)
- States:
  - default:   text-white/60
  - hover:     text-white + bg-white/5
  - active:    text-white (no bg)
- Right cluster: language toggle (border-white/10) + primary CTA (white pill, h-10)
- Mobile (< lg): items hidden; logo + CTA only
```

### 8.2 Eyebrow pill

```
- glass + glass-edge + rounded-full
- Padding: 6 16 6 8 (asymmetric — left tight for the dot)
- Inside: pulse-dot (8px brand-sky with 4px ping aura) + label text
- Label: Montserrat 500, 11px, uppercase, tracking-[0.18em], text-white/70
- One per section
- Width: hug-content
```

### 8.3 Primary CTA

```
- bg: white. Text: black.
- Height: 60 px (hero) / 52 px (in-section)
- Padding: px-8 (hero) / px-7 (in-section)
- rounded-full
- Font: Montserrat 500, 15px, tracking-[0.04em]
- Trailing icon: 16x16 arrow, transitions translateX(4px) on group-hover
- Shadow: 0 30px 80px -30px rgba(24,222,255,0.55)   // brand cyan halo
- Hover: -translate-y-0.5 (2px lift, 250ms ease.standard)
- Focus: 2px outline rgba(24,222,255,1) with 4px offset
```

### 8.4 Ghost CTA (secondary)

```
- glass + glass-edge + rounded-full
- Border: 1px rgba(255,255,255,0.16)
- Text: rgba(255,255,255,0.85)
- Hover: text-brand-sky + border-brand-sky
- Same height/padding/font/tracking as primary
```

### 8.5 Section header trio

Every major section opens with the same three-part header (no exceptions):

```
[eyebrow]
[display-lg headline]
[body-lg description, max-width: 720]
```

Spacing inside the trio:
- eyebrow → headline: 20 px (`mt-5`)
- headline → description: 24 px (`mt-6`)
- description → first content block: 56 px (`mt-14`)

### 8.6 Numbered bullet list (left-rail)

For 3–6 short items that should feel like *tenets*, not features:

```html
<ol class="border-l border-white/10 pl-5 grid gap-2.5">
  <li class="text-bullet">
    <span class="font-brand text-[10px] tracking-[0.16em] text-brand-sky mr-2">01</span>
    Lorem ipsum sit amet.
  </li>
  ...
</ol>
```

- Numbers: Montserrat 500, 10 px, 0.16em tracking, brand-sky
- Items: Inter 400, 15 px, line-height 1.5, text-white/82
- No icon bullets; the number is the bullet
- Max 6 items

### 8.7 Marquee

For trust logos, partners, inter-section text bands.

```css
.marquee-mask {
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
}
.marquee {
  display: flex;
  gap: 56px;     /* logos */ | 64px /* text */
  width: max-content;
  animation: scroll-x 40s linear infinite;
}
@keyframes scroll-x { from { transform: translateX(0); } to { transform: translateX(-50%); } }
```

- Duration: 40 s logos, 50 s text bands
- Duplicate the content array once in markup for seamless loop
- Items: text-only marks, white/30, hover white/85
- Never marquee at high contrast — feels frantic

### 8.8 Card (default)

```
- Padding: 32 desktop / 24 mobile
- bg: surface-1, border: 1px border, border-radius: 16 px
- Hover: bg surface-2, border border-strong, translateY(-3px), 400ms ease.standard
- Optional cursor-glow on hover (radial cyan tinted by CSS --mx/--my vars)
- Number/index in mono Montserrat 11px upper-left
- Title: display-sm, mb-3
- Body: body-sm, text-white/55
- Trailing arrow: 36px round, border-white/10 → cyan on hover
```

### 8.9 FAQ disclosure

```
- One row per Q. Border-top hairline (border-white/8)
- Click anywhere to toggle
- Q layout: [number 01] [title — flex-1] [+ icon — 40px round]
- Title: display-md (Satoshi 700, clamp(18, 1.6vw, 22))
- Number: brand-sky, Montserrat 500, 12px, 0.18em tracking
- + icon rotates 45deg on open, background flips to brand-sky
- Answer slides via max-height transition (500ms ease.standard)
- Answer body: 15 px Inter, line-height 1.65, text-white/65, padding-left 64
```

### 8.10 Animated link (text + underline)

```
- Inline text + 1px hairline below
- Underline: gradient cyan → lavender, scale-x 1 → 1.05 on hover, transform-origin left, 400ms ease.standard
- Optional trailing 22px round arrow chip (border-white/32, fills cyan on hover)
```

---

## 9. Micro-interactions

### 9.1 Hover

| Element | Treatment | Duration |
|---|---|---|
| Primary CTA | -translateY(2px) | 250 ms |
| Card | -translateY(3px) + border lighten | 400 ms |
| Nav item | bg fade-in to white/5 | 250 ms |
| Glass surface | optional cursor-tracking radial glow | 400 ms |
| Animated link | underline scaleX 1.05 + arrow chip fill | 400 ms |

All using `ease.standard`. **Never** scale up beyond 1.03 — feels gimmicky.

### 9.2 Focus

Every interactive element MUST have a visible focus ring (keyboard-navigation requirement):

```css
:focus-visible {
  outline: 2px solid var(--accent-primary);  /* #18DEFF */
  outline-offset: 4px;
  border-radius: inherit;
}
```

- Offset is 4 px so the ring doesn't overlap rounded corners
- Never disable `:focus-visible` to "clean up" the design — that's an accessibility regression
- The ring colour is the same brand-cyan used everywhere else; consistency is the point

### 9.3 Active

```
Active (mouse-down / touch-down):
- scale: 0.98 (cards + buttons)
- transition: 80 ms ease.standard
```

### 9.4 Cursor effects

- Default cursor: `cursor: pointer` on every clickable element (no exceptions)
- Hover-tracking radial glow inside cards: read `mousemove` → set CSS `--mx`/`--my` % vars → radial-gradient at that position fades in
- No custom system cursor (`cursor: url(...)`) — it kills accessibility and looks gimmicky

---

## 10. Accessibility

### 10.1 Contrast (WCAG AA / AAA on the dark surface)

| Combination | Ratio | Grade |
|---|---|---|
| white #FFF on black #000 | 21.0 : 1 | AAA |
| white/85 on #000 (`#d9d9d9`) | 14.85 : 1 | AAA |
| white/75 on #000 (`#bfbfbf`) | 11.58 : 1 | AAA |
| white/55 on #000 (`#8c8c8c`) | 6.36 : 1 | AAA (large) / AA (small) |
| white/40 on #000 (`#666666`) | 4.74 : 1 | AA (large) — body floor |
| brand-sky `#18DEFF` on black | 14.32 : 1 | AAA |
| brand-cerulean `#52B8FF` on black | 9.91 : 1 | AAA |
| brand-lavender `#B07CFF` on black | 6.34 : 1 | AAA (large) / AA (small) |

**Floor:** body text must be ≥ `white/70` on the page surface. Anything dimmer is decorative-only (meta labels, marquee items).

### 10.2 Focus ring

See §9.2. **Test:** tab through every page in keyboard-only mode; every stop must show the ring within 100 ms.

### 10.3 Keyboard navigation

- Tab order follows DOM order; no `tabindex > 0`.
- Skip-to-content link is the first focusable element (hidden until focused).
- Modals trap focus while open; `Esc` closes them.
- Marquees and 3D animations are not in the tab order (`aria-hidden="true"` on the canvas).

### 10.4 ARIA patterns

| Pattern | ARIA |
|---|---|
| Nav | `<nav aria-label="Primary">` |
| Solutions tabs | `<button role="tab" aria-selected>` + `<div role="tabpanel" aria-hidden>` |
| FAQ items | `<button aria-expanded aria-controls>` + `<div role="region" aria-labelledby>` |
| Modal | `<div role="dialog" aria-modal="true" aria-labelledby>` |
| Live status (clock, "Live" dot) | `<span aria-live="polite">` |
| Decorative SVG / canvas | `aria-hidden="true"` |
| Marquee | `<div aria-hidden="true">` (decorative); accessible logo list provided elsewhere |

### 10.5 `prefers-reduced-motion`

- Animations: disabled
- Transitions: disabled
- 3D canvas: hidden; replaced with a static `radial-gradient` fallback in brand colours
- Marquees: pause via `animation-play-state: paused`
- Auto-rotating tabs / carousels: pause

The user setting is checked **once at boot** and the page commits to one mode for the session (no toggling back).

---

## 11. Anti-patterns (lessons from the failed iterations)

### Geometry / 3D
- **No clusters of tiny primitives** — 28 glass cubes, 80 particles + 30 bezier arcs, 4 nested rings + orbiting nodes all read as tech-demo, not product. The hero is one continuous form (the ribbon).
- **No flat-shaded `MeshBasicMaterial` primitives** as foreground elements. Either go physical/iridescent or don't show it.
- **No `LineBasicMaterial` at 1 px** for prominent lines. Use `Line2 + LineMaterial` ≥ 1.4 px for anti-aliased thick lines.
- **No second `<canvas>`** anywhere on the page.

### Composition
- **No literal layout copies** from reference sites. Reference is *quality bar*, never *blueprint*.
- **No dashboard/console framing** of the hero (variant E) — Elchai isn't a SaaS product.
- **No all-caps manifesto headline** at the hero level (variant F) — Elchai is a studio, not a magazine cover.
- **No light-weight (≤ 400) Satoshi** at hero scale — it feels thin/cold (variant G).
- **No headline broken into > 4 lines** at desktop — pushes everything below the fold.

### Colour
- **No brand-colour flooding.** Brand colours are accents, not theme. If brand-coloured pixels exceed ~10 % of the viewport, dial back.
- **No saturated background fills.** Backgrounds are black or near-black; saturation lives only in 3D reflections and small UI marks.
- **No gradient sweeps on long text** — only on "AI & Blockchain" in the headline. Gradients on paragraphs feel cheap.

### Type
- **No mixing of mono and display in the same line.** Mono is for utility chips/labels, not headlines.
- **No letter-spacing on body paragraphs > 0.01em.** Tight is correct.
- **No body type below 14 px** in production sections. Fine print exists but max 1 instance per section.

### Surface
- **No more than one glass-on-glass layer.** Nesting glass blurs makes everything grey mud.
- **No box-shadow on text** for "depth." Use weight and contrast instead.
- **No drop-shadow on icons.** They're glyphs; treat them like glyphs.

### Post-FX
- **No SSAOPass + BokehPass + UnrealBloomPass + ChromaticAberration + Grain stacked.** Pick ≤ 2 of (SSAO, Bokeh, CA). UnrealBloom + grain is always allowed; everything else is optional.
- **Bloom strength ≤ 1.1.** Past that the bright pixels eat the form.
- **Pixel ratio capped at 1.5.** Don't render at native retina — wasted GPU cycles.

### Motion
- **No more than 5 elements revealing simultaneously** on page load. Stagger via `--fm-delay` in 120 ms steps.
- **No camera FOV < 35° or > 60°.** Too narrow feels claustrophobic; too wide warps geometry.
- **No simultaneous scale/rotate/translate** on the same element on hover — pick one transform axis.

---

## 12. Quick reference card

```
COLOURS         Brand   #18DEFF  #52B8FF  #B07CFF                white #FFF  black #000
                Text    /85  /75  /55  /40  /20                  Bg #000
TYPE            Headline   Satoshi 700, clamp(48, 8.2vw, 124), 0.96, -0.028em
                Section    Satoshi 700, clamp(40, 5.6vw, 88),  1.04, -0.025em
                Body       Inter   400, 16 / 1.55, white/75
                Eyebrow    Montserrat 500, 11, 0.18em, UPPER, white/70
SPACE           4 8 12 16 24 32 48 64 96 128 160 224  (multiples of 4)
                Section: pt 120 pb 120 (desktop)   |   Hero: pt 160 pb 112
MAX-WIDTH       Content 1440  |  Nav 1320  |  Headline 820  |  Body 560
GRID            7+5 hero  |  6+6 balanced  |  3×n tile  |  centered declarative
GLASS           rgba(255,255,255,0.035), border /08, blur 20 saturate 140
SCRIM           90deg 0.78→0.50→0.15→transparent  (desktop)
EASE            cubic-bezier(0.22, 1, 0.36, 1)
DURATIONS       hover 250  |  reveal 900  |  drift 55s
REVEAL          translateY 28 → 0, opacity 0 → 1, stagger 120ms
CTA             h-60 px-8 rounded-full bg-white shadow 0 30 80 -30 cyan/55
3D POLICY       Hero only.  No second canvas.  Other sections = 2D.
A11Y            Body ≥ white/70.  Focus 2px cyan offset 4px.  reduced-motion swaps to gradient fallback.
```

---

*End of `design-system.md`. Locked at chromeribbon. Cite this file, don't re-derive.*
