import path from "path";

import { test } from "@playwright/test";

import { compareScreenshots } from "utils/testHelpers";

test.describe("Button", () => {
  test.afterAll(async ({ screenshot }, testInfo) => {
    // eslint-disable-next-line no-unused-expressions
    screenshot;

    await compareScreenshots(10, testInfo.snapshotDir);
  });

  test("compare default button", async ({ page }, testInfo) => {
    const snapshotDir = "default";

    const snapshotPath = path.resolve(
      testInfo.snapshotDir,
      snapshotDir,
      `${testInfo.project.name}.png`,
    );

    await page.goto("/");

    const buttonNode = page.locator("#ui-button");

    await buttonNode.click();

    const defaultButton = page.locator("#ui-button--default");

    await defaultButton.click();

    const button = page
      .frameLocator("#storybook-preview-iframe")
      .locator("data-testid=Button")
      .first();

    await button.screenshot({
      path: snapshotPath,
    });
  });

  test("compare disabled state", async ({ page }, testInfo) => {
    const snapshotDir = "disabled";

    const snapshotPath = path.resolve(
      testInfo.snapshotDir,
      snapshotDir,
      `${testInfo.project.name}.png`,
    );

    await page.goto("/");

    const buttonNode = page.locator("#ui-button");

    await buttonNode.click();

    const defaultButton = page.locator("#ui-button--default");

    await defaultButton.click();

    const disabledControl = page.locator("#control-disabled");

    await disabledControl.click();

    const button = page
      .frameLocator("#storybook-preview-iframe")
      .locator("data-testid=Button")
      .first();

    await button.screenshot({
      path: snapshotPath,
    });
  });

  test("compare outlined variant", async ({ page }, testInfo) => {
    const snapshotDir = "outlined-variant";

    const snapshotPath = path.resolve(
      testInfo.snapshotDir,
      snapshotDir,
      `${testInfo.project.name}.png`,
    );

    await page.goto("/");

    const buttonNode = page.locator("#ui-button");

    await buttonNode.click();

    const defaultButton = page.locator("#ui-button--default");

    await defaultButton.click();

    const variantControl = page.locator("#control-variant-1");

    await variantControl.click();

    await page.waitForTimeout(200);

    const button = page
      .frameLocator("#storybook-preview-iframe")
      .locator("data-testid=Button")
      .first();

    await button.screenshot({
      path: snapshotPath,
    });
  });
});
