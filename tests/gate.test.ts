import { test, expect } from '@playwright/test';

test('Asure Compliance Access Gate', async ({ page }) => {
  await page.goto('http://localhost:8080/project/asure-compliance');
  
  // Verify passcode gate appears
  await expect(page.locator('input[placeholder="Enter passcode"]')).toBeVisible();
  
  // Verify entering wrong passcode shows error
  await page.fill('input[placeholder="Enter passcode"]', 'WRONG');
  await page.click('button:has-text("Unlock Case Study")');
  await expect(page.locator('text=Incorrect passcode. Please try again.')).toBeVisible();

  // Verify entering "ux" (lowercase) unlocks the study
  await page.fill('input[placeholder="Enter passcode"]', 'ux');
  await page.click('button:has-text("Unlock Case Study")');
  
  // Check for the dashboard demo which signifies unlocking
  // The user mentioned TaxComplianceDashboardDemo
  // Let's check for some text inside that component
  await expect(page.locator('text=Tax Compliance Dashboard')).toBeVisible({ timeout: 10000 });
});
