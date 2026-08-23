(async () => {
  const url = 'https://playwright.dev/docs/getting-started-mcp?utm_source=chatgpt.com';
  let chromiumModule;
  try {
    chromiumModule = require('playwright').chromium;
  } catch (e) {
    try {
      chromiumModule = require('@playwright/test').chromium;
    } catch (e2) {
      console.error('Playwright is not installed. Please run npm i playwright or ensure @playwright/test is installed.');
      process.exit(2);
    }
  }

  try {
    const browser = await chromiumModule.launch({ channel: 'chrome', headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(url);
    console.log('Opened URL in Chrome:', url);
    // keep process alive so browser stays open
    process.stdin.resume();
  } catch (err) {
    console.error('Failed to launch Chrome via Playwright:', err);
    process.exit(1);
  }
})();
