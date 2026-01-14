import { expect } from '@playwright/test';

export class CheckoutSuccessPage {
  constructor(page) {
    this.page = page;
    this.successUrlRegex = /index\.php\?rt=checkout\/success/;
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(this.successUrlRegex);
  }
}
