import path from "path";

import { test } from "@playwright/test";

import { compareScreenshots } from "utils/testHelpers";

test.describe("ButtonGroup", () => {
  test("compare contained group", async ({ page }, testInfo) => {
    const snapshotDir = "contained";

    const snapshotPath = path.resolve(
      testInfo.snapshotDir,
      snapshotDir,
      `${testInfo.project.name}.png`,
    );

    await page.goto("/");

    const buttonNode = page.locator("#ui-buttongroup");

    await buttonNode.click();

    const defaultButton = page.locator("#ui-buttongroup--default");

    await defaultButton.click();

    const buttonGroup = page
      .frameLocator("#storybook-preview-iframe")
      .locator("data-testid=ButtonGroup")
      .first();

    await buttonGroup.screenshot({
      path: snapshotPath,
    });

    await compareScreenshots(testInfo.snapshotDir, snapshotDir);
  });

  test("compare outlined variant", async ({ page }, testInfo) => {
    const snapshotDir = "outlined-variant";

    const snapshotPath = path.resolve(
      testInfo.snapshotDir,
      snapshotDir,
      `${testInfo.project.name}.png`,
    );

    await page.goto("/");

    const buttonNode = page.locator("#ui-buttongroup");

    await buttonNode.click();

    const defaultButton = page.locator("#ui-buttongroup--default");

    await defaultButton.click();

    const variantControl = page.locator("#control-variant-1");

    await variantControl.click();

    const colorControl = page.locator("#control-color");

    await colorControl.fill("secondary");

    const button = page
      .frameLocator("#storybook-preview-iframe")
      .locator("data-testid=ButtonGroup")
      .first();

    await button.screenshot({
      path: snapshotPath,
    });

    await compareScreenshots(testInfo.snapshotDir, snapshotDir);
  });

  test("compare with icon", async ({ page }, testInfo) => {
    const snapshotDir = "with-icon";

    const snapshotPath = path.resolve(
      testInfo.snapshotDir,
      snapshotDir,
      `${testInfo.project.name}.png`,
    );

    await page.goto("/");

    const buttonNode = page.locator("#ui-buttongroup");

    await buttonNode.click();

    const withIconButton = page.locator("#ui-buttongroup--with-icon");

    await withIconButton.click();

    const button = page
      .frameLocator("#storybook-preview-iframe")
      .locator("data-testid=ButtonGroup")
      .first();

    await button.screenshot({
      path: snapshotPath,
    });

    await compareScreenshots(testInfo.snapshotDir, snapshotDir);
  });
});
