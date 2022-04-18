/* eslint-disable import/no-unused-modules */
import { PlaywrightTestConfig, devices } from "@playwright/test";

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
    command: "pnpm dlx http-server storybook-static -p 8080",
    port: 8080,
    reuseExistingServer: true,
  },
  use: {
    baseURL: "http://localhost:8080",
    trace: "on-first-retry",
    viewport,
  },
  projects,
};

export default config;
