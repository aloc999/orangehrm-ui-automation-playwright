import { expect, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { appConfig } from '../config/env';

export class LoginPage extends BasePage {
  private get username(): Locator {
    return this.page.locator('input[name="username"]');
  }

  private get password(): Locator {
    return this.page.locator('input[name="password"]');
  }

  private get submit(): Locator {
    return this.page.locator('button[type="submit"]');
  }

  async open(): Promise<void> {
    await this.openPath('/web/index.php/auth/login');
    if (!(await this.username.isVisible().catch(() => false))) {
      await this.openPath('/web/index.php/auth/login');
    }
    await expect(this.username).toBeVisible();
  }

  async signIn(username: string, password: string): Promise<void> {
    await expect(this.username).toBeVisible();
    await this.username.fill(username);
    await this.password.fill(password);
    await expect(this.submit).toBeEnabled();
    await this.submit.click();
    await this.waitUntilReady();
  }

  async signInAsAdministrator(): Promise<void> {
    await this.signIn(appConfig.admin.username, appConfig.admin.password);
    if (this.page.url().startsWith('chrome-error://')) {
      await this.open();
      await this.signIn(appConfig.admin.username, appConfig.admin.password);
    }
  }

  async submitEmptyForm(): Promise<void> {
    await this.username.fill('');
    await this.password.fill('');
    await this.submit.click();
  }

  async expectAuthenticationFailure(): Promise<void> {
    await expect(this.page.locator('.oxd-alert-content-text')).toHaveText(/invalid credentials/i);
  }

  async expectRequiredFieldValidation(): Promise<void> {
    const required = this.page.locator('.oxd-input-field-error-message');
    await expect(required.first()).toBeVisible();
    await expect(required).toHaveCount(2);
  }

  async expectDisplayed(): Promise<void> {
    await expect(this.page).toHaveURL(/auth\/login/);
    await expect(this.username).toBeVisible();
    await expect(this.submit).toBeVisible();
  }

  async startPasswordRecovery(): Promise<void> {
    await this.page.getByText('Forgot your password?').click();
    await this.waitUntilReady();
  }
}
