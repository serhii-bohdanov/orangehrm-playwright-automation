const base = require('@playwright/test');
const {LoginPage} = require('../pages/LoginPage');
const {getUser} = require('../test-data/users');

const test = base.test.extend({
    userKey: ['mainUser', {option: true}],

    // Automatically login when a userKey is specified by overriding the built-in `page` fixture
    page: async ({page, userKey}, use) => {
        if (userKey) {
            const loginPage = new LoginPage(page);
            const user = getUser(userKey);

            await loginPage.goto();
            await loginPage.login(user);
        }
        await use(page);
    }
});

module.exports = {test, expect: base.expect};
