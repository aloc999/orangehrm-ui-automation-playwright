import { expect } from '@playwright/test';
import { Given, When, Then } from './fixtures';

When('the administrator opens the {string} workspace', async ({ dashboardPage }, module: string) => {
  await dashboardPage.openWorkspace(module);
});

When('the administrator searches the menu for {string}', async ({ dashboardPage }, term: string) => {
  await dashboardPage.searchMenu(term);
});

Then('the {string} page is displayed', async ({ dashboardPage }, heading: string) => {
  await dashboardPage.expectModule(new RegExp(`^${heading}$`, 'i'));
});

Then('only matching workspaces remain visible', async ({ dashboardPage }) => {
  const names = dashboardPage.visibleMenuItems();
  await expect(names).toHaveCount(1);
  await expect(names.first()).toHaveText(/leave/i);
});
