const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
  const steps = 6;
  for (let i = 0; i < steps; i++) {
    const y = Math.round((scrollHeight - 900) * (i / (steps - 1)));
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await page.waitForTimeout(300);
    await page.screenshot({ path: `screenshots/scroll-check-${i}.png` });
  }
  await browser.close();
})();
