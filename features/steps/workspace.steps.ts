import { Page } from '@playwright/test';
import { Given, When, Then } from './fixtures';
import { uniqueEmployee } from '../../src/data/employees';
import { LoginPage } from '../../src/pages/LoginPage';

async function ensureSignedIn(page: Page, loginPage: LoginPage): Promise<void> {
  if (page.url() === 'about:blank') {
    await loginPage.openPath('/web/index.php/dashboard/index');
  }
  if (/auth\/login/.test(page.url())) {
    await loginPage.signInAsAdministrator();
  }
}

Given('an administrator is on the PIM workspace', async ({ pimPage, loginPage, page }) => {
  await ensureSignedIn(page, loginPage);
  await pimPage.open();
});

Given('an administrator is on the Admin workspace', async ({ adminPage, loginPage, page }) => {
  await ensureSignedIn(page, loginPage);
  await adminPage.open();
});

Given('an administrator is on the Leave workspace', async ({ leavePage, loginPage, page }) => {
  await ensureSignedIn(page, loginPage);
  await leavePage.open();
});

Given('an administrator is on the Directory workspace', async ({ directoryPage, loginPage, page }) => {
  await ensureSignedIn(page, loginPage);
  await directoryPage.open();
});

When('a new employee is registered', async ({ pimPage }) => {
  const employee = uniqueEmployee();
  await pimPage.registerEmployee(employee.firstName, employee.lastName);
});

When('the employee list is requested', async ({ pimPage }) => {
  await pimPage.openEmployeeList();
});

When('system users are filtered by the built-in administrator username', async ({ adminPage }) => {
  await adminPage.filterUsersByUsername('Admin');
});

When('system users are filtered by an unregistered username', async ({ adminPage }) => {
  await adminPage.filterUsersByUsername('NonExistentUserXYZ999');
});

When('leave records are requested for a recent period', async ({ leavePage }) => {
  await leavePage.reviewLeaveRecords();
});

When('the corporate directory is loaded', async ({ directoryPage }) => {
  await directoryPage.waitUntilReady();
});

Then('the employee personal details are displayed', async ({ pimPage }) => {
  await pimPage.expectHeading(/personal details/i);
});

Then('employee records are displayed', async ({ pimPage }) => {
  await pimPage.expectEmployeeRecords();
});

Then('the administrator account is listed', async ({ adminPage }) => {
  await adminPage.expectUserListed('Admin');
});

Then('no matching user records are displayed', async ({ adminPage }) => {
  await adminPage.expectNoUsersListed();
});

Then('the leave results view is displayed', async ({ leavePage }) => {
  await leavePage.expectResultsView();
});

Then('directory records or an empty-state message is shown', async ({ directoryPage }) => {
  await directoryPage.expectDirectoryView();
});
