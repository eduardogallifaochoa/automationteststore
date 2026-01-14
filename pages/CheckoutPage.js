import { expect } from '@playwright/test';

export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.guestCheckoutText = page.getByText('Guest Checkout');
    this.guestCheckoutRadio = page.getByRole('radio', { name: 'Guest Checkout' });

    // The "Continue" button after selecting guest checkout.
    // Using title/role is more stable than icon text.
    this.continueButton = page.getByRole('button', { name: /continue/i });
  }

  async chooseGuestCheckout() {
    await expect(this.guestCheckoutText).toBeVisible();
    await this.guestCheckoutRadio.check();
  }

  async continue() {
    await this.continueButton.click();
  }
}
