# orangehrm-playwright-automation (Playwright)

A Simple Test automation framework using JS + Playwright and the Page Object Model.

## Project structure
- tests — test specs
- pages — POM classes and actions
- fixtures — reusable setup and custom fixtures
- utils — helpers, constants and utilities
- locators — centralized selectors (element locators)
- configs — environment/configuration files
- reports — generated test reports (Playwright HTML)
- screenshots — failure screenshots
- package.json — dependencies and scripts

## Prerequisites
- Node.js (16+ recommended)
- npm or yarn

## Setup
1. Install dependencies:
   npm install
2. Install Playwright browsers:
   npx playwright install
> **Security Note:** The `.env` file is included for demonstration purposes only and contains test credentials.
> In a real-world project, sensitive environment files must be excluded from version control and added to `.gitignore`.