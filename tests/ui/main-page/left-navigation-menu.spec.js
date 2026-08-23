const { test, expect } = require('../../../fixtures/authorization.fixture');
const {BasePage} = require("../../../pages/base/BasePage");
const {NavigationMenuItems} = require("../../../test-data/navigation-menu-Items");

test.use({userKey: 'MAIN_USER'});

test.describe("Left Navigation Menu tests", () => {

  test('Check that left navigation menu is present on the main page', async ({page}) => {
    const mainPage = new BasePage(page);
    const leftNavigation = mainPage.leftNavigationMenu;
    expect( await leftNavigation.isNavigationMenuVisible()).toBe(true);
  });

  test('Check that left navigation menu items are clickable and has valid header name', async ({page}) => {
    const mainPage = new BasePage(page);
    const leftNavigation = mainPage.leftNavigationMenu;
    await leftNavigation.clickMenuItem(NavigationMenuItems.PIM);
    expect(await mainPage.header.getHeaderText()).toBe(NavigationMenuItems.PIM)
  })
});
