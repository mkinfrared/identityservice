import path from "path";

import { test } from "@playwright/test";

import { compareScreenshots } from "utils/testHelpers";

test.describe("LinkButton", () => {
  test.afterAll(async ({ screenshot }, testInfo) => {
    // eslint-disable-next-line no-unused-expressions
    screenshot;

    await compareScreenshots(14, testInfo.snapshotDir);
  });

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

    // const linkButton = await page.getByRole("link", { name: "Contained" });
    const linkButton = page
      .frameLocator("#storybook-preview-iframe")
      .getByTestId("LinkButton")
      .filter({ hasText: "Contained" });

    await linkButton.screenshot({
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

    const buttonNode = page.locator("#ui-linkbutton");

    await buttonNode.click();

    const defaultButton = page.locator("#ui-linkbutton--default");

    await defaultButton.click();

    const linkButton = page
      .frameLocator("#storybook-preview-iframe")
      .getByTestId("LinkButton")
      .filter({ hasText: "Outlined" });

    await linkButton.screenshot({
      path: snapshotPath,
    });
  });
});
