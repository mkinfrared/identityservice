import { ComparisonResult } from "resemblejs";

export type TestInfo = {
  componentName: string;
  info: string;
  browserName: string;
};

export type CompareResult = {
  data: ComparisonResult;
  filePath1: string;
  filePath2: string;
  testInfo1: TestInfo | null;
  testInfo2: TestInfo | null;
};
