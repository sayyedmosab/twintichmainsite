import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/playwright',
  timeout: 30_000,
  use: {
    headless: true,
    viewport: { width: 1280, height: 800 },
    actionTimeout: 10_000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
