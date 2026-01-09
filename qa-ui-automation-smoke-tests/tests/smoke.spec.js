import { test, expect } from '@playwright/test';

test.describe('UI Smoke Suite - the-internet.herokuapp.com', () => {
  test('Login - happy path', async ({ page }) => {
    await page.goto('/login');
    await page.locator('#username').fill('tomsmith');
    await page.locator('#password').fill('SuperSecretPassword!');
    await page.locator('button[type="submit"]').click();

    await expect(page).toHaveURL(/.*\/secure/);
    await expect(page.locator('#flash')).toContainText('You logged into a secure area');
  });

  test('Login - invalid credentials shows error', async ({ page }) => {
    await page.goto('/login');
    await page.locator('#username').fill('wronguser');
    await page.locator('#password').fill('wrongpass');
    await page.locator('button[type="submit"]').click();

    await expect(page.locator('#flash')).toBeVisible();
    await expect(page.locator('#flash')).toContainText('Your username is invalid');
  });

  test('Add/Remove Elements - add then remove', async ({ page }) => {
    await page.goto('/add_remove_elements/');
    await page.getByRole('button', { name: 'Add Element' }).click();
    const deleteBtn = page.getByRole('button', { name: 'Delete' });
    await expect(deleteBtn).toBeVisible();

    await deleteBtn.click();
    await expect(deleteBtn).toHaveCount(0);
  });

  test('Checkboxes - can set a known state', async ({ page }) => {
    await page.goto('/checkboxes');
    const checkboxes = page.locator('input[type="checkbox"]');
    await expect(checkboxes).toHaveCount(2);

    await checkboxes.nth(0).check();
    await checkboxes.nth(1).uncheck();

    await expect(checkboxes.nth(0)).toBeChecked();
    await expect(checkboxes.nth(1)).not.toBeChecked();
  });

  test('Dropdown - select option 2', async ({ page }) => {
    await page.goto('/dropdown');
    const dropdown = page.locator('#dropdown');
    await dropdown.selectOption('2');
    await expect(dropdown).toHaveValue('2');
  });

    test('Broken images - at least one image request is not OK (deterministic)', async ({ page, request }) => {
    await page.goto('/broken_images');

    const srcs = await page.$$eval('img', imgs =>
      imgs.map(img => img.getAttribute('src')).filter(Boolean)
    );

    // Resolve relative URLs to absolute
    const urls = srcs.map(src => new URL(src, page.url()).toString());

    let nonOkCount = 0;

    for (const url of urls) {
      const resp = await request.get(url);
      if (!resp.ok()) nonOkCount += 1;
    }

    expect(nonOkCount).toBeGreaterThanOrEqual(1);
  });

});
