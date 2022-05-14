import { Meta, Story } from "@storybook/react";

import { withRouter } from "utils/storybookDecorators";

import { PasswordResetForm } from "./PasswordResetForm";
import { PasswordResetFormProps } from "./PasswordResetForm.type";
import css from "./Story.module.scss";

export default {
  title: "COMPONENTS/PasswordResetForm",
  component: PasswordResetForm,
  parameters: {
    componentSubtitle: "Subtitle goes here",
  },
  decorators: [withRouter],
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
