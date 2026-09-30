import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { appConfig } from '../config/env';

export class AdminPage extends BasePage {
  async open(): Promise<void> {
    await this.openWorkspace('Admin');
    await this.expectModule(/admin/i);
  }

  async filterUsersByUsername(username: string): Promise<void> {
    const usernameField = this.page.locator('.oxd-input-group').filter({ hasText: 'Username' }).locator('input');
    await usernameField.fill(username);
    await this.page.getByRole('button', { name: 'Search' }).click();
    await this.waitUntilReady();
  }

  async expectUserListed(username = appConfig.admin.username): Promise<void> {
    const cell = this.page.locator('.oxd-table-card, .oxd-table-row').filter({ hasText: username });
    await expect(cell.first()).toBeVisible();
  }

  async expectNoUsersListed(): Promise<void> {
    // The table empty-state is a span; the toast uses a <p> — scope to the span.
    await expect(
      this.page.locator('span.oxd-text--span').filter({ hasText: 'No Records Found' }).first(),
    ).toBeVisible();
  }
}
