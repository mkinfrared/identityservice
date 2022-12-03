import path from "path";

import { test } from "@playwright/test";

import { compareScreenshots } from "utils/testHelpers";

test.describe("IconButton", () => {
  test.afterAll(async ({ screenshot }, testInfo) => {
    // eslint-disable-next-line no-unused-expressions
    screenshot;

    await compareScreenshots(14, testInfo.snapshotDir);
  });

  test("compare default", async ({ page }, testInfo) => {
    const snapshotDir = "default";

    const snapshotPath = path.resolve(
      testInfo.snapshotDir,
      snapshotDir,
      `${testInfo.project.name}.png`,
    );

    await page.goto("/");

    const storyButton = page.locator("#ui-iconbutton");

    await storyButton.click();

    const defaultButton = page.locator("#ui-iconbutton--default");

    await defaultButton.click();

    const iconButton = page
      .frameLocator("#storybook-preview-iframe")
      .locator("data-testid=IconButton")
      .first();

    await iconButton.screenshot({
      path: snapshotPath,
    });
  });

  test("compare outline variant", async ({ page }, testInfo) => {
    const snapshotDir = "outline";

    const snapshotPath = path.resolve(
      testInfo.snapshotDir,
      snapshotDir,
      `${testInfo.project.name}.png`,
    );

    await page.goto("/");

    const storyButton = page.locator("#ui-iconbutton");

    await storyButton.click();

    const defaultButton = page.locator("#ui-iconbutton--default");

    await defaultButton.click();

    const variantControl = page.locator("#control-variant-1");

    await variantControl.click();

    const iconButton = page
      .frameLocator("#storybook-preview-iframe")
      .locator("data-testid=IconButton")
      .first();

    await iconButton.screenshot({
      path: snapshotPath,
    });
  });

  test("compare outline loading variant", async ({ page }, testInfo) => {
    const snapshotDir = "outline-loading";

    const snapshotPath = path.resolve(
      testInfo.snapshotDir,
      snapshotDir,
      `${testInfo.project.name}.png`,
    );

    await page.goto("/");

    const storyButton = page.locator("#ui-iconbutton");

    await storyButton.click();

    const defaultButton = page.locator("#ui-iconbutton--default");

    await defaultButton.click();

    const variantControl = page.locator("#control-variant-1");

    await variantControl.click();

    const loadingControl = page.locator("#control-loading");

    await loadingControl.click();

    const iconButton = page
      .frameLocator("#storybook-preview-iframe")
      .locator("data-testid=IconButton")
      .first();

    await iconButton.screenshot({
      path: snapshotPath,
    });
  });

  test("compare contained loading variant", async ({ page }, testInfo) => {
    const snapshotDir = "contained-loading";

    const snapshotPath = path.resolve(
      testInfo.snapshotDir,
      snapshotDir,
      `${testInfo.project.name}.png`,
    );

    await page.goto("/");

    const storyButton = page.locator("#ui-iconbutton");

    await storyButton.click();

    const defaultButton = page.locator("#ui-iconbutton--default");

    await defaultButton.click();

    const loadingControl = page.locator("#control-loading");

    await loadingControl.click();

    const iconButton = page
      .frameLocator("#storybook-preview-iframe")
      .locator("data-testid=IconButton")
      .first();

    await iconButton.screenshot({
      path: snapshotPath,
    });
  });
});
