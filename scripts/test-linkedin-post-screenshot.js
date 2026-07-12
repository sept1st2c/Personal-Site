const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1000, height: 1200 } });
  try {
    await page.goto(
      "https://www.linkedin.com/posts/shubh-gupta-27918428a_redis-backenddevelopment-systemdesign-activity-7452328413551345665-UneO",
      { waitUntil: "domcontentloaded", timeout: 20000 }
    );
    await page.waitForTimeout(3000);
    console.log("URL after load:", page.url());
    await page.screenshot({ path: "screenshots/linkedin-post-test.png", fullPage: false });
  } catch (e) {
    console.log("ERROR:", e.message);
  }
  await browser.close();
})();
