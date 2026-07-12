const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  page.on("requestfailed", (req) => console.log("FAILED:", req.url(), req.failure()?.errorText));
  page.on("console", (msg) => console.log("CONSOLE:", msg.text()));
  await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
  await page.locator("#experience").scrollIntoViewIfNeeded();
  await page.waitForTimeout(3000);
  await page.screenshot({ path: "screenshots/gdg-check2.png" });
  await browser.close();
})();
