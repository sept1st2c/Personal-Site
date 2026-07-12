const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1500);

  await page.locator("#achievements").scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await page.evaluate(() => {
    document.querySelectorAll(".marquee-track").forEach((el) => {
      el.style.animationPlayState = "paused";
    });
  });
  await page.waitForTimeout(300);
  await page.screenshot({ path: "screenshots/r6b-marquee-full.png" });

  const thumb = page.locator(".marquee-track > div").first();
  await thumb.screenshot({ path: "screenshots/r6b-marquee-thumb.png" });

  await browser.close();
  console.log("done");
})();
