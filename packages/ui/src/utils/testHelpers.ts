/* eslint-disable no-console,no-await-in-loop */
/* istanbul ignore file */

import fs from "fs/promises";
import path from "path";

import { expect } from "@playwright/test";
import { ComparisonResult } from "resemblejs";
import compare from "resemblejs/compareImages";

const getSnapshotDirectories = async (snapshotsDir: string) => {
  const readResult = await fs.readdir(snapshotsDir);

  const directories = readResult
    .filter(async (result) => {
      const stat = await fs.stat(path.resolve(snapshotsDir, result));

      return stat.isDirectory();
    })
    .map((dir) => path.resolve(snapshotsDir, dir));

  return directories;
};

const getSnapshotFiles = async (snapshotsDir: string) => {
  const readResult = await fs.readdir(snapshotsDir);

  const files = readResult
    .filter(async (result) => {
      const stat = await fs.stat(path.resolve(snapshotsDir, result));

      return stat.isFile();
    })
    .map((file) => path.resolve(snapshotsDir, file));

  return files;
};

const compareResults = async (files: string[]) => {
  const results: ComparisonResult[] = [];

  if (files.length < 2) {
    return results;
  }

  for (let i = 0; i < files.length - 1; i++) {
    const filePath1 = files[i];
    const file1 = await fs.readFile(filePath1);

    for (let j = i + 1; j < files.length; j++) {
      const filePath2 = files[j];
      const file2 = await fs.readFile(filePath2);

      const data = await compare(file1, file2, {
        scaleToSameSize: false,
        ignore: ["antialiasing"],
        output: { errorType: "diffOnly" },
      });

      results.push(data);
    }
  }

  return results;
};

const compareScreenshots = async (minDiff: number, snapshotsDir: string) => {
  const snapshotsDirectories = await getSnapshotDirectories(snapshotsDir);

  for (const directory of snapshotsDirectories) {
    const files = await getSnapshotFiles(directory);
    const results = await compareResults(files);

    results.forEach((result) => {
      expect(result.rawMisMatchPercentage).toBeLessThan(minDiff);
    }, 0);
  }
};

export { compareScreenshots };
