const {ENDPOINTS} = require('../config/endpoints');
const {BaseApi} = require("./BaseApi");

class DashboardApi extends BaseApi {

    async getMyActions() {
        const response = await this.executeGetRequest(
            ENDPOINTS.DASHBOARD.ACTION_SUMMARY
        );
        await this.assertSuccess(
            response,
            'Failed to get action summary'
        );
        return response;
    }
}

module.exports = {
    DashboardApi,
};