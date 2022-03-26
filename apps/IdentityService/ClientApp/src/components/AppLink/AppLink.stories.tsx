import { Meta, Story } from "@storybook/react";

import { AppLink } from "./AppLink";
import css from "./AppLink.module.scss";
import { AppLinkProps } from "./AppLink.type";

export default {
  title: "COMPONENTS/AppLink",
  component: AppLink,
  parameters: {
    componentSubtitle: "Subtitle goes here",
  },
} as Meta;

const Template: Story<AppLinkProps> = (args) => (
  <div className={css.Story}>
    <AppLink {...args} />
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
