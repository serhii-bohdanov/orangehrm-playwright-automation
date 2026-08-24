# AGENTS.md - OrangeHRM Playwright Automation

Guide for AI agents working with this Playwright test automation framework.

## Architecture Overview

**Project Type:** Playwright test automation using Page Object Model (POM) pattern.

**Tech Stack:** JavaScript, Node.js 24, Playwright @1.62, Allure reporting.

**Test Separation:**
- **UI Tests** (`../tests/ui`): Require authentication via `fixtures/ui-auth.fixture`
- **API Tests** (`../tests/api`): Require API authentication via `fixtures/api-auth.fixture`

Both fixtures override built-in fixtures to automatically authenticate before test execution.

## Critical Architecture Patterns

### 1. Page Object Model (POM) with Components

**Files:** `../pages/LoginPage.js`, `../pages/base/BasePage.js`, `pages/components/*.js`

- Page classes use **private fields** (`#field`) for encapsulation of Playwright locators
- Components are reusable UI units: `Header`, `Footer`, `LeftNavigationMenu`, `BaseContent`
- `BasePage` composes all common components and includes `waitForPageLoaded()`
- Specific pages extend or use `BasePage` as needed
- Locators are initialized in constructor via `page.locator(selectorString)`

**Example pattern:**
```javascript
class LoginPage {
  #page;
  #usernameInput;
  
  constructor(page) {
    this.#page = page;
    this.#usernameInput = page.locator(_loginLocators.usernameInput);
  }
  
  async login(user) {
    const userData = user || getUser('mainUser');
    // Use private fields for actions
  }
}
```

### 2. Fixture-Based Authentication

**Files:** `../fixtures/ui-auth.fixture.js`, `../fixtures/api-auth.fixture.js`

**UI Auth Flow:**
- Fixture overrides Playwright's built-in `page` fixture
- Accepts `userKey` parameter (e.g., `test.use({userKey: 'MAIN_USER'})`)
- Automatically logs in before each test if `userKey` is specified
- Test receives pre-authenticated page context

**API Auth Flow:**
- Creates Playwright APIRequestContext with `baseURL`
- Authenticates using `AuthApi.login()` (extracts CSRF token, posts credentials)
- Passes authenticated `request` to test (stored as `api` fixture)
- Cleanup via finally block ensures `request.dispose()`

**When to use:**
- UI tests import from `../fixtures/ui-auth.fixture.js`
- API tests import from `../fixtures/api-auth.fixture.js`

### 3. Centralized Configuration

**Files:** `../config/endpoints.js`, `../.env` (git-ignored)

**Endpoints Pattern:**
- All API endpoints defined in nested object: `ENDPOINTS.AUTH.LOGIN_VALIDATION`
- Used by API classes: `this.executePostRequest(ENDPOINTS.AUTH.LOGIN_VALIDATION, ...)`

**Credentials Pattern:**
- Environment variables follow pattern: `{USER_KEY}_{USERNAME|PASSWORD}`
- `../test-data/users.js` normalizes keys: `MAIN_USER` → `mainUser`
- `getUser(key)` throws descriptive error if credentials missing
- Supports multiple user accounts via env vars

## Key Files & Responsibilities

| File | Purpose |
|------|---------|
| `../pages/LoginPage.js` | Login flow (fill credentials, click button) |
| `../pages/base/BasePage.js` | Common page elements (header, nav, footer) |
| `pages/components/*.js` | Reusable UI components |
| `locators/_*.locators.js` | CSS selectors (named with leading underscore) |
| `../api/BaseApi.js` | HTTP methods (GET, POST, PUT, PATCH, DELETE) + assertion helper |
| `../api/AuthApi.js` | Authentication, CSRF token extraction |
| `../api/DashboardApi.js` | Domain-specific API endpoints |
| `../config/endpoints.js` | Centralized endpoint URLs |
| `../test-data/users.js` | Credential loading from .env |
| `../fixtures/ui-auth.fixture.js` | Auto-login for UI tests |
| `../fixtures/api-auth.fixture.js` | Auto-authenticate API context |

