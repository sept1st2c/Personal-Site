const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  for (const [label, width, height] of [
    ["desktop", 1440, 900],
    ["mobile", 390, 844],
  ]) {
    const page = await browser.newPage({ viewport: { width, height } });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    await page.waitForTimeout(700);
    await page.screenshot({ path: `screenshots/r4-hero-${label}.png` });

    await page.locator("#experience").scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await page.screenshot({ path: `screenshots/r4-experience-${label}.png` });

    // check title contrast over gradient at scroll
    await page.evaluate(() => window.scrollTo(0, 700));
    await page.waitForTimeout(300);
    await page.screenshot({ path: `screenshots/r4-title-check-${label}.png` });

    await page.locator("#projects").scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await page.screenshot({ path: `screenshots/r4-projects-${label}.png` });

    await page.close();
  }
  await browser.close();
  console.log("done");
})();
