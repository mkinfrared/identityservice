import { Meta, Story } from "@storybook/react";

import { withRouter } from "utils/storybookDecorators";

import { AppLink } from "./AppLink";
import { AppLinkProps } from "./AppLink.type";
import css from "./Story.module.scss";

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
