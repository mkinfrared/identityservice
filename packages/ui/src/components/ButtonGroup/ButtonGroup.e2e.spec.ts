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

    await page.goto(
      "/iframe.html?args=variant:contained&id=ui-buttongroup--default&viewMode=story",
    );

    const buttonGroup = page.locator("data-testid=ButtonGroup").first();

    await page.waitForTimeout(500);

    await buttonGroup.screenshot({
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
      "/iframe.html?args=variant:outlined&id=ui-buttongroup--default&viewMode=story",
    );

    const buttonGroup = page.locator("data-testid=ButtonGroup").first();

    await page.waitForTimeout(500);

    await buttonGroup.screenshot({
      path: snapshotPath,
    });

    await compareScreenshots([testInfo.snapshotDir, snapshotDir], 19);
  });

  test("compare with icon", async ({ page }, testInfo) => {
    const snapshotDir = "with-icon";

    const snapshotPath = path.resolve(
      testInfo.snapshotDir,
      snapshotDir,
      `${testInfo.project.name}.png`,
    );

    await page.goto(
      "/iframe.html?args=&id=ui-buttongroup--with-icon&viewMode=story",
    );

    const buttonGroup = page.locator("data-testid=ButtonGroup").first();

    await page.waitForTimeout(500);

    await buttonGroup.screenshot({
      path: snapshotPath,
    });

    await compareScreenshots([testInfo.snapshotDir, snapshotDir], 10);
  });
});
