import { test, expect } from '@playwright/test';

test('EBT Finder project page renders correctly', async ({ page }) => {
  // Go to the EBT Finder project page
  await page.goto('https://huruydesigns.lovable.app/project/ebtfinder');

  // 1. Verify case study sections render
  await expect(page.locator('h1')).toContainText('EBT Finder');
  await expect(page.locator('h2')).toContainText('Problem & Context');
  await expect(page.locator('h2')).toContainText('The opportunity I saw');

  // 2. Verify interactive demos work
  // Check if EBTSearchDemo is rendered (it's inside ResponsiveAppShell)
  const appShell = page.locator('div:has-text("VIEW DETAILS")').first();
  await expect(appShell).toBeVisible();

  // Interact with EBTSearchDemo
  const viewDetailsButton = page.locator('button:has-text("VIEW DETAILS")').first();
  await viewDetailsButton.click();
  await expect(page.locator('button:has-text("✓ ACCEPTS EBT")')).toBeVisible();
  
  // Go back
  await page.locator('button:has-child(svg[class*="chevron-left"])').click();
  await expect(page.locator('button:has-text("VIEW DETAILS")')).toBeVisible();

  // 3. Verify images load
  const images = page.locator('img');
  const count = await images.count();
  for (let i = 0; i < count; i++) {
    const img = images.nth(i);
    await expect(img).toBeVisible();
    const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
    expect(naturalWidth).toBeGreaterThan(0);
  }

  // 4. Check for console errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      throw new Error(`Console error: ${msg.text()}`);
    }
  });
});
