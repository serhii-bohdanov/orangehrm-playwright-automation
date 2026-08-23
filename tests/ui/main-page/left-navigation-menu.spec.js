const { test, expect } = require('../../../fixtures/authorization.fixture');
const { BasePage } = require('../../../pages/base/BasePage');
const { NavigationMenu } = require('../../../test-data/navigation-menu');

test.use({ userKey: 'MAIN_USER' });

test.describe('Left Navigation Menu tests', () => {

  test('Check that left navigation menu is present on the main page', async ({ page }) => {
    const mainPage = new BasePage(page);

    await mainPage.waitForPageLoaded();
    expect(await mainPage.leftNavigationMenu.isNavigationMenuVisible()).toBe(true);
  });

  test('Check that left navigation menu items are clickable and have valid header names', async ({ page }) => {
    const mainPage = new BasePage(page);

    await mainPage.waitForPageLoaded();

    const leftNavigation = mainPage.leftNavigationMenu;

    for (const menuItem of Object.values(NavigationMenu)) {
      if (menuItem.skip) continue;

      await leftNavigation.clickMenuItem(menuItem.name);
      const headerText = await mainPage.header.getHeaderText();
      expect(headerText)
          .toContain(menuItem.expectedHeader);
    }
  });
});