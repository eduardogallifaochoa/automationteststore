// pages/ProductPage.js
// Page Object Model for the Product Page

export class ProductPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.addToCartLink = page.locator('a.cart', { hasText: 'Add to Cart' });
    this.shoppingCartHeading = page.getByText('Shopping Cart');
  }

  async addToCart() {
    await this.addToCartLink.first().click();
    // Usually redirects to cart; wait for cart heading
    await this.shoppingCartHeading.waitFor({ state: 'visible' });
  }
}
