import { Given, When, Then } from './fixtures';

Given('the OrangeHRM login page is displayed', async ({ loginPage }) => {
  await loginPage.open();
});

Given('an administrator is working in the application', async ({ dashboardPage, loginPage, page }) => {
  await dashboardPage.openPath('/web/index.php/dashboard/index');
  if (/auth\/login/.test(page.url())) {
    await loginPage.signInAsAdministrator();
  }
  await dashboardPage.expectLoaded();
});

When('the administrator signs in with valid credentials', async ({ loginPage }) => {
  await loginPage.signInAsAdministrator();
});

When('a user signs in with unrecognized credentials', async ({ loginPage }) => {
  await loginPage.signIn('not-a-real-user', 'wrong-password');
});

When('a user attempts to sign in without providing credentials', async ({ loginPage }) => {
  await loginPage.submitEmptyForm();
});

When('the administrator signs out', async ({ dashboardPage }) => {
  await dashboardPage.signOut();
});

When('the user chooses to reset a forgotten password', async ({ loginPage }) => {
  await loginPage.startPasswordRecovery();
});

When('the user cancels password recovery', async ({ forgotPasswordPage }) => {
  await forgotPasswordPage.cancel();
});

Then('the workforce dashboard is displayed', async ({ dashboardPage }) => {
  await dashboardPage.expectLoaded();
});

Then('an authentication failure is shown', async ({ loginPage }) => {
  await loginPage.expectAuthenticationFailure();
});

Then('required-field validation is shown', async ({ loginPage }) => {
  await loginPage.expectRequiredFieldValidation();
});

Then('the login page remains displayed', async ({ loginPage }) => {
  await loginPage.expectDisplayed();
});

Then('the reset password form is displayed', async ({ forgotPasswordPage }) => {
  await forgotPasswordPage.expectDisplayed();
});

Then('the dashboard widgets are visible', async ({ dashboardPage }) => {
  await dashboardPage.expectWidgetsVisible();
});
