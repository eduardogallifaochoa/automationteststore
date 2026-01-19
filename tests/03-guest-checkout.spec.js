import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { SearchResultsPage } from '../pages/SearchResultsPage.js';
import { ProductPage } from '../pages/ProductPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';
import { GuestCheckoutPage } from '../pages/GuestCheckoutPage.js';
import { CheckoutSuccessPage } from '../pages/CheckoutSuccessPage.js';
import { products } from '../test-data/products.js';
import { buildGuestData } from '../test-data/guestDataFactory.js';

// Test suite for guest checkout process
test.describe('Checkout - Guest', () => {
  test.beforeEach(async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
  });
  // Test case: Guest user can search, add to cart, and complete checkout
  test('guest checkout (POM)', async ({ page }) => {
    const home = new HomePage(page);
    const results = new SearchResultsPage(page);
    const product = new ProductPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);
    const guest = new GuestCheckoutPage(page);
    const success = new CheckoutSuccessPage(page);
    const { fullName, namePart } = products.fruitTshirts;
    const guestData = buildGuestData();

    // Search, add to cart, and proceed to checkout
    await test.step('Search product and add to cart', async () => {
      await home.search(fullName);
      await results.expectResultContains(namePart);
      await results.openProductByName(namePart);
      await product.addToCart();
    });

    // Validate cart and proceed to checkout
    await test.step('Validate cart and proceed to checkout', async () => {
      await cart.expectLoaded();
      await cart.expectProductVisible(namePart);
      await cart.expectQtyIsOneForProductRow(namePart);
      await cart.proceedToCheckout();
    });

    // Complete guest checkout flow
    await test.step('Choose guest checkout and continue', async () => {
      await checkout.chooseGuestCheckout();
      await checkout.continue();
    });

    // Fill guest details and confirm order
    await test.step('Fill guest details and confirm order', async () => {
      await guest.fillGuestDetails(guestData);
      await guest.continue();
      await guest.confirmOrder();
    });

    // Verify success page
    await test.step('Verify success page', async () => {
      await success.expectLoaded();
    });
  });
});
