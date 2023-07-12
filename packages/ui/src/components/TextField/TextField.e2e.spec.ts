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

    await page.goto(
      "/iframe.html?args=value:&id=ui-textfield--uncontrolled&viewMode=story",
    );

    const textField = page.locator("data-testid=TextField");

    await page.waitForTimeout(500);

    await textField.screenshot({
      path: snapshotPath,
    });

    await compareScreenshots([testInfo.snapshotDir, snapshotDir], 2);
  });

  test("compare filled fields", async ({ page }, testInfo) => {
    const snapshotDir = "filled-fields";

    const snapshotPath = path.resolve(
      testInfo.snapshotDir,
      snapshotDir,
      `${testInfo.project.name}.png`,
    );

    await page.goto(
      "/iframe.html?args=value:marklar&id=ui-textfield--uncontrolled&viewMode=story",
    );

    const textField = page.locator("data-testid=TextField");

    await page.waitForTimeout(500);

    await textField.screenshot({
      path: snapshotPath,
    });

    await compareScreenshots([testInfo.snapshotDir, snapshotDir], 1);
  });

  test("compare error fields", async ({ page }, testInfo) => {
    const snapshotDir = "error-fields";

    const snapshotPath = path.resolve(
      testInfo.snapshotDir,
      snapshotDir,
      `${testInfo.project.name}.png`,
    );

    await page.goto(
      "/iframe.html?args=error:marklar&id=ui-textfield--uncontrolled&viewMode=story",
    );

    const textField = page.locator("data-testid=TextField");

    await page.waitForTimeout(500);

    await textField.screenshot({
      path: snapshotPath,
    });

    await compareScreenshots([testInfo.snapshotDir, snapshotDir], 1);
  });

  test("compare disabled fields", async ({ page }, testInfo) => {
    const snapshotDir = "disabled-fields";

    const snapshotPath = path.resolve(
      testInfo.snapshotDir,
      snapshotDir,
      `${testInfo.project.name}.png`,
    );

    await page.goto(
      "/iframe.html?args=disabled:true&id=ui-textfield--uncontrolled&viewMode=story",
    );

    const textField = page.locator("data-testid=TextField");

    await page.waitForTimeout(500);

    await textField.screenshot({
      path: snapshotPath,
    });

    await compareScreenshots([testInfo.snapshotDir, snapshotDir], 1);
  });

  test("compare with label fields", async ({ page }, testInfo) => {
    const snapshotDir = "with-label-fields";

    const snapshotPath = path.resolve(
      testInfo.snapshotDir,
      snapshotDir,
      `${testInfo.project.name}.png`,
    );

    await page.goto(
      "/iframe.html?args=label:Marklar&id=ui-textfield--uncontrolled&viewMode=story",
    );

    const textField = page.locator("data-testid=TextField");

    await page.waitForTimeout(500);

    await textField.screenshot({
      path: snapshotPath,
    });

    await compareScreenshots([testInfo.snapshotDir, snapshotDir], 1);
  });

  test("compare with prefix", async ({ page }, testInfo) => {
    const snapshotDir = "with-prefix-fields";

    const snapshotPath = path.resolve(
      testInfo.snapshotDir,
      snapshotDir,
      `${testInfo.project.name}.png`,
    );

    await page.goto(
      "/iframe.html?args=&id=ui-textfield--with-prefix&viewMode=story",
    );

    const textField = page.locator("data-testid=TextField");

    await page.waitForTimeout(500);

    await textField.screenshot({
      path: snapshotPath,
    });

    await compareScreenshots([testInfo.snapshotDir, snapshotDir], 1);
  });

  test("compare with suffix", async ({ page }, testInfo) => {
    const snapshotDir = "with-suffix-fields";

    const snapshotPath = path.resolve(
      testInfo.snapshotDir,
      snapshotDir,
      `${testInfo.project.name}.png`,
    );

    await page.goto(
      "/iframe.html?args=&id=ui-textfield--with-suffix&viewMode=story",
    );

    const textField = page.locator("data-testid=TextField");

    await page.waitForTimeout(500);

    await textField.screenshot({
      path: snapshotPath,
    });

    await compareScreenshots([testInfo.snapshotDir, snapshotDir], 1);
  });

  test("compare with prefix and suffix", async ({ page }, testInfo) => {
    const snapshotDir = "with-prefix-suffix-fields";

    const snapshotPath = path.resolve(
      testInfo.snapshotDir,
      snapshotDir,
      `${testInfo.project.name}.png`,
    );

    await page.goto(
      "/iframe.html?args=&id=ui-textfield--with-prefix-suffix&viewMode=story",
    );

    const textField = page.locator("data-testid=TextField");

    await page.waitForTimeout(500);

    await textField.screenshot({
      path: snapshotPath,
    });

    await compareScreenshots([testInfo.snapshotDir, snapshotDir], 1);
  });
});
