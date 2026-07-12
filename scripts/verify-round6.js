const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();

  for (const [label, width, height] of [
    ["desktop", 1440, 900],
    ["mobile", 390, 844],
  ]) {
    const page = await browser.newPage({ viewport: { width, height } });
    await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1500);

    await page.screenshot({ path: `screenshots/r6-hero-${label}.png` });

    // Zoom on hero photo specifically to check grain absence
    const heroPhoto = page.locator("#top img").first();
    await heroPhoto.screenshot({ path: `screenshots/r6-hero-photo-zoom-${label}.png` });

    // Projects section: collapsed (show more)
    await page.locator("#projects").scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await page.screenshot({ path: `screenshots/r6-projects-collapsed-${label}.png` });

    // Click "Show more"
    await page.locator("button:has-text('Show')").first().click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: `screenshots/r6-projects-expanded-${label}.png` });

    // Achievements marquee zoom (grain check) - pause the CSS animation
    // first so the element is "stable" enough for an element screenshot.
    await page.locator("#achievements").scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await page.screenshot({ path: `screenshots/r6-achievements-${label}.png` });
    await page.evaluate(() => {
      document.querySelectorAll(".marquee-track").forEach((el) => {
        el.style.animationPlayState = "paused";
      });
    });
    await page.waitForTimeout(200);
    const marqueeThumb = page.locator(".marquee-track img").first();
    await marqueeThumb.screenshot({ path: `screenshots/r6-marquee-zoom-${label}.png` });

    // Activity heatmap zoom (grain check)
    await page.locator("#activity").scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await page.screenshot({ path: `screenshots/r6-activity-${label}.png` });

    await page.close();
  }

  await browser.close();
  console.log("done");
})();
