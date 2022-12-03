/* eslint-disable import/no-unused-modules */
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import url from "@rollup/plugin-url";
import svgr from "@svgr/rollup";
import { InputPluginOption, ModuleFormat, RollupOptions } from "rollup";
import del from "rollup-plugin-delete";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";
import ts from "rollup-plugin-ts";
import { visualizer } from "rollup-plugin-visualizer";
import typescript from "typescript";

const buildDir = "lib";
const input = "src/index.ts";
const external = ["react", "react-dom"];

const getOutput = (format: ModuleFormat) => {
  const output = {
    dir: `${buildDir}/${format}`,
    format,
    preserveModules: format === "esm",
    preserveModulesRoot: "src",
    sourcemap: true,
  };

  return output;
};

const getPlugins = () => {
  const plugins: InputPluginOption = [
    resolve(),
    commonjs(),
    ts({
      typescript,
      tsconfig: "./tsconfig.json",
    }),
    babel({
      exclude: "node_modules/**",
      babelHelpers: "bundled",
    }),
    url(),
    svgr(),
    postcss({
      inject: false,
      extract: false,
      minimize: true,
      modules: true,
      use: ["sass"],
    }),
    terser(),
    visualizer({
      filename: "bundle-analysis.html",
      template: "treemap",
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ];

  return plugins;
};

const config: RollupOptions[] = [
  // commonjs build
  {
    input,
    output: getOutput("cjs"),
    plugins: [del({ targets: buildDir }), ...getPlugins()],
    external,
  },
  // esmodule build
  {
    input,
    output: getOutput("esm"),
    plugins: getPlugins(),
    external,
  },
];

export default config;
