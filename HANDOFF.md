# Elchai Redesign — Session Handoff

> **Pick this up cold.** Read this file end-to-end. The site is ~95% done.
> Project root: `/Users/elchai/Projects/elchai-redesign`. Last updated: 2026-05-13.
>
> **Latest session note:** Owner trialled an aggressive "Enterprise AI Lab"
> redesign (killed global BackgroundScene, new Hero, Process section, opaque
> glass, cyan CTA) on 2026-05-13 and reverted it ("not nice"). The site is
> back to the chromeribbon backdrop + centred editorial Hero. Phase 1 token
> foundation (new colour tokens, scrim utilities, BackgroundScene dimming,
> async-font loading, deferred Three.js mount, geometry tuning) **stays** —
> only the aggressive visual changes were rolled back. See §H entries 9 and 10.

---

## A. First message to your new Claude session

Paste this verbatim as your first message:

> I'm continuing an Elchai Group website redesign that was in progress in a
> previous Claude session. The full project state is in `HANDOFF.md` at the
> project root. Before doing anything, read these files in order:
>
>   1. `HANDOFF.md` (this file)
>   2. `design-system.md` — 800-line visual + interaction spec (locked)
>   3. `CHANGES.md` — every copy edit + 21st.dev component override
>   4. `src/lib/content.ts` — verbatim homepage + interns copy
>   5. `src/lib/tokens.ts` — brand palette / type / motion / voice
>   6. `src/lib/service-detail-content.ts` — 40 real service-page entries
>   7. `src/lib/service-detail-types.ts` — content shape contract
>   8. `src/components/sections/ServiceDetail.tsx` — universal service-page template
>   9. `src/app/page.tsx` — homepage composition
>   10. `src/app/interns/page.tsx` — bespoke interns page
>   11. `src/app/[slug]/page.tsx` — dynamic route (real template OR stub fallback)
>
> Then start the dev server:
> ```
> cd /Users/elchai/Projects/elchai-redesign
> npm run dev -- -p 3001
> # open http://localhost:3001/
> ```
>
> Then ask the owner what to tackle next — see §F "What's next" for the
> prioritized punch list. Do NOT re-derive locked decisions (see §C).

---

## B. Snapshot — where we are right now

| Layer | Done | Total |
|---|---|---|
| Homepage sections | 20 / 20 ✓ | 20 |
| Bespoke pages | **6 / 6** ✓ (interns + privacy + 4 indexes) | 6 |
| Service-detail pages with real content | **40 / 48** | 48 |
| Service stubs ("Coming soon" placeholder) | 1 (ai-healthcare — no source) | 1 |
| Total real, live pages | **~47** | ~48 |

Scraped source markdown lives at: `/Users/elchai/Documents/019e1be3-701d-715e-bee2-a4a575e2f048/` (one file per page from elchaigroup.com).

---

## C. What's locked — DO NOT re-derive

### C.1 Hero (`src/components/sections/Hero.tsx`)
- Chrome ribbon variant H — `mockups/01-hero-H-chromeribbon.html` is the reference.
- TUNING constants exported at the top — change numbers, refresh.
- Other 9 hero variants in `mockups/` are rejected, kept for compare only.

### C.2 Design system (`design-system.md`)
- 801 lines. Locked. Read before proposing any visual change.
- §11 lists anti-patterns. Don't break them.
- Quick-reference card at bottom.

### C.3 Copy (`src/lib/content.ts`)
- Homepage copy verbatim from `content.ts`. 15 corrections logged in `CHANGES.md`.
- Interns copy verbatim from `content.ts → interns` (added this session).
- **Service-detail content** is synthesized from the scraped markdown at
  `/Users/elchai/Documents/019e1be3-…/`. Heading text matches source; bullet
  descriptions may be slightly condensed for grid readability.

### C.4 Stack
- Next.js 15 (App Router, Turbopack dev) · React 19 · TypeScript 5.7
- Tailwind v4 · Framer Motion · Lenis · three.js · Radix · lucide
- Same logo SVG (`/public/elchai/elchai_logo.svg`) used in Nav + Footer

