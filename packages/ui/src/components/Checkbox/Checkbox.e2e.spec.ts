import path from "path";

import { test } from "@playwright/test";

import { compareScreenshots } from "utils/testHelpers";

test.describe("Checkbox", () => {
  test("compare unchecked with no label", async ({ page }, testInfo) => {
    const snapshotDir = "empty-label";

    const snapshotPath = path.resolve(
      testInfo.snapshotDir,
      snapshotDir,
      `${testInfo.project.name}.png`,
    );

    await page.goto(
      "/iframe.html?args=label:&id=ui-checkbox--uncontrolled&viewMode=story",
    );

    const checkbox = page.locator("data-testid=Checkbox");

    await page.waitForTimeout(500);

    await checkbox.screenshot({
      path: snapshotPath,
    });

    await compareScreenshots([testInfo.snapshotDir, snapshotDir], 1);
  });

  test("compare checked with no label", async ({ page }, testInfo) => {
    const snapshotDir = "empty-label-checked";

    const snapshotPath = path.resolve(
      testInfo.snapshotDir,
      snapshotDir,
      `${testInfo.project.name}.png`,
    );

    await page.goto(
      "/iframe.html?args=label:;checked:true&id=ui-checkbox--uncontrolled&viewMode=story",
    );

    const checkbox = page.locator("data-testid=Checkbox");

    await page.waitForTimeout(500);

    await checkbox.screenshot({
      path: snapshotPath,
    });

    await compareScreenshots([testInfo.snapshotDir, snapshotDir], 9);
  });

  test("compare with label", async ({ page }, testInfo) => {
    const snapshotDir = "filled-label";

    const snapshotPath = path.resolve(
      testInfo.snapshotDir,
      snapshotDir,
      `${testInfo.project.name}.png`,
    );

    await page.goto(
      "/iframe.html?args=checked:true&id=ui-checkbox--uncontrolled&viewMode=story",
    );

    const checkbox = page.locator("data-testid=Checkbox");

    await page.waitForTimeout(500);

    await checkbox.screenshot({
      path: snapshotPath,
    });

    await compareScreenshots([testInfo.snapshotDir, snapshotDir], 9);
  });
});
