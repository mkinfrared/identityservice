/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      const buildDirectory = path.resolve("../wwwroot");

      paths.appBuild = buildDirectory;
      webpackConfig.output.path = buildDirectory;

      webpackConfig.optimization = {
        splitChunks: {
          chunks: "all",
          enforceSizeThreshold: 50000,
          hidePathInfo: true,
          minSize: 20000,
          minRemainingSize: 0,
          minChunks: 1,
          maxAsyncRequests: 30,
          maxInitialRequests: 30,
          name: (module, chunks, cacheGroupKey) => {
            const { descriptionFileData, descriptionFilePath } =
              module.resourceResolveData;

            const { name, version } = descriptionFileData;

            let moduleFileName = name?.replace(/@/, "") ?? module.rawRequest;

            if (version) {
              moduleFileName += `-${version}`;
            }

            return `${cacheGroupKey}~${moduleFileName}`;
          },
          cacheGroups: {
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              reuseExistingChunk: true,
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        },
      };

      return webpackConfig;
    },
  },
};
