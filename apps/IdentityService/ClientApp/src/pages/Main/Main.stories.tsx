import { Meta, Story } from "@storybook/react";

import { Main } from "./Main";
import css from "./Main.module.scss";
import { MainProps, Routes } from "./Main.type";

export default {
  title: "PAGES/Main",
  component: Main,
  parameters: {
    componentSubtitle: "Subtitle goes here",
  },
} as Meta;

const Template: Story<MainProps> = (args) => (
  <div className={css.Story}>
    <Main {...args} />
  </div>
);

const Default = Template.bind({});

Default.args = {
  path: Routes.LOGIN,
};

Default.parameters = {
  docs: {
    storyDescription: "Story description",
  },
};

export { Default };
