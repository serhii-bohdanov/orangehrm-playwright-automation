const {_headerLocators} = require('../../locators/_header.locators');

class Header {
    #root;
    #headerPageName;
    #upgradeButton;
    #userInfoDropdown;
    #subHeader;
    #helpButton;

    constructor(page) {
        this.page = page;

        this.#root = page.locator(_headerLocators.root);
        this.#headerPageName = this.#root.locator(_headerLocators.pageName);
        this.#upgradeButton = this.#root.locator(_headerLocators.upgradeButton);
        this.#userInfoDropdown = this.#root.locator(_headerLocators.userInfoDropdown);
        this.#subHeader = this.#root.locator(_headerLocators.subHeader);
        this.#helpButton = this.#subHeader.locator(_headerLocators.helpButton, {hasText: 'Help'});
    }

    async getHeaderText() {
        return await this.#headerPageName.innerText();
    }

    async isUpgradeButtonVisible() {
        return await this.#upgradeButton.isVisible();
    }

    async isUserInfoButtonVisible() {
        return await this.#userInfoDropdown.isVisible();
    }

    async selectUserDropdownOption(optionName) {
        await this.#userInfoDropdown.click();
        await this.page.
        getByRole('menuitem', {name: optionName})
            .click();
    }

    async isHelpButtonVisible() {
        return await this.#helpButton.isVisible();
    }
}

module.exports = {Header};