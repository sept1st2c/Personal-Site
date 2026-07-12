const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const failedRequests = [];
  page.on("requestfailed", (req) => failedRequests.push(`${req.url()} — ${req.failure()?.errorText}`));
  page.on("console", (msg) => {
    if (msg.type() === "error") console.log("CONSOLE ERROR:", msg.text());
  });

  await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });

  const apiResp = await page.evaluate(async () => {
    try {
      const res = await fetch("/api/activity");
      const json = await res.json();
      return { status: res.status, githubOk: json.githubOk, leetcodeOk: json.leetcodeOk, days: json.days?.length };
    } catch (e) {
      return { error: String(e) };
    }
  });
  console.log("API RESPONSE:", JSON.stringify(apiResp));

  await page.locator("#activity").scrollIntoViewIfNeeded();
  await page.waitForTimeout(2000);
  await page.screenshot({ path: "screenshots/check-activity-direct.png" });

  console.log("FAILED REQUESTS:", JSON.stringify(failedRequests));

  await browser.close();
  console.log("done");
})();
