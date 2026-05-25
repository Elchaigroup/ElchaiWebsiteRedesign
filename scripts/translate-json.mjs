#!/usr/bin/env node
/**
 * translate-json.mjs — translate a flat JSON object via free Google Translate.
 *
 * Usage:
 *   echo '{"heading":"Hello","body":"World"}' | node scripts/translate-json.mjs ar
 *   node scripts/translate-json.mjs ar input.json > out.json
 *
 * Outputs the same JSON shape with values translated EN → target language.
 * Skips file paths, URLs, emails, phone numbers (preserves verbatim).
 */

import fs from 'node:fs';

const locale = (process.argv[2] || '').toLowerCase();
if (!['ar', 'it'].includes(locale)) {
  console.error('Usage: translate-json.mjs <ar|it> [input.json]');
  process.exit(1);
}

const PROPER_NOUNS = [
  'Elchai', 'Elchai Group', 'INGENI', 'HealthSense', 'aihiredesk',
  'Nyra', 'Route AI', 'Web3', 'DeFi', 'NFT', 'DApp', 'DAO', 'IoT',
  'AR/VR', 'ChatGPT', 'OpenAI', 'Solana', 'Ethereum', 'Polygon',
  'Hyperledger', 'ServiceNow', 'AWS', 'Azure', 'GCP', 'Salesforce',
];

const SKIP_VALUE_PATTERNS = [
  /^[\s]*$/, /^[/#?]/, /^https?:\/\//i, /^mailto:/i, /^tel:/i,
  /^[\w.+-]+@[\w.-]+\.[a-z]{2,}$/i,
  /^\+?[\d\s()-]{6,}$/,
  /\.(webp|png|svg|jpg|jpeg|gif|mp4|pdf|json|css|js|ts|tsx|ico)$/i,
  /^[A-Z][A-Z0-9_-]{1,}$/,
  /^[A-Za-z0-9_-]{11}$/, // YouTube video IDs are exactly 11 chars
];

// Field-name skip list. If the parent JSON property has one of these names,
// the value is preserved verbatim regardless of pattern match.
const SKIP_KEYS = new Set([
  'slug', 'href', 'image', 'icon', 'logo', 'video', 'videoId', 'videoUrl',
  'src', 'thumbnail', 'cover', 'url', 'email', 'phone', 'phoneHref',
  'code', 'htmlLang', 'dir', 'addressHref', 'n',
]);

function shouldTranslate(v, key) {
  if (typeof v !== 'string') return false;
  if (v.length < 2) return false;
  if (key && SKIP_KEYS.has(key)) return false;
  if (PROPER_NOUNS.includes(v.trim())) return false;
  for (const p of SKIP_VALUE_PATTERNS) if (p.test(v)) return false;
  return true;
}

function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

async function translate(text, key) {
  if (!shouldTranslate(text, key)) return text;
  // Protect proper nouns with a placeholder the translator won't touch.
  // Format: __PN<digits>__ — no whitespace, no letters that decline.
  const preserved = [];
  const protectedSrc = text.replace(
    new RegExp(`\\b(${PROPER_NOUNS.map(escapeRe).join('|')})\\b`, 'g'),
    (m) => { const i = preserved.length; preserved.push(m); return `__PN${i}__`; }
  );
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${locale}&dt=t&q=${encodeURIComponent(protectedSrc)}`;
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (!res.ok) throw new Error(`gtx ${res.status}`);
  const data = await res.json();
  let translated = (data?.[0] ?? []).map((seg) => seg?.[0] ?? '').join('');
  // Translator may insert spaces inside the placeholder (e.g. __ PN0__) — handle that.
  translated = translated.replace(/__\s*PN\s*(\d+)\s*__/g, (_, i) => preserved[Number(i)] ?? '');
  return translated;
}

async function walk(value, parentKey) {
  if (Array.isArray(value)) return Promise.all(value.map((v) => walk(v, parentKey)));
  if (value && typeof value === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(value)) out[k] = await walk(v, k);
    return out;
  }
  if (typeof value === 'string') return await translate(value, parentKey);
  return value;
}

const inputText = process.argv[3]
  ? fs.readFileSync(process.argv[3], 'utf8')
  : await new Promise((resolve) => {
      let buf = '';
      process.stdin.setEncoding('utf8');
      process.stdin.on('data', (c) => { buf += c; });
      process.stdin.on('end', () => resolve(buf));
    });

const input = JSON.parse(inputText);
const output = await walk(input);
process.stdout.write(JSON.stringify(output, null, 2));
