import path from "path";

import { test } from "@playwright/test";

import { compareScreenshots } from "utils/testHelpers";

test.describe("Fieldset", () => {
  const newTabTitle = "Open canvas in new tab";

  test.afterAll(async ({ screenshot }, testInfo) => {
    // eslint-disable-next-line no-unused-expressions
    screenshot;

    await compareScreenshots(3, testInfo.snapshotDir);
  });

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

    const newTabLink = page.getByTitle(newTabTitle);
    const href = await newTabLink.getAttribute("href");

    await page.goto(`/${href!}`);

    const fieldset = page.getByTestId("Fieldset");

    await fieldset.screenshot({
      path: snapshotPath,
    });
  });
});
