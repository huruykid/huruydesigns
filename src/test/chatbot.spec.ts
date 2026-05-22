import { test, expect } from '@playwright/test';

test('chatbot works as expected', async ({ page }) => {
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
  // We can't easily "see" streaming in one go, but we can check if content appears and changes
  const assistantMessage = page.locator('.prose-sm').last();
  await expect(assistantMessage).toBeVisible({ timeout: 15000 });
  
  const initialText = await assistantMessage.textContent();
  // Wait a bit to see if it updates (streaming)
  await page.waitForTimeout(1000);
  const updatedText = await assistantMessage.textContent();
  
  // Note: Streaming might be fast, but usually we can catch a change if we're lucky or just verify it finishes
  console.log('Assistant response:', updatedText);
  expect(updatedText?.length).toBeGreaterThan(0);

  // Verify markdown rendering (e.g. check for bold text or list items if expected)
  // The assistant usually responds with markdown.
  // We can check if there are any HTML tags inside the prose container
  const hasHtml = await assistantMessage.evaluate(el => el.children.length > 0);
  expect(hasHtml).toBeTruthy();

  // Close chatbot
  const closeButton = page.locator('button[aria-label="Close chat"]');
  await closeButton.click();
  await expect(chatPanel).not.toBeVisible();

  // Reopen chatbot
  await chatButton.click();
  await expect(chatPanel).toBeVisible();
  
  // Verify history is still there
  await expect(page.locator('text=What are Huruy\'s top skills?')).toBeVisible();
});
