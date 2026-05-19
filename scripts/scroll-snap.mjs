import { chromium } from "playwright";

const url = process.argv[2] ?? "http://localhost:3001/";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

await page.goto(url, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(3000);

const positions = [
  { p: 0,    name: "top"      },
  { p: 0.25, name: "trust"    },
  { p: 0.50, name: "stats"    },
  { p: 0.75, name: "partner"  },
];

for (const { p, name } of positions) {
  await page.evaluate((p) => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: max * p, behavior: "instant" });
  }, p);
  await page.waitForTimeout(900);
  await page.screenshot({ path: `/tmp/scroll-${name}.png` });
  console.log(`✓ /tmp/scroll-${name}.png`);
}

await browser.close();
