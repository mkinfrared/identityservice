import { Meta, Story } from "@storybook/react";

import { ToggleField } from "./ToggleField";
import css from "./ToggleField.module.scss";
import { ToggleFieldProps } from "./ToggleField.type";

export default {
  title: "COMPONENTS/ToggleField",
  component: ToggleField,
  parameters: {
    componentSubtitle: "Subtitle goes here",
  },
} as Meta;

const Template: Story<ToggleFieldProps> = (args) => (
  <div className={css.Story}>
    <ToggleField {...args} />
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
