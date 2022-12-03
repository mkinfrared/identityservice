/* eslint-disable */
import path from "path";

import { delay } from "@identity-service/core";
import { test } from "@playwright/test";

import { compareScreenshots } from "utils/testHelpers";

test.describe("Toggle", () => {
  test.afterAll(async ({ screenshot }, testInfo) => {
    // eslint-disable-next-line no-unused-expressions
    screenshot;

    await compareScreenshots(1, testInfo.snapshotDir);
  });

  test("compare with no label", async ({ page }, testInfo) => {
    const snapshotDir = "empty-label";

    const snapshotPath = path.resolve(
      testInfo.snapshotDir,
      snapshotDir,
      `${testInfo.project.name}.png`,
    );

    await page.goto("/");

    const toggleButton = page.locator("#ui-toggle");

    await toggleButton.click();

    const controlledButton = page.locator("#ui-toggle--controlled");

    await controlledButton.click();

    const toggle = page
      .frameLocator("#storybook-preview-iframe")
      .locator("data-testid=Toggle");

    await toggle.screenshot({
      path: snapshotPath,
    });
  });

  test("compare checked with no label", async ({ page }, testInfo) => {
    const snapshotDir = "empty-label-checked";

    const snapshotPath = path.resolve(
      testInfo.snapshotDir,
      snapshotDir,
      `${testInfo.project.name}.png`,
    );

    await page.goto("/");

    const toggleButton = page.locator("#ui-toggle");

    await toggleButton.click();

    const controlledButton = page.locator("#ui-toggle--controlled");

    await controlledButton.click();

    const toggle = page
      .frameLocator("#storybook-preview-iframe")
      .locator("data-testid=Toggle");

    await toggle.click();

    await delay(500);

    await toggle.screenshot({
      path: snapshotPath,
    });
  });

  test("compare with label", async ({ page }, testInfo) => {
    const snapshotDir = "filled-label";

    const snapshotPath = path.resolve(
      testInfo.snapshotDir,
      snapshotDir,
      `${testInfo.project.name}.png`,
    );

    await page.goto("/");

    const toggleButton = page.locator("#ui-toggle");

    await toggleButton.click();

    const controlledButton = page.locator("#ui-toggle--controlled");

    await controlledButton.click();

    const toggle = page
      .frameLocator("#storybook-preview-iframe")
      .locator("data-testid=Toggle");

    await toggle.screenshot({
      path: snapshotPath,
    });
  });
});
