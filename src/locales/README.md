# Translation catalogs

Files in this directory are the **single source of truth** for translated UI strings.

- `en.json` — English (source of truth; every key MUST be filled)
- `ar.json` — Arabic (RTL — populated by professional translator)
- `it.json` — Italian (populated by professional translator)

## How translation works

1. Components import strings via `useT("key")` from `@/lib/i18n`.
2. The active locale is determined by:
   - URL prefix (`/ar/...`, `/it/...`) — preferred, SEO-indexable
   - Cookie `elchai-lang` — fallback when no URL prefix
   - Default: `en`
3. Missing keys in `ar`/`it` fall back to `en` so we never render an empty string.

## How to add a new key

1. Add the key + English copy to `en.json`.
2. Add the key to `ar.json` and `it.json` with an **empty string** (`""`) — the fallback will render English until a translator fills it in.
3. Reference it in code: `useT("section.subsection.label")`.

## Keys naming convention

- Dot-delimited: `nav.book`, `hero.cta_primary`, `footer.copyright`
- Lowercase, words separated by underscores
- Group by section / page / component

## Filling in translations

Hand `ar.json` and `it.json` to a professional translator along with `en.json`
for context. Every empty string `""` in `ar.json` / `it.json` is a TODO.
