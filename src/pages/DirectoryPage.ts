import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class DirectoryPage extends BasePage {
  async open(): Promise<void> {
    await this.openWorkspace('Directory');
    await this.expectModule(/directory/i);
  }

  async expectDirectoryView(): Promise<void> {
    await this.waitUntilReady();
    const cards = this.page.locator('.orangehrm-directory-card');
    const empty = this.page.getByText(/no records found/i);
    await expect(cards.first().or(empty)).toBeVisible();
  }
}
