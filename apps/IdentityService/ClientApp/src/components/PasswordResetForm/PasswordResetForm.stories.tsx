import { Meta, Story } from "@storybook/react";

import { PasswordResetForm } from "./PasswordResetForm";
import css from "./PasswordResetForm.module.scss";
import { PasswordResetFormProps } from "./PasswordResetForm.type";

export default {
  title: "COMPONENTS/PasswordResetForm",
  component: PasswordResetForm,
  parameters: {
    componentSubtitle: "Subtitle goes here",
  },
} as Meta;

const Template: Story<PasswordResetFormProps> = (args) => (
  <div className={css.Story}>
    <PasswordResetForm {...args} />
  </div>
);

const Default = Template.bind({});

Default.args = {
  userId: "marklar",
  token: "token",
};

Default.parameters = {
  docs: {
    storyDescription: "Story description",
  },
};

export { Default };