## Common Development Workflows

### Running Tests

```bash
npm test                    # All tests (headless)
npm run test:ui            # Playwright UI mode (interactive)
npm run test:headed        # Visible browser, headless mode off
npm run test:debug         # Step debugger
npm run test:e2e           # UI tests only
npm run test:api           # API tests only
```

### Viewing Reports

```bash
npm run allure:serve       # Generate + serve Allure report locally
npm run allure:generate    # Just generate static HTML
npm run allure:open        # Open pre-generated report
```

### Local Development Setup

```bash
nvm use 24                 # Switch to Node 24
npm install               # Install dependencies
npx playwright install    # Install browsers
# Create .env with BASE_URL, MAIN_USER_USERNAME, MAIN_USER_PASSWORD
```

## Testing Patterns

### UI Test Pattern

```javascript
const {test, expect} = require('../../../fixtures/ui-auth.fixture');
const {BasePage} = require("../../../pages/base/BasePage");

test.use({userKey: 'MAIN_USER'}); // Auto-login before test

test('test name', async ({page}) => {
  const mainPage = new BasePage(page);
  const text = await mainPage.header.getHeaderText();
  expect(text).toBe('Expected Value');
});
```

### API Test Pattern

```javascript
const { test, expect } = require('../../fixtures/api-auth.fixture');
const {DashboardApi} = require("../../api/DashboardApi");

test('test name', async ({ api }) => {
  const dashboardApi = new DashboardApi(api);
  const response = await dashboardApi.getMyActions();
  expect(response.status()).toBe(200);
});
```

## Error Handling & Assertions

### API Assertions

`BaseApi.assertSuccess(response, message)` throws detailed error:
```javascript
// Throws formatted error with Status, URL, Response body
await this.assertSuccess(response, 'Custom failure message');
```

### Required Environment Variables

- `BASE_URL`: Application URL (must be set before test runs)
- `MAIN_USER_USERNAME` / `MAIN_USER_PASSWORD`: Credentials for 'mainUser'
- Any custom user: `{CUSTOM_NAME}_USERNAME` + `{CUSTOM_NAME}_PASSWORD`

Missing credentials throw: `Missing credentials for user "mainUser". Add MAIN_USER_USERNAME and MAIN_USER_PASSWORD to .env`

## Configuration & CI

**Playwright Config** (`../playwright.config.js`):
- Runs only Chromium browser
- Parallel execution (unless CI mode)
- Retries: 2 in CI, 0 locally
- Screenshots/videos only on failure
- Trace on first retry
- Multiple reporters: list, HTML, Allure

**CI Environment** (GitHub Actions):
- `CI=true` enables retries and sequential execution
- Generate Allure report before GitHub Actions integration
- See `../.github/workflows/allure-report.yml` for details

## Design Decisions & Why

1. **Private Fields in Page Classes** - Prevents direct locator access; forces using page methods
2. **Component-Based Pages** - Enables reuse across multiple pages that share Header, Footer, etc.
3. **Fixture-Based Auth** - Authentication happens transparently; tests focus on behavior
4. **Centralized Endpoints** - Single source of truth for API routes; easy to update
5. **Environment-Based Credentials** - Supports multiple test users; works in CI without hardcoding secrets
6. **Separate Fixtures** - UI/API tests have different auth flows; each fixture handles its protocol

## When Adding New Tests

1. **UI Test:** Create `.spec.js` in `tests/ui/{feature}/`, import `fixtures/ui-auth.fixture`
2. **API Test:** Create `.spec.js` in `tests/api/{feature}/`, import `fixtures/api-auth.fixture`
3. **Page Class:** Extend `BasePage`, use private fields, import locators
4. **Locators:** Create `locators/_{feature}.locators.js` with named selectors
5. **API Endpoint:** Add to `../config/endpoints.js`, create API class extending `BaseApi`
6. **Test User:** Add `{USER_NAME}_USERNAME` and `{USER_NAME}_PASSWORD` to `../.env`, use `test.use({userKey: 'USER_NAME'})`

