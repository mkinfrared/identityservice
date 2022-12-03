/* eslint-disable */
const path = require("path");

const { buildDir } = require("./appPaths");

const content = ["index.html", "**/*.js"];

const options = {
  sourceMap: true,
  content: content.map((value) => `${buildDir}/${value}`),
  css: [`${buildDir}/**/*.css`],
  output: path.resolve(buildDir, "static/css"),
  safelist: [],
};

module.exports = options;
