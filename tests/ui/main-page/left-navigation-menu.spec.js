const { test, expect } = require('@playwright/test');
const {BasePage} = require("../../../pages/base/BasePage");

test.use({userKey: 'MAIN_USER'});

test.describe.serial("Dashboard tests", () => {

  test('Check that left navigation menu is present on the main page', async ({page}) => {
    const mainPage = new BasePage(page);
    const leftNavigation = mainPage.leftNavigationMenu;
    expect( await leftNavigation.isNavigationMenuVisible()).toBe(true);
  });
});
