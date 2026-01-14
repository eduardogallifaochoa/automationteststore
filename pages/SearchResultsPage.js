export class SearchResultsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.productDetails = page.locator('#product_details');
  }

  async expectResultContains(text) {
    await this.productDetails.getByText(text).first().waitFor({ state: 'visible' });
  }

  async openProductByName(namePart) {
    // Click on the product link in results by partial name
    await this.page.getByRole('link', { name: new RegExp(namePart, 'i') }).first().click();
  }
}
