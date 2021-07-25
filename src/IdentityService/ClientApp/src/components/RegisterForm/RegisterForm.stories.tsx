import { Meta, Story } from "@storybook/react";

import { RegisterForm } from "./RegisterForm";
import css from "./RegisterForm.module.scss";
import { RegisterFormProps } from "./RegisterForm.type";

export default {
  title: "COMPONENTS/RegisterForm",
  component: RegisterForm,
  parameters: {
    componentSubtitle: "Subtitle goes here"
  }
} as Meta;

const Template: Story<RegisterFormProps> = (args) => (
  <div className={css.Story}>
    <RegisterForm {...args} />
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
