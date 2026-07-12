const { chromium } = require("playwright");

const posts = [
  { slug: "redis", url: "https://www.linkedin.com/posts/shubh-gupta-27918428a_redis-backenddevelopment-systemdesign-activity-7452328413551345665-UneO" },
  { slug: "ai-code-preview", url: "https://www.linkedin.com/posts/shubh-gupta-27918428a_most-ai-code-preview-apps-and-web-ides-activity-7464983629526433792-IxoZ" },
  { slug: "dsa-update", url: "https://www.linkedin.com/posts/shubh-gupta-27918428a_3-months-of-random-dsa-update-here-activity-7443244590595280896-ZONi" },
];

(async () => {
  const browser = await chromium.launch();
  for (const post of posts) {
    const page = await browser.newPage({ viewport: { width: 1000, height: 1400 } });
    await page.goto(post.url, { waitUntil: "domcontentloaded", timeout: 20000 });
    await page.waitForTimeout(2500);
    const images = await page.evaluate(() => {
      return Array.from(document.querySelectorAll("img"))
        .map((img) => ({ src: img.src, w: img.naturalWidth, h: img.naturalHeight, alt: img.alt }))
        .filter((i) => i.w > 200 && i.h > 200);
    });
    console.log(`\n=== ${post.slug} ===`);
    console.log(JSON.stringify(images, null, 2));
    await page.screenshot({ path: `screenshots/linkedin-inspect-${post.slug}.png`, fullPage: true });
    await page.close();
  }
  await browser.close();
})();
