import path from "path";

import { test } from "@playwright/test";

import { compareScreenshots } from "utils/testHelpers";

test.describe("LinkButton", () => {
  test("compare contained group", async ({ page }, testInfo) => {
    const snapshotDir = "contained";

    const snapshotPath = path.resolve(
      testInfo.snapshotDir,
      snapshotDir,
      `${testInfo.project.name}.png`,
    );

    await page.goto("/");

    const buttonNode = page.locator("#ui-linkbutton");

    await buttonNode.click();

    const defaultButton = page.locator("#ui-linkbutton--default");

    await defaultButton.click();

    const linkButton = page
      .frameLocator("#storybook-preview-iframe")
      .locator("data-testid=LinkButton")
      .first();

    await linkButton.screenshot({
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

    const buttonNode = page.locator("#ui-linkbutton");

    await buttonNode.click();

    const defaultButton = page.locator("#ui-linkbutton--default");

    await defaultButton.click();

    const variantControl = page.locator("#control-variant-1");

    await variantControl.click();

    const button = page
      .frameLocator("#storybook-preview-iframe")
      .locator("data-testid=LinkButton")
      .first();

    await button.screenshot({
      path: snapshotPath,
    });

    await compareScreenshots(testInfo.snapshotDir, snapshotDir);
  });
});
