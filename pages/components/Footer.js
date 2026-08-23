const { _footerLocators } = require('../../locators/_footer.locators');

class Footer {
    #root
    #footerVersion;
    #footerCopyright;
    #companyInfo;

    constructor(page) {
        this.#root = page.locator(_footerLocators.root);
        this.#footerVersion = this.#root.locator(_footerLocators.paragraphs).nth(0);
        this.#footerCopyright = this.#root.locator(_footerLocators.paragraphs).nth(1);
        this.#companyInfo = this.#footerCopyright.locator(_footerLocators.companyLink);
    }

    async getVersion() {
        return await this.#footerVersion.innerText();
    }

    async getCopyright() {
        return await this.#footerCopyright.innerText();
    }

    async clickCompanyLink() {
        await this.#companyInfo.click();
    }
}

module.exports = { Footer };