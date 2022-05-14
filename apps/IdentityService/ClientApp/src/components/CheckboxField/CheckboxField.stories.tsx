import { Meta, Story } from "@storybook/react";

import { CheckboxField } from "./CheckboxField";
import { CheckboxFieldProps } from "./CheckboxField.type";
import css from "./Story.module.scss";

export default {
  title: "COMPONENTS/CheckboxField",
  component: CheckboxField,
  parameters: {
    componentSubtitle: "Subtitle goes here",
  },
} as Meta;

const Template: Story<CheckboxFieldProps> = (args) => (
  <div className={css.Story}>
    <CheckboxField {...args} />
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
