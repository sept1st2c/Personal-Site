const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();

  for (const [label, width, height] of [
    ["desktop", 1440, 900],
    ["mobile", 390, 844],
  ]) {
    const page = await browser.newPage({ viewport: { width, height } });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    await page.waitForTimeout(600);

    // Hero (education + tags)
    await page.screenshot({ path: `screenshots/r3-hero-${label}.png` });

    // Scroll to nav-overlap check: scroll down a bit so a heading is near top
    await page.evaluate(() => window.scrollTo(0, 350));
    await page.waitForTimeout(300);
    await page.screenshot({ path: `screenshots/r3-nav-scrolled-${label}.png` });

    // Projects grid
    await page.locator("#projects").scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await page.screenshot({ path: `screenshots/r3-projects-${label}.png` });

    // Achievements (should be right after projects now)
    await page.locator("#achievements").scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await page.screenshot({ path: `screenshots/r3-achievements-${label}.png` });

    // LinkedIn section
    await page.locator("#linkedin").scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await page.screenshot({ path: `screenshots/r3-linkedin-${label}.png` });

    await page.close();
  }

  await browser.close();
  console.log("done");
})();
