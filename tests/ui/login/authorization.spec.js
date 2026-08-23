const {test, expect} = require('../../../fixtures/authorization.fixture');
const {BasePage} = require("../../../pages/base/BasePage");

test.use({userKey: 'MAIN_USER'});

test.describe.serial("Authorization tests", () => {

    test('Check that user is able to log in to the app', async ({page}) => {
        const mainPage = new BasePage(page);
        const headerText = await mainPage.header.getHeaderText();
        expect(headerText).toBe('Dashboard');
    });

});