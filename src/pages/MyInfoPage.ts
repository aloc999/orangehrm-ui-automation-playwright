import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class MyInfoPage extends BasePage {
  async open(): Promise<void> {
    const item = this.page.locator('a.oxd-main-menu-item').filter({ hasText: /^My Info$/ });
    await expect(item).toBeVisible();
    await item.click({ noWaitAfter: true });
    await this.waitUntilReady();
    // My Info lives under the PIM module, so the breadcrumb reads "PIM".
    await this.expectModule(/pim/i);
    await expect(this.page).toHaveURL(/pim\/view(MyDetails|PersonalDetails)/);
  }

  async openProfilePictureDialog(): Promise<void> {
    const picture = this.page.locator('.orangehrm-edit-employee-image').first();
    await expect(picture).toBeVisible();
    await picture.click();
    await this.waitUntilReady();
    await expect(this.page.getByRole('heading', { name: /change profile picture/i })).toBeVisible();
  }

  async uploadProfilePicture(absolutePath: string): Promise<void> {
    const fileInput = this.page.locator('input.oxd-file-input');
    await expect(fileInput).toBeAttached();
    await fileInput.setInputFiles(absolutePath);
    // Preview renders as data URL — no loader to wait for here.
    await expect(this.page.locator('.orangehrm-employee-picture img').first()).toBeVisible();
  }

  async saveProfilePicture(): Promise<void> {
    const save = this.page.getByRole('button', { name: 'Save' });
    await expect(save).toBeEnabled();
    // Toast auto-dismisses in ~5s, so don't block on loaders before asserting it.
    await save.click({ noWaitAfter: true });
  }

  async expectSuccessToast(expected: string | RegExp = /successfully updated/i): Promise<void> {
    // NOTE: TC001 doc says "Successfully Saved", but the demo (OS 5.9)
    // returns "Successfully Updated" for PUT /api/v2/pim/employees/{id}/picture.
    const toast = this.page.locator('.oxd-toast--success, .oxd-toast');
    await expect(toast.first()).toBeVisible({ timeout: 10_000 });
    await expect(toast.first()).toContainText(/successfully/i);
    await expect(toast.first()).toContainText(expected);
  }
}
