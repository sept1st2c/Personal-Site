const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);

  // Hamburger open animation
  const menuBtn = page.locator('button[aria-label="Open navigation menu"]');
  await menuBtn.click();
  await page.waitForTimeout(150);
  await page.screenshot({ path: "screenshots/mobile-nav-opening.png" });
  await page.waitForTimeout(400);
  await page.screenshot({ path: "screenshots/mobile-nav-open.png" });
  await page.locator('button[aria-label="Close navigation menu"]').click();
  await page.waitForTimeout(400);

  await page.close();
  await browser.close();
  console.log("done");
})();
