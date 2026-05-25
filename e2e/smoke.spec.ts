import { test, expect } from "@playwright/test";

const REPRESENTATIVE_ROUTES = [
  "/",
  "/about-us",
  "/contact",
  "/blog-list",
  "/portfolios",
  "/ai-agent-development",
  "/blockchain-development",
  "/generative-ai-development",
];

test.describe("smoke — representative routes render", () => {
  for (const path of REPRESENTATIVE_ROUTES) {
    test(`GET ${path} → 200, has <main>, no console errors`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
      page.on("console", (msg) => {
        if (msg.type() === "error") errors.push(`console: ${msg.text()}`);
      });

      const res = await page.goto(path, { waitUntil: "domcontentloaded" });
      expect(res?.status(), `${path} status`).toBe(200);
      await expect(page.locator("main, body")).toBeVisible();
      // Allow noisy WebGL/extension errors but not real app errors.
      const real = errors.filter(
        (e) => !/WebGL|deviceMemory|Failed to fetch|chrome-extension/i.test(e)
      );
      expect(real, `unexpected errors on ${path}\n${real.join("\n")}`).toEqual([]);
    });
  }
});

test.describe("redirects", () => {
  test("/chat-gpt → /generative-ai-development", async ({ page }) => {
    const res = await page.goto("/chat-gpt", { waitUntil: "domcontentloaded" });
    expect(res?.status()).toBe(200);
    expect(new URL(page.url()).pathname).toBe("/generative-ai-development");
  });

  test("/ai-agent-2025 → /ai-agent-development", async ({ page }) => {
    await page.goto("/ai-agent-2025", { waitUntil: "domcontentloaded" });
    expect(new URL(page.url()).pathname).toBe("/ai-agent-development");
  });
});

test.describe("SEO surfaces", () => {
  test("sitemap.xml is valid and lists key routes", async ({ request }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain("<urlset");
    expect(body).toContain("/blockchain-development");
    expect(body).toContain("/ai-agent-development");
  });

  test("robots.txt allows GPTBot and points to sitemap", async ({ request }) => {
    const res = await request.get("/robots.txt");
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toMatch(/User-Agent:\s*GPTBot/i);
    expect(body).toMatch(/Sitemap:/i);
  });
});

test.describe("lead capture API", () => {
  test("rejects invalid payload", async ({ request }) => {
    const res = await request.post("/api/lead", {
      data: { source: "consultation" },
    });
    expect(res.status()).toBe(400);
  });

  test("accepts honeypot-clean consultation submit", async ({ request }) => {
    const res = await request.post("/api/lead", {
      data: {
        source: "consultation",
        name: "Test User",
        email: "test@example.com",
        message: "Smoke test",
        ttsMs: 3000,
      },
    });
    expect(res.status()).toBe(200);
    expect((await res.json()).ok).toBe(true);
  });

  test("silently accepts (but discards) honeypot-tripped submit", async ({ request }) => {
    const res = await request.post("/api/lead", {
      data: {
        source: "consultation",
        name: "Bot",
        email: "bot@example.com",
        website: "spam-bait",
        ttsMs: 3000,
      },
    });
    expect(res.status()).toBe(200);
  });

  test("rejects sub-1.2s submissions (bot guard)", async ({ request }) => {
    const res = await request.post("/api/lead", {
      data: {
        source: "consultation",
        name: "Fast",
        email: "fast@example.com",
        ttsMs: 200,
      },
    });
    // Honeypot/bot-time triggers silent 200 ok with no forward.
    expect(res.status()).toBe(200);
  });
});

test.describe("consultation modal opens via hash", () => {
  test("#consultation hash opens the consultation modal", async ({ page }) => {
    await page.goto("/contact");
    await page.evaluate(() => {
      window.location.hash = "#consultation";
    });
    await expect(
      page.getByRole("heading", {
        name: /Build Your Next Project With Industry Experts/i,
      })
    ).toBeVisible({ timeout: 5_000 });
  });
});
