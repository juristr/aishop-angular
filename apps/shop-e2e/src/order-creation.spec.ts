import { test, expect } from '@playwright/test';

test.describe('Order Creation Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to create order page
    await page.goto('/orders/create');
    await page.waitForLoadState('domcontentloaded');
  });

  test('should display order creation form', async ({ page }) => {
    // Check page title
    await expect(page.locator('h2')).toContainText('Create New Order');

    // Check form is visible
    await expect(page.locator('form')).toBeVisible();

    // Check required form fields are present
    await expect(page.locator('input[name="customerName"]')).toBeVisible();
    await expect(page.locator('input[name="customerEmail"]')).toBeVisible();
    await expect(page.locator('input[name="street"]')).toBeVisible();
    await expect(page.locator('input[name="city"]')).toBeVisible();
    await expect(page.locator('input[name="state"]')).toBeVisible();
    await expect(page.locator('input[name="zipCode"]')).toBeVisible();
    await expect(page.locator('select[name="paymentMethod"]')).toBeVisible();
  });

  test('should have proper form labels', async ({ page }) => {
    // Check that all labels are properly associated with form controls
    await expect(page.locator('label[for="customerName"]')).toBeVisible();
    await expect(page.locator('label[for="customerEmail"]')).toBeVisible();
    await expect(page.locator('label[for="paymentMethod"]')).toBeVisible();
    await expect(page.locator('label[for="notes"]')).toBeVisible();
  });

  test('should fill and submit order form successfully', async ({ page }) => {
    // Fill customer information
    await page.locator('input[name="customerName"]').fill('John Doe');
    await page
      .locator('input[name="customerEmail"]')
      .fill('john.doe@example.com');

    // Fill shipping address
    await page.locator('input[name="street"]').fill('123 Main St');
    await page.locator('input[name="city"]').fill('New York');
    await page.locator('input[name="state"]').fill('NY');
    await page.locator('input[name="zipCode"]').fill('10001');

    // Select payment method
    await page
      .locator('select[name="paymentMethod"]')
      .selectOption('credit_card');

    // Add optional notes
    await page
      .locator('textarea[name="notes"]')
      .fill('Please deliver during business hours');

    // Submit form
    await page.locator('ui-button[type="submit"]').click();

    // Wait for order creation
    await page.waitForLoadState('domcontentloaded');

    // Check for success message or redirect
    await expect(
      page.locator('text="Order Created Successfully!"')
    ).toBeVisible({ timeout: 10000 });
  });

  test('should display order summary after creation', async ({ page }) => {
    // Fill and submit form
    await page.locator('input[name="customerName"]').fill('Jane Smith');
    await page
      .locator('input[name="customerEmail"]')
      .fill('jane.smith@example.com');
    await page.locator('input[name="street"]').fill('456 Oak Ave');
    await page.locator('input[name="city"]').fill('Los Angeles');
    await page.locator('input[name="state"]').fill('CA');
    await page.locator('input[name="zipCode"]').fill('90210');
    await page.locator('select[name="paymentMethod"]').selectOption('paypal');

    await page.locator('ui-button[type="submit"]').click();
    await page.waitForLoadState('domcontentloaded');

    // Check for order details display
    await expect(page.locator('ui-order-detail')).toBeVisible();
    await expect(
      page.locator('text="Order Created Successfully!"')
    ).toBeVisible();
  });

  test('should handle email field validation', async ({ page }) => {
    // Fill invalid email
    await page.locator('input[name="customerEmail"]').fill('invalid-email');

    // Try to submit or move to next field
    await page.locator('input[name="street"]').click();

    // Email field should show validation error
    const emailInput = page.locator('input[name="customerEmail"]');
    const validityState = await emailInput.evaluate(
      (el: HTMLInputElement) => el.validity.valid
    );
    expect(validityState).toBe(false);
  });

  test('should handle cancel action', async ({ page }) => {
    // Click cancel button
    await page.locator('ui-button').filter({ hasText: 'Cancel' }).click();

    // Should navigate back to orders page
    await expect(page).toHaveURL('/orders');
  });

  test('should handle form reset on cancel', async ({ page }) => {
    // Fill some form fields
    await page.locator('input[name="customerName"]').fill('Test User');
    await page.locator('input[name="customerEmail"]').fill('test@example.com');

    // Cancel and return
    await page.locator('ui-button').filter({ hasText: 'Cancel' }).click();
    await expect(page).toHaveURL('/orders');

    // Go back to create order page
    await page.goto('/orders/create');

    // Fields should be empty
    await expect(page.locator('input[name="customerName"]')).toHaveValue('');
    await expect(page.locator('input[name="customerEmail"]')).toHaveValue('');
  });

  test('should auto-redirect after successful order creation', async ({
    page,
  }) => {
    // Fill and submit form
    await page.locator('input[name="customerName"]').fill('Auto Redirect User');
    await page
      .locator('input[name="customerEmail"]')
      .fill('redirect@example.com');
    await page.locator('input[name="street"]').fill('789 Elm St');
    await page.locator('input[name="city"]').fill('Chicago');
    await page.locator('input[name="state"]').fill('IL');
    await page.locator('input[name="zipCode"]').fill('60601');
    await page
      .locator('select[name="paymentMethod"]')
      .selectOption('bank_transfer');

    await page.locator('ui-button[type="submit"]').click();

    // Wait for the auto-redirect (should happen after 2 seconds)
    await expect(page).toHaveURL('/orders', { timeout: 5000 });
  });

  test('should preserve form data while filling', async ({ page }) => {
    // Fill form fields
    const customerName = 'Preservation Test';
    const customerEmail = 'preservation@example.com';

    await page.locator('input[name="customerName"]').fill(customerName);
    await page.locator('input[name="customerEmail"]').fill(customerEmail);

    // Move focus and verify data is preserved
    await page.locator('input[name="street"]').click();

    await expect(page.locator('input[name="customerName"]')).toHaveValue(
      customerName
    );
    await expect(page.locator('input[name="customerEmail"]')).toHaveValue(
      customerEmail
    );
  });

  test('should handle special characters in form fields', async ({ page }) => {
    // Test with special characters
    const specialName = "O'Connor-Smith";
    const specialAddress = '123 St. François Ave, Apt #2B';

    await page.locator('input[name="customerName"]').fill(specialName);
    await page.locator('input[name="street"]').fill(specialAddress);

    // Verify values are preserved correctly
    await expect(page.locator('input[name="customerName"]')).toHaveValue(
      specialName
    );
    await expect(page.locator('input[name="street"]')).toHaveValue(
      specialAddress
    );
  });

  test('should have responsive form layout', async ({ page }) => {
    // Check that form is properly laid out
    const form = page.locator('form');
    await expect(form).toBeVisible();

    // Check grid layout for customer info
    const customerInfoGrid = page.locator('.grid-cols-1.md\\:grid-cols-2');
    await expect(customerInfoGrid).toBeVisible();

    // Check form spacing classes
    const spaceYElements = page.locator('.space-y-4');
    await expect(spaceYElements.first()).toBeVisible();
  });

  test('should display sample product in order', async ({ page }) => {
    // Check that order includes sample product information
    // This is based on the mock data in the component
    await page.locator('input[name="customerName"]').fill('Sample Order');
    await page
      .locator('input[name="customerEmail"]')
      .fill('sample@example.com');
    await page.locator('input[name="street"]').fill('123 Sample St');
    await page.locator('input[name="city"]').fill('Sample City');
    await page.locator('input[name="state"]').fill('SC');
    await page.locator('input[name="zipCode"]').fill('12345');

    await page.locator('ui-button[type="submit"]').click();
    await page.waitForLoadState('domcontentloaded');

    // After order creation, should show order details with sample product
    await expect(page.locator('ui-order-detail')).toBeVisible();
  });
});
