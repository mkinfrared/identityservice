import { Meta, Story } from "@storybook/react";

import { withRouter } from "utils/storybookDecorators";

import { AppLink } from "./AppLink";
import css from "./AppLink.module.scss";
import { AppLinkProps } from "./AppLink.type";

export default {
  title: "COMPONENTS/AppLink",
  component: AppLink,
  parameters: {
    componentSubtitle: "Subtitle goes here",
  },
  decorators: [withRouter],
} as Meta;

const Template: Story<AppLinkProps> = (args) => (
  <div className={css.Story}>
    <AppLink {...args}>link example</AppLink>
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
