const {ENDPOINTS} = require("../config/endpoints");
const {BaseApi} = require('./BaseApi');

class AuthApi extends BaseApi {

    async login(username, password) {
        const loginPageResponse = await this.executeGetRequest(ENDPOINTS.AUTH.LOGIN_PAGE)

        await this.assertSuccess(
            loginPageResponse,
            'Failed to open login page'
        );

        const html = await loginPageResponse.text();

        const tokenMatch = html.match(
            /:token="&quot;([^"]+)&quot;"/
        );

        if (!tokenMatch) {
            throw new Error('CSRF token was not found');
        }

        const csrfToken = tokenMatch[1];

        return await this.executePostRequest(
            ENDPOINTS.AUTH.LOGIN_VALIDATION,
            {
                form: {
                    _token: csrfToken,
                    username,
                    password,
                },
            });
    }
}

module.exports = {
    AuthApi,
};