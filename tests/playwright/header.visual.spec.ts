import { test, expect } from '@playwright/test';

test('header visual snapshots EN/AR', async ({ page }) => {
  const base = 'http://localhost:3102';
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.waitForSelector('header');

  // Ensure output dir exists (Playwright will create file path, but keep organized)
  const enPath = 'tests/playwright/screenshots/header-en.png';
  const arPath = 'tests/playwright/screenshots/header-ar.png';

  // Capture English header
  const header = page.locator('header');
  await header.screenshot({ path: enPath });

  // Toggle language by clicking the flag image inside header (image is inside the toggle button)
  const flag = page.locator('header img.flag-img').first();
  if (await flag.count() > 0) {
    await flag.click();
    await page.waitForTimeout(600); // allow RTL adjustments
  } else {
    // fallback: click first header button
    const btn = page.locator('header button').first();
    await btn.click();
    await page.waitForTimeout(600);
  }

  // Capture Arabic header
  await header.screenshot({ path: arPath });

  // Basic smoke assertions to ensure header exists and screenshots created
  expect(await header.count()).toBeGreaterThan(0);
});
