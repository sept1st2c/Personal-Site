const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobile.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
  await mobile.waitForTimeout(1200);

  await mobile.locator("#activity").scrollIntoViewIfNeeded();
  await mobile.waitForTimeout(600);
  await mobile.screenshot({ path: "screenshots/r9-mobile-activity-scrolled.png" });

  await mobile.close();
  await browser.close();
  console.log("done");
})();
