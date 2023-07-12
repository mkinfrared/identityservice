import type { Preview } from "@storybook/react";
import { useTheme } from "../src/hooks/useTheme";

import "./styles/story.scss";
import React, { useEffect } from "react";

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

        if (!theme) {
          return;
        }

        setPreferredTheme(theme);
      }, [context]);
      return (
        <div className="storyWrapper">
          <Story />
        </div>
      );
    },
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        // color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
