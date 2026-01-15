// pages/CartPage.js
// Page Object Model for the Cart Page

import { expect } from '@playwright/test';

export class CartPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // "Shopping Cart" heading (more specific than plain text)
    this.cartTitle = page.getByRole('heading', { name: /shopping cart/i });

    // Checkout button in cart page (id used by the site)
    this.checkoutButton = page.locator('#cart_checkout1');

    // Cart products block (unique, avoids strict mode violation)
    this.cartTable = page.locator('.cart-info.product-list');
  }

  // Verifies the cart page is loaded
  async expectLoaded() {
    await expect(this.cartTitle).toBeVisible();
    await expect(this.cartTable).toBeVisible();
  }

  // Verifies a product link with partial name is visible in the cart
  async expectProductVisible(namePart) {
    const productLink = this.page.getByRole('link', { name: new RegExp(namePart, 'i') });
    await expect(productLink).toBeVisible();
  }

  // Verifies quantity is "1" for the row that contains the product name
  async expectQtyIsOneForProductRow(namePart) {
    // Find the row that contains the product text
    const row = this.cartTable.locator('tr').filter({ hasText: namePart });

    // Quantity input is usually in the same row
    const qtyInput = row.locator('input[type="text"], input[type="number"]').first();

    await expect(qtyInput).toHaveValue('1');
  }

  // Clicks the checkout button to start the checkout flow
  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}
