import { expect } from '@playwright/test';
import { config } from '../test-data/config.js';

export class HomePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        // Top navigation link that opens the login/register page
        this.loginOrRegisterLink = page.getByRole('link', { name: 'Login or register' });

        // Search UI (header)
        this.searchInput = page.getByRole('textbox', { name: 'Search Keywords' });
        this.searchButton = page.locator('.fa.fa-search');
    }

    // Navigates to the home page
    async goto() {
        await this.page.goto(config.baseUrl);
        await expect(this.page).toHaveURL(/automationteststore\.com\/?$/);
    }

    // Opens the login/register page from the top nav
    async openLogin() {
        await this.loginOrRegisterLink.click();
    }

    // Searches for a keyword using the header search input
    async search(keyword) {
        await this.searchInput.click();
        await this.searchInput.fill(keyword);
        await this.searchButton.click();
    }
}
