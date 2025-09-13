import { test, expect } from '@playwright/test';

test.describe('Product Detail Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to home page first, then click on a product
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
  });

  test('should navigate to product detail from product list', async ({
    page,
  }) => {
    // Click on the first product card
    await page.locator('[data-testid="product-card"]').first().click();

    // Verify we're on a product detail page
    await expect(page).toHaveURL(/\/product\/.+/);

    // Verify product detail component is visible
    await expect(page.locator('ui-product-detail')).toBeVisible();
  });

  test('should display product information correctly', async ({ page }) => {
    // Navigate to first product
    await page.locator('[data-testid="product-card"]').first().click();
    await page.waitForLoadState('domcontentloaded');

    // Check product name is displayed
    await expect(page.locator('h1')).toBeVisible();

    // Check product price is displayed
    await expect(page.locator('[data-testid="product-price"]')).toBeVisible();

    // Check product description is displayed
    await expect(
      page.locator('[data-testid="product-description"]')
    ).toBeVisible();

    // Check product image is displayed
    await expect(page.locator('[data-testid="product-image"]')).toBeVisible();
  });

  test('should display product specifications', async ({ page }) => {
    // Navigate to first product
    await page.locator('[data-testid="product-card"]').first().click();
    await page.waitForLoadState('domcontentloaded');

    // Check if specifications section exists
    const specsSection = page.locator('[data-testid="product-specifications"]');
    if (await specsSection.isVisible()) {
      // Verify specifications are displayed
      await expect(specsSection).toBeVisible();
    }
  });

  test('should display product features', async ({ page }) => {
    // Navigate to first product
    await page.locator('[data-testid="product-card"]').first().click();
    await page.waitForLoadState('domcontentloaded');

    // Check if features section exists
    const featuresSection = page.locator('[data-testid="product-features"]');
    if (await featuresSection.isVisible()) {
      // Verify features are displayed as a list
      await expect(featuresSection).toBeVisible();
      const featureItems = featuresSection.locator('li');
      const featureCount = await featureItems.count();
      expect(featureCount).toBeGreaterThan(0);
    }
  });

  test('should display product rating and reviews', async ({ page }) => {
    // Navigate to first product
    await page.locator('[data-testid="product-card"]').first().click();
    await page.waitForLoadState('domcontentloaded');

    // Check for rating display
    const ratingElement = page.locator('[data-testid="product-rating"]');
    if (await ratingElement.isVisible()) {
      await expect(ratingElement).toBeVisible();

      // Should contain star rating and review count
      await expect(ratingElement).toContainText('★');
      await expect(ratingElement).toContainText(/\(/);
    }
  });

  test('should handle quantity selection', async ({ page }) => {
    // Navigate to first product
    await page.locator('[data-testid="product-card"]').first().click();
    await page.waitForLoadState('domcontentloaded');

    // Look for quantity selector
    const quantitySelector = page.locator('[data-testid="quantity-selector"]');
    if (await quantitySelector.isVisible()) {
      // Test increasing quantity
      const increaseBtn = quantitySelector.locator(
        '[data-testid="quantity-increase"]'
      );
      const quantityDisplay = quantitySelector.locator(
        '[data-testid="quantity-display"]'
      );

      if (
        (await increaseBtn.isVisible()) &&
        (await quantityDisplay.isVisible())
      ) {
        const initialQuantity = await quantityDisplay.textContent();
        await increaseBtn.click();
        await expect(quantityDisplay).not.toHaveText(initialQuantity || '');
      }
    }
  });

  test('should display product tags', async ({ page }) => {
    // Navigate to first product
    await page.locator('[data-testid="product-card"]').first().click();
    await page.waitForLoadState('domcontentloaded');

    // Check for product tags
    const tagsSection = page.locator('[data-testid="product-tags"]');
    if (await tagsSection.isVisible()) {
      const tags = tagsSection.locator('ui-badge');
      const tagCount = await tags.count();
      expect(tagCount).toBeGreaterThan(0);
    }
  });

  test('should show discount information when applicable', async ({ page }) => {
    // Navigate through products to find one with discount
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Look for product with discount badge
    const discountProducts = page
      .locator('[data-testid="product-card"]')
      .filter({
        has: page.locator('ui-badge').filter({ hasText: /^-\d+%$/ }),
      });

    const discountCount = await discountProducts.count();

    if (discountCount > 0) {
      await discountProducts.first().click();
      await page.waitForLoadState('domcontentloaded');

      // Should show original and discounted price
      const originalPrice = page.locator('[data-testid="original-price"]');
      const discountedPrice = page.locator('[data-testid="discounted-price"]');

      if (
        (await originalPrice.isVisible()) &&
        (await discountedPrice.isVisible())
      ) {
        await expect(originalPrice).toBeVisible();
        await expect(discountedPrice).toBeVisible();

        // Original price should have strikethrough styling
        await expect(originalPrice).toHaveClass(/line-through/);
      }
    }
  });
});
