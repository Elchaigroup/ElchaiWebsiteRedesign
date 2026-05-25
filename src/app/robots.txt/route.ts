const SITE_URL = "https://www.elchaigroup.com";

const CRAWLER_RULES = [
  "User-Agent: *",
  "Allow: /",
  "Disallow: /api/",
  "Disallow: /_next/",
  "",
  "User-Agent: GPTBot",
  "Allow: /",
  "",
  "User-Agent: OAI-SearchBot",
  "Allow: /",
  "",
  "User-Agent: ChatGPT-User",
  "Allow: /",
  "",
  "User-Agent: PerplexityBot",
  "Allow: /",
  "",
  "User-Agent: ClaudeBot",
  "Allow: /",
  "",
  "User-Agent: Claude-Web",
  "Allow: /",
  "",
  "User-Agent: Google-Extended",
  "Allow: /",
  "",
  "User-Agent: Applebot-Extended",
  "Allow: /",
  "",
  `Sitemap: ${SITE_URL}/sitemap.xml`,
  `Host: ${SITE_URL}`,
];

export function GET() {
  return new Response(CRAWLER_RULES.join("\n"), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
