const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1000);

  const title = await page.title();
  const metaTags = await page.evaluate(() =>
    Array.from(document.querySelectorAll("meta")).map(
      (m) => `${m.getAttribute("name") || m.getAttribute("property") || "?"} = ${m.getAttribute("content")}`
    )
  );
  console.log("TITLE:", title);
  console.log("META:\n" + metaTags.join("\n"));

  await page.screenshot({ path: "screenshots/r9-hero-desktop.png" });

  await page.locator("#about").scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await page.screenshot({ path: "screenshots/r9-about-desktop.png" });

  await page.close();

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobile.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
  await mobile.waitForTimeout(1000);
  await mobile.screenshot({ path: "screenshots/r9-mobile-hero.png" });

  await mobile.locator("#about").scrollIntoViewIfNeeded();
  await mobile.waitForTimeout(300);
  await mobile.screenshot({ path: "screenshots/r9-mobile-about.png" });

  await mobile.close();
  await browser.close();
  console.log("done");
})();
