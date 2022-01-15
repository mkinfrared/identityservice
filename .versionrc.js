const path = require("path");

const identityService = {
  filename: "./apps/IdentityService/IdentityService.csproj",
  updater: require("./versionBumper"),
};

const identityServiceAdmin = {
  filename: "./apps/IdentityService/IdentityService.Admin.csproj",
  updater: require("./versionBumper"),
};

const identityServiceTest = {
  filename: "./apps/IdentityService.Test/IdentityService.Test.csproj",
  updater: require("./versionBumper"),
};

const clientApp = {
  filename: "./apps/IdentityService/ClientApp/package.json",
  type: "json",
};

const adminApp = {
  filename: "./apps/IdentityService.Admin/ClientApp/package.json",
  type: "json",
};

const core = {
  filename: "./packages/core/package.json",
  type: "json",
};

const ui = {
  filename: "./packages/ui/package.json",
  type: "json",
};

const root = {
  filename: "./package.json",
  type: "json",
};

module.exports = {
  bumpFiles: [
    identityService,
    identityServiceAdmin,
    identityServiceTest,
    core,
    ui,
    clientApp,
    adminApp,
    root,
  ],
  packageFiles: [
    identityService,
    identityServiceAdmin,
    identityServiceTest,
    core,
    ui,
    clientApp,
    adminApp,
    root,
  ],
};
