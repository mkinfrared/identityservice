const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const { EsbuildPlugin } = require("esbuild-loader");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { StatsWriterPlugin } = require("webpack-stats-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const postcssPresetEnv = require("postcss-preset-env");

const { buildDir } = require("./config/appPaths");
const getLocalIdent = require("./getLocalIdent");

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

const rules = [
  {
    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
    type: "asset/resource",
  },
  {
    test: cssRegex,
    exclude: cssModuleRegex,
    use: [
      MiniCssExtractPlugin.loader,
      "css-loader",
      {
        loader: "postcss-loader",
        options: {
          postcssOptions: {
            plugins: ["autoprefixer"],
          },
        },
      },
    ],
  },
  {
    test: cssModuleRegex,
    use: [
      MiniCssExtractPlugin,
      {
        loader: "css-loader",
        options: {
          esModule: true,
          importLoaders: 2,
          modules: {
            auto: true,
            getLocalIdent,
          },
        },
      },
      {
        loader: "postcss-loader",
        options: {
          postcssOptions: {
            plugins: ["autoprefixer"],
          },
        },
      },
    ],
  },
  {
    test: sassModuleRegex,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          esModule: true,
          importLoaders: 2,
          modules: {
            auto: true,
            getLocalIdent,
          },
        },
      },
      {
        loader: "postcss-loader",
        options: {
          postcssOptions: {
            plugins: ["autoprefixer", postcssPresetEnv({ stage: 0 })],
          },
        },
      },
      {
        loader: "resolve-url-loader",
      },
      {
        loader: "sass-loader",
        options: {
          sassOptions: {
            sourceMap: true,
            sourceMapContents: false,
          },
        },
      },
    ],
  },
  {
    test: sassRegex,
    exclude: sassModuleRegex,
    use: [
      MiniCssExtractPlugin.loader,
      "css-loader",
      {
        loader: "postcss-loader",
        options: {
          postcssOptions: {
            plugins: ["autoprefixer", postcssPresetEnv({ stage: 0 })],
          },
        },
      },
      {
        loader: "resolve-url-loader",
      },
      {
        loader: "sass-loader",
        options: {
          sassOptions: {
            sourceMap: true,
            sourceMapContents: false,
          },
        },
      },
    ],
  },
  {
    test: /\.(js|mjs|jsx|ts|tsx)$/,
    loader: "esbuild-loader",
    options: {
      // JavaScript version to compile to
      target: "es2020",
    },
  },
  {
    test: /\.svg$/,
    use: ["@svgr/webpack", "url-loader"],
  },
];

const plugins = [
  new CleanWebpackPlugin(),
  new ForkTsCheckerWebpackPlugin(),
  new HtmlWebpackPlugin({
    filename: path.resolve("../Views/Shared/_Layout.cshtml"),
    inject: "body",
    minify: false,
    publicPath: "~",
    template: path.resolve("./public/Layout.template.html"),
  }),
  new HtmlWebpackPlugin({
    inject: "body",
    minify: false,
    publicPath: "~",
  }),
  new MiniCssExtractPlugin({
    chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
    filename: "static/css/[name].[contenthash:8].css",
  }),
  new Dotenv(),
  new StatsWriterPlugin({
    fields: null,
  }),
];

const config = {
  target: ["browserslist"],
  mode: "production",
  devtool: "source-map",
  entry: {
    main: path.resolve("./src/index.tsx"),
  },
  module: {
    rules,
  },
  resolve: {
    modules: [path.resolve(__dirname, "./src"), "node_modules"],
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  output: {
    assetModuleFilename: "static/media/[name].[contenthash:8][ext]",
    chunkFilename: "static/js/[name].[contenthash:8].chunk.js",
    filename: "static/js/[name].[contenthash:8].js",
    path: buildDir,
  },
  optimization: {
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
      name: (module, chunks, cacheGroupKey) => {
        const { name, version } =
          module.resourceResolveData.descriptionFileData;

        const moduleFileName = `${name?.replace(/@/, "")}-${version}`;

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
    minimize: true,
    minimizer: [
      new EsbuildPlugin({
        target: "es2020", // Syntax to compile to (see options below for possible values)
      }),
      new CssMinimizerPlugin(),
    ],
  },
  plugins,
};

module.exports = config;
