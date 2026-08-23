import { mkdirSync } from 'node:fs';
import { test as setup } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';
import { LoginPage } from '../pages/LoginPage';

setup('authenticate as administrator', async ({ page }) => {
  mkdirSync('.auth', { recursive: true });
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  await loginPage.open();
  await loginPage.signInAsAdministrator();
  await dashboardPage.expectLoaded();
  await page.context().storageState({ path: '.auth/admin.json' });
});
