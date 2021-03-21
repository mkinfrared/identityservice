const path = require("path");

const netApp = {
  filename: "./src/IdentityService/IdentityService.csproj",
  updater: require("./versionBumper")
};

const reactApp = {
  filename: "./src/IdentityService/client/package.json",
  type: "json"
};

const root = {
  filename: "./package.json",
  type: "json"
};

module.exports = {
  bumpFiles: [netApp, reactApp, root],
  packageFiles: [netApp, reactApp, root]
};
