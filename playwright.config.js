// @ts-check
import 'dotenv/config';
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',

    fullyParallel: true,

    forbidOnly: !!process.env.CI,

    retries: process.env.CI ? 2 : 0,

    workers: process.env.CI ? 1 : undefined,

    reporter: [
        ['list'],
        ['html'],
        [
            'allure-playwright',
            {
                resultsDir: 'allure-results',
            },
        ],
    ],

    use: {
        headless: true,
        baseURL: 'https://opensource-demo.orangehrmlive.com/',
        viewport: null,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'on-first-retry',
    },

    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                browserName: 'chromium',
                launchOptions: {
                    args: ['--start-maximized'],
                },
            },
        },
    ],
});