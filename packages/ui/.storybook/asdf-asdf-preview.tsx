import type { Preview } from "@storybook/react";

import React, { useEffect } from "react";

import "../src/styles/colors.css";
import { useTheme } from "../src/hooks/useTheme";

import "./styles/story.scss";

const getTheme = (backgroundColor: string) => {
  switch (backgroundColor) {
    case "#333333":
      return "dark";
    case "#F8F8F8":
      return "light";
    default:
      return "dark";
  }
};

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const { setPreferredTheme } = useTheme("app-story-theme");

      useEffect(() => {
        const { backgrounds } = context.globals;
        const theme = getTheme(backgrounds?.value);

        setPreferredTheme(theme);
      }, [context]);

      return <Story />;
    },
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
