import { expect } from '@playwright/test';

export class GuestCheckoutPage {
  constructor(page) {
    this.page = page;

    // Guest form fields
    this.firstName = page.locator('#guestFrm_firstname');
    this.lastName = page.locator('#guestFrm_lastname');
    this.email = page.locator('#guestFrm_email');
    this.address1 = page.locator('#guestFrm_address_1');
    this.country = page.locator('#guestFrm_country_id');
    this.zone = page.locator('#guestFrm_zone_id');
    this.city = page.locator('#guestFrm_city');
    this.postcode = page.locator('#guestFrm_postcode');

    this.stepHeader = page.locator('#maincontainer').getByText(/Guest Checkout - Step/i);

    // Continue and Confirm Order buttons
    this.continueButton = page.getByRole('button', { name: /continue/i });
    this.confirmOrderButton = page.getByRole('button', { name: /confirm order/i });
  }

  async fillGuestDetails(data) {
    await expect(this.stepHeader).toBeVisible();

    await this.firstName.fill(data.firstName);
    await this.lastName.fill(data.lastName);
    await this.email.fill(data.email);
    await this.address1.fill(data.address1);

    await this.country.selectOption(data.countryId);
    await this.zone.selectOption(data.zoneId);

    await this.city.fill(data.city);
    await this.postcode.fill(data.postcode);
  }

  async continue() {
    await this.continueButton.click();
  }

  async confirmOrder() {
    await this.confirmOrderButton.click();
  }
}
