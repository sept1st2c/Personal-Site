// Throwaway verification script — not part of the app. Captures the four
// review targets (hero, nav-while-scrolled, experience, achievements) at a
// given viewport size and saves them to /screenshots/ with a prefix.
const { chromium } = require("playwright");
const path = require("path");

const BASE = process.env.BASE_URL || "http://localhost:3010";
const WIDTH = parseInt(process.argv[2] || "1440", 10);
const HEIGHT = parseInt(process.argv[3] || "900", 10);
const PREFIX = process.argv[4] || "desktop";
const OUTDIR = path.join(__dirname, "..", "screenshots");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT } });
  await page.goto(BASE, { waitUntil: "networkidle", timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(500);

  // 1. Hero, top of page
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(OUTDIR, `${PREFIX}-1-hero.png`) });

  // 2. Nav scrolled over body content
  await page.evaluate(() => window.scrollTo(0, 1100));
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(OUTDIR, `${PREFIX}-2-nav-scrolled.png`) });

  // 3. Experience section
  await page.evaluate(() => {
    document.querySelector("#experience")?.scrollIntoView({ block: "start" });
  });
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(OUTDIR, `${PREFIX}-3-experience.png`), fullPage: false });

  // 4. Achievements section
  await page.evaluate(() => {
    document.querySelector("#achievements")?.scrollIntoView({ block: "start" });
  });
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(OUTDIR, `${PREFIX}-4-achievements.png`), fullPage: false });

  console.log("done:", PREFIX);
  await browser.close();
})();
