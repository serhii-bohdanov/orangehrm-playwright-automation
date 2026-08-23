const {
    _leftNavigationMenuLocators
} = require('../../locators/_leftNavigationMenu.locators');

class LeftNavigationMenu {
    #root;
    #menuItems;
    #searchInput;
    #logoLink;

    constructor(page) {
        this.page = page;

        this.#root = page.locator(_leftNavigationMenuLocators.root);
        this.#menuItems = this.#root.locator(_leftNavigationMenuLocators.menuItems);
        this.#searchInput = this.#root.locator(_leftNavigationMenuLocators.searchInput);
        this.#logoLink = this.#root.locator(_leftNavigationMenuLocators.logoLink);
    }

    async isNavigationMenuVisible() {
        return await this.#root.isVisible();
    }

    async clickMenuItem(name) {
        await this.#menuItems
            .filter({ hasText: name })
            .click();
    }

    async search(text) {
        await this.#searchInput.fill(text);
    }

    async clickLogo() {
        await this.#logoLink.click();
    }
}

module.exports = { LeftNavigationMenu };