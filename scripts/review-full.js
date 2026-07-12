const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();

  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desktop.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
  await desktop.waitForTimeout(1200);
  await desktop.screenshot({ path: "screenshots/review-desktop-full.png", fullPage: true });

  const title = await desktop.title();
  console.log("TITLE:", title);

  const metaTags = await desktop.evaluate(() =>
    Array.from(document.querySelectorAll("meta")).map(
      (m) => `${m.getAttribute("name") || m.getAttribute("property") || "?"} = ${m.getAttribute("content")}`
    )
  );
  console.log("META:", JSON.stringify(metaTags, null, 2));

  const resumeCheck = await desktop.evaluate(async () => {
    const res = await fetch("/resume.pdf", { method: "HEAD" });
    return { status: res.status, type: res.headers.get("content-type"), len: res.headers.get("content-length") };
  });
  console.log("RESUME:", JSON.stringify(resumeCheck));

  await desktop.close();

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobile.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
  await mobile.waitForTimeout(1200);
  await mobile.screenshot({ path: "screenshots/review-mobile-full.png", fullPage: true });
  await mobile.close();

  await browser.close();
  console.log("done");
})();
