/* eslint-disable import/no-unused-modules */
/* istanbul ignore file */

import { PlaywrightTestConfig, devices } from "@playwright/test";

const port = 8081;

const projects = [
  {
    name: "chromium",
    use: { ...devices["Desktop Chrome"], deviceScaleFactor: 1 },
  },
  {
    name: "firefox",
    use: { ...devices["Desktop Firefox"], deviceScaleFactor: 1 },
  },
];

if (process.platform === "darwin") {
  projects.push({
    name: "webkit",
    use: {
      ...devices["Desktop Safari"],
      deviceScaleFactor: 1,
    },
  });
}

const viewport = {
  width: 1920,
  height: 1080,
};

const config: PlaywrightTestConfig = {
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  testMatch: /.*(spec)\.ts/,
  fullyParallel: true,
  webServer: {
    command: "pnpm serve:storybook",
    reuseExistingServer: true,
    port,
  },
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    trace: "on-first-retry",
    viewport,
    colorScheme: "dark",
  },
  projects,
};

export default config;
