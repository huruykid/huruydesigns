import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const errors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  try {
    console.log('Navigating to contact page...');
    await page.goto('https://huruydesigns.lovable.app/contact');

    // 1. Verify form renders
    const nameInput = await page.locator('input[name="name"]');
    const emailInput = await page.locator('input[name="email"]');
    const messageInput = await page.locator('textarea[name="message"]');
    const submitBtn = await page.locator('button[type="submit"]');

    if (await nameInput.isVisible() && await emailInput.isVisible() && await messageInput.isVisible() && await submitBtn.isVisible()) {
      console.log('PASS: Form renders correctly');
    } else {
      console.log('FAIL: Form does not render correctly');
    }

    // 2. Fields are interactive
    await nameInput.fill('Test User');
    await emailInput.fill('test@example.com');
    await messageInput.fill('Hello, this is a test message.');
    
    if (await nameInput.inputValue() === 'Test User' && 
        await emailInput.inputValue() === 'test@example.com' && 
        await messageInput.inputValue() === 'Hello, this is a test message.') {
      console.log('PASS: Fields are interactive');
    } else {
      console.log('FAIL: Fields are not interactive');
    }

    // 3. Submit button works (shows expected behavior)
    // The behavior is window.location.href = mailto...
    // We can't easily check mailto in playwright but we can check if it tries to navigate or if the form resets
    
    // Listen for navigation or location change
    // Since it's mailto, it might not "navigate" in the traditional sense.
    // But the code says form.reset() after setting window.location.href
    
    await submitBtn.click();
    
    // Wait for a bit to see if toast appears or form resets
    await page.waitForTimeout(1000);
    
    const resetName = await nameInput.inputValue();
    if (resetName === '') {
      console.log('PASS: Form resets after submission (expected behavior)');
    } else {
      console.log('FAIL: Form did not reset after submission');
    }

    // 4. No console errors
    if (errors.length === 0) {
      console.log('PASS: No console errors');
    } else {
      console.log('FAIL: Console errors found: ' + errors.join(', '));
    }

  } catch (err) {
    console.error('An error occurred during testing:', err);
  } finally {
    await browser.close();
  }
})();
