import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LeavePage extends BasePage {
  async open(): Promise<void> {
    await this.openWorkspace('Leave');
    await this.expectModule(/leave/i);
  }

  async reviewLeaveRecords(): Promise<void> {
    await this.page.getByRole('link', { name: 'Leave List' }).click();
    await this.waitUntilReady();
    await this.page.getByRole('button', { name: 'Search' }).click();
    await this.waitUntilReady();
  }

  async expectResultsView(): Promise<void> {
    const table = this.page.locator('.oxd-table');
    const empty = this.page.getByText(/no records found/i);
    await expect(table.or(empty).first()).toBeVisible();
  }
}
