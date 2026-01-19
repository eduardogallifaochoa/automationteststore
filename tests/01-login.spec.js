import { HomePage } from '../pages/HomePage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { AccountPage } from '../pages/AccountPage.js';
import { users } from '../test-data/users.js';
import { test, expect } from '@playwright/test';

// Test suite for authentication - login functionality
test.describe('Auth - Login', () => {
  test.beforeEach(async ({ page }) => {
    // Common setup for this suite: always start from home
    const home = new HomePage(page);
    await home.goto();
  });

  //
  test('valid user can access My Account', async ({ page }) => {
    const home = new HomePage(page);
    const login = new LoginPage(page);
    const account = new AccountPage(page);

    // Test step 1: Open login/register page
    await test.step('Open login/register page', async () => {
      await home.openLogin();
    });

    //test step 2: Submit valid credentials
    await test.step('Submit valid credentials', async () => {
      await login.login(users.validUser.username, users.validUser.password);
    });

    // Test step 3: Verify user landed on My Account  
    await test.step('Verify user landed on My Account', async () => {
      await account.expectLoaded();
    });
  });

  // Optional cleanup after each test in this suite
  test.afterEach(async ({ page }) => {
    // Optional cleanup example (only if you really need it later)
    // e.g., you could add logout here if your suite requires a clean session.
    // await page.context().clearCookies(); // also possible, but not required now
  });
});
