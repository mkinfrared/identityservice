import { Meta, Story } from "@storybook/react";

import { ForgotPasswordForm } from "./ForgotPasswordForm";
import css from "./ForgotPasswordForm.module.scss";
import { ForgotPasswordFormProps } from "./ForgotPasswordForm.type";

export default {
  title: "COMPONENTS/ForgotPasswordForm",
  component: ForgotPasswordForm,
  parameters: {
    componentSubtitle: "Subtitle goes here",
  },
} as Meta;

const Template: Story<ForgotPasswordFormProps> = (args) => (
  <div className={css.Story}>
    <ForgotPasswordForm {...args} />
  </div>
);

const Default = Template.bind({});

Default.args = {
  returnUrl: "/foo/bar",
};

Default.parameters = {
  docs: {
    storyDescription: "Story description",
  },
};

export { Default };
