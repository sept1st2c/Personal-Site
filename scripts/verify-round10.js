const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();

  // Desktop full pass
  const d = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await d.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
  await d.waitForTimeout(1200);
  await d.screenshot({ path: "screenshots/r10-desktop-hero.png" });

  await d.locator("#experience").scrollIntoViewIfNeeded();
  await d.waitForTimeout(600);
  await d.screenshot({ path: "screenshots/r10-desktop-experience.png" });

  await d.locator("#projects").scrollIntoViewIfNeeded();
  await d.waitForTimeout(500);
  await d.screenshot({ path: "screenshots/r10-desktop-projects-collapsed.png" });

  // Rapid-fire Tapi transition check
  await d.locator("button:has-text('Show')").first().click();
  await d.waitForTimeout(120);
  await d.screenshot({ path: "screenshots/r10-desktop-projects-mid.png" });
  await d.waitForTimeout(600);
  await d.screenshot({ path: "screenshots/r10-desktop-projects-expanded.png" });

  await d.locator("#activity").scrollIntoViewIfNeeded();
  await d.waitForTimeout(500);
  // hover topmost-row, rightmost (most recent) cell
  const cells = d.locator("#activity button[aria-label]");
  const count = await cells.count();
  await cells.nth(count - 7).hover({ force: true });
  await d.waitForTimeout(300);
  await d.screenshot({ path: "screenshots/r10-desktop-activity-tooltip.png" });

  await d.close();

  // Mobile full pass
  const m = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await m.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
  await m.waitForTimeout(1200);
  await m.screenshot({ path: "screenshots/r10-mobile-hero.png" });

  // Mobile nav open
  await m.locator("header button[aria-label]").first().click();
  await m.waitForTimeout(400);
  await m.screenshot({ path: "screenshots/r10-mobile-nav-open.png" });
  await m.locator("header button[aria-label]").first().click();
  await m.waitForTimeout(400);

  await m.locator("#activity").scrollIntoViewIfNeeded();
  await m.waitForTimeout(500);
  await m.screenshot({ path: "screenshots/r10-mobile-activity.png" });

  await m.locator("#footer").scrollIntoViewIfNeeded();
  await m.waitForTimeout(400);
  await m.screenshot({ path: "screenshots/r10-mobile-about-footer.png" });

  await m.close();
  await browser.close();
  console.log("done");
})();
