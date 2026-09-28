import { test, expect } from '@playwright/test';

test.describe('Products Tests', () => {

  test.beforeEach(async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

  });

  test('Verify Products page', async ({ page }) => {

    await expect(page.getByText('Products')).toBeVisible();

  });

  test('Verify Sauce Labs Backpack', async ({ page }) => {

    await expect(
      page.getByText('Sauce Labs Backpack')
    ).toBeVisible();

  });

});