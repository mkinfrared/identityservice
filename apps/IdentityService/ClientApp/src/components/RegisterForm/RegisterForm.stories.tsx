import { Meta, Story } from "@storybook/react";

import { withRouter } from "utils/storybookDecorators";

import { RegisterForm } from "./RegisterForm";
import { RegisterFormProps } from "./RegisterForm.type";
import css from "./Story.module.scss";

export default {
  title: "COMPONENTS/RegisterForm",
  component: RegisterForm,
  parameters: {
    componentSubtitle: "Subtitle goes here",
  },
  decorators: [withRouter],
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
    storyDescription: "Story description",
  },
};

export { Default };
