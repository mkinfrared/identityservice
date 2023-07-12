import { Meta, Story } from "@storybook/react";

import Main from "./Main";
import { MainProps } from "./Main.type";
import css from "./Story.module.scss";

export default {
  title: "COMPONENTS/Main",
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

Default.args = {};

Default.parameters = {
  docs: {
    storyDescription: "Story description",
  },
};

export { Default };
