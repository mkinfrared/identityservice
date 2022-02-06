import { Meta, Story } from "@storybook/react";
import React from "react";

import Text from "components/Text";

import { Button } from "./Button";
import css from "./Button.module.scss";
import { ButtonProps } from "./Button.type";

export default {
  title: "UI/Button",
  component: Button,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

const Template: Story<ButtonProps> = (args) => (
  <div className={css.Story}>
    <div>
      <Button {...args}>I am a button</Button>
    </div>
    <div>
      <Button {...args}>
        <Text>I am a button with paragraph</Text>
      </Button>
    </div>
  </div>
);

const Default = Template.bind({});

Default.args = {
  variant: "opaque",
};

export { Default };
