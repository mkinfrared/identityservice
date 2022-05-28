import { Meta, Story } from "@storybook/react";

import { Login } from "./Login";
import { LoginProps } from "./Login.type";
import css from "./Story.module.scss";

export default {
  title: "PAGES/Login",
  component: Login,
  parameters: {
    componentSubtitle: "Subtitle goes here",
  },
} as Meta;

const Template: Story<LoginProps> = () => (
  <div className={css.Story}>
    <Login />
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
