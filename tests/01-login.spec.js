import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { AccountPage } from '../pages/AccountPage.js';
import { users } from '../test-data/users.js';

test('login - valid user can access My Account (POM)', async ({ page }) => {
  const home = new HomePage(page);
  const login = new LoginPage(page);
  const account = new AccountPage(page);

  await home.goto();
  await home.openLogin();

  await login.login(users.validUser.username, users.validUser.password);

  await account.expectLoaded();
});
