# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/login/authorization.spec.js >> Authorization tests >> Check that user is able to log in to the app
- Location: tests/ui/login/authorization.spec.js:8:5

# Error details

```
Test timeout of 30000ms exceeded while setting up "page".
```

```
Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
Call log:
  - navigating to "https://opensource-demo.orangehrmlive.com/web/index.php/", waiting until "load"

```

# Test source

```ts
  1  | const {getUser} = require('../test-data/users');
  2  | const {_loginLocators} = require('../locators/_login.locators');
  3  | 
  4  | class LoginPage {
  5  |     #page;
  6  |     #usernameInput;
  7  |     #passwordInput;
  8  |     #loginButton;
  9  | 
  10 |     constructor(page) {
  11 |         this.#page = page;
  12 | 
  13 |         this.#usernameInput = page.locator(_loginLocators.usernameInput);
  14 |         this.#passwordInput = page.locator(_loginLocators.passwordInput);
  15 |         this.#loginButton = page.locator(_loginLocators.loginButton);
  16 |     }
  17 | 
  18 |     async goto() {
  19 |         if (!process.env.BASE_URL) {
  20 |             throw new Error('BASE_URL environment variable is not set');
  21 |         }
> 22 |         await this.#page.goto(process.env.BASE_URL);
     |                          ^ Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
  23 |     }
  24 | 
  25 |     async fillCredentials({username, password}) {
  26 |         await this.#usernameInput.fill(username);
  27 |         await this.#passwordInput.fill(password);
  28 |     }
  29 | 
  30 |     async clickLoginButton() {
  31 |         await this.#loginButton.click();
  32 |     }
  33 | 
  34 |     async login(user) {
  35 |         const userData = user || getUser('mainUser');
  36 | 
  37 |         await this.fillCredentials(userData);
  38 |         await this.clickLoginButton();
  39 |     }
  40 | }
  41 | 
  42 | module.exports = {LoginPage};
```