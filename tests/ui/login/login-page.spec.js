const { test, expect } = require('@playwright/test');

test.describe('Login page (unauthenticated)', () => {
  const base = process.env.BASE_URL || 'http://localhost:3000';

  test('has all expected fields without authorization', async ({ page }) => {
    await page.goto(`${base}/login`, { waitUntil: 'domcontentloaded' });

    // Basic form presence
    const forms = await page.locator('form').count();
    expect(forms).toBeGreaterThan(0);

    // Username / email field (accept several common selectors)
    const userSelector = 'input#username, input[name="username"], input[name="login"], input[type="email"], input[placeholder*="Email"], input[placeholder*="Username"]';
    expect(await page.locator(userSelector).count()).toBeGreaterThan(0);

    // Password field
    const passSelector = 'input#password, input[name="password"], input[type="password"], input[placeholder*="Password"]';
    expect(await page.locator(passSelector).count()).toBeGreaterThan(0);

    // Submit control
    const submitSelector = 'button[type="submit"], input[type="submit"], button:has-text("Log in"), button:has-text("Sign in"), button:has-text("Sign in"), button:has-text("Submit")';
    expect(await page.locator(submitSelector).count()).toBeGreaterThan(0);

    // Optional: remember-me checkbox or similar
    const rememberSelector = 'input[type="checkbox"][name*="remember"], input[type="checkbox"][id*="remember"], label:has-text("Remember")';
    // Not required to exist in all apps; if present, ensure it's visible
    if ((await page.locator(rememberSelector).count()) > 0) {
      expect(await page.locator(rememberSelector).first().isVisible()).toBeTruthy();
    }

    // Labels for accessibility
    const userLabel = 'label[for="username"], label:has-text("Email"), label:has-text("Username")';
    expect(await page.locator(userLabel).count()).toBeGreaterThan(0);

    const passLabel = 'label[for="password"], label:has-text("Password")';
    expect(await page.locator(passLabel).count()).toBeGreaterThan(0);
  });
});