### C.5 Nav (`src/components/sections/Nav.tsx`)
- Hover dropdowns wired for About Us → Interns + Resources → 4 children.
- Buttons are `h-11` (44px touch target — design-audit fix).
- Mega-menus for Blockchain / Crypto / AI still have caret but no full
  dropdown yet (deferred).

---

## D. Project structure (current)

```
/Users/elchai/Projects/elchai-redesign/
├── HANDOFF.md                                ← you are here
├── CHANGES.md                                ← copy + override log
├── design-system.md                          ← 800-line visual spec
├── elchai-content.md                         ← original homepage scrape
├── elchai-brand-guidelines.pdf               ← brand PDF
├── package.json · tsconfig.json · next.config.ts · postcss.config.mjs
├── mockups/                                  ← 9 hero variants + locked H
└── src/
    ├── app/
    │   ├── globals.css                       ← Tailwind v4 @theme + utilities
    │   ├── layout.tsx                        ← fonts (Montserrat, Inter, Satoshi), Lenis
    │   ├── page.tsx                          ← homepage (20 sections wired)
    │   ├── interns/page.tsx                  ← bespoke interns page
    │   └── [slug]/page.tsx                   ← dynamic: real template OR stub fallback
    ├── lib/
    │   ├── content.ts                        ← homepage + interns copy
    │   ├── tokens.ts                         ← brand tokens
    │   ├── cn.ts                             ← clsx + tailwind-merge
    │   ├── lenis-provider.tsx                ← smooth-scroll boot
    │   ├── service-pages.ts                  ← registry of all internal hrefs
    │   ├── service-detail-types.ts           ← ServiceDetailContent shape
    │   └── service-detail-content.ts         ← 40 real service-page entries
    └── components/
        ├── primitives/
        │   ├── CursorSpotlight.tsx           ← cursor-following halo
        │   ├── EyebrowPill.tsx
        │   ├── GhostCTA.tsx · PrimaryCTA.tsx
        │   ├── HQTimePill.tsx                ← live Dubai clock
        │   ├── NumberedList.tsx
        │   ├── Parallax.tsx                  ← scroll-tied translateY wrapper
        │   ├── Reveal.tsx                    ← 28px fade-up, 900ms
        │   └── SnapSection.tsx               ← ORPHAN (used to wrap homepage sections, no longer)
        ├── sections/                         ← homepage + global sections
        │   ├── Nav.tsx · Footer.tsx
        │   ├── BackgroundScene.tsx           ← chrome-ribbon backdrop, per-category tint
        │   ├── Hero.tsx                      ← chrome ribbon (locked)
        │   ├── TrustStrip.tsx · Awards.tsx · Stats.tsx · Partnership.tsx
        │   ├── Solutions.tsx · TimeZoneBanner.tsx · Services.tsx · CaseStudies.tsx
        │   ├── Industries.tsx · MarqueeBand.tsx · WhyElchai.tsx · Events.tsx
        │   ├── Partners.tsx · ClosingCTA.tsx · Resources.tsx · FAQ.tsx
        │   ├── Contact.tsx · ModalsHost.tsx
        │   └── ServiceDetail.tsx             ← UNIVERSAL service-page template
        └── ui/                               ← 8 21st.dev components, overrides applied
```

---

## E. Service-detail template — how it works

`src/components/sections/ServiceDetail.tsx` is a universal page component that
takes a `ServiceDetailContent` object and renders only the sections present:

```
hero → stats → capabilities → midBanner → industries → whyChoose
     → techStack → process → faq → closing CTA
```

`src/app/[slug]/page.tsx` switches templates per route:
- If `getServiceDetailContent(slug)` returns data → render `<ServiceDetail/>`
- Else → render the existing "Coming soon" stub

To add a new real service page: drop an entry into
`src/lib/service-detail-content.ts` REGISTRY. Zero route or template changes
needed.

**Per-category background tint** (`BackgroundScene` prop):
- Blockchain / Metaverse → cerulean bias
- Cryptocurrency → cyan bias
- AI / ML → lavender bias
- Company / default → balanced

---

## F. What's next — prioritized punch list

### F.1 Bespoke pages (all SHIPPED in the final pass)

