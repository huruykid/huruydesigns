import { test, expect } from '@playwright/test';

test('chatbot works as expected', async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  await page.goto('https://huruydesigns.lovable.app');

  // Check if chatbot button is visible
  const chatButton = page.locator('button[aria-label="Open chat"]');
  await expect(chatButton).toBeVisible();

  // Open chatbot
  await chatButton.click();
  
  // Verify chatbot panel is open
  const chatPanel = page.locator('text=Ask Huruy\'s AI');
  await expect(chatPanel).toBeVisible();

  // Send a message
  const input = page.locator('input[placeholder="Ask about Huruy\'s work..."]');
  await input.fill("What are Huruy's top skills?");
  await page.keyboard.press('Enter');

  // Verify user message appears
  await expect(page.locator('text=What are Huruy\'s top skills?')).toBeVisible();

  // Verify streaming response (incremental updates)
  const assistantMessage = page.locator('.prose-sm').last();
  await expect(assistantMessage).toBeVisible({ timeout: 15000 });
  
  // Wait for it to finish streaming (loading indicator disappears)
  await expect(page.locator('.animate-spin')).not.toBeVisible({ timeout: 20000 });
  
  const finalContent = await assistantMessage.innerHTML();
  console.log('Final Assistant response:', finalContent);
  
  // Verify markdown renders (e.g. bold text)
  expect(finalContent).toContain('<strong>'); // ReactMarkdown converts ** to <strong>

  // Close chatbot
  const closeButton = page.locator('button[aria-label="Close chat"]');
  await closeButton.click();
  await expect(chatPanel).not.toBeVisible();

  // Reopen chatbot
  await chatButton.click();
  await expect(chatPanel).toBeVisible();
  
  // Verify history is still there
  await expect(page.locator('text=What are Huruy\'s top skills?')).toBeVisible();

  // Check for console errors
  if (consoleErrors.length > 0) {
    console.error('Console errors found:', consoleErrors);
  }
  expect(consoleErrors).toHaveLength(0);
});
