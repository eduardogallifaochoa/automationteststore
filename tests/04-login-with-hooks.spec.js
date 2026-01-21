// tests/04-login-with-hooks.spec.js

// Importing necessary modules and test data
import { test, expect } from '../fixtures/appFixture.js';
import { users } from '../test-data/users.js';

// Test suite for authentication - login functionality with hooks
test.describe('Auth - Login (hooks demo)', () => {

// Setup before each test in this suite
  test.beforeEach(async ({ app }) => {
    await app.home.goto();
  });
// Test case: Valid user can log in and access My Account
  test('login -> verify My Account', async ({ app }) => {

  // Open login/register page
    await test.step('Open login/register page', async () => {
      await app.home.openLogin();
    });
// Perform login with valid credentials
    await test.step('Login with valid credentials', async () => {
      await app.login.login(users.validUser.username, users.validUser.password);
    });
// Verify user is on My Account page
    await test.step('Verify user is on My Account', async () => {
      await app.account.expectLoaded();
    });
  });

  // Cleanup after each test in this suite
  test.afterEach(async ({ app }) => {
    const logoffLink = app.page.getByRole('link', { name: 'Logoff', exact: true });
    const isVisible = await logoffLink.isVisible().catch(() => false);
    if (isVisible) {
      await logoffLink.click();
      await expect(app.page).toHaveURL(/rt=account\/logout|rt=account\/login/);
    }
  });
});
