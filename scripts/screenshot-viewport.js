// Non-fullpage screenshot: scrolls to a given Y offset, waits, captures only
// the current viewport. Used where a stitched full-page capture (which
// resizes the browser viewport) causes third-party iframe content (canvas/
// video-heavy landing pages) to repaint blank — a capture-tool artifact,
// not a real embed failure (verified separately against a live viewport).
const { chromium } = require("playwright");
const path = require("path");

const BASE = process.env.BASE_URL || "http://localhost:3002";
const OUT = process.argv[2] || "viewport.png";
const WIDTH = parseInt(process.argv[3] || "1440", 10);
const HEIGHT = parseInt(process.argv[4] || "900", 10);
const SCROLL_Y = parseInt(process.argv[5] || "0", 10);
const WAIT_MS = parseInt(process.argv[6] || "10000", 10);
const OUTDIR = path.join(__dirname, "..", "screenshots");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT } });
  await page.goto(BASE, { waitUntil: "networkidle", timeout: 30000 }).catch(() => {});
  await page.evaluate((y) => window.scrollTo(0, y), SCROLL_Y);
  await page.waitForTimeout(WAIT_MS);
  const outPath = path.join(OUTDIR, OUT);
  await page.screenshot({ path: outPath, fullPage: false });
  console.log("saved", outPath);
  await browser.close();
})();
