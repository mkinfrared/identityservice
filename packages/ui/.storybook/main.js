module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    {
      name: "@storybook/preset-create-react-app",
      options: {
        scriptsPackageName: "../node_modules/react-scripts",
      },
    },
    "@storybook/addon-a11y",
    "aria-live-storybook-addon",
    "storybook-design-token",
    {
      name: "storybook-addon-turbo-build",
      options: {
        // Please refer below tables for available options
        optimizationLevel: 2,
      },
    },
  ],
  core: {
    builder: "@storybook/builder-webpack5",
  },
  // typescript: {
  //   check: false,
  //   checkOptions: {},
  //   reactDocgen: "react-docgen-typescript",
  //   reactDocgenTypescriptOptions: {
  //     shouldExtractLiteralValuesFromEnum: true,
  //     // propFilter: (prop) => true,
  //   },
  // },
};
