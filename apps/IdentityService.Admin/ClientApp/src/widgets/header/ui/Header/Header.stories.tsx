import { Meta, Story } from "@storybook/react";

import Header from "./Header";
import { HeaderProps } from "./Header.type";
import css from "./Story.module.scss";

export default {
  title: "COMPONENTS/Header",
  component: Header,
  parameters: {
    componentSubtitle: "Subtitle goes here",
  },
} as Meta;

const Template: Story<HeaderProps> = (args) => (
  <div className={css.Story}>
    <Header {...args} />
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
