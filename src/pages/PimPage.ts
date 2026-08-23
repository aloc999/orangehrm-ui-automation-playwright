import { expect, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class PimPage extends BasePage {
  private get saveButton(): Locator {
    return this.page.getByRole('button', { name: 'Save' });
  }

  async open(): Promise<void> {
    await this.openWorkspace('PIM');
    await this.expectModule(/pim/i);
  }

  async registerEmployee(firstName: string, lastName: string): Promise<string> {
    await this.page.getByRole('link', { name: 'Add Employee' }).click();
    await this.waitUntilReady();
    await this.page.locator('input[name="firstName"]').fill(firstName);
    await this.page.locator('input[name="lastName"]').fill(lastName);

    const employeeId = (await this.employeeIdInput().inputValue()).trim();
    await this.saveButton.click();
    await this.waitUntilReady();
    await expect(this.page.locator('.orangehrm-edit-employee-name')).toContainText(firstName);
    return employeeId;
  }

  async openEmployeeList(): Promise<void> {
    await this.page.getByRole('link', { name: 'Employee List' }).click();
    await this.waitUntilReady();
  }

  async expectEmployeeRecords(): Promise<void> {
    const rows = this.page.locator('.oxd-table-body .oxd-table-card, .oxd-table-body .oxd-table-row');
    const empty = this.page.getByText(/no records found/i);
    await expect(rows.first().or(empty)).toBeVisible();
  }

  private employeeIdInput(): Locator {
    return this.page.locator('.oxd-grid-item').filter({ hasText: 'Employee Id' }).locator('input');
  }
}
