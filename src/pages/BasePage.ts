import { expect, Locator, Page } from '@playwright/test';

/**
 * Shared UI primitives. All page objects extend this class so waits stay
 * condition-based (no hard-coded sleeps).
 */
export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  protected get loaders(): Locator {
    return this.page.locator(
      '.oxd-loading-spinner, .oxd-form-loader, .oxd-circle-loader, .oxd-table-loader',
    );
  }

  async waitUntilReady(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.loaders.first()).toBeHidden({ timeout: 20_000 }).catch(() => undefined);
  }

  async openPath(path: string): Promise<void> {
    let lastError: unknown;
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        await this.page.goto(path, { waitUntil: 'domcontentloaded' });
        await this.waitUntilReady();
        return;
      } catch (error) {
        lastError = error;
      }
    }
    throw lastError;
  }

  async expectHeading(name: string | RegExp): Promise<void> {
    await this.waitUntilReady();
    await expect(this.page.getByRole('heading', { name }).first()).toBeVisible();
  }

  async expectModule(name: string | RegExp): Promise<void> {
    await this.waitUntilReady();
    const crumb = this.page.locator('.oxd-topbar-header-breadcrumb-module');
    await expect(crumb).toBeVisible();
    await expect(crumb).toHaveText(name);
  }

  async openWorkspace(name: string): Promise<void> {
    const item = this.page.locator('a.oxd-main-menu-item').filter({
      hasText: new RegExp(`^${name}$`),
    });
    await expect(item).toBeVisible();
    await item.click();
    await this.waitUntilReady();
    await this.expectModule(new RegExp(`^${name}$`, 'i'));
  }

  async searchMenu(term: string): Promise<void> {
    const search = this.page.getByPlaceholder('Search');
    await search.fill(term);
  }

  visibleMenuItems(): Locator {
    return this.page.locator('.oxd-main-menu-item--name');
  }

  async signOut(): Promise<void> {
    await this.page.locator('.oxd-userdropdown-tab').click();
    await this.page.getByRole('menuitem', { name: 'Logout' }).click();
    await this.waitUntilReady();
  }
}
