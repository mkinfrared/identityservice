import path from "path";

import { test } from "@playwright/test";

import { compareScreenshots } from "utils/testHelpers";

test.describe("LinkButton", () => {
  test("compare contained", async ({ page }, testInfo) => {
    const snapshotDir = "contained";

    const snapshotPath = path.resolve(
      testInfo.snapshotDir,
      snapshotDir,
      `${testInfo.project.name}.png`,
    );

    await page.goto(
      "/iframe.html?args=&id=ui-linkbutton--default&viewMode=story",
    );

    const linkButton = page.locator("data-testid=LinkButton").first();

    await page.waitForTimeout(500);

    await linkButton.screenshot({
      path: snapshotPath,
    });

    await compareScreenshots([testInfo.snapshotDir, snapshotDir], 13);
  });

  test("compare outlined variant", async ({ page }, testInfo) => {
    const snapshotDir = "outlined-variant";

    const snapshotPath = path.resolve(
      testInfo.snapshotDir,
      snapshotDir,
      `${testInfo.project.name}.png`,
    );

    await page.goto(
      "/iframe.html?args=variant:outlined&id=ui-linkbutton--default&viewMode=story",
    );

    const button = page.locator("data-testid=LinkButton").first();

    await page.waitForTimeout(500);

    await button.screenshot({
      path: snapshotPath,
    });

    await compareScreenshots([testInfo.snapshotDir, snapshotDir], 21);
  });
});
