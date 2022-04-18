import path from "path";

import { test } from "@playwright/test";

import { compareScreenshots } from "utils/testHelpers";

test.describe("Fieldset", () => {
  test("compare fieldsets", async ({ page }, testInfo) => {
    const snapshotDir = "default";

    const snapshotPath = path.resolve(
      testInfo.snapshotDir,
      snapshotDir,
      `${testInfo.project.name}.png`,
    );

    await page.goto("/");

    const fieldsetButton = page.locator("#ui-fieldset");

    await fieldsetButton.click();

    const defaultButton = page.locator("#ui-fieldset--default");

    await defaultButton.click();

    const fieldset = page
      .frameLocator("#storybook-preview-iframe")
      .locator("data-testid=Fieldset");

    await fieldset.screenshot({
      path: snapshotPath,
    });

    await compareScreenshots(testInfo.snapshotDir, snapshotDir);
  });
});
