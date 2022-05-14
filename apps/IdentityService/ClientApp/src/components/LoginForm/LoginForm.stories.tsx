import { Meta, Story } from "@storybook/react";

import { withRouter } from "utils/storybookDecorators";

import { LoginForm } from "./LoginForm";
import { LoginFormProps } from "./LoginForm.type";
import css from "./Story.module.scss";

export default {
  title: "COMPONENTS/LoginForm",
  component: LoginForm,
  parameters: {
    componentSubtitle: "Subtitle goes here",
  },
  decorators: [withRouter],
} as Meta;

const Template: Story<LoginFormProps> = (args) => (
  <div className={css.Story}>
    <LoginForm {...args} />
  </div>
);

const Default = Template.bind({});

Default.args = {
  returnUrl: "https://localhost",
};

Default.parameters = {
  docs: {
    storyDescription: "Story description",
  },
};

export { Default };
