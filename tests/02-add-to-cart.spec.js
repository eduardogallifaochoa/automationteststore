import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { SearchResultsPage } from '../pages/SearchResultsPage.js';
import { ProductPage } from '../pages/ProductPage.js';
import { CartPage } from '../pages/CartPage.js';
import { products } from '../test-data/products.js';

// Test suite for adding products to cart
test.describe('Cart - Add to cart', () => {
  test.beforeEach(async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
  });
  // Test case: Search for a product, open it, add to cart, and validate cart contents
  test('search + open product + add + validate cart', async ({ page }) => {
    const home = new HomePage(page);
    const results = new SearchResultsPage(page);
    const product = new ProductPage(page);
    const cart = new CartPage(page);
    const { fullName, namePart } = products.fruitTshirts;

    // Use the local helper function to perform the add to cart flow
    await test.step('Search product', async () => {
      await home.search(fullName);
    });

    // Open product from results
    await test.step('Open product from results', async () => {
      await results.expectResultContains(namePart);
      await results.openProductByName(namePart);
    });

    // Add product to cart
    await test.step('Add product to cart', async () => {
      await product.addToCart();
    });

    // Validate cart contents
    await test.step('Validate cart contains product', async () => {
      await cart.expectLoaded();
      await cart.expectProductVisible(namePart);
      await cart.expectQtyIsOneForProductRow(namePart);
    });
  });
});
