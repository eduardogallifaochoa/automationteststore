// tests/01-login.spec.js


// Importing necessary modules and test data
import { test } from '../fixtures/appFixture.js';
import { users } from '../test-data/users.js';


// Test suite for authentication - login functionality
test.describe('Auth - Login', () => {

  // Setup before each test in this suite
  test.beforeEach(async ({ app }) => {
    await app.home.goto();
  });
// Test case: Valid user can log in and access My Account
  test('valid user can access My Account', async ({ app }) => {

// Test steps opens login page
    await test.step('Open login/register page', async () => {
      await app.home.openLogin();
    });
// Submit login form with valid credentials
    await test.step('Submit valid credentials', async () => {
      await app.login.login(users.validUser.username, users.validUser.password);
    });
// Verify user is on My Account page
    await test.step('Verify user landed on My Account', async () => {
      await app.account.expectLoaded();
    });
  });
});
