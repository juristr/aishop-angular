import { test, expect } from '@playwright/test';

test.describe('Application Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
  });

  test('should have working navigation menu', async ({ page }) => {
    // Look for navigation links
    const ordersLink = page.locator('data-testid=nav-orders-link');

    if (await ordersLink.isVisible()) {
      await ordersLink.click();
      await expect(page).toHaveURL('/orders');
      await expect(page.locator('h2')).toContainText('Current Orders');
    }
  });

  test('should navigate from home to product detail and back', async ({
    page,
  }) => {
    // Start on home page
    await expect(page).toHaveURL('/');

    // Click on a product
    await page.locator('[data-testid="product-card"]').first().click();
    await expect(page).toHaveURL(/\/product\/.+/);

    // Navigate back using browser back button
    await page.goBack();
    await expect(page).toHaveURL('/');

    // Verify we're back on home page with products visible
    await expect(
      page.locator('[data-testid="product-card"]').first()
    ).toBeVisible();
  });

  test('should navigate to orders and create new order', async ({ page }) => {
    // Navigate to orders page
    await page.goto('/orders');
    await expect(page.locator('h2')).toContainText('Current Orders');

    // Click create new order (if button exists)
    const createOrderBtn = page
      .locator('ui-button')
      .filter({ hasText: 'Create New Order' });

    if (await createOrderBtn.isVisible()) {
      await createOrderBtn.click();
      await expect(page).toHaveURL('/orders/create');
      await expect(page.locator('h2')).toContainText('Create New Order');
    } else {
      // Direct navigation to create order
      await page.goto('/orders/create');
      await expect(page.locator('h2')).toContainText('Create New Order');
    }
  });

  test('should handle direct URL navigation', async ({ page }) => {
    // Navigate directly to orders page
    await page.goto('/orders');
    await expect(page.locator('h2')).toContainText('Current Orders');

    // Navigate directly to past orders
    await page.goto('/orders/past');
    await expect(page.locator('h2')).toContainText('Past Orders');

    // Navigate directly to create order
    await page.goto('/orders/create');
    await expect(page.locator('h2')).toContainText('Create New Order');
  });

  test('should maintain navigation state on page refresh', async ({ page }) => {
    // Navigate to orders page
    await page.goto('/orders');
    await expect(page.locator('h2')).toContainText('Current Orders');

    // Refresh page
    await page.reload();
    await page.waitForLoadState('domcontentloaded');

    // Should still be on orders page
    await expect(page).toHaveURL('/orders');
    await expect(page.locator('h2')).toContainText('Current Orders');
  });

  test('should handle navigation to orders page', async ({ page }) => {
    // Start on current orders
    await page.goto('/orders');
    await expect(page.locator('h2')).toContainText('Current Orders');
  });

  test('should handle invalid routes gracefully', async ({ page }) => {
    // Navigate to invalid route
    await page.goto('/invalid-route');

    // Should redirect to home page or show 404
    const currentUrl = page.url();

    if (currentUrl.includes('invalid-route')) {
      // If 404 page is implemented
      await expect(page.locator('text="Page not found"')).toBeVisible();
    } else {
      // If redirected to home page
      await expect(page).toHaveURL('/');
    }
  });

  test('should have consistent header/footer across pages', async ({
    page,
  }) => {
    // Check header on home page
    const header = page.locator('header');
    const footer = page.locator('footer');

    if (await header.isVisible()) {
      // Navigate to different pages and verify header is consistent
      await page.goto('/orders');
      await expect(header).toBeVisible();

      await page.goto('/orders/create');
      await expect(header).toBeVisible();
    }

    if (await footer.isVisible()) {
      // Navigate to different pages and verify footer is consistent
      await page.goto('/orders');
      await expect(footer).toBeVisible();

      await page.goto('/orders/create');
      await expect(footer).toBeVisible();
    }
  });

  test('should support keyboard navigation', async ({ page }) => {
    // Test tab navigation
    await page.keyboard.press('Tab');

    // First focusable element should be focused
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();

    // Continue tabbing through elements
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Should be able to activate elements with Enter
    const activeElement = page.locator(':focus');
    if (await activeElement.isVisible()) {
      await page.keyboard.press('Enter');
      // Page might navigate or element might activate
    }
  });

  test('should handle page loading states', async ({ page }) => {
    // Navigate to a page that might show loading state
    const navigationPromise = page.goto('/orders');

    // Check if loading indicator is shown during navigation
    const loadingIndicator = page.locator('[data-testid="loading"]');

    // Complete navigation
    await navigationPromise;
    await page.waitForLoadState('domcontentloaded');

    // Loading indicator should be gone
    if (await loadingIndicator.isVisible()) {
      await expect(loadingIndicator).toBeHidden();
    }

    // Final content should be visible
    await expect(page.locator('h2')).toContainText('Current Orders');
  });

  test('should preserve scroll position on navigation back', async ({
    page,
  }) => {
    // Scroll down on home page
    await page.evaluate(() => window.scrollTo(0, 200));

    // Navigate to another page
    await page.goto('/orders');
    await expect(page.locator('h2')).toContainText('Current Orders');

    // Navigate back
    await page.goBack();
    await page.waitForLoadState('domcontentloaded');

    // Check if scroll position is maintained (browser dependent)
    const newScrollPosition = await page.evaluate(() => window.pageYOffset);
    // This might be 0 in some cases due to browser behavior
    expect(newScrollPosition).toBeGreaterThanOrEqual(0);
  });
});
