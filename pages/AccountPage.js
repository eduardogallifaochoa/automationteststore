import { expect } from '@playwright/test';

export class AccountPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // "My Account" heading (page title)
    this.heading = page.getByRole('heading', { level: 1, name: 'My Account' });

    // Scope the Logoff link to the visible customer navigation area.
    // Using .first() can pick a hidden duplicate (e.g., mobile menu / footer).
    this.logoffLink = page.getByRole('link', { name: 'Logoff', exact: true });
    
  }

  // Asserts that login was successful and account page is visible
  async expectLoaded() {
    await expect(this.page).toHaveURL(/index\.php\?rt=account\/account/);
    await expect(this.heading).toBeVisible();
    await expect(this.logoffLink).toBeVisible();
  }
}
