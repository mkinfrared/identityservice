import { Meta, Story } from "@storybook/react";

import MainSidebar from "./MainSidebar";
import { MainSidebarProps } from "./MainSidebar.type";
import css from "./Story.module.scss";

export default {
  title: "COMPONENTS/MainSidebar",
  component: MainSidebar,
  parameters: {
    componentSubtitle: "Subtitle goes here",
  },
} as Meta;

const Template: Story<MainSidebarProps> = (args) => (
  <div className={css.Story}>
    <MainSidebar {...args} />
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
