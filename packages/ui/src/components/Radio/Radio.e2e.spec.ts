import path from "path";

import { delay } from "@identity-service/core";
import { test } from "@playwright/test";

import { compareScreenshots } from "utils/testHelpers";

test.describe("Radio", () => {
  test.afterAll(async ({ screenshot }, testInfo) => {
    // eslint-disable-next-line no-unused-expressions
    screenshot;

    await compareScreenshots(8, testInfo.snapshotDir);
  });

  test("compare with no label", async ({ page }, testInfo) => {
    const snapshotDir = "empty-label";

    const snapshotPath = path.resolve(
      testInfo.snapshotDir,
      snapshotDir,
      `${testInfo.project.name}.png`,
    );

    await page.goto("/");

    const radioButton = page.locator("#ui-radio");

    await radioButton.click();

    const controlledButton = page.locator("#ui-radio--controlled");

    await controlledButton.click();

    const radio = page
      .frameLocator("#storybook-preview-iframe")
      .locator("data-testid=Radio");

    await radio.screenshot({
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

    const radioButton = page.locator("#ui-radio");

    await radioButton.click();

    const controlledButton = page.locator("#ui-radio--controlled");

    await controlledButton.click();

    const radio = page
      .frameLocator("#storybook-preview-iframe")
      .locator("data-testid=Radio");

    await radio.click();

    await delay(500);

    await radio.screenshot({
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

    const radioButton = page.locator("#ui-radio");

    await radioButton.click();

    const uncontrolledButton = page.locator("#ui-radio--uncontrolled");

    await uncontrolledButton.click();

    const checkbox = page
      .frameLocator("#storybook-preview-iframe")
      .locator("data-testid=Radio");

    await checkbox.screenshot({
      path: snapshotPath,
    });
  });
});
