const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();

  const d = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await d.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
  await d.waitForTimeout(1000);
  await d.screenshot({ path: "screenshots/r11-desktop-hero.png" });

  // Open resume modal from hero
  await d.locator("button:has-text('View Résumé')").first().click();
  await d.waitForTimeout(700);
  await d.screenshot({ path: "screenshots/r11-desktop-resume-modal.png" });
  await d.keyboard.press("Escape");
  await d.waitForTimeout(400);

  await d.locator("#achievements").scrollIntoViewIfNeeded();
  await d.waitForTimeout(500);
  await d.screenshot({ path: "screenshots/r11-desktop-achievements.png" });

  await d.locator("#linkedin").scrollIntoViewIfNeeded();
  await d.waitForTimeout(500);
  await d.screenshot({ path: "screenshots/r11-desktop-linkedin.png" });

  await d.locator("#footer").scrollIntoViewIfNeeded();
  await d.waitForTimeout(500);
  await d.screenshot({ path: "screenshots/r11-desktop-footer.png" });

  await d.close();

  const m = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await m.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
  await m.waitForTimeout(1000);

  // Open resume modal from nav on mobile
  await m.locator("header button:has-text('Résumé')").first().click();
  await m.waitForTimeout(700);
  await m.screenshot({ path: "screenshots/r11-mobile-resume-modal.png" });

  await m.close();
  await browser.close();
  console.log("done");
})();
