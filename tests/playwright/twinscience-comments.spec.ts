import { test, expect } from '@playwright/test';

test.describe('TwinScience Functional Comments System', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to TwinScience
    await page.goto('http://localhost:3103/#/twinscience');
    await page.waitForLoadState('networkidle');
  });

  test('Episode 1-1 should have functional commenting system', async ({ page }) => {
    // Find and click episode 1-1
    const episode11 = page.locator('[data-testid="episode-1-1"]');
    await expect(episode11).toBeVisible();
    await episode11.click();
    
    // Wait for modal to open
    await page.waitForSelector('[data-testid="content-modal"]', { timeout: 5000 });
    
    // Check if CommentsSystem is present
    const commentsSection = page.locator('.p-4.bg-gray-50.rounded-lg');
    await expect(commentsSection).toBeVisible();
    
    // Check for comment form elements
    const nameInput = page.locator('input[placeholder*="name"]');
    const commentTextarea = page.locator('textarea[placeholder*="comment"]');
    const addCommentButton = page.locator('button:has-text("Add Comment")');
    
    await expect(nameInput).toBeVisible();
    await expect(commentTextarea).toBeVisible();
    await expect(addCommentButton).toBeVisible();
  });

  test('Should show subscription dialog when trying to comment without subscription', async ({ page }) => {
    // Navigate to episode 1-1
    const episode11 = page.locator('[data-testid="episode-1-1"]');
    await episode11.click();
    await page.waitForSelector('[data-testid="content-modal"]');
    
    // Fill in comment form
    await page.fill('input[placeholder*="name"]', 'Test User');
    await page.fill('textarea[placeholder*="comment"]', 'This is a test comment');
    
    // Click add comment (should trigger subscription dialog)
    await page.click('button:has-text("Add Comment")');
    
    // Check for subscription dialog
    const subscriptionDialog = page.locator('.fixed.inset-0.bg-black.bg-opacity-50');
    await expect(subscriptionDialog).toBeVisible();
    
    const subscribeButton = page.locator('button:has-text("Subscribe Now")');
    await expect(subscribeButton).toBeVisible();
  });

  test('Should allow commenting after subscribing', async ({ page }) => {
    // Navigate to episode 1-1
    const episode11 = page.locator('[data-testid="episode-1-1"]');
    await episode11.click();
    await page.waitForSelector('[data-testid="content-modal"]');
    
    // Fill in comment form
    await page.fill('input[placeholder*="name"]', 'Pro User');
    await page.fill('textarea[placeholder*="comment"]', 'Great article! Very informative.');
    
    // Click add comment to trigger subscription dialog
    await page.click('button:has-text("Add Comment")');
    
    // Subscribe
    await page.click('button:has-text("Subscribe Now")');
    
    // Comment should be added
    const commentsList = page.locator('.space-y-3');
    await expect(commentsList).toBeVisible();
    
    // Check for the new comment
    const newComment = page.locator('text=Great article! Very informative.');
    await expect(newComment).toBeVisible();
  });

  test('Comments should work for all content types', async ({ page }) => {
    // Test article comments
    const episode11 = page.locator('[data-testid="episode-1-1"]');
    await episode11.click();
    await page.waitForSelector('[data-testid="content-modal"]');
    
    // Check article tab (default)
    let commentsSection = page.locator('.p-4.bg-gray-50.rounded-lg');
    await expect(commentsSection).toBeVisible();
    
    // Switch to audio tab
    const audioTab = page.locator('button:has-text("Podcast")');
    await audioTab.click();
    commentsSection = page.locator('.p-4.bg-gray-50.rounded-lg');
    await expect(commentsSection).toBeVisible();
    
    // Switch to video tab
    const videoTab = page.locator('button:has-text("Video")');
    await videoTab.click();
    commentsSection = page.locator('.p-4.bg-gray-50.rounded-lg');
    await expect(commentsSection).toBeVisible();
  });

  test('Comments should persist and show proper metadata', async ({ page }) => {
    // Navigate to episode 1-1 and subscribe
    const episode11 = page.locator('[data-testid="episode-1-1"]');
    await episode11.click();
    await page.waitForSelector('[data-testid="content-modal"]');
    
    // Add a comment
    await page.fill('input[placeholder*="name"]', 'Test Author');
    await page.fill('textarea[placeholder*="comment"]', 'This comment should persist');
    await page.click('button:has-text("Add Comment")');
    await page.click('button:has-text("Subscribe Now")');
    
    // Close modal and reopen
    await page.click('button[title="Close"]');
    await episode11.click();
    
    // Check if comment persisted
    const persistedComment = page.locator('text=This comment should persist');
    await expect(persistedComment).toBeVisible();
    
    // Check for metadata
    const authorName = page.locator('text=Test Author');
    const proLabel = page.locator('text=PRO');
    const likeButton = page.locator('button:has-text("👍")');
    
    await expect(authorName).toBeVisible();
    await expect(proLabel).toBeVisible();
    await expect(likeButton).toBeVisible();
  });
});