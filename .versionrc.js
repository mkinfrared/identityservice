const path = require("path");

const netApp = {
  filename: "./IdentityService/IdentityService.csproj",
  updater: require("./versionBumper")
};

const reactApp = {
  filename: "./IdentityService/client/package.json",
  type: "json"
};

const root = {
  filename: "./package.json",
  type: "json"
}

module.exports = {
  bumpFiles: [netApp, reactApp, root],
  packageFiles: [netApp, reactApp, root]
};
