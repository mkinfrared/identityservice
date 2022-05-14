import { Meta, Story } from "@storybook/react";

import { InputField } from "./InputField";
import { InputFieldProps } from "./InputField.type";
import css from "./Story.module.scss";

export default {
  title: "COMPONENTS/InputField",
  component: InputField,
  parameters: {
    componentSubtitle: "Subtitle goes here",
  },
} as Meta;

const Template: Story<InputFieldProps> = (args) => (
  <div className={css.Story}>
    <InputField {...args} />
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
