# CHANGES.md — Copy corrections applied to content.ts

Tracks every word, character, link, or punctuation change made to the source copy
from `elchai-content.md`. Every entry below is the result of explicit approval
from the project owner (Step 1 review, 2026-05-11). Items in **Pending** are
flagged but **not** auto-applied — they await a follow-up call.

---

## 1. Spelling typos

| #     | Location (in `content.ts`)               | Before                | After                  |
| ----- | ---------------------------------------- | --------------------- | ---------------------- |
| 1.1   | `nav.blockchain.columns[1].items[4]`     | `DApp Developmet`     | `DApp Development`     |

## 2. Punctuation — double `??` on FAQ questions

| #     | Location                                 | Before                                                          | After                                                          |
| ----- | ---------------------------------------- | --------------------------------------------------------------- | -------------------------------------------------------------- |
| 2.1   | `faq.items[4].q`                         | `Can you integrate AI with blockchain technology??`             | `Can you integrate AI with blockchain technology?`             |
| 2.2   | `faq.items[5].q`                         | `Do you offer a free consultation??`                            | `Do you offer a free consultation?`                            |

## 3. Broken/incorrect links

| #     | Location                                 | Before          | After           |
| ----- | ---------------------------------------- | --------------- | --------------- |
| 3.1   | `footer.columns[0].items[8]` ("Layer 2") | `/layer-1/`     | `/layer-2/`     |

## 4. Multi-space artefacts inside headings (collapsed to single space)

Source had display-time letter-spacing simulated via runs of spaces. Collapsed
to single spaces for clean kerning under the new Satoshi/Inter system.

| #     | Location                                 | Before (visible spaces marked with `␣`)                                                                       | After                                                                                          |
| ----- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| 4.1   | `hero.headline`                          | `Driving Digital Transformation␣␣␣with AI & Blockchain Products`                                              | `Driving Digital Transformation with AI & Blockchain Products`                                 |
| 4.2   | `stats.heading`                          | `Architecting Digital␣␣␣Excellence For␣␣␣5,000+ Industry Leaders`                                             | `Architecting Digital Excellence For 5,000+ Industry Leaders`                                  |
| 4.3   | `solutions.heading`                      | `Full- Spectrum Of AI-Powered Solutions␣␣␣␣Engineered For Global Impact`                                      | `Full- Spectrum Of AI-Powered Solutions Engineered For Global Impact`                          |
| 4.4   | `services.heading`                       | `We Create New Solutions and Transform Existing Ones with New Gen Technologies␣␣To Make Your Business Future-proof` | `We Create New Solutions and Transform Existing Ones with New Gen Technologies To Make Your Business Future-proof` |
| 4.5   | `industries.heading`                     | `Engineering Industry-specific Excellence␣␣␣␣With AI & Innovation`                                            | `Engineering Industry-specific Excellence With AI & Innovation`                                |
| 4.6   | `why.heading`                            | `How We Drive Successful␣␣␣Digital Transformation For You?`                                                   | `How We Drive Successful Digital Transformation For You?`                                      |
| 4.7   | `why.pillars[0].title`                   | `AI-Powered␣␣␣␣Transformation`                                                                                | `AI-Powered Transformation`                                                                    |
| 4.8   | `why.pillars[1].title`                   | `Human-Centric␣␣␣␣Approach`                                                                                   | `Human-Centric Approach`                                                                       |
| 4.9   | `why.pillars[2].title`                   | `Future-Proof␣␣␣␣Scalability`                                                                                 | `Future-Proof Scalability`                                                                     |
| 4.10  | `why.pillars[3].title`                   | `Transparent Communication␣␣␣␣& Collaboration`                                                                | `Transparent Communication & Collaboration`                                                    |
| 4.11  | `closingCta.heading`                     | `It’s Time To Accelerate Your␣␣␣Digital Transformation Journey`                                               | `It’s Time To Accelerate Your Digital Transformation Journey`                                  |
| 4.12  | `resources.heading`                      | `Resources To Fuel Your␣␣␣␣Digital-First Innovation Journey`                                                  | `Resources To Fuel Your Digital-First Innovation Journey`                                      |

---

## Pending — flagged but not changed

These are single-space hyphenation artefacts that look like PDF-scrape damage
(e.g. `Full- Spectrum`, `AI- Powered`). They were **not** auto-fixed because
the Step 1 approval only authorised *multi-space* collapse, not single-space
hyphen splits. Awaiting explicit approval before touching.

| #     | Location                            | As-is text                  | Suggested fix             |
| ----- | ----------------------------------- | --------------------------- | ------------------------- |
| P.1   | `solutions.heading`                 | `Full- Spectrum`            | `Full-Spectrum`           |
| P.2   | `solutions.tabs[1].sub`             | `AI- Powered App Builder`   | `AI-Powered App Builder`  |
| P.3   | `solutions.panels[1].title`         | `AI- Powered App Builder`   | `AI-Powered App Builder`  |
| P.4   | `services.kicker` + `bottomCta.kicker` | `Tech Troubles Holding You Back?` and `Is Tech Troubles Holding You Back?` are both kept verbatim per Step 1 — the second has a grammar quirk ("Is Tech Troubles") that may or may not be intentional. | — |

---

## 5. 21st.dev component overrides applied at install

Per the Step 4 curation report, none of the 8 components were installed
vanilla. The overrides below were applied at install time inside
`src/components/ui/`. This log exists so future maintainers can spot
where a "stock" 21st.dev component would have shipped different defaults.

