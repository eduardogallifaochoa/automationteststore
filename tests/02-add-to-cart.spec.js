import { test } from '@playwright/test';

import { HomePage } from '../pages/HomePage.js';
import { SearchResultsPage } from '../pages/SearchResultsPage.js';
import { ProductPage } from '../pages/ProductPage.js';
import { CartPage } from '../pages/CartPage.js';

import { products } from '../test-data/products.js';

test('add to cart - search + open product + add + validate cart', async ({ page }) => {
  // Create page object instances (each one wraps a part of the UI)
  const home = new HomePage(page);
  const results = new SearchResultsPage(page);
  const product = new ProductPage(page);
  const cart = new CartPage(page);

  // Test data (what we are buying)
  const { fullName, namePart } = products.fruitTshirts;

  // Step 1: Open the home page
  await home.goto();

  // Step 2: Search for the product
  await home.search(fullName);

  // Step 3: Validate that results contain the product and open it
  await results.expectResultContains(namePart);
  await results.openProductByName(namePart);

  // Step 4: Add to cart (this should redirect to the cart page)
  await product.addToCart();

  // Step 5: Cart assertions
  await cart.expectLoaded();
  await cart.expectProductVisible(namePart);
  await cart.expectQtyIsOneForProductRow(namePart);
});
