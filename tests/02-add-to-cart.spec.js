// tests/02-add-to-cart.spec.js
// Importing necessary modules and test data
import { test } from '../fixtures/appFixture.js';
import { products } from '../test-data/products.js';

// Test suite for cart - adding products to cart
test.describe('Cart - Add to cart', () => {
  test.beforeEach(async ({ app }) => {
    await app.home.goto();
  });
// Test case: Search for a product, add to cart, and validate cart contents
  test('search + open product + add + validate cart', async ({ app }) => {
    const { fullName, namePart } = products.fruitTshirts;
// Test step executes product search
    await test.step('Search product', async () => {
      await app.home.search(fullName);
    });
// Test step opens product from search results
    await test.step('Open product from results', async () => {
      await app.results.expectResultContains(namePart);
      await app.results.openProductByName(namePart);
    });
 // Test step adds product to cart
    await test.step('Add product to cart', async () => {
      await app.product.addToCart();
    });
  // Test step validates cart contents
    await test.step('Validate cart contains product', async () => {
      await app.cart.expectLoaded();
      await app.cart.expectProductVisible(namePart);
      await app.cart.expectQtyIsOneForProductRow(namePart);
    });
  });
});
