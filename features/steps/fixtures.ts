import { test as base, createBdd } from 'playwright-bdd';
import { LoginPage } from '../../src/pages/LoginPage';
import { DashboardPage } from '../../src/pages/DashboardPage';
import { PimPage } from '../../src/pages/PimPage';
import { AdminPage } from '../../src/pages/AdminPage';
import { LeavePage } from '../../src/pages/LeavePage';
import { DirectoryPage } from '../../src/pages/DirectoryPage';
import { ForgotPasswordPage } from '../../src/pages/ForgotPasswordPage';

export type Pages = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  pimPage: PimPage;
  adminPage: AdminPage;
  leavePage: LeavePage;
  directoryPage: DirectoryPage;
  forgotPasswordPage: ForgotPasswordPage;
};

export const test = base.extend<Pages>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  pimPage: async ({ page }, use) => {
    await use(new PimPage(page));
  },
  adminPage: async ({ page }, use) => {
    await use(new AdminPage(page));
  },
  leavePage: async ({ page }, use) => {
    await use(new LeavePage(page));
  },
  directoryPage: async ({ page }, use) => {
    await use(new DirectoryPage(page));
  },
  forgotPasswordPage: async ({ page }, use) => {
    await use(new ForgotPasswordPage(page));
  },
});

export const { Given, When, Then } = createBdd(test);
