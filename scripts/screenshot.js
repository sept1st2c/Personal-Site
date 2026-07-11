// Throwaway verification script — not part of the app. Screenshots the
// running dev server at a given viewport size and saves to /screenshots/.
const { chromium } = require("playwright");
const path = require("path");

const BASE = process.env.BASE_URL || "http://localhost:3002";
const OUT = process.argv[2] || "milestone.png";
const WIDTH = parseInt(process.argv[3] || "1440", 10);
const HEIGHT = parseInt(process.argv[4] || "900", 10);
const FULLPAGE = process.argv[5] !== "false";
const OUTDIR = path.join(__dirname, "..", "screenshots");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT } });
  await page.goto(BASE, { waitUntil: "networkidle", timeout: 30000 }).catch(() => {});

  // Walk down the page in viewport-sized steps so IntersectionObserver-gated
  // iframes actually get a chance to start loading (and finish, or hit their
  // own fail-timeout) well before we ask for a full-page screenshot, which
  // otherwise would just resize the viewport to full height in one jump.
  const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < scrollHeight; y += HEIGHT) {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await page.waitForTimeout(1200);
  }
  // give the last-revealed iframes their full fail-timeout window
  await page.waitForTimeout(10000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);

  const outPath = path.join(OUTDIR, OUT);
  await page.screenshot({ path: outPath, fullPage: FULLPAGE });
  console.log("saved", outPath);
  await browser.close();
})();
