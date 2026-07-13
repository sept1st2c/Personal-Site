const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "screenshots/r14-desktop-hero.png" });

  await page.locator("#experience").scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
  await page.screenshot({ path: "screenshots/r14-desktop-experience.png" });

  await page.locator("#footer").scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
  await page.screenshot({ path: "screenshots/r14-desktop-footer.png" });

  await page.close();

  const m = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await m.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
  await m.waitForTimeout(1000);
  await m.screenshot({ path: "screenshots/r14-mobile-hero.png" });
  await m.close();

  await browser.close();
  console.log("done");
})();
