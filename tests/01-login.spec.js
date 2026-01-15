// tests/01-login.spec.js

// 1) Import Playwright test runner.
// - `test` defines a test case.
// - We are NOT importing `expect` here because assertions live inside the Page Objects (AccountPage.expectLoaded()).
import { test } from '@playwright/test';

// 2) Import Page Objects (POM).
// Each class wraps selectors + actions for a specific page.
// This keeps tests clean and readable (high-level flow only).
import { HomePage } from '../pages/HomePage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { AccountPage } from '../pages/AccountPage.js';

// 3) Import test data.
// Instead of hardcoding credentials in the test, we keep them in a central file.
import { users } from '../test-data/users.js';

// 4) Define the test.
// Playwright injects a fresh `page` instance for the test run.
test('login - valid user can access My Account (POM)', async ({ page }) => {
  // 5) Create Page Object instances.
  // We pass the same Playwright `page` into each POM so they can interact with the browser.
  const home = new HomePage(page);
  const login = new LoginPage(page);
  const account = new AccountPage(page);

  // 6) Navigate to the website home page.
  await home.goto();

  // 7) From the home page, open the Login/Register screen.
  await home.openLogin();

  // 8) Perform login using valid credentials from test-data.
  await login.login(users.validUser.username, users.validUser.password);

  // 9) Verify login success.
  // This method usually checks URL + "My Account" heading + "Logoff" link.
  await account.expectLoaded();
});
