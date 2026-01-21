import { test } from '../fixtures/appFixture.js';
import { products } from '../test-data/products.js';
import { buildGuestData } from '../test-data/guestDataFactory.js';

test.describe('Checkout - Guest', () => {
  // Navigate to home page before each test
  test.beforeEach(async ({ app }) => {
    await app.home.goto();
  });
// Test case: Guest user can complete checkout process
  test('guest checkout (POM)', async ({ app }) => {
    const { fullName, namePart } = products.fruitTshirts;
    const guestData = buildGuestData();
// Search for product, add to cart, and proceed to checkout
    await test.step('Search product and add to cart', async () => {
      await app.home.search(fullName);
      await app.results.expectResultContains(namePart);
      await app.results.openProductByName(namePart);
      await app.product.addToCart();
    });
// Validate cart and proceed to checkout
    await test.step('Validate cart and proceed to checkout', async () => {
      await app.cart.expectLoaded();
      await app.cart.expectProductVisible(namePart);
      await app.cart.expectQtyIsOneForProductRow(namePart);
      await app.cart.proceedToCheckout();
    });
// Guest checkout process
    await test.step('Choose guest checkout and continue', async () => {
      await app.checkout.chooseGuestCheckout();
      await app.checkout.continue();
    });
// Fill in guest details and confirm order
    await test.step('Fill guest details and confirm order', async () => {
      await app.guest.fillGuestDetails(guestData);
      await app.guest.continue();
      await app.guest.confirmOrder();
    });
// Verify order success page
    await test.step('Verify success page', async () => {
      await app.success.expectLoaded();
    });
  });
});
