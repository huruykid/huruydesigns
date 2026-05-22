import { test, expect } from '@playwright/test';

test('Asure Compliance Access Gate', async ({ page }) => {
  // Mock the Supabase function call
  await page.route('**/functions/v1/verify-passcode', async (route) => {
    const postData = route.request().postDataJSON();
    const passcode = postData.passcode?.trim().toLowerCase();
    
    if (passcode === 'ux') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ valid: true }),
      });
    } else {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ valid: false }),
      });
    }
  });

  await page.goto('http://localhost:8080/project/asure-compliance');
  
  // Verify passcode gate appears
  await expect(page.locator('input[placeholder="Enter passcode"]')).toBeVisible();
  
  // Verify entering wrong passcode shows error
  await page.fill('input[placeholder="Enter passcode"]', 'WRONG');
  await page.click('button:has-text("Unlock Case Study")');
  await expect(page.locator('text=Incorrect passcode. Please try again.')).toBeVisible();

  // Verify entering "UX" (uppercase) unlocks the study
  await page.fill('input[placeholder="Enter passcode"]', 'UX');
  await page.click('button:has-text("Unlock Case Study")');
  
  // Check for the dashboard demo which signifies unlocking
  await expect(page.locator('text=Tax Compliance Dashboard')).toBeVisible({ timeout: 10000 });
  
  // Verify case-insensitivity: reload and try "ux"
  await page.goto('http://localhost:8080/project/asure-compliance');
  // It might be cached in sessionStorage, so clear it
  await page.evaluate(() => sessionStorage.clear());
  await page.reload();
  
  await page.fill('input[placeholder="Enter passcode"]', 'ux');
  await page.click('button:has-text("Unlock Case Study")');
  await expect(page.locator('text=Tax Compliance Dashboard')).toBeVisible({ timeout: 10000 });
});
