/* eslint-disable no-console */
import fs from "fs";
import path from "path";

import { expect } from "@playwright/test";
import chalk from "chalk";
import { ComparisonOptions } from "resemblejs";
import compare from "resemblejs/compareImages";

import { CompareResult, TestInfo } from "./compareScreenshots.type";

const getTestInfo = (filePath: string) => {
  const segments = filePath.split(path.sep);

  if (!segments) {
    return null;
  }

  const specIndex = segments.findIndex((value) => /spec/.test(value));
  const componentName = segments[specIndex - 1];
  const info = segments[specIndex + 1];
  const lastSegment = segments.at(-1);

  if (!lastSegment) {
    return null;
  }

  const browserName = lastSegment.match(/[a-z]+/)?.at(0);

  if (!browserName) {
    return null;
  }

  const testInfo: TestInfo = { componentName, info, browserName };

  return testInfo;
};

const compareWithFilePaths = async (
  filePath1: string,
  filePath2: string,
  options: ComparisonOptions,
) => {
  const file1 = fs.readFileSync(filePath1);
  const file2 = fs.readFileSync(filePath2);
  const data = await compare(file1, file2, options);
  const testInfo1 = getTestInfo(filePath1);
  const testInfo2 = getTestInfo(filePath2);

  return { data, filePath1, filePath2, testInfo1, testInfo2 };
};

const compareScreenshots = async (snapshotsPath: string[], maxDiff: number) => {
  const snapshotsDir = path.resolve(...snapshotsPath);
  const files = fs.readdirSync(snapshotsDir);

  if (files.length < 3) {
    return;
  }

  const compareResults: Promise<CompareResult>[] = [];

  for (let i = 0; i < files.length - 1; i++) {
    const fileName1 = files[i];
    const file1Path = path.resolve(snapshotsDir, fileName1);

    for (let j = i + 1; j < files.length; j++) {
      const fileName2 = files[j];
      const file2Path = path.resolve(snapshotsDir, fileName2);

      const data = compareWithFilePaths(file1Path, file2Path, {
        scaleToSameSize: false,
        ignore: ["antialiasing"],
        output: { errorType: "diffOnly" },
      });

      compareResults.push(data);
    }
  }

  const results = await Promise.all(compareResults);

  const finalResult = results.reduce(
    (acc, result) => {
      const { data, testInfo1, testInfo2 } = result;

      const compareText = `${testInfo1?.componentName} ${testInfo1?.info} ${testInfo1?.browserName} vs ${testInfo2?.browserName}: ${data.rawMisMatchPercentage.toFixed(
        2,
      )}%`;

      const infoLog = chalk.yellow;

      console.log(infoLog(compareText));

      expect(data.rawMisMatchPercentage).toBeLessThan(maxDiff);

      return {
        componentTestInfo: `${testInfo1?.componentName} ${testInfo1?.info}`,
        maxDiff: Math.max(acc.maxDiff, data.rawMisMatchPercentage),
      };
    },
    { componentTestInfo: "", maxDiff: 0 },
  );

  const resultLog = chalk.whiteBright.bold.bgBlue;

  console.log(
    resultLog(
      `${
        finalResult.componentTestInfo
      } max diff was: ${finalResult.maxDiff.toFixed(2)}%`,
    ),
  );
};

export { compareScreenshots };