| Slug | Status | Notes |
|---|---|---|
| `/privacy-policy` | ✅ DONE | 10-section legal text in `src/app/privacy-policy/page.tsx` — verbatim from the elchaigroup.com crawl |
| `/blog-list` | ✅ DONE | Index re-uses `resources.posts` from `content.ts`. Subscribe-CTA banner at bottom |
| `/case-study` | ✅ DONE | Reuses homepage `caseStudies.items` data. SpotlightCard grid with logo + mock |
| `/portfolios` | ✅ DONE | Featured projects (caseStudies) + 16-partner logo grid + dual CTA |
| `/live-demo` | ✅ DONE | 3 categories (Blockchain/AI/Crypto) × demo cards with "Request a walkthrough" |
| `/ai-healthcare-software-development` | ⏸️ DEFERRED | **Source nav link broken (trailing `#`).** Not in crawl. Falls back to stub. Skip OR write generic. |

### F.2 Design-audit punch list — ALL CRITICAL/IMPORTANT ITEMS SHIPPED

**Critical (all done):**
- ✅ **C1 — Modal a11y.** `role="dialog"`, `aria-modal="true"`, `aria-labelledby` (or `aria-label` fallback), focus trap (Tab/Shift+Tab cycling), initial focus on first focusable, focus restoration to previously-focused element on close. `focus-visible:ring-brand-sky` on panel. See `src/components/ui/modal.tsx`.
- ✅ **C2 — Montserrat brand font now rendering.** Fixed in `globals.css`: `--font-brand: var(--font-brand-loaded), "Montserrat", …` so the next/font loaded variable from `layout.tsx` is actually consumed.
- ✅ **C3 — Hero H1 weight 700.** Fixed in `globals.css` `.display` class: weight 400 → 700, letter-spacing -0.025em → -0.028em.

**Important (most done):**
- ✅ **H1 — Services icons-in-circles removed.** `Services.tsx` no longer uses the 56px icon container. Replaced with cyan-accent number + thin hairline divider above the title. SpotlightCard kept for hover spotlight.
- ✅ **H4 — Deleted orphan `SnapSection.tsx`.** Gone.
- ⏸️ **H2 — Case Studies dead vertical space** — still pending. Trim section padding in `CaseStudies.tsx`.
- ⏸️ **H3 — Stats numbers alignment** — needs visual verification in real Chrome (headless was misleading).

**Medium (pending — low priority):**
- Heading scale inconsistency (H2 between 48.6px and 43.5px) — define one ratio-based scale.
- `text-white/50` office cells in `Contact.tsx` — bump to `/70` per design-system body floor.
- Parallax position-static console warning — one `Parallax` parent needs `position: relative`.
- WhatsApp default dial `+47` in `content.ts:modals.whatsapp.defaultDial` — almost certainly wrong for a Dubai HQ. Flag in `CHANGES.md`.

### F.3 Code-review punch list (residual)

- ✅ Modal a11y (resolved with F.2 C1)
- ⏸️ `CursorSpotlight` cleanup — also listen on `window.blur` for cursor-exit edge case
- ⏸️ Footer social aria-labels — capitalize platform names
- ⏸️ `CursorSpotlight` `el!` non-null assertions can become typed locals
- ⏸️ Mobile responsiveness — stacked-desktop, not redesigned-for-mobile (acceptable for B2B desktop-first audience)

---

## G. Run it locally

```bash
cd /Users/elchai/Projects/elchai-redesign
npm install            # 365 packages
npm run dev -- -p 3001 # 3000 may be occupied
# open http://localhost:3001/
# open http://localhost:3001/interns
# open http://localhost:3001/blockchain-development     (real template)
# open http://localhost:3001/ai-consulting-services     (real template)
# open http://localhost:3001/privacy-policy             (still stub)
# open http://localhost:3001/?debug=1                   (on-page FPS pill)
```

The hero uses three.js + WebGL. Headless Chrome falls back to a static
gradient; open in real Chrome to see the ribbon.

```bash
# Production build
npx next build

# Type check
npx tsc --noEmit

# Lint (not configured — interactive ESLint setup pending)
# npx next lint
```

---

