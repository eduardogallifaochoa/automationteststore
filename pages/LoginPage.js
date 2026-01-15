// pages/LoginPage.js
// Page Object Model for the Login Page

import { expect } from '@playwright/test';

export class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Login form fields
    this.usernameInput = page.locator('#loginFrm_loginname');
    this.passwordInput = page.locator('#loginFrm_password');

    // Stable selector: submit button with title="Login"
    this.loginButton = page.locator('button[type="submit"][title="Login"]');
  }

  // Fills credentials and submits the login form
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  // Optional: verifies we are on the login page (useful if you want a guard)
  async expectLoaded() {
    await expect(this.page).toHaveURL(/index\.php\?rt=account\/login/);
    await expect(this.loginButton).toBeVisible();
  }
}
