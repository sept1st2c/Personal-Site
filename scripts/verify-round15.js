const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();

  // Hero mid-sequence frames (desktop)
  const d = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const start = Date.now();
  await d.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
  for (const t of [80, 250, 450, 700, 1000, 1400]) {
    const wait = t - (Date.now() - start);
    if (wait > 0) await d.waitForTimeout(wait);
    await d.screenshot({ path: `screenshots/r15-hero-t${t}.png` });
  }
  await d.close();

  // Settled hero (mobile)
  const m = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await m.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
  await m.waitForTimeout(2200);
  await m.screenshot({ path: "screenshots/r15-mobile-hero-settled.png" });
  await m.close();

  // Project cards mid-reveal (alternating slide-in check)
  const p = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
  await p.waitForTimeout(300);
  const projY = await p.locator("#projects").evaluate((el) => el.getBoundingClientRect().top + window.scrollY);
  await p.evaluate((y) => window.scrollTo(0, y - 700), projY);
  await p.waitForTimeout(150);
  for (let i = 0; i < 5; i++) {
    await p.evaluate(({ y, step }) => window.scrollTo(0, y - 700 + step * 130), { y: projY, step: i });
    await p.waitForTimeout(90);
  }
  await p.screenshot({ path: "screenshots/r15-projects-mid-reveal.png" });
  await p.waitForTimeout(800);
  await p.screenshot({ path: "screenshots/r15-projects-settled.png" });

  // hover state check
  await p.locator("#projects .grid > div").first().hover();
  await p.waitForTimeout(400);
  await p.screenshot({ path: "screenshots/r15-projects-hover.png" });

  await p.close();
  await browser.close();
  console.log("done");
})();
