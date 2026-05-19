/* eslint-disable no-console */
import { chromium } from "playwright";

const url = process.argv[2] ?? "http://localhost:3001/";
const out = process.argv[3] ?? "/tmp/snap-full.png";
const mode = process.argv[4] ?? "full"; // "full" | "viewport"

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

await page.goto(url, { waitUntil: "domcontentloaded" });
// three.js mount + first paint
await page.waitForTimeout(2500);

// Scroll the entire page in steps so every IntersectionObserver fires
// (Reveal components use whileInView — they stay hidden until seen).
const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
const step = 600;
for (let y = 0; y <= pageHeight; y += step) {
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), y);
  await page.waitForTimeout(200);
}
// Back to top for the screenshot's starting position
await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
await page.waitForTimeout(400);

await page.screenshot({
  path: out,
  fullPage: mode === "full",
});

console.log(`✓ ${out}`);
await browser.close();
