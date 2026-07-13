const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);

  const marqueeY = await page
    .locator(".marquee-track")
    .evaluate((el) => el.getBoundingClientRect().top + window.scrollY);
  await page.evaluate((y) => window.scrollTo(0, y - 200), marqueeY);
  await page.waitForTimeout(400);

  // Dispatch the click directly via the DOM (avoids Playwright's
  // geometry-based actionability check fighting the continuously
  // translating marquee track).
  const result = await page.evaluate(() => {
    const item = document.querySelector(".marquee-track > div");
    if (!item) return "not found";
    item.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    return "dispatched";
  });
  console.log(result);
  await page.waitForTimeout(400);

  const state = await page.evaluate(() => {
    const item = document.querySelector(".marquee-track > div");
    const overlay = item?.querySelector("div");
    const track = document.querySelector(".marquee-track");
    return {
      overlayClass: overlay?.className,
      trackAnimationPlayState: track ? getComputedStyle(track).animationPlayState : null,
    };
  });
  console.log(state);

  await page.screenshot({ path: "screenshots/marquee-after-dispatch.png" });

  await page.close();
  await browser.close();
})();
