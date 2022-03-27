import { Meta, Story } from "@storybook/react";
import React from "react";

import Text from "components/Text";
import { ReactComponent as Doc } from "icons/description.svg";
import { ReactComponent as Eye } from "icons/visibility.svg";

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
    <div>
      <Button variant="opaque">Opaque</Button>
      <Button variant="transparent">Transparent</Button>
    </div>
  </div>
);

const WithIconTemplate: Story<ButtonProps> = (args) => (
  <div className={css.Story}>
    <div>
      <Button {...args}>
        <Doc />
      </Button>
    </div>
    <div>
      <Button {...args}>
        <Eye />
      </Button>
    </div>
  </div>
);

const WithIconAndTextTemplate: Story<ButtonProps> = (args) => (
  <div className={css.Story}>
    <div>
      <Button {...args}>
        <Doc />
        Lorem
      </Button>
    </div>
    <div>
      <Button {...args}>
        <Eye />
        🙈 Lorem ipsum
      </Button>
    </div>
    <div>
      <Button {...args}>
        <Eye />
        🚀 Lorem ipsum
        <Doc />
      </Button>
    </div>
  </div>
);

const Default = Template.bind({});
const WithIcon = WithIconTemplate.bind({});
const WithIconAndText = WithIconAndTextTemplate.bind({});

Default.args = {
  disabled: false,
  variant: "opaque",
};

export { Default, WithIcon, WithIconAndText };
