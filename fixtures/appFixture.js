// ./fixtures/appFixture.js

import { test as base } from '@playwright/test';

import { HomePage } from '../pages/HomePage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { AccountPage } from '../pages/AccountPage.js';
import { SearchResultsPage } from '../pages/SearchResultsPage.js';
import { ProductPage } from '../pages/ProductPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';
import { GuestCheckoutPage } from '../pages/GuestCheckoutPage.js';
import { CheckoutSuccessPage } from '../pages/CheckoutSuccessPage.js';

// Extend base test and add our custom "app" fixture
export const test = base.extend({
  app: async ({ page }, use) => {
    const app = {
      page,
      home: new HomePage(page),
      login: new LoginPage(page),
      account: new AccountPage(page),
      results: new SearchResultsPage(page),
      product: new ProductPage(page),
      cart: new CartPage(page),
      checkout: new CheckoutPage(page),
      guest: new GuestCheckoutPage(page),
      success: new CheckoutSuccessPage(page),
    };

    await use(app);
  },
});

export { expect } from '@playwright/test';
