const { _baseContentLocators } = require('../../locators/_baseContent.locators');

class BaseContent {
    #root;

    constructor(page) {
        this.page = page;
        this.#root = page.locator(_baseContentLocators.root);
    }
}

module.exports = { BaseContent };