import { test, expect, chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const consoleErrors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  const failedRequests: string[] = [];
  page.on('requestfailed', request => {
    failedRequests.push(`${request.url()}: ${request.failure()?.errorText}`);
  });

  console.log('Navigating to About page...');
  await page.goto('https://huruydesigns.lovable.app/about', { waitUntil: 'networkidle' });

  // 1. Verify content renders
  const mainHeading = await page.textContent('h1');
  console.log('Main Heading:', mainHeading);
  if (mainHeading?.includes('Huruy Kidanemariam')) {
    console.log('PASS: Content renders correctly.');
  } else {
    console.log('FAIL: Content does not render correctly.');
  }

  // 2. Verify headshot loads
  const headshot = await page.locator('img[alt*="Huruy Kidanemariam"]');
  const isVisible = await headshot.isVisible();
  const naturalWidth = await headshot.evaluate((img: HTMLImageElement) => img.naturalWidth);
  if (isVisible && naturalWidth > 0) {
    console.log('PASS: Headshot loaded.');
  } else {
    console.log('FAIL: Headshot failed to load.');
  }

  // 3. Smooth scrolling
  // Click the trivia link and check if scroll position changes smoothly (hard to verify "smooth" but we can check if it reaches the target)
  const triviaLink = page.locator('a[href$="#ux-trivia"]').first();
  await triviaLink.click();
  await page.waitForTimeout(1000); // Wait for scroll
  const scrollY = await page.evaluate(() => window.scrollY);
  console.log('Scroll Y after click:', scrollY);
  if (scrollY > 500) {
    console.log('PASS: Smooth scroll target reached (likely).');
  } else {
    console.log('FAIL: Smooth scroll target not reached.');
  }

  // 4. UX Trivia Card Flips
  // Let's find the cards. They probably have a specific class.
  const cards = await page.locator('#ux-trivia .perspective'); // Common class for flips or just look for cards
  // If not perspective, let's look for buttons or divs inside #ux-trivia
  const triviaCards = await page.locator('#ux-trivia [role="button"], #ux-trivia .cursor-pointer').all();
  console.log(`Found ${triviaCards.length} trivia cards.`);
  
  if (triviaCards.length > 0) {
    const card = triviaCards[0];
    const initialText = await card.innerText();
    await card.click();
    await page.waitForTimeout(500);
    const flippedText = await card.innerText();
    
    if (initialText !== flippedText) {
      console.log('PASS: Trivia card flipped (content changed).');
    } else {
      // Check for transform or class change if text didn't change (maybe it's a visual flip)
      const hasFlippedClass = await card.evaluate(el => el.classList.contains('flipped') || el.innerHTML.includes('rotateY'));
      if (hasFlippedClass) {
          console.log('PASS: Trivia card flipped (detected via class/style).');
      } else {
          console.log('FAIL: Trivia card did not flip.');
      }
    }
  } else {
    console.log('FAIL: No trivia cards found.');
  }

  // 5. Console errors
  if (consoleErrors.length === 0) {
    console.log('PASS: No console errors.');
  } else {
    console.log('FAIL: Console errors detected:', consoleErrors);
  }

  await browser.close();
})();
