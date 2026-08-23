# orangehrm-playwright-automation

A simple test automation framework for OrangeHRM built with JavaScript, Playwright and the Page object model (POM).

The project demonstrates modern UI test automation practices: reusable fixtures, centralized locators, test data management, reporting (Playwright + Allure) and CI/CD through GitHub Actions.

Tech stack
- JavaScript
- Playwright (@playwright/test)
- Node.js
- Page Object Model (POM)
- Playwright fixtures
- Allure Report (allure-playwright)
- GitHub Actions
- dotenv

Project structure
- tests/                # Test specifications
- pages/                # Page object classes and actions
- fixtures/             # Reusable setup and custom fixtures
- utils/                # Helpers, constants and utilities
- locators/             # Centralized element locators
- configs/              # Environment/configuration files
- test-data/            # Test data

- allure-results/       # Generated Allure test results (do not commit)
- allure-report/        # Generated Allure HTML report (do not commit)
- playwright-report/    # Generated Playwright HTML report (do not commit)
- screenshots/          # Failure screenshots (do not commit)
- test-results/         # Playwright artifacts (do not commit)

- .env                  # Local environment variables (ignored)
- playwright.config.js  # Playwright configuration
- package.json          # Dependencies and npm scripts
- README.md

Note: Generated report and artifact folders should be ignored by Git (.gitignore).

Prerequisites
- Node.js 16+ (recommended)
- npm

Setup
1. Clone the repository
   git clone https://github.com/serhii-bohdanov/orangehrm-playwright-automation-.git
   cd orangehrm-playwright-automation-
2. Install dependencies
   npm install
3. Install Playwright browsers
   npx playwright install

Running tests
- Run all tests
  npm test

- Run tests in headed mode (visible browser)
  npm run test:headed

- Run tests in Playwright UI mode
  npm run test:ui

- Run tests in debug mode
  npm run test:debug

Test reports
This project uses:
- Playwright HTML Report (built-in)
- Allure Report (allure-playwright)

Playwright and Allure reporters are configured in playwright.config.js. Allure results are written to: `allure-results/`.

Allure commands (npm scripts)
- Generate static HTML report
  npm run allure:generate
- Open generated report (local files)
  npm run allure:open
- Generate and serve report (generate + local server)
  npm run allure:serve

Typical Allure workflow
1) Run tests: `npm test`
2) Generate and serve: `npm run allure:serve`

Environment variables
Environment-specific values are loaded from `.env` using dotenv. Example:

USERNAME=your_username
PASSWORD=your_password

Security: .env is excluded from Git and should not contain real secrets in public repositories. Use secret management for CI (GitHub Actions secrets).

CI / GitHub Actions
The repository contains GitHub Actions workflows under `.github/workflows/` which install dependencies, browsers, run tests and can generate/upload reports (see `playwright.yml`).

Available npm scripts (selected)
- npm test — run Playwright tests
- npm run test:ui — Playwright UI mode
- npm run test:headed — run with visible browser
- npm run test:debug — debug mode
- npm run allure:generate — generate Allure HTML report
- npm run allure:open — open report
- npm run allure:serve — serve generated report locally
- npm run start:mcp — start Playwright MCP

Learning goals
The project is intended as a learning / portfolio project to practice UI automation with Playwright, test design patterns (POM), fixtures, reporting and CI/CD.

Contributing
Contributions, issues and feature requests are welcome. Please follow repository guidelines and avoid committing secrets.
