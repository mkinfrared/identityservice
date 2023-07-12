import path from "path";

import { test } from "@playwright/test";

import { compareScreenshots } from "utils/testHelpers";

test.describe("Button", () => {
  test("compare default button", async ({ page }, testInfo) => {
    const snapshotDir = "default";

    const snapshotPath = path.resolve(
      testInfo.snapshotDir,
      snapshotDir,
      `${testInfo.project.name}.png`,
    );

    await page.goto("/iframe.html?args=&id=ui-button--default&viewMode=story");

    const button = page.locator("data-testid=Button").first();

    await page.waitForTimeout(500);

    await button.screenshot({
      path: snapshotPath,
    });

    await compareScreenshots([testInfo.snapshotDir, snapshotDir], 13);
  });

  test("compare disabled state", async ({ page }, testInfo) => {
    const snapshotDir = "disabled";

    const snapshotPath = path.resolve(
      testInfo.snapshotDir,
      snapshotDir,
      `${testInfo.project.name}.png`,
    );

    await page.goto(
      "/iframe.html?args=disabled:true&id=ui-button--default&viewMode=story",
    );

    const button = page.locator("data-testid=Button").first();

    await page.waitForTimeout(500);

    await button.screenshot({
      path: snapshotPath,
    });

    await compareScreenshots([testInfo.snapshotDir, snapshotDir], 14);
  });

  test("compare outlined variant", async ({ page }, testInfo) => {
    const snapshotDir = "outlined-variant";

    const snapshotPath = path.resolve(
      testInfo.snapshotDir,
      snapshotDir,
      `${testInfo.project.name}.png`,
    );

    await page.goto(
      "/iframe.html?args=variant:outlined&id=ui-button--default&viewMode=story",
    );

    const button = page.locator("data-testid=Button").first();

    await page.waitForTimeout(500);

    await button.screenshot({
      path: snapshotPath,
    });

    await compareScreenshots([testInfo.snapshotDir, snapshotDir], 21);
  });
});
