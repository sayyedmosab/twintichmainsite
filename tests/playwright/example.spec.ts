import { test, expect } from '@playwright/test';

test.describe('TwinScience page smoke', () => {
  test('has header and hero text', async ({ page }) => {
    // navigate to root first (client routing app)
    await page.goto('http://localhost:3100', { waitUntil: 'load', timeout: 30000 });
  // click the TwinScience link in the header nav (HashRouter produces href="#/twinscience")
  const twinLink = page.locator('a[href="#/twinscience"]');
  await expect(twinLink).toBeVisible({ timeout: 10000 });
  await twinLink.click();
  // wait for client routing to render (hash-based)
  await page.waitForURL('**/#/twinscience', { timeout: 10000 });

  // Check header logo (home link) exists
  const logo = page.locator('header a[href="#/"] img');
  await expect(logo).toBeVisible({ timeout: 5000 });

    // Check hero H1 contains expected phrase
    const h1 = page.locator('h1');
    await expect(h1).toContainText('Shape the Future', { timeout: 5000 });
  });
});
