import { Meta, Story } from "@storybook/react";

import css from "./Story.module.scss";
import { ToggleField } from "./ToggleField";
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
