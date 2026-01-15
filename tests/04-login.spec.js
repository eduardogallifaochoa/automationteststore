import { page, expect, test } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { users } from '../test-data/users.js';
import { AccountPage } from '../pages/AccountPage';

test('login with valid credentials ', async ({ page }) => {
    const home = new HomePage(page);
    const login = new LoginPage(page);
    const account = new AccountPage(page);

    // 1) Navigate to the home page.
    await home.goto();

    // 2) Open the Login/Register page.
    await home.openLogin();

    // 3) Perform login.
    await login.login(users.validUser.username, users.validUser.password);

    // 4) Verify login success by checking URL and presence of "Logoff" link.
    await account.expectLoaded();

});