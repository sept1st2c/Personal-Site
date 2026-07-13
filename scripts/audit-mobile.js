const { chromium } = require("playwright");
const fs = require("fs");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
  });

  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(1800);

  const height = await page.evaluate(() => document.body.scrollHeight);
  console.log("page height:", height);

  fs.mkdirSync("screenshots/mobile-audit", { recursive: true });

  const step = 700;
  let y = 0;
  let i = 0;
  while (y < height) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(500);
    await page.screenshot({ path: `screenshots/mobile-audit/scroll-${String(i).padStart(2, "0")}-y${y}.png` });
    y += step;
    i++;
  }

  await page.close();
  await browser.close();
  console.log("done, frames:", i);
})();
