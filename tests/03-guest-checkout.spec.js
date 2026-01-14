// tests/03-guest-checkout.spec.js

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

  await home.goto();
  await home.search(fullName);

  await results.expectResultContains(namePart);
  await results.openProductByName(namePart);

  await product.addToCart();

  await cart.expectLoaded();
  await cart.expectProductVisible(namePart);
  await cart.expectQtyIsOneForProductRow(namePart);

  await cart.proceedToCheckout();

  await checkout.chooseGuestCheckout();
  await checkout.continue();

  await guest.fillGuestDetails(guestData);
  await guest.continue();
  await guest.confirmOrder();

  await success.expectLoaded();
});