## H. Recent decisions worth knowing

These were made over the course of multiple sessions. Don't re-litigate:

1. **No second 3D canvas allowed except `BackgroundScene`.** Design-system §7
   originally said "one canvas, hero only" — `BackgroundScene` bent the rule
   because the owner specifically wanted ambient atmosphere. Keep this in
   mind if proposing more 3D.
2. **`CursorSpotlight` is the only cursor effect.** A `CustomCursor` (dot +
   ring) and a `MagneticCursor` (snap to interactive) were both prototyped
   and rejected by the owner. Don't bring them back without asking.
3. **Scroll feel is Lenis momentum + per-section Reveal + light parallax.**
   A Z-axis snap-scroll was prototyped and rejected. `SnapSection.tsx` is
   the orphan ghost — delete it (F.2 H4).
4. **Cursor-hover text glow** (cyan halo on hovered headings/body) was
   prototyped and rejected. Don't add CSS `:hover { text-shadow: … }`
   to text elements.
5. **Service-detail pages use a template, not bespoke files** (per
   owner's "build everything" directive). The template is universal; new
   pages are data-only additions.
6. **Per-category `BackgroundScene` tint** — Blockchain pages lean cerulean,
   AI lean lavender, Crypto lean cyan, Company stay balanced. Subtle but
   intentional.
7. **Lenis curve is `out-expo` ~1.4s** (`src/lib/lenis-provider.tsx`).
   Don't put it back to `smoothWheel: false`.
8. **Modal trigger is URL-hash driven** (`#consultation`, `#whatsapp` open
   the modals in `ModalsHost.tsx`). Any link in the tree can trigger a
   modal without prop-drilling.
9. **Performance hardening shipped 2026-05-12 evening.** Three.js mount is
   deferred (waits for `window.load`, then `requestIdleCallback` with 2.5s
   safety fallback). Static cyan/lavender gradient paints first so the
   canvas isn't a black hole pre-boot. Geometry segment counts dropped
   (tubular 220→160, radial 28→20). External font CSS (Fontshare Satoshi
   + Google Geist/JetBrains Mono) moved out of `<head>` into a client
   `FontLoader.tsx` that injects after hydration. Montserrat + Inter
   remain non-blocking via next/font. **Do not undo these.**
10. **2026-05-13 redesign attempt was reverted.** Owner brief asked to kill
    the chromeribbon, make glass opaque, swap CTA to cyan, add Process
    section, rewrite Hero as a left-aligned composition with an SVG
    orbital visual on the right. Implementation worked and typechecked
    cleanly but the owner said "not nice" and asked to revert. The full
    revert is on disk. If the owner returns to this direction, the
    rewritten Hero + Process + opaque glass + cyan CTA changes are
    documented in git-style detail in the prior conversation transcript.

---

## I. Quick verification before deciding "next"

```bash
# Confirm dev server is clean
npm run dev -- -p 3001

# Confirm no type errors
npx tsc --noEmit

# Spot-check 4 page types
curl -sLI http://localhost:3001/                              | head -1  # 200
curl -sLI http://localhost:3001/interns                       | head -1  # 200
curl -sLI http://localhost:3001/blockchain-development        | head -1  # 200 (real template)
curl -sLI http://localhost:3001/privacy-policy                | head -1  # 200 (stub fallback)
curl -sLI http://localhost:3001/not-a-real-route              | head -1  # 404 (correct)
```

If all pass, the site is in a clean, resumable state.

---

## J. Owner relationship notes

Drawn from observed patterns across sessions — useful for the next agent.

- Owner prefers **try-it-and-show-me** over plans. Build, screenshot, ask.
- Owner is decisive: vetoes cleanly when something doesn't work, accepts
  cleanly when it does. Read their judgement — don't argue past a clear "no".
- Owner values **brand restraint**. Single cyan accent. No purple gradient
  AI slop. No icons-in-circles. Real typography.
- Owner uses **continue / go ahead** to push through batches. They've
  authorized "build everything" — interpret as "keep producing until you
  run out of obvious work, then check in."
- Owner is in Dubai (GMT+4). Times in this doc are local.

---

That's the full handoff. Good luck.
