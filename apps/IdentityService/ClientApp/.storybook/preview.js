import "@identity-service/ui/lib/esm/styles.min.css";
import "../src/index.scss";
import { useTheme } from "@identity-service/ui";
import { useEffect } from "react";

const tokenContext = require.context(
  "!!raw-loader!../src",
  true,
  /.\.(css|less|scss|svg)$/,
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

const getTheme = (backgroundColor) => {
  switch (backgroundColor) {
    case "#333333":
      return "dark";
    case "#F8F8F8":
      return "light";
    default:
      return "dark";
  }
};

export const decorators = [
  (Story, context) => {
    const { setPreferredTheme } = useTheme("app-story-theme");

    useEffect(() => {
      const { backgrounds } = context.globals;
      const theme = getTheme(backgrounds?.value);

      setPreferredTheme(theme);
    }, [context]);

    return <Story />;
  },
];
