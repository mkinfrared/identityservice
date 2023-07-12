import path from "path";
import { exec } from "child_process";

const compileTokens = () => {
  const tokensDir = path.resolve(__dirname, "../src/styles/tokens");

  exec(`sass ${tokensDir}:${tokensDir}`);
};

export { compileTokens };
