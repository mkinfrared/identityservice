import { Meta, Story } from "@storybook/react";
import React from "react";

import Text from "components/Text";

import { Button } from "./Button";
import { ButtonProps } from "./Button.type";

export default {
  title: "UI/Button",
  component: Button,
  argTypes: {
    backgroundColor: { control: "color" }
  }
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;
const Default = Template.bind({});

Default.args = {
  children: <Text>I am a button</Text>,
  variant: "opaque"
};

export { Default };
