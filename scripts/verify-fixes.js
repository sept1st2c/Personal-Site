const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);

  // 1. Scroll to Projects, screenshot the card + zoomed screenshot region to
  // check grain is not visible on the image itself.
  await page.locator("#projects").scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await page.screenshot({ path: "screenshots/verify-1-projects-section.png" });

  const shot = page.locator("#projects img").first();
  await shot.screenshot({ path: "screenshots/verify-2-screenshot-zoom.png" });

  // 2. Click through a few dial markers, confirm no blank gap + hover label.
  const markers = page.locator('[role="tablist"] >> visible=true >> button[role="tab"]');
  const dial = page.locator('div[role="tablist"][aria-label="Projects"]').first();
  await dial.locator('button[role="tab"]').nth(2).hover();
  await page.waitForTimeout(200);
  await page.screenshot({ path: "screenshots/verify-3-dial-hover.png" });

  await dial.locator('button[role="tab"]').nth(2).click();
  await page.waitForTimeout(150);
  await page.screenshot({ path: "screenshots/verify-4-mid-transition.png" });
  await page.waitForTimeout(500);
  await page.screenshot({ path: "screenshots/verify-5-after-switch.png" });

  // 3. Open the expand modal, screenshot mid-open and settled.
  await page.locator("#projects button:has-text('Explore project')").first().click();
  await page.waitForTimeout(120);
  await page.screenshot({ path: "screenshots/verify-6-modal-opening.png" });
  await page.waitForTimeout(500);
  await page.screenshot({ path: "screenshots/verify-7-modal-open.png" });
  const modalShot = page.locator('[role="dialog"] img').first();
  await modalShot.screenshot({ path: "screenshots/verify-8-modal-shot-zoom.png" });
  await page.keyboard.press("Escape");
  await page.waitForTimeout(300);

  // 4. Scrolled, non-fullpage shots at a few depths to check bg consistency.
  const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
  for (const frac of [0, 0.25, 0.5, 0.75, 1]) {
    await page.evaluate((y) => window.scrollTo(0, y), Math.round((scrollHeight - 900) * frac));
    await page.waitForTimeout(200);
    await page.screenshot({ path: `screenshots/verify-bg-${frac}.png` });
  }

  // 5. Mobile pass.
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobile.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await mobile.locator("#projects").scrollIntoViewIfNeeded();
  await mobile.waitForTimeout(400);
  await mobile.screenshot({ path: "screenshots/verify-mobile-dial.png" });

  await browser.close();
  console.log("done");
})();
