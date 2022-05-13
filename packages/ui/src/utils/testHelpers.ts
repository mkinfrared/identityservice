/* eslint-disable no-console */
import fs from "fs";
import path from "path";

import { expect } from "@playwright/test";
import { ComparisonResult } from "resemblejs";
import compare from "resemblejs/compareImages";

const compareScreenshots = async (...snapshotsPath: string[]) => {
  const snapshotsDir = path.resolve(...snapshotsPath);
  const files = fs.readdirSync(snapshotsDir);

  if (files.length === 1) {
    return;
  }

  const compareResults: Promise<ComparisonResult>[] = [];

  for (let i = 0; i < files.length - 1; i++) {
    const fileName1 = files[i];
    const file1 = fs.readFileSync(path.resolve(snapshotsDir, fileName1));

    for (let j = i + 1; j < files.length; j++) {
      const fileName2 = files[j];
      const file2 = fs.readFileSync(path.resolve(snapshotsDir, fileName2));

      const data = compare(file1, file2, {
        scaleToSameSize: false,
        ignore: ["antialiasing"],
        output: { errorType: "diffOnly" },
      });

      compareResults.push(data);
    }
  }

  const results = await Promise.all(compareResults);

  const maxDiff = results.reduce((acc, result) => {
    console.log(result);

    expect(result.rawMisMatchPercentage).toBeLessThan(10);

    return Math.max(acc, result.rawMisMatchPercentage);
  }, 0);

  console.log(`Max difference in screenshots was ${maxDiff}%`);
};

export { compareScreenshots };
