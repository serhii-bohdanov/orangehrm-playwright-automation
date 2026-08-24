const base = require('@playwright/test');
const { AuthApi } = require('../api/AuthApi');

const test = base.test.extend({

    api: async ({ playwright }, use) => {

        const request = await playwright.request.newContext({
            baseURL: process.env.BASE_URL,
        });

        try {
            const authApi = new AuthApi(request);

            const response = await authApi.login(
                process.env.MAIN_USER_USERNAME,
                process.env.MAIN_USER_PASSWORD
            );

            if (!response.ok()) {
                const body = await response.text();

                throw new Error(
                    `API authentication failed.\n` +
                    `Status: ${response.status()}\n` +
                    `URL: ${response.url()}\n` +
                    `Response: ${body}`
                );
            }

            await use(request);

        } finally {
            await request.dispose();
        }
    },

});

module.exports = {
    test,
    expect: base.expect,
};