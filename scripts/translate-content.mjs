#!/usr/bin/env node
/**
 * translate-content.mjs
 *
 * Generate AR / IT mirrors of a TypeScript content module by translating
 * every translatable string literal in place. Preserves source structure,
 * comments, formatting, URLs, paths, identifiers — only string VALUES that
 * carry human-readable copy are replaced.
 *
 * Usage:
 *   node scripts/translate-content.mjs <source.ts> <ar|it> <out.ts>
 *
 * Env:
 *   GEMINI_API_KEY  (falls back to extracting from ~/.claude.json)
 *
 * Strategy:
 *   1. Parse source with TypeScript compiler API.
 *   2. Walk AST collecting StringLiteral / NoSubstitutionTemplateLiteral
 *      nodes whose parent property key is in the TRANSLATABLE_KEYS set.
 *   3. Filter values that look like URLs, paths, identifiers, or are too
 *      short / numeric / brand-only.
 *   4. Batch-translate via Gemini using JSON in/out.
 *   5. Patch the source text from highest offset → lowest so positions
 *      stay valid, escaping single quotes correctly.
 */

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import ts from 'typescript';

// --- CLI -------------------------------------------------------------------
const [, , srcArg, localeArg, outArg] = process.argv;
if (!srcArg || !localeArg || !outArg) {
  console.error('Usage: node scripts/translate-content.mjs <source.ts> <ar|it> <out.ts>');
  process.exit(1);
}
const locale = localeArg.toLowerCase();
if (!['ar', 'it'].includes(locale)) {
  console.error('Locale must be "ar" or "it"');
  process.exit(1);
}

const srcPath = path.resolve(srcArg);
const outPath = path.resolve(outArg);

// --- API key ---------------------------------------------------------------
function loadGeminiKey() {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY;
  try {
    const cfg = fs.readFileSync(path.join(os.homedir(), '.claude.json'), 'utf8');
    const m = cfg.match(/AIza[A-Za-z0-9_-]{20,}/);
    if (m) return m[0];
  } catch {}
  throw new Error('No Gemini API key found. Set GEMINI_API_KEY or add it to ~/.claude.json');
}
// Translator backend: "gtx" = free Google Translate public endpoint (no auth,
// no quota, marketing-quality MT — matches the existing content.ar.ts bar).
// "gemini" = Gemini API with prompt-engineered marketing tone (better but
// rate-limited on the free tier).
const TRANSLATOR = process.env.TRANSLATOR || 'gtx';
const GEMINI_KEY = TRANSLATOR === 'gemini' ? loadGeminiKey() : null;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash-lite';
const GEMINI_URL = GEMINI_KEY
  ? `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_KEY}`
  : null;
const REQUEST_DELAY_MS = Number(process.env.REQUEST_DELAY_MS || (TRANSLATOR === 'gtx' ? 50 : 5000));
const CHUNK_SIZE = Number(process.env.CHUNK_SIZE || (TRANSLATOR === 'gtx' ? 1 : 100));
const CONCURRENCY = Number(process.env.CONCURRENCY || (TRANSLATOR === 'gtx' ? 8 : 1));

// Persistent translation cache keyed by (locale, sourceText) → translated.
// Lets a partial run resume from where it died instead of paying for the
// same strings twice. Cache file lives in scripts/.translation-cache/.
const CACHE_DIR = path.join(path.dirname(new URL(import.meta.url).pathname), '.translation-cache');
fs.mkdirSync(CACHE_DIR, { recursive: true });
const CACHE_FILE = path.join(CACHE_DIR, `${locale}.json`);

