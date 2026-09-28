import { test, expect } from '@playwright/test';

test('Add product to cart', async ({ page }) => {

  await page.goto('https://www.saucedemo.com/');

  // Login
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // Add product to cart
  await page.getByRole('button', { name: 'Add to cart' }).first().click();

  // Verify cart
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});