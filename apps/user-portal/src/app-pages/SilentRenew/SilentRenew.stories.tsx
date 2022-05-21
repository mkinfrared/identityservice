import { Meta, Story } from "@storybook/react";

import { SilentRenew } from "./SilentRenew";
import { SilentRenewProps } from "./SilentRenew.type";
import css from "./Story.module.scss";

export default {
  title: "APP-PAGES/SilentRenew",
  component: SilentRenew,
  parameters: {
    componentSubtitle: "Subtitle goes here",
  },
} as Meta;

const Template: Story<SilentRenewProps> = () => (
  <div className={css.Story}>
    <SilentRenew />
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
