const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();

  // Desktop: projects collapsed/expanded transition + hero + experience + linkedin
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: "screenshots/r8-hero-desktop.png" });

  await page.locator("#experience").scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await page.screenshot({ path: "screenshots/r8-experience-desktop.png" });

  await page.locator("#projects").scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await page.screenshot({ path: "screenshots/r8-projects-collapsed-desktop.png" });

  await page.locator("button:has-text('Show')").first().click();
  await page.waitForTimeout(250); // mid-transition
  await page.screenshot({ path: "screenshots/r8-projects-mid-transition.png" });
  await page.waitForTimeout(600); // settled
  await page.screenshot({ path: "screenshots/r8-projects-expanded-desktop.png" });

  await page.locator("#linkedin").scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await page.screenshot({ path: "screenshots/r8-linkedin-desktop.png" });

  await page.close();

  // Full mobile pass, every section, 390px
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobile.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
  await mobile.waitForTimeout(1200);

  const sections = ["top", "experience", "projects", "achievements", "activity", "linkedin"];
  for (const id of sections) {
    await mobile.locator(`#${id}`).scrollIntoViewIfNeeded();
    await mobile.waitForTimeout(350);
    await mobile.screenshot({ path: `screenshots/r8-mobile-${id}.png` });
  }

  // Expand projects on mobile too
  await mobile.locator("#projects").scrollIntoViewIfNeeded();
  await mobile.locator("button:has-text('Show')").first().click();
  await mobile.waitForTimeout(700);
  await mobile.screenshot({ path: "screenshots/r8-mobile-projects-expanded.png" });

  // Full page mobile screenshot for a top-to-bottom look
  await mobile.evaluate(() => window.scrollTo(0, 0));
  await mobile.waitForTimeout(300);
  await mobile.screenshot({ path: "screenshots/r8-mobile-fullpage.png", fullPage: true });

  await mobile.close();
  await browser.close();
  console.log("done");
})();
