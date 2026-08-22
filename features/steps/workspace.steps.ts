import { Given, When, Then } from './fixtures';
import { uniqueEmployee } from '../../src/data/employees';

Given('an administrator is on the PIM workspace', async ({ loginPage, pimPage }) => {
  await loginPage.open();
  await loginPage.signInAsAdministrator();
  await pimPage.open();
});

Given('an administrator is on the Admin workspace', async ({ loginPage, adminPage }) => {
  await loginPage.open();
  await loginPage.signInAsAdministrator();
  await adminPage.open();
});

Given('an administrator is on the Leave workspace', async ({ loginPage, leavePage }) => {
  await loginPage.open();
  await loginPage.signInAsAdministrator();
  await leavePage.open();
});

Given('an administrator is on the Directory workspace', async ({ loginPage, directoryPage }) => {
  await loginPage.open();
  await loginPage.signInAsAdministrator();
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

When('leave records are requested for a recent period', async ({ leavePage }) => {
  await leavePage.reviewLeaveRecords();
});

When('the corporate directory is loaded', async ({ directoryPage }) => {
  await directoryPage.expectDirectoryView();
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

Then('the leave results view is displayed', async ({ leavePage }) => {
  await leavePage.expectResultsView();
});

Then('directory records or an empty-state message is shown', async ({ directoryPage }) => {
  await directoryPage.expectDirectoryView();
});
