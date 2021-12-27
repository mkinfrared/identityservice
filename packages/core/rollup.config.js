import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import url from "@rollup/plugin-url";
import svgr from "@svgr/rollup";
import ts from "@wessberg/rollup-plugin-ts";
import del from "rollup-plugin-delete";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";
import visualizer from "rollup-plugin-visualizer";
import ttypescript from "ttypescript";

const extensions = [".js", ".ts", ".jsx", ".tsx"];
const dir = "lib";

export default {
  input: "src/index.ts",
  output: {
    dir,
    format: "esm",
    preserveModules: true,
    preserveModulesRoot: "src",
    sourcemap: true,
  },
  plugins: [
    del({ targets: dir }),
    resolve(),
    commonjs(),
    ts({
      typescript: ttypescript,
      tsconfig: "./tsconfig.json",
    }),
    url(),
    svgr(),
    postcss({
      extract: false,
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
  ],
  external: ["react", "react-dom"],
};
