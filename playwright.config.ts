import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import { appConfig } from './src/config/env';

/**
 * Feature files in features/ are compiled by playwright-bdd and executed
 * by the Playwright runner (`npm test`). Parallelism, traces, and HTML
 * reporting stay native to Playwright.
 */
const testDir = defineBddConfig({
  features: 'features/**/*.feature',
  steps: 'features/steps/**/*.ts',
  outputDir: '.features-gen',
});

const browserChannel = process.env.PW_CHANNEL ?? (process.env.CI ? undefined : 'chrome');

export default defineConfig({
  testDir,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 2 : 2,
  timeout: 90_000,
  expect: { timeout: 20_000 },
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'playwright-report/results.json' }],
  ],
  use: {
    baseURL: appConfig.baseUrl,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 20_000,
    navigationTimeout: 45_000,
    viewport: { width: 1440, height: 900 },
    launchOptions: {
      args: ['--disable-dev-shm-usage', '--no-sandbox'],
    },
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        ...(browserChannel ? { channel: browserChannel } : {}),
      },
    },
  ],
});
