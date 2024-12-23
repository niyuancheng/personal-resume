import { defineConfig, devices } from '@playwright/test';

/**
 * @See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    projects: [
        /* Chromium不支持视频播放测试，如有需要可使用Chrome测试，另外H5测试也依赖Chrome */
        {
            name: 'Google Chrome',
            use: { ...devices['Desktop Chrome'], channel: 'chrome' }
        },
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] }
        }
        // {
        //     name: 'firefox',
        //     use: { ...devices['Desktop Firefox'] }
        // }
        /** Runner镜像暂不支持Safari测试 */
        // {
        //   name: 'webkit',
        //   use: { ...devices['Desktop Safari'] },
        // },
        /* Test against mobile viewports. */
        // {
        //   name: 'Mobile Chrome',
        //   use: { ...devices['Pixel 5'], channel: 'chrome' },
        // },
        // {
        //   name: 'Mobile Safari',
        //   use: { ...devices['iPhone 12'], channel: 'chrome' },
        // },
        /* Test against branded browsers. */
        // {
        //   name: 'Microsoft Edge',
        //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
        // },
    ]
});