const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1400 } });
  await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
  await page.locator("#projects").scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.screenshot({ path: "screenshots/r8-tapi-featured-full.png" });
  await browser.close();
})();
