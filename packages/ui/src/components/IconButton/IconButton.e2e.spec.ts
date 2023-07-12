import path from "path";

import { test } from "@playwright/test";

import { compareScreenshots } from "utils/testHelpers";

test.describe("IconButton", () => {
  test("compare default", async ({ page }, testInfo) => {
    const snapshotDir = "default";

    const snapshotPath = path.resolve(
      testInfo.snapshotDir,
      snapshotDir,
      `${testInfo.project.name}.png`,
    );

    await page.goto(
      "/iframe.html?args=&id=ui-iconbutton--default&viewMode=story",
    );

    const iconButton = page.locator("data-testid=IconButton").first();

    await page.waitForTimeout(500);

    await iconButton.screenshot({
      path: snapshotPath,
    });

    await compareScreenshots([testInfo.snapshotDir, snapshotDir], 9);
  });

  test("compare outline variant", async ({ page }, testInfo) => {
    const snapshotDir = "outline";

    const snapshotPath = path.resolve(
      testInfo.snapshotDir,
      snapshotDir,
      `${testInfo.project.name}.png`,
    );

    await page.goto(
      "/iframe.html?args=variant:outlined&id=ui-iconbutton--default&viewMode=story",
    );

    const iconButton = page.locator("data-testid=IconButton").first();

    await page.waitForTimeout(500);

    await iconButton.screenshot({
      path: snapshotPath,
    });

    await compareScreenshots([testInfo.snapshotDir, snapshotDir], 12);
  });

  test("compare outline loading variant", async ({ page }, testInfo) => {
    const snapshotDir = "outline-loading";

    const snapshotPath = path.resolve(
      testInfo.snapshotDir,
      snapshotDir,
      `${testInfo.project.name}.png`,
    );

    await page.goto(
      "/iframe.html?args=variant:outlined;loading:true&id=ui-iconbutton--default&viewMode=story",
    );

    const iconButton = page.locator("data-testid=IconButton").first();

    await page.waitForTimeout(500);

    await iconButton.screenshot({
      path: snapshotPath,
    });

    await compareScreenshots([testInfo.snapshotDir, snapshotDir], 14);
  });

  test("compare contained loading variant", async ({ page }, testInfo) => {
    const snapshotDir = "contained-loading";

    const snapshotPath = path.resolve(
      testInfo.snapshotDir,
      snapshotDir,
      `${testInfo.project.name}.png`,
    );

    await page.goto(
      "/iframe.html?args=loading:true&id=ui-iconbutton--default&viewMode=story",
    );

    const iconButton = page.locator("data-testid=IconButton").first();

    await page.waitForTimeout(500);

    await iconButton.screenshot({
      path: snapshotPath,
    });

    await compareScreenshots([testInfo.snapshotDir, snapshotDir], 14);
  });
});
