/* eslint-disable no-param-reassign,import/no-unused-modules */
import { CracoConfig } from "@craco/types";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CracoEsbuildPlugin from "craco-esbuild";
import { Chunk, NormalModule } from "webpack";

const { NODE_ENV } = process.env;
const isDev = NODE_ENV === "development";
const isProd = !isDev;

const cracoConfig: CracoConfig = {
  eslint: {
    enable: isProd,
  },
  plugins: [
    {
      plugin: CracoEsbuildPlugin,
      options: {
        // includePaths: ["/external/dir/with/components"], // Optional. If you want to include components which are not in src folder
        esbuildLoaderOptions: {
          // Optional. Defaults to auto-detect loader.
          loader: "tsx", // Set the value to 'tsx' if you use typescript
          target: "es2020",
        },
        esbuildMinimizerOptions: {
          // Optional. Defaults to:
          target: "es2020",
          css: false, // if true, OptimizeCssAssetsWebpackPlugin will also be replaced by esbuild.
        },
        skipEsbuildJest: true, // Optional. Set to true if you want to use babel for jest tests,
        esbuildJestOptions: {
          loaders: {
            ".ts": "ts",
            ".tsx": "tsx",
          },
        },
      },
    },
  ],
  webpack: {
    configure: (webpackConfig) => {
      if (isDev) {
        return webpackConfig;
      }

      webpackConfig.optimization = {
        ...webpackConfig.optimization,
        chunkIds: "named",
        splitChunks: {
          chunks: "all",
          enforceSizeThreshold: 50000,
          hidePathInfo: true,
          minSize: 20000,
          minRemainingSize: 0,
          minChunks: 1,
          maxAsyncRequests: 30,
          maxInitialRequests: 30,
          name: (
            module: NormalModule,
            chunks: Chunk[],
            cacheGroupKey: string,
          ) => {
            if (!module.resourceResolveData?.descriptionFileData) {
              const moduleFileName = module
                .identifier()
                .split("/")
                .reduceRight((item) => item);

              const allChunksNames = chunks.map((item) => item.name).join("~");

              return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
            }

            const { name, version } =
              module.resourceResolveData.descriptionFileData;

            let moduleFileName = `${name?.replace(/@/, "")}@${version}`;

            moduleFileName = `${name?.replace(/\//, "-")}@${version}`;

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
        runtimeChunk: true,
      };

      return webpackConfig;
    },
  },
};

export default cracoConfig;
