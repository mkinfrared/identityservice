import { Meta, Story } from "@storybook/react";

import { LoginForm } from "./LoginForm";
import css from "./LoginForm.module.scss";
import { LoginFormProps } from "./LoginForm.type";

export default {
  title: "COMPONENTS/LoginForm",
  component: LoginForm,
  parameters: {
    componentSubtitle: "Subtitle goes here"
  }
} as Meta;

const Template: Story<LoginFormProps> = (args) => (
  <div className={css.Story}>
    <LoginForm {...args} />
  </div>
);

const Default = Template.bind({});

Default.args = {};

Default.parameters = {
  docs: {
    storyDescription: "Story description"
  }
};

export { Default };
