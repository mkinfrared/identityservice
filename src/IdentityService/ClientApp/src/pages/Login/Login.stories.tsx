import { Meta, Story } from "@storybook/react";

import { createMemoryHistory } from "utils/helpers";
import { withRouter } from "utils/storybookDecorators";

import { Login } from "./Login";

const history = createMemoryHistory();

history.push("/login");

export default {
  title: "Pages/Login",
  component: Login,
  decorators: [withRouter(history)]
} as Meta;

const Template: Story = (args) => <Login {...args} />;
const Default = Template.bind({});

Default.args = {};

export { Default };
