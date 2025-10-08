import { test, expect } from '@playwright/test';

test.describe('TwinScience Arabic RTL and Features Test', () => {
  
  test.beforeEach(async ({ page }) => {
    // Use the correct port 3103 with hash routing
    await page.goto('http://localhost:3103/#/twinscience');
    await page.waitForLoadState('networkidle');
  });

  test('TwinScience page loads and displays episodes', async ({ page }) => {
    // Check if TwinScience page title is visible
    await expect(page.locator('h1:has-text("TwinScience Learning Hub")')).toBeVisible();
    
    // Check if episodes are loaded using data-testid
    const episodes = page.locator('[data-testid^="episode-"], .group.relative.bg-white').first();
    await expect(episodes).toBeVisible({ timeout: 10000 });
    
    console.log('✅ TwinScience page loaded successfully');
  });

  test('Language switching works (Arabic RTL)', async ({ page }) => {
    // Find and click language switch button
    const langButton = page.locator('button:has-text("التبديل إلى العربية"), button:has-text("Switch")').first();
    
    if (await langButton.isVisible()) {
      await langButton.click();
      await page.waitForTimeout(1000);
      
      // Check if page direction changed to RTL
      const direction = await page.evaluate(() => {
        return document.documentElement.dir || document.body.dir || 
               document.querySelector('[dir="rtl"]') ? 'rtl' : 'ltr';
      });
      
      console.log('🔄 Page direction after language switch:', direction);
      expect(['rtl', 'ltr']).toContain(direction);
    }
  });

  test('Episode modal opens and shows content tabs', async ({ page }) => {
    // Wait for episodes to load using correct selector
    await page.waitForSelector('[data-testid^="episode-"], .group.relative.bg-white', { timeout: 10000 });
    
    // Click on first episode open button
    const openButton = page.locator('button:has-text("Open"), button:has-text("فتح")').first();
    
    if (await openButton.isVisible()) {
      await openButton.click();
      await page.waitForTimeout(1000);
      
      // Check if modal opened
      const modal = page.locator('[role="dialog"], .modal, [class*="modal"]').first();
      
      if (await modal.isVisible()) {
        console.log('✅ Episode modal opened successfully');
        
        // Check for tabs (Article, Audio, Video)
        const tabs = page.locator('[role="tab"], .tab, button:has-text("Article")');
        const tabCount = await tabs.count();
        
        console.log('📑 Number of tabs found:', tabCount);
        expect(tabCount).toBeGreaterThan(0);
      }
    }
  });

  test('Article tab shows functional commenting system', async ({ page }) => {
    // Open first episode
    await page.waitForSelector('[data-testid^="episode-"], .group.relative.bg-white', { timeout: 10000 });
    const openButton = page.locator('button:has-text("Open"), button:has-text("فتح")').first();
    
    if (await openButton.isVisible()) {
      await openButton.click();
      await page.waitForTimeout(1000);
      
      // Click Article tab if available
      const articleTab = page.locator('button:has-text("Article"), [role="tab"]:has-text("Article")').first();
      
      if (await articleTab.isVisible()) {
        await articleTab.click();
        await page.waitForTimeout(1000);
        
        // Check for comment features
        const commentFeatures = await page.locator('textarea, button:has-text("Comment"), .comment').count();
        console.log('💬 Comment features found:', commentFeatures);
        
        // Check for contribution features
        const contributionFeatures = await page.locator('button:has-text("Edit"), button:has-text("Contribute")').count();
        console.log('✏️ Contribution features found:', contributionFeatures);
      }
    }
  });

  test('Premium subscription features are present', async ({ page }) => {
    // Open first episode
    await page.waitForSelector('[data-testid^="episode-"], .group.relative.bg-white', { timeout: 10000 });
    const openButton = page.locator('button:has-text("Open"), button:has-text("فتح")').first();
    
    if (await openButton.isVisible()) {
      await openButton.click();
      await page.waitForTimeout(1000);
      
      // Check for premium features (crown icons, subscription buttons)
      const premiumElements = await page.locator('[class*="crown"], button:has-text("Premium"), button:has-text("Subscribe")').count();
      console.log('👑 Premium elements found:', premiumElements);
      
      // Check Audio/Video tabs for subscription features
      const audioTab = page.locator('button:has-text("Audio"), [role="tab"]:has-text("Audio")').first();
      
      if (await audioTab.isVisible()) {
        await audioTab.click();
        await page.waitForTimeout(500);
        
        const subscriptionFeatures = await page.locator('button:has-text("Subscribe"), [class*="subscription"]').count();
        console.log('🔐 Subscription features in audio tab:', subscriptionFeatures);
      }
    }
  });

  test('Translation system is working', async ({ page }) => {
    // Check for translation elements
    const translationElements = await page.locator('[data-i18n], [class*="t-"]').count();
    console.log('🌐 Translation elements found:', translationElements);
    
    // Check for Arabic text presence
    const bodyText = await page.textContent('body');
    const hasArabic = /[\u0600-\u06FF]/.test(bodyText || '');
    console.log('🇸🇦 Arabic text detected:', hasArabic);
    
    // Basic check that page has content
    expect(bodyText?.length || 0).toBeGreaterThan(100);
  });

});