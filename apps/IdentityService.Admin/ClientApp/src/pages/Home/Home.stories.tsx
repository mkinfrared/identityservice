import { Meta, Story } from "@storybook/react";

import { Home } from "./Home";
import { HomeProps } from "./Home.type";
import css from "./Story.module.scss";

export default {
  title: "PAGES/Home",
  component: Home,
  parameters: {
    componentSubtitle: "Subtitle goes here",
  },
} as Meta;

const Template: Story<HomeProps> = () => (
  <div className={css.Story}>
    <Home />
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
