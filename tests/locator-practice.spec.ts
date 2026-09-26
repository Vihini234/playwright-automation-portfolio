import { test, expect } from '@playwright/test';

test('Google Search Locator', async ({ page }) => {

    await page.goto('https://www.google.com');

    const searchBox = page.getByRole('combobox', { name: 'Search' });

    await searchBox.fill('Playwright');

});