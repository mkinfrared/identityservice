import { Meta, Story } from "@storybook/react";

import { Register } from "./Register";
import css from "./Register.module.scss";
import { RegisterProps } from "./Register.type";

export default {
  title: "PAGES/Register",
  component: Register,
  parameters: {
    componentSubtitle: "Subtitle goes here"
  }
} as Meta;

const Template: Story<RegisterProps> = () => (
  <div className={css.Story}>
    <Register />
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
