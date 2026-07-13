const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();

  // Desktop, fine pointer (default) — cursor should be enabled
  const d = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await d.goto("http://localhost:3000", { waitUntil: "networkidle" });

  const attr = await d.evaluate(() => document.documentElement.dataset.customCursor);
  console.log("data-custom-cursor attribute:", attr);

  // Move mouse over plain canvas, screenshot near the cursor
  await d.mouse.move(400, 300);
  await d.waitForTimeout(150);
  await d.screenshot({ path: "screenshots/cursor-plain.png", clip: { x: 300, y: 200, width: 220, height: 220 } });

  // Move mouse onto a real link/button to trigger hover state
  const cta = d.locator("a, button").first();
  const box = await cta.boundingBox();
  if (box) {
    await d.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 10 });
    await d.waitForTimeout(300);
    await d.screenshot({
      path: "screenshots/cursor-hover.png",
      clip: {
        x: Math.max(0, box.x - 80),
        y: Math.max(0, box.y - 80),
        width: 240,
        height: 240,
      },
    });
  }

  // Verify native cursor is actually hidden (cursor: none computed on body)
  const cursorStyle = await d.evaluate(() => getComputedStyle(document.body).cursor);
  console.log("computed body cursor:", cursorStyle);

  await d.close();

  // Reduced motion — cursor should be disabled, native cursor untouched
  const r = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  await r.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await r.waitForTimeout(300);
  const rAttr = await r.evaluate(() => document.documentElement.dataset.customCursor);
  const rCursorStyle = await r.evaluate(() => getComputedStyle(document.body).cursor);
  console.log("reduced-motion data-custom-cursor:", rAttr, "| computed body cursor:", rCursorStyle);
  await r.close();

  // Touch/coarse pointer emulation — cursor should be disabled
  const t = await browser.newPage({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  });
  await t.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await t.waitForTimeout(300);
  const tAttr = await t.evaluate(() => document.documentElement.dataset.customCursor);
  const tCursorStyle = await t.evaluate(() => getComputedStyle(document.body).cursor);
  console.log("touch data-custom-cursor:", tAttr, "| computed body cursor:", tCursorStyle);
  await t.close();

  await browser.close();
  console.log("done");
})();
