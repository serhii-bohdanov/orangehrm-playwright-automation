const { Header } = require('../components/Header');
const { LeftNavigationMenu } = require('../components/LeftNavigationMenu');
const { BaseContent } = require('../components/BaseContent');
const { Footer } = require('../components/Footer');

class BasePage {
    constructor(page) {
        this.page = page;

        this.header = new Header(page);
        this.leftNavigationMenu = new LeftNavigationMenu(page);
        this.baseContent = new BaseContent(page);
        this.footer = new Footer(page);
    }

    async waitForPageLoaded() {
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = { BasePage };
