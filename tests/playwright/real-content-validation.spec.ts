import { test, expect } from '@playwright/test';

// Helper function to detect dynamic port
async function getAppUrl() {
  const ports = [3103, 3102, 3101, 3100];
  for (const port of ports) {
    try {
      const response = await fetch(`http://localhost:${port}`);
      if (response.ok) {
        return `http://localhost:${port}`;
      }
    } catch (error) {
      // Port not available, try next
    }
  }
  return 'http://localhost:3103'; // Default fallback
}

test.describe('TwinScience Real Content Validation', () => {
  test('Episode 1.1 loads real article content instead of template', async ({ page }) => {
    const appUrl = await getAppUrl();
    
    // Navigate to TwinScience page
    await page.goto(`${appUrl}/#/twinscience`, { waitUntil: 'load', timeout: 30000 });
    
    // Wait for the page to load
    await page.waitForSelector('main, .twin-science-learning-hub, [data-testid="twin-science-hub"]', { timeout: 10000 });
    
    // Find Episode 1.1 card (it may be labeled as "1-1" or "1.1")
    const episodeCard = page.locator('[data-testid="episode-1-1"], [data-testid="episode-1.1"], .episode-card').first();
    await expect(episodeCard).toBeVisible({ timeout: 10000 });
    
    // Click on Episode 1.1
    await episodeCard.click();
    
    // Wait for modal or content to open
    await page.waitForSelector('.modal, [role="dialog"], .content-modal', { timeout: 10000 });
    
    // Click on Article tab/button
    const articleButton = page.locator('button:has-text("Article"), [data-testid="article"], button:has-text("TWiki")').first();
    if (await articleButton.count() > 0) {
      await articleButton.click();
    }
    
    // Wait for content to load
    await page.waitForTimeout(2000);
    
    // Check for REAL content indicators from Episode 1.1
    const realContentIndicators = [
      'Organizational Transformation',
      'The Anatomy of an Organization', 
      'What Constitutes a Transformation?',
      'Ministry',
      'Strategic targets emphasize marginal gains'
    ];
    
    let foundRealContent = false;
    for (const indicator of realContentIndicators) {
      try {
        await expect(page.locator('text=' + indicator)).toBeVisible({ timeout: 2000 });
        foundRealContent = true;
        console.log(`✅ Found real content indicator: "${indicator}"`);
        break;
      } catch (error) {
        console.log(`⚠️ Content indicator not found: "${indicator}"`);
      }
    }
    
    // Check for template content that should NOT be there
    const templateContentIndicators = [
      'Understanding Digital Twins',
      'NASA uses digital twins to monitor spacecraft',
      'Digital twins represent one of the most transformative technologies'
    ];
    
    let foundTemplateContent = false;
    for (const indicator of templateContentIndicators) {
      if (await page.locator('text=' + indicator).count() > 0) {
        foundTemplateContent = true;
        console.log(`❌ Found template content (should be removed): "${indicator}"`);
      }
    }
    
    // Validate results
    expect(foundRealContent).toBe(true);
    expect(foundTemplateContent).toBe(false);
    
    // Check for Wiki-style sidebar features
    const sidebarFeatures = [
      'Want to contribute',
      'Recent Comments', 
      'Register to Edit',
      'Related Articles'
    ];
    
    for (const feature of sidebarFeatures) {
      try {
        await expect(page.locator('text=' + feature)).toBeVisible({ timeout: 2000 });
        console.log(`✅ Found Wiki feature: "${feature}"`);
      } catch (error) {
        console.log(`⚠️ Wiki feature not found: "${feature}"`);
      }
    }
  });
});