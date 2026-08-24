# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/main-page/left-navigation-menu.spec.js >> Left Navigation Menu tests >> Check that left navigation menu items are clickable and have valid header names
- Location: tests/ui/main-page/left-navigation-menu.spec.js:16:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.innerText: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('div.oxd-topbar-header').locator('span.oxd-topbar-header-breadcrumb')

```

# Test source

```ts
  1  | const {_headerLocators} = require('../../locators/_header.locators');
  2  | 
  3  | class Header {
  4  |     #root;
  5  |     #headerPageName;
  6  |     #upgradeButton;
  7  |     #userInfoDropdown;
  8  |     #subHeader;
  9  |     #helpButton;
  10 | 
  11 |     constructor(page) {
  12 |         this.page = page;
  13 | 
  14 |         this.#root = page.locator(_headerLocators.root);
  15 |         this.#headerPageName = this.#root.locator(_headerLocators.pageName);
  16 |         this.#upgradeButton = this.#root.locator(_headerLocators.upgradeButton);
  17 |         this.#userInfoDropdown = this.#root.locator(_headerLocators.userInfoDropdown);
  18 |         this.#subHeader = this.#root.locator(_headerLocators.subHeader);
  19 |         this.#helpButton = this.#subHeader.locator(_headerLocators.helpButton, {hasText: 'Help'});
  20 |     }
  21 | 
  22 |     async getHeaderText() {
> 23 |         return await this.#headerPageName.innerText();
     |                                           ^ Error: locator.innerText: Test timeout of 30000ms exceeded.
  24 |     }
  25 | 
  26 |     async isUpgradeButtonVisible() {
  27 |         return await this.#upgradeButton.isVisible();
  28 |     }
  29 | 
  30 |     async isUserInfoButtonVisible() {
  31 |         return await this.#userInfoDropdown.isVisible();
  32 |     }
  33 | 
  34 |     async selectUserDropdownOption(optionName) {
  35 |         await this.#userInfoDropdown.click();
  36 |         await this.page.
  37 |         getByRole('menuitem', {name: optionName})
  38 |             .click();
  39 |     }
  40 | 
  41 |     async isHelpButtonVisible() {
  42 |         return await this.#helpButton.isVisible();
  43 |     }
  44 | }
  45 | 
  46 | module.exports = {Header};
```