class BaseApi {
    constructor(request) {
        this.request = request;
    }

    async executeGetRequest(endpoint, options = {}) {
        return await this.request.get(endpoint, options);
    }

    async executePostRequest(endpoint, options = {}) {
        return await this.request.post(endpoint, options);
    }

    async executePutRequest(endpoint, options = {}) {
        return await this.request.put(endpoint, options);
    }

    async executePatchRequest(endpoint, options = {}) {
        return await this.request.patch(endpoint, options);
    }

    async executeDeleteRequest(endpoint, options = {}) {
        return await this.request.delete(endpoint, options);
    }

    async assertSuccess(response, message = 'API request failed') {
        if (!response.ok()) {
            const body = await response.text();

            throw new Error(
                `${message}\n` +
                `Status: ${response.status()}\n` +
                `URL: ${response.url()}\n` +
                `Response: ${body}`
            );
        }
    }
}

module.exports = {
    BaseApi,
};