// tests/04-login-with-hooks.spec.js

import { test, expect } from '@playwright/test';

import { HomePage } from '../pages/HomePage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { AccountPage } from '../pages/AccountPage.js';

import { users } from '../test-data/users.js';

// Test suite for authentication - login functionality with hooks
test.describe('Auth - Login (hooks demo)', () => {

// Setup before each test in this suite
  test.beforeEach(async ({ page }) => {
    const home = new HomePage(page);

    await test.step('Setup: open home page', async () => {
      await home.goto();
    });
  });
// Test case: Valid user can log in and access My Account
  test('login -> verify My Account', async ({ page }) => {
    const home = new HomePage(page);
    const login = new LoginPage(page);
    const account = new AccountPage(page);
// Test steps
    await test.step('Open login/register page', async () => {
      await home.openLogin();
    });

// Login with valid credentials
    await test.step('Login with valid credentials', async () => {
      await login.login(users.validUser.username, users.validUser.password);
    });
// Verify user is on My Account page
    await test.step('Verify user is on My Account', async () => {
      await account.expectLoaded();
    });
  });

  // Cleanup after each test in this suite
  test.afterEach(async ({ page }) => {
    await test.step('Cleanup: logout (if user is logged in)', async () => {
      // If the user is not logged in, this should do nothing (or fail softly).
      const logoffVisible = await page
        .getByRole('link', { name: 'Logoff', exact: true })
        .isVisible()
        .catch(() => false);

// Perform logout if the Logoff link is visible
      if (logoffVisible) {
        await page.getByRole('link', { name: 'Logoff', exact: true }).click();
        await expect(page).toHaveURL(/rt=account\/logout|rt=account\/login/);
      }
    });
  });
});
