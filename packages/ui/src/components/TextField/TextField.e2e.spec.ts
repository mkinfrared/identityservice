import path from "path";

import { test } from "@playwright/test";

import { compareScreenshots } from "utils/testHelpers";

test.describe("TextField", () => {
  test("compare empty fields", async ({ page }, testInfo) => {
    const snapshotDir = "empty-fields";

    const snapshotPath = path.resolve(
      testInfo.snapshotDir,
      snapshotDir,
      `${testInfo.project.name}.png`,
    );

    await page.goto("/");

    const textFieldButton = page.locator("#ui-textfield");

    await textFieldButton.click();

    const uncontrolledButton = page.locator("#ui-textfield--uncontrolled");

    await uncontrolledButton.click();

    const valueControl = page.locator("#control-value");

    await valueControl.fill("");

    const textField = page
      .frameLocator("#storybook-preview-iframe")
      .locator("data-testid=TextField");

    await textField.screenshot({
      path: snapshotPath,
    });

    await compareScreenshots(testInfo.snapshotDir, snapshotDir);
  });

  test("compare filled fields", async ({ page }, testInfo) => {
    const snapshotDir = "filled-fields";

    const snapshotPath = path.resolve(
      testInfo.snapshotDir,
      snapshotDir,
      `${testInfo.project.name}.png`,
    );

    await page.goto("/");

    const textFieldButton = page.locator("#ui-textfield");

    await textFieldButton.click();

    const uncontrolledButton = page.locator("#ui-textfield--uncontrolled");

    await uncontrolledButton.click();

    const textField = page
      .frameLocator("#storybook-preview-iframe")
      .locator("data-testid=TextField");

    await textField.screenshot({
      path: snapshotPath,
    });

    await compareScreenshots(testInfo.snapshotDir, snapshotDir);
  });

  test("compare error fields", async ({ page }, testInfo) => {
    const snapshotDir = "error-fields";

    const snapshotPath = path.resolve(
      testInfo.snapshotDir,
      snapshotDir,
      `${testInfo.project.name}.png`,
    );

    await page.goto("/");

    const textFieldButton = page.locator("#ui-textfield");

    await textFieldButton.click();

    const uncontrolledButton = page.locator("#ui-textfield--uncontrolled");

    await uncontrolledButton.click();

    const errorControl = page.locator("#control-error");

    await errorControl.fill("marklar");

    const textField = page
      .frameLocator("#storybook-preview-iframe")
      .locator("data-testid=TextField");

    await textField.screenshot({
      path: snapshotPath,
    });

    await compareScreenshots(testInfo.snapshotDir, snapshotDir);
  });

  test("compare disabled fields", async ({ page }, testInfo) => {
    const snapshotDir = "disabled-fields";

    const snapshotPath = path.resolve(
      testInfo.snapshotDir,
      snapshotDir,
      `${testInfo.project.name}.png`,
    );

    await page.goto("/");

    const textFieldButton = page.locator("#ui-textfield");

    await textFieldButton.click();

    const uncontrolledButton = page.locator("#ui-textfield--uncontrolled");

    await uncontrolledButton.click();

    const disabledControl = page.locator("#control-disabled");

    await disabledControl.click();

    const textField = page
      .frameLocator("#storybook-preview-iframe")
      .locator("data-testid=TextField");

    await textField.screenshot({
      path: snapshotPath,
    });

    await compareScreenshots(testInfo.snapshotDir, snapshotDir);
  });

  test("compare with label fields", async ({ page }, testInfo) => {
    const snapshotDir = "with-label-fields";

    const snapshotPath = path.resolve(
      testInfo.snapshotDir,
      snapshotDir,
      `${testInfo.project.name}.png`,
    );

    await page.goto("/");

    const textFieldButton = page.locator("#ui-textfield");

    await textFieldButton.click();

    const uncontrolledButton = page.locator("#ui-textfield--uncontrolled");

    await uncontrolledButton.click();

    const labelControl = page.locator("#control-label");

    await labelControl.fill("Marklar");

    const textField = page
      .frameLocator("#storybook-preview-iframe")
      .locator("data-testid=TextField");

    await textField.screenshot({
      path: snapshotPath,
    });

    await compareScreenshots(testInfo.snapshotDir, snapshotDir);
  });

  test("compare with prefix", async ({ page }, testInfo) => {
    const snapshotDir = "with-prefix-fields";

    const snapshotPath = path.resolve(
      testInfo.snapshotDir,
      snapshotDir,
      `${testInfo.project.name}.png`,
    );

    await page.goto("/");

    const textFieldButton = page.locator("#ui-textfield");

    await textFieldButton.click();

    const withPrefixButton = page.locator("#ui-textfield--with-prefix");

    await withPrefixButton.click();

    const textField = page
      .frameLocator("#storybook-preview-iframe")
      .locator("data-testid=TextField");

    await textField.screenshot({
      path: snapshotPath,
    });

    await compareScreenshots(testInfo.snapshotDir, snapshotDir);
  });

  test("compare with suffix", async ({ page }, testInfo) => {
    const snapshotDir = "with-suffix-fields";

    const snapshotPath = path.resolve(
      testInfo.snapshotDir,
      snapshotDir,
      `${testInfo.project.name}.png`,
    );

    await page.goto("/");

    const textFieldButton = page.locator("#ui-textfield");

    await textFieldButton.click();

    const withSuffixButton = page.locator("#ui-textfield--with-suffix");

    await withSuffixButton.click();

    const textField = page
      .frameLocator("#storybook-preview-iframe")
      .locator("data-testid=TextField");

    await textField.screenshot({
      path: snapshotPath,
    });

    await compareScreenshots(testInfo.snapshotDir, snapshotDir);
  });

  test("compare with prefix and suffix", async ({ page }, testInfo) => {
    const snapshotDir = "with-prefix-suffix-fields";

    const snapshotPath = path.resolve(
      testInfo.snapshotDir,
      snapshotDir,
      `${testInfo.project.name}.png`,
    );

    await page.goto("/");

    const textFieldButton = page.locator("#ui-textfield");

    await textFieldButton.click();

    const withPrefixSuffixButton = page.locator(
      "#ui-textfield--with-prefix-suffix",
    );

    await withPrefixSuffixButton.click();

    const textField = page
      .frameLocator("#storybook-preview-iframe")
      .locator("data-testid=TextField");

    await textField.screenshot({
      path: snapshotPath,
    });

    await compareScreenshots(testInfo.snapshotDir, snapshotDir);
  });
});
