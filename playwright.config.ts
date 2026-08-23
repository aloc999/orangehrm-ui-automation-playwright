import { existsSync } from 'node:fs';
import { defineConfig, devices } from '@playwright/test';
import { defineBddProject } from 'playwright-bdd';
import { appConfig } from './src/config/env';

function browserChannel(): string | undefined {
  if (process.env.PW_CHANNEL) return process.env.PW_CHANNEL;
  if (process.env.CI) return undefined;
  if (existsSync('/usr/bin/google-chrome') || existsSync('/usr/bin/google-chrome-stable')) {
    return 'chrome';
  }
  return undefined;
}

const channel = browserChannel();
const chrome = {
  ...devices['Desktop Chrome'],
  ...(channel ? { channel } : {}),
};

/**
 * Two BDD projects so guest journeys start logged out, while the rest
 * reuse one administrator session (storageState). `npm test` still
 * compiles every file in features/ and runs them in parallel.
 */
const guest = defineBddProject({
  name: 'guest',
  features: 'features/**/*.feature',
  steps: 'features/steps/**/*.ts',
  tags: '@guest',
});

const app = defineBddProject({
  name: 'app',
  features: 'features/**/*.feature',
  steps: 'features/steps/**/*.ts',
  tags: 'not @guest',
});

export default defineConfig({
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
      name: 'setup',
      testDir: './src/setup',
      testMatch: /.*\.setup\.ts/,
      use: chrome,
    },
    {
      ...guest,
      use: chrome,
    },
    {
      ...app,
      dependencies: ['setup'],
      use: {
        ...chrome,
        storageState: '.auth/admin.json',
      },
    },
  ],
});
