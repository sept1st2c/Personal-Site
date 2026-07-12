const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  for (const [label, width, height] of [
    ["desktop", 1440, 900],
    ["mobile", 390, 844],
  ]) {
    const page = await browser.newPage({ viewport: { width, height } });
    await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1200);
    await page.screenshot({ path: `screenshots/r7-hero-${label}.png` });

    await page.locator("#projects").scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await page.screenshot({ path: `screenshots/r7-projects-${label}.png` });

    await page.locator("button:has-text('Show')").first().click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: `screenshots/r7-projects-expanded-${label}.png` });

    await page.locator("#linkedin").scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await page.screenshot({ path: `screenshots/r7-linkedin-${label}.png` });

    await page.close();
  }
  await browser.close();
  console.log("done");
})();