| # | Component | Overrides applied |
| ----- | ----------------------------------- | --------- |
| 5.A   | `infinite-slider.tsx`               | Stripped wrapper-level `bg-secondary/from-...` gradient + border-x from the demo. Pure transport — caller positions and styles. Default speed 60 px/s. |
| 5.B   | `progressive-blur.tsx`              | No styling assumptions. Caller positions absolutely. `blurIntensity` defaults to 0.25 (premium mild fade). |
| 5.C   | `animated-counter.tsx`              | Removed default `text-primary font-bold` + container chrome. Counter trigger swapped to `useInView` (was: starts immediately). Tabular nums baked in for stable digit width. |
| 5.D   | `animated-tabs.tsx`                 | `bg-secondary/50 border-primary/10` → `glass + border-white/10`; highlight bg `bg-primary` → `bg-white` (matches our CTA inversion); text on highlight goes to `text-ink`. Added `onChange` callback + optional `num`/`sub` slots. |
| 5.E   | `spotlight-card.tsx`                | `bg-neutral-900 border-neutral-800` → `surface-1 + border-white/[0.08]`. Default `spotlightColor` set to `rgba(24, 222, 255, 0.16)` (brand cyan, per design-system §8.8). Hover border deepens to `white/[0.16]`. |
| 5.F   | `accordion.tsx`                     | Dropped `backdrop-blur-md` container + `bg-white/30` skin. Per-item lucide `Info/Settings/Code` icons → mono number prefix (`01`, `02`, …) in brand cyan. Plus/Minus icon swap → single `+` rotating 45° with cyan fill on open (design-system §8.9). Hairline-divided rows on the page surface. |
| 5.G   | `bento-grid.tsx`                    | Removed embedded Light/Dark toggle (we're dark-only). Stripped `--aurora-base` light-mode tokens. Aurora accent rebound from generic blue (`rgba(59,130,246,…)`) to brand cyan (`rgba(24,222,255,0.16)`). Card border `white/[0.08]` per §5.5. Lucide demo icons removed — caller supplies own `icon` prop. |
| 5.H   | `modal.tsx`                         | `@phosphor-icons/react` X → `lucide-react` X (single icon library project-wide). Shadcn `bg-background border-border text-card-foreground` tokens → explicit `rgba(8,8,12,0.85) + backdrop-blur(28px) saturate(150%)` per design-system §5.1 modal spec. ESC keycap chip removed (off-brand). Border-radius 16 px per §5.5. |

## 6. Scaffold-phase fixes (Step 5)

| # | Where | Issue | Fix |
| ----- | ------------------------------------------------------ | -------------------------------------- | ------------------ |
| 6.1   | `src/components/sections/Hero.tsx` — `FPSPill`          | Hydration mismatch — server emitted the pill (window check returned true) but client returned `null` because `?debug=1` wasn't present. | Rewrote to mount-after-effect with a `useState(show)` flag; returns `null` until client knows the URL. |
| 6.2   | `src/components/sections/Hero.tsx` — `mountChromeRibbon` | `THREE.WebGLRenderer` constructor throws on headless/no-WebGL hosts, which surfaced through Next's dev overlay during local screenshot testing. | Wrapped renderer construction in try/catch; on failure returns `null` and the caller paints the same static brand-gradient that `prefers-reduced-motion` uses. |
| 6.3   | `src/components/primitives/Reveal.tsx`                  | `[axis]: value` computed-key index made Framer Motion's `Variant` type fail (string vs `--${string}` index conflict). | Split direction handling into explicit `x` / `y` branches; both return strongly-typed `Variant` literals. |

## 7. Net-new copy added during mockup phase

Strings introduced for design needs that do not exist in `elchai-content.md`.
Owner-approved on 2026-05-11 (hero review). Migrate into `content.ts` once the
hero is locked.

| #     | Location                                  | New copy                                       | Reason |
| ----- | ----------------------------------------- | ---------------------------------------------- | ------ |
| 5.1   | `hero` eyebrow pill (mockup `01-hero.html`) | `AI & Blockchain Studio · Est. Dubai`         | Igloo-style atmospheric pill above the headline. Owner-approved. |

---

## New pages

- **2026-06-01 — Blockchain Enterprise Solutions page built.** The nav item
  `nav.blockchain.columns[0].items[2]` ("Enterprise Solutions") was a dead
  stub pointing at `#consultation` (consultation modal). Built a real
  service-detail page at `/blockchain-enterprise-solutions/` and re-pointed the
  nav link to it. New `enterpriseSolutions` entry in
  `src/lib/services/blockchain.ts`; body copy synthesized faithfully from the
  scraped source `blockchain-enterprise-solutions-revolutionizing-business-transparency-and-security`
  (enterprise transparency/security, Web3 integration, ESG/carbon credits).
  AR/IT registries fall back to EN automatically (no mirror entry yet).
- **2026-06-01 — Infrastructure nav stub resolved.** The sibling
  `nav.blockchain.columns[0].items[7]` ("Infrastructure") was also a
  `#consultation` stub. No source page exists for it, so it now points to
  `/blockchain-development/` (closest real page — covers scaling, cross-chain
  and node infrastructure) rather than the consultation modal.
- **2026-06-01 — Footer copyright year 2026 → 2022** across all locales
  (`content.ts`, `content.ar.ts`, `content.it.ts`, `locales/en.json`,
  `locales/ar.json`) per owner request.

## Unchanged but worth noting

- The industries list appears **twice** in the source markdown — that is the
  marquee duplication, not a typo. `content.ts` stores a single canonical list
  and the render layer duplicates for the infinite scroll.
- Multiple trust-brand logos are repeated across the source (4 copies × 16
  logos) for the same marquee reason. `hero.trustedBy.count = 16` is the
  canonical count.
- "Tokenization Solutions" footer link points to `/token-development/` while
  the nav links to `/rwa/`. Both are preserved as-is; if you want them
  unified, flag it.