function loadCache() {
  try { return new Map(Object.entries(JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8')))); }
  catch { return new Map(); }
}
function saveCache(map) {
  const obj = Object.fromEntries(map);
  fs.writeFileSync(CACHE_FILE, JSON.stringify(obj, null, 0));
}

// --- Translatability rules -------------------------------------------------
// Keys whose values we DO NOT translate, regardless of content.
const SKIP_KEYS = new Set([
  'slug', 'href', 'image', 'icon', 'logo', 'video', 'videoUrl',
  'phoneHref', 'email', 'phone', 'whatsapp', 'telegram', 'url',
  'code', 'htmlLang', 'dir', 'addressHref', 'flag',
  'value', // numeric stat values like "150+"
  'position', 'layout', 'itemsLayout', 'displayStyle', 'tileTheme',
  'backgroundStyle', 'iconStyle', 'variant',
  // Image arrays often appear as { src: '...' } too
  'src', 'thumbnail', 'cover',
  'tabLabel', // keep stable for tab anchoring? actually NO — these are visible. Remove.
]);
SKIP_KEYS.delete('tabLabel'); // tabLabel IS visible UI, do translate

// Value patterns that should never be translated.
const SKIP_VALUE_PATTERNS = [
  /^[\s]*$/,                                   // whitespace-only
  /^[/#?]/,                                    // URL paths, anchors
  /^https?:\/\//i,
  /^mailto:/i,
  /^tel:/i,
  /^[\w.+-]+@[\w.-]+\.[a-z]{2,}$/i,            // emails
  /^\+?[\d\s()-]{6,}$/,                        // phone numbers
  /\.(webp|png|svg|jpg|jpeg|gif|mp4|pdf|json|css|js|ts|tsx|ico)$/i, // file paths
  /^[A-Z][A-Z0-9_-]{1,}$/,                     // ALL_CAPS identifiers
  /^[a-z]+(-[a-z0-9]+)+$/,                     // kebab-case-slugs
  /^\d+(\.\d+)?([%+kKmM]|\+)?$/,               // pure numbers / "150+" / "98%" / "2M"
];

// Brand / proper-noun whitelist — preserved verbatim (extracted from output).
const PROPER_NOUNS = [
  'Elchai', 'Elchai Group', 'INGENI', 'HealthSense', 'aihiredesk',
  'Nyra', 'Route AI', 'Web3', 'DeFi', 'NFT', 'DApp', 'DAO', 'IoT',
  'AR/VR', 'AI', 'ML', 'LLM', 'RAG', 'RPA', 'ChatGPT', 'OpenAI',
  'Solana', 'Ethereum', 'Polygon', 'Hyperledger', 'Layer 1', 'Layer 2',
  'Dubai', 'UAE', 'Belgium', 'Albania', 'Oman', 'Hungary', 'Italy',
  'Brussels', 'Tirana', 'Muscat', 'Abu Dhabi', 'Budapest', 'Milan',
];

function shouldTranslate(key, value) {
  if (!value || typeof value !== 'string') return false;
  if (value.length < 2) return false;
  if (SKIP_KEYS.has(key)) return false;
  for (const p of SKIP_VALUE_PATTERNS) if (p.test(value)) return false;
  // single-token brand
  if (PROPER_NOUNS.includes(value.trim())) return false;
  return true;
}

// --- Parse source ----------------------------------------------------------
const srcText = fs.readFileSync(srcPath, 'utf8');
const sourceFile = ts.createSourceFile(srcPath, srcText, ts.ScriptTarget.Latest, true);

/** @type {Array<{ start: number; end: number; text: string; key: string; }>} */
const literals = [];

function getParentKeyName(node) {
  const parent = node.parent;
  if (!parent) return '';
  if (ts.isPropertyAssignment(parent) && parent.initializer === node) {
    const name = parent.name;
    if (ts.isIdentifier(name) || ts.isStringLiteral(name)) return name.text;
  }
  if (ts.isShorthandPropertyAssignment(parent)) return parent.name.text;
  // array element? walk up to find the enclosing property key for context
  if (ts.isArrayLiteralExpression(parent)) {
    return getParentKeyName(parent);
  }
  return '';
}

function isModuleSpecifier(node) {
  let p = node.parent;
  while (p) {
    if (ts.isImportDeclaration(p) || ts.isExportDeclaration(p) || ts.isCallExpression(p) && p.expression?.kind === ts.SyntaxKind.ImportKeyword) {
      return true;
    }
    p = p.parent;
  }
  return false;
}

function visit(node) {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    if (!isModuleSpecifier(node)) {
      const key = getParentKeyName(node);
      if (shouldTranslate(key, node.text)) {
        literals.push({ start: node.getStart(sourceFile), end: node.getEnd(), text: node.text, key });
      }
    }
  }
  ts.forEachChild(node, visit);
}
visit(sourceFile);

// Deduplicate texts for batching
const uniqueTexts = Array.from(new Set(literals.map((l) => l.text)));
console.error(`[translate] ${literals.length} literals, ${uniqueTexts.length} unique strings → ${locale.toUpperCase()}`);

// --- Translate via Gemini --------------------------------------------------
const TARGET_LANG = locale === 'ar' ? 'Modern Standard Arabic (fus\'ha), formal but warm marketing tone suitable for an enterprise tech consultancy. RTL.' : 'Italian, formal but warm marketing tone suitable for an enterprise tech consultancy.';

const SYSTEM_PROMPT = `You are a professional marketing translator translating UI strings and marketing copy for Elchai Group, an enterprise blockchain + AI consultancy based in Dubai. Target language: ${TARGET_LANG}

Rules:
- Translate naturally, preserving meaning and marketing tone — DO NOT translate literally.
- Preserve these proper nouns verbatim (do not translate, do not transliterate): Elchai, Elchai Group, INGENI, HealthSense, aihiredesk, Nyra, Route AI, Web3, DeFi, NFT, DApp, DAO, IoT, AR/VR, ChatGPT, OpenAI, Solana, Ethereum, Polygon, Hyperledger, ServiceNow, AWS, Azure, GCP, Salesforce.
- Acronyms like AI, ML, LLM, RAG, RPA, API, SDK, KPI, ROI: keep as-is in Italian; in Arabic, keep Latin letters but you may add the Arabic word in parentheses where the meaning isn't obvious.
- Numbers, percentages, currency symbols, and version numbers stay identical.
- Keep punctuation style (em dashes, ellipses, smart quotes) consistent with the source.
- Preserve sentence-final markers (?, !, .).
- For Arabic: do not add diacritics (tashkeel) unless required for disambiguation.

You receive a JSON object whose keys are stable IDs and values are English strings.
Return ONLY a JSON object with the SAME keys and translated values. No prose, no markdown, no code fences.`;

async function geminiTranslate(batchObj) {
  const body = {
    systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents: [{ role: 'user', parts: [{ text: JSON.stringify(batchObj) }] }],
    generationConfig: {
      temperature: 0.2,
      responseMimeType: 'application/json',
    },
  };
  const res = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Gemini API ${res.status}: ${text.slice(0, 400)}`);
  }
  const data = await res.json();
  const out = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!out) throw new Error('Gemini returned no content: ' + JSON.stringify(data).slice(0, 400));
  try {
    return JSON.parse(out);
  } catch (e) {
    throw new Error('Gemini returned non-JSON: ' + out.slice(0, 400));
  }
}

// --- Free Google Translate public endpoint --------------------------------
// translate.googleapis.com/translate_a/single returns a nested-array JSON
// blob; we extract the sentences joined as the translated string.
// One string per call — pair with CONCURRENCY for throughput.
const GTX_LANG = { ar: 'ar', it: 'it' };

async function gtxTranslateOne(text) {
  // Protect proper-noun spans with a placeholder the translator won't touch.
  const preserved = [];
  const protectedSrc = text.replace(
    new RegExp(`\\b(${PROPER_NOUNS.map(escapeRe).join('|')})\\b`, 'g'),
    (m) => { const i = preserved.length; preserved.push(m); return `__PN${i}__`; }
  );
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${GTX_LANG[locale]}&dt=t&q=${encodeURIComponent(protectedSrc)}`;
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (!res.ok) throw new Error(`gtx ${res.status}`);
  const data = await res.json();
  // data[0] is an array of [translatedSegment, originalSegment, null, null, ...]
  let translated = (data?.[0] ?? []).map((seg) => seg?.[0] ?? '').join('');
  translated = translated.replace(/__\s*PN\s*(\d+)\s*__/g, (_, i) => preserved[Number(i)] ?? '');
  return translated;
}

function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

async function gtxTranslateBatch(batchObj) {
  // batchObj has CHUNK_SIZE entries; with CHUNK_SIZE=1 this is trivial.
  // Translate sequentially within the batch — concurrency is enforced
  // at the chunk-pool level below.
  const out = {};
  for (const [k, v] of Object.entries(batchObj)) {
    out[k] = await gtxTranslateOne(v);
  }
  return out;
}

async function doTranslate(batchObj) {
  if (TRANSLATOR === 'gemini') return geminiTranslate(batchObj);
  return gtxTranslateBatch(batchObj);
}

// Batch in chunks — larger chunks = fewer API calls = less rate-limit pain.
const translation = loadCache();
const cacheHits = uniqueTexts.filter((t) => translation.has(t)).length;
const toTranslate = uniqueTexts.filter((t) => !translation.has(t));
if (cacheHits) console.error(`[translate] cache hit on ${cacheHits} strings`);

const chunks = [];
for (let i = 0; i < toTranslate.length; i += CHUNK_SIZE) {
  chunks.push(toTranslate.slice(i, i + CHUNK_SIZE));
}

async function runChunk(chunk, ci) {
  const obj = {};
  chunk.forEach((t, i) => { obj[String(i)] = t; });
  let result;
  let attempt = 0;
  while (true) {
    try {
      result = await doTranslate(obj);
      break;
    } catch (e) {
      attempt++;
      const is429 = /\b429\b/.test(String(e.message));
      if (attempt >= 6) throw e;
      const wait = is429 ? Math.min(60000, 5000 * attempt) : 1000 * attempt;
      process.stderr.write(`[chunk ${ci + 1}] retry(${attempt}, ${wait}ms) `);
      await new Promise((r) => setTimeout(r, wait));
    }
  }
  for (const [k, v] of Object.entries(result)) {
    const original = obj[k];
    if (original && typeof v === 'string') translation.set(original, v);
  }
}

let completed = 0;
async function worker(slice) {
  for (const [ci, chunk] of slice) {
    await runChunk(chunk, ci);
    completed++;
    if (completed % 25 === 0 || completed === chunks.length) {
      saveCache(translation);
      process.stderr.write(`[translate] ${completed}/${chunks.length} chunks done\n`);
    }
    if (REQUEST_DELAY_MS > 0) await new Promise((r) => setTimeout(r, REQUEST_DELAY_MS));
  }
}

const indexed = chunks.map((c, i) => [i, c]);
const slices = Array.from({ length: CONCURRENCY }, (_, w) =>
  indexed.filter((_, idx) => idx % CONCURRENCY === w)
);
await Promise.all(slices.map((s) => worker(s)));
saveCache(translation);

// --- Patch source ----------------------------------------------------------
function escapeSingleQuoted(s) {
  // We always emit single-quoted strings to match the source style.
  return s
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\r/g, '\\r')
    .replace(/\n/g, '\\n');
}

// Sort literals high → low so offsets remain valid as we splice.
literals.sort((a, b) => b.start - a.start);

let out = srcText;
let replaced = 0;
let skipped = 0;
for (const lit of literals) {
  const translated = translation.get(lit.text);
  if (!translated || translated === lit.text) { skipped++; continue; }
  const replacement = `'${escapeSingleQuoted(translated)}'`;
  out = out.slice(0, lit.start) + replacement + out.slice(lit.end);
  replaced++;
}

// Header banner for the generated file.
const header = `// AUTO-GENERATED by scripts/translate-content.mjs (locale: ${locale.toUpperCase()})
// Source: ${path.relative(process.cwd(), srcPath)}
// DO NOT EDIT BY HAND — re-run the script to regenerate.
// Generated: ${new Date().toISOString()}

`;

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, header + out, 'utf8');
console.error(`[translate] wrote ${path.relative(process.cwd(), outPath)} — ${replaced} replaced, ${skipped} skipped`);
