import { chromium } from '@playwright/test';

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

  console.log('Navigating to Beles project page...');
  try {
    await page.goto('https://huruydesigns.lovable.app/project/beles', { waitUntil: 'networkidle', timeout: 30000 });
  } catch (e) {
    console.error('Navigation failed:', e);
    await browser.close();
    process.exit(1);
  }

  // 1. Verify content renders
  const title = await page.textContent('h1');
  console.log('Title:', title);
  if (title?.includes('Beles')) {
    console.log('PASS: Beles title renders.');
  } else {
    console.log('FAIL: Beles title not found.');
  }

  // 2. Verify BelesMatchDemo interaction
  // Look for the "Say Kemey" button which is unique to BelesMatchDemo
  const sayKemeyBtn = page.locator('button:has-text("Say Kemey")');
  if (await sayKemeyBtn.count() > 0) {
    console.log('BelesMatchDemo found. Interacting...');
    await sayKemeyBtn.first().click();
    await page.waitForTimeout(500);
    const successMsg = await page.textContent('body');
    if (successMsg?.includes('Kemey sent!')) {
      console.log('PASS: BelesMatchDemo "Say Kemey" interaction works.');
    } else {
      console.log('FAIL: BelesMatchDemo interaction did not show success message.');
    }
    
    const keepSwipingBtn = page.locator('button:has-text("Keep Swiping")');
    if (await keepSwipingBtn.count() > 0) {
        await keepSwipingBtn.first().click();
        await page.waitForTimeout(500);
        const matchText = await page.textContent('body');
        if (matchText?.includes("It's a match!")) {
            console.log('PASS: BelesMatchDemo "Keep Swiping" interaction works.');
        } else {
            console.log('FAIL: BelesMatchDemo "Keep Swiping" did not reset to match state.');
        }
    }
  } else {
    console.log('FAIL: BelesMatchDemo "Say Kemey" button not found.');
  }

  // 3. Verify JustFriendsToggle interaction
  const justFriendsBtn = page.locator('button:has-text("Just Friends")');
  if (await justFriendsBtn.count() > 0) {
    console.log('JustFriendsToggle found. Interacting...');
    await justFriendsBtn.first().click();
    await page.waitForTimeout(500);
    const friendsContent = await page.textContent('body');
    if (friendsContent?.includes('Yohannes, 24')) {
      console.log('PASS: JustFriendsToggle "Just Friends" mode works.');
    } else {
      console.log('FAIL: JustFriendsToggle did not show friends content.');
    }
    
    const datingBtn = page.locator('button:has-text("Dating")');
    await datingBtn.first().click();
    await page.waitForTimeout(500);
    const datingContent = await page.textContent('body');
    if (datingContent?.includes('Makda, 28')) {
      console.log('PASS: JustFriendsToggle "Dating" mode works.');
    } else {
      console.log('FAIL: JustFriendsToggle did not switch back to dating content.');
    }
  } else {
    console.log('FAIL: JustFriendsToggle not found.');
  }

  // 4. Verify images load
  const images = await page.locator('img').all();
  let brokenImages = 0;
  for (const img of images) {
    const isVisible = await img.isVisible();
    if (isVisible) {
      const naturalWidth = await img.evaluate((node: HTMLImageElement) => node.naturalWidth);
      if (naturalWidth === 0) {
        const src = await img.getAttribute('src');
        console.log('Broken image found:', src);
        brokenImages++;
      }
    }
  }
  if (brokenImages === 0) {
    console.log('PASS: All visible images loaded.');
  } else {
    console.log(`FAIL: ${brokenImages} broken images found.`);
  }

  // 5. Console errors
  if (consoleErrors.length === 0) {
    console.log('PASS: No console errors.');
  } else {
    console.log('FAIL: Console errors detected:', consoleErrors);
  }

  await browser.close();
})();
