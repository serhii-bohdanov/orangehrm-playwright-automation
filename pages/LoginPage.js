const { getUser } = require('../test-data/users');
const { _loginLocators } = require('../locators/_login.locators');

class LoginPage {
  #page;
  #usernameInput;
  #passwordInput;
  #loginButton;

  constructor(page) {
    this.#page = page;

    this.#usernameInput = page.locator(_loginLocators.usernameInput);
    this.#passwordInput = page.locator(_loginLocators.passwordInput);
    this.#loginButton = page.locator(_loginLocators.loginButton);
  }

  async goto() {
    await this.#page.goto('/');
  }

  async fillCredentials({ username, password }) {
    await this.#usernameInput.fill(username);
    await this.#passwordInput.fill(password);
  }

  async clickLoginButton() {
    await this.#loginButton.click();
  }

  async login(user) {
    const userData = user || getUser('mainUser');

    await this.fillCredentials(userData);
    await this.clickLoginButton();
  }
}

module.exports = { LoginPage };