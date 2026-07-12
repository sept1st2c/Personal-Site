const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const posts = [
  {
    slug: "redis",
    url: "https://www.linkedin.com/posts/shubh-gupta-27918428a_redis-backenddevelopment-systemdesign-activity-7452328413551345665-UneO",
  },
  {
    slug: "ai-code-preview",
    url: "https://www.linkedin.com/posts/shubh-gupta-27918428a_most-ai-code-preview-apps-and-web-ides-activity-7464983629526433792-IxoZ",
    yOffset: 75, // this post has an extra "AI-summarized title" bar pushing the author row down
    height: 175, // shorter too, so the sign-in modal doesn't peek in at the bottom
  },
  {
    slug: "dsa-update",
    url: "https://www.linkedin.com/posts/shubh-gupta-27918428a_3-months-of-random-dsa-update-here-activity-7443244590595280896-ZONi",
  },
];

(async () => {
  const browser = await chromium.launch();
  const outDir = path.join(__dirname, "..", "public", "linkedin");
  fs.mkdirSync(outDir, { recursive: true });

  for (const post of posts) {
    const page = await browser.newPage({ viewport: { width: 1000, height: 1300 } });
    await page.goto(post.url, { waitUntil: "domcontentloaded", timeout: 20000 });
    await page.waitForTimeout(2500);

    // Don't fight the sign-in modal — just crop tightly to the header
    // region (avatar, name, timestamp, opening lines) that renders above
    // where the modal appears, and skip it entirely.
    await page.screenshot({
      path: path.join(outDir, `${post.slug}.png`),
      clip: { x: 183, y: 143 + (post.yOffset ?? 0), width: 510, height: post.height ?? 235 },
    });
    await page.close();
    console.log("captured", post.slug);
  }

  await browser.close();
})();
