const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(1000);

  // Hero (real photo)
  await page.screenshot({ path: "screenshots/r5-hero.png" });

  // Scroll so a project card sits right under the nav — checks the
  // z-index / nav-overlap fix directly.
  await page.locator("#projects").scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollBy(0, 40));
  await page.waitForTimeout(300);
  await page.screenshot({ path: "screenshots/r5-projects-nav-overlap-check.png" });

  // Dark Pattern Detector card (last one) - real screenshot now
  await page.mouse.wheel(0, 900);
  await page.waitForTimeout(300);
  await page.screenshot({ path: "screenshots/r5-dark-pattern.png" });

  // Achievements + marquee
  await page.locator("#achievements").scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await page.screenshot({ path: "screenshots/r5-achievements.png" });

  // Hover a marquee thumbnail to check caption overlay (force: true since
  // it's mid-animation and never "stable" by Playwright's normal check —
  // that's expected, the marquee is supposed to be moving)
  const thumb = page.locator(".marquee-track > div").nth(2);
  await thumb.hover({ force: true });
  await page.waitForTimeout(300);
  await page.screenshot({ path: "screenshots/r5-marquee-hover.png" });

  // LinkedIn section (new static cards)
  await page.locator("#linkedin").scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await page.screenshot({ path: "screenshots/r5-linkedin.png" });

  // Confirm Education section is gone (scroll to bottom / footer)
  await page.locator("footer").scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await page.screenshot({ path: "screenshots/r5-footer-area.png" });

  // Open a project detail modal to check scrollbar styling
  await page.locator("#projects").scrollIntoViewIfNeeded();
  await page.locator("button:has-text('Explore project')").first().click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: "screenshots/r5-modal-scrollbar.png" });

  await browser.close();
  console.log("done");
})();
