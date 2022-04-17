/* eslint-disable */
import { PlaywrightTestConfig, devices } from "@playwright/test";

const viewport = {
  width: 1920,
  height: 1080,
};

const config: PlaywrightTestConfig = {
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  testMatch: /.*(spec)\.ts/,
  webServer: {
    command: "pnpm dlx http-server storybook-static -p 8080",
    port: 8080,
  },
  use: {
    baseURL: "http://localhost:8080",
    trace: "on-first-retry",
    viewport,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], deviceScaleFactor: 1 },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"], deviceScaleFactor: 1 },
    },
    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
        deviceScaleFactor: 1,
      },
    },
  ],
};

export default config;
