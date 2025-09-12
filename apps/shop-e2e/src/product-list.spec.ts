import { test, expect } from '@playwright/test';

test.describe('Product List Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display product grid with products', async ({ page }) => {
    // Check if products are displayed
    await expect(
      page.locator('[data-testid="product-card"]').first()
    ).toBeVisible();

    // Check if multiple products are shown
    const productCount = await page
      .locator('[data-testid="product-card"]')
      .count();
    expect(productCount).toBeGreaterThan(0);
  });

  test('should show product information correctly', async ({ page }) => {
    const firstProduct = page.locator('[data-testid="product-card"]').first();

    // Check product name is displayed
    await expect(firstProduct.locator('h3')).toBeVisible();

    // Check product price is displayed
    await expect(
      firstProduct.locator('[data-testid="product-price"]')
    ).toBeVisible();

    // Check product image is displayed
    await expect(firstProduct.locator('img')).toBeVisible();

    // Check product description is displayed
    await expect(
      firstProduct.locator('[data-testid="product-description"]')
    ).toBeVisible();
  });

  test('should filter products by "All Products"', async ({ page }) => {
    // Click All Products filter
    await page.locator('[data-testid="filter-all-products"]').click();

    // Verify products are still visible
    await expect(
      page.locator('[data-testid="product-card"]').first()
    ).toBeVisible();

    // Verify All Products button is active (primary variant)
    const allProductsButton = page.locator(
      '[data-testid="filter-all-products"] button'
    );
    await expect(allProductsButton).toHaveClass(/bg-blue-600/);
  });

  test('should filter products by "Featured"', async ({ page }) => {
    // Click Featured filter
    await page.locator('[data-testid="filter-featured"]').click();

    // Wait for products to load
    await page.waitForLoadState('domcontentloaded');

    // Verify Featured button is active
    const featuredButton = page.locator(
      '[data-testid="filter-featured"] button'
    );
    await expect(featuredButton).toHaveClass(/bg-blue-600/);

    // Verify products are displayed (should show featured products)
    await expect(
      page.locator('[data-testid="product-card"]').first()
    ).toBeVisible();
  });

  test('should filter products by "New Arrivals"', async ({ page }) => {
    // Click New Arrivals filter
    await page.locator('[data-testid="filter-new-arrivals"]').click();

    // Wait for products to load
    await page.waitForLoadState('domcontentloaded');

    // Verify New Arrivals button is active
    const newArrivalsButton = page.locator(
      '[data-testid="filter-new-arrivals"] button'
    );
    await expect(newArrivalsButton).toHaveClass(/bg-blue-600/);
  });

  test('should filter products by "On Sale"', async ({ page }) => {
    // Click On Sale filter
    await page.locator('[data-testid="filter-on-sale"]').click();

    // Wait for products to load
    await page.waitForLoadState('domcontentloaded');

    // Verify On Sale button is active
    const onSaleButton = page.locator('[data-testid="filter-on-sale"] button');
    await expect(onSaleButton).toHaveClass(/bg-blue-600/);
  });

  test('should display product badges correctly', async ({ page }) => {
    // Look for products with badges
    const productWithNewBadge = page
      .locator('[data-testid="product-card"]')
      .locator('ui-badge')
      .filter({ hasText: 'New' });
    const productWithDiscountBadge = page
      .locator('[data-testid="product-card"]')
      .locator('ui-badge')
      .filter({ hasText: /^-\d+%$/ });

    // Check if New badge exists and is visible (if product has it)
    const newBadgeCount = await productWithNewBadge.count();
    if (newBadgeCount > 0) {
      await expect(productWithNewBadge.first()).toBeVisible();
    }

    // Check if discount badge exists and is visible (if product has it)
    const discountBadgeCount = await productWithDiscountBadge.count();
    if (discountBadgeCount > 0) {
      await expect(productWithDiscountBadge.first()).toBeVisible();
    }
  });

  test('should navigate to product detail on card click', async ({ page }) => {
    // Click on the first product card
    await page.locator('[data-testid="product-card"]').first().click();

    // Verify navigation to product detail page
    await expect(page).toHaveURL(/\/product\/.+/);
  });

  test('should handle empty product state', async ({ page }) => {
    // This test would be relevant if we had a way to simulate empty state
    // For now, we'll check that the empty state message structure exists
    const emptyStateSelector = 'text="No products found"';

    // Switch to a filter that might have no results
    await page.locator('[data-testid="filter-on-sale"]').click();
    await page.waitForLoadState('domcontentloaded');

    // If no products, should show empty state
    const productCount = await page
      .locator('[data-testid="product-card"]')
      .count();
    if (productCount === 0) {
      await expect(page.locator(emptyStateSelector)).toBeVisible();
    }
  });
});
