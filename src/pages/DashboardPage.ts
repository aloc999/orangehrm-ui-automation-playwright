import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  async expectLoaded(): Promise<void> {
    if (this.page.url().startsWith('chrome-error://')) {
      throw new Error('OrangeHRM did not finish loading after sign-in');
    }
    await expect(this.page).toHaveURL(/dashboard/i);
    await this.expectModule(/dashboard/i);
  }

  async expectWidgetsVisible(): Promise<void> {
    await this.expectLoaded();
    const widgets = this.page.locator('.orangehrm-dashboard-widget');
    await expect(widgets.first()).toBeVisible();
    expect(await widgets.count()).toBeGreaterThan(1);
  }
}
