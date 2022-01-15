import { Meta, Story } from "@storybook/react";

import { ConfirmEmailForm } from "./ConfirmEmailForm";
import css from "./ConfirmEmailForm.module.scss";
import { ConfirmEmailFormProps } from "./ConfirmEmailForm.type";

export default {
  title: "COMPONENTS/ConfirmEmailForm",
  component: ConfirmEmailForm,
  parameters: {
    componentSubtitle: "Subtitle goes here",
  },
} as Meta;

const Template: Story<ConfirmEmailFormProps> = (args) => (
  <div className={css.Story}>
    <ConfirmEmailForm {...args} />
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
