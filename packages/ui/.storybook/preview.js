import "../src/styles/colors.css";
import "../src/story.scss";

const tokenContext = require.context(
  "!!raw-loader!../src",
  true,
  /.\.(css|less|svg)$/,
);

const tokenFiles = tokenContext.keys().map(function (filename) {
  return { filename: filename, content: tokenContext(filename).default };
});

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  designToken: {
    files: tokenFiles,
  },
};
