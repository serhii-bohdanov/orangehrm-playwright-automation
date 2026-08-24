const { test, expect } = require('../../fixtures/api-auth.fixture');
const {DashboardApi} = require("../../api/DashboardApi");

test('Check that My Actions endpoint returned 200 status', async ({ api }) => {
    const dashboardApi = new DashboardApi(api);

    const response = await dashboardApi.getMyActions();
    expect(response.status()).toBe(200);
});