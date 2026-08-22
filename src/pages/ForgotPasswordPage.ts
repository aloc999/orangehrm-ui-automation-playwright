import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ForgotPasswordPage extends BasePage {
  async expectDisplayed(): Promise<void> {
    await expect(this.page).toHaveURL(/requestPasswordResetCode/i);
    await expect(this.page.getByRole('heading', { name: /reset password/i })).toBeVisible();
    await expect(this.page.locator('input[name="username"]')).toBeVisible();
  }

  async cancel(): Promise<void> {
    await this.page.getByRole('button', { name: 'Cancel' }).click();
    await this.waitUntilReady();
  }
}
