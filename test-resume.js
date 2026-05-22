import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  try {
    await page.goto('http://localhost:8080/resume');
    
    // Check if resume content is present
    const name = await page.textContent('h2');
    console.log('Name found:', name);

    // Check buttons
    const pdfButton = await page.$('a[download][href*=".pdf"]');
    console.log('PDF button exists:', !!pdfButton);

    const wordButton = await page.$('button:has-text("Word")');
    console.log('Word button exists:', !!wordButton);

    // Check sidebar layout
    const sidebar = await page.$('aside');
    const sidebarBox = await sidebar.boundingBox();
    console.log('Sidebar width:', sidebarBox.width);

    // Check chatbot print:hidden
    const chatBubble = await page.$('.print\\:hidden:has(svg)'); // Simplified check
    const chatBubbleClasses = await page.evaluate(() => {
      const el = document.querySelector('.fixed.bottom-6.right-6');
      return el ? el.className : 'NOT FOUND';
    });
    console.log('Chat bubble classes:', chatBubbleClasses);

    if (consoleErrors.length > 0) {
      console.error('Console errors detected:', consoleErrors);
    } else {
      console.log('No console errors detected.');
    }

  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await browser.close();
  }
})();
