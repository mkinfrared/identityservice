import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react";
import React from "react";

import Heading from "components/Heading";
import { ReactComponent as Doc } from "icons/description.svg";
import { ReactComponent as Eye } from "icons/visibility.svg";

import { Button } from "./Button";
import { ButtonProps } from "./Button.type";
import css from "./Story.module.scss";

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
      <Heading>Default</Heading>
      <Button {...args}>I am a button</Button>
    </div>
    <div>
      <Heading>Button type</Heading>
      <Button {...args} type="submit">
        Submit
      </Button>
      <Button {...args} type="reset">
        Reset
      </Button>
    </div>
    <div>
      <Heading>Button variants</Heading>
      <Button {...args} variant="contained">
        Contained
      </Button>
      <Button {...args} variant="outlined">
        Outlined
      </Button>
    </div>
    <div>
      <Heading>Button colors</Heading>
      <div>
        <Button {...args} variant="contained" color="primary">
          Primary
        </Button>
        <Button {...args} variant="contained" color="secondary">
          Secondary
        </Button>
        <Button {...args} variant="contained" color="success">
          Success
        </Button>
        <Button {...args} variant="contained" color="error">
          Error
        </Button>
      </div>
      <div>
        <Button {...args} variant="outlined" color="primary">
          Primary
        </Button>
        <Button {...args} variant="outlined" color="secondary">
          Secondary
        </Button>
        <Button {...args} variant="outlined" color="success">
          Success
        </Button>
        <Button {...args} variant="outlined" color="error">
          Error
        </Button>
      </div>
    </div>
    <div>
      <Heading>Button List</Heading>
      <div>
        <Button variant="contained">Lorem</Button>
        <Button variant="outlined">Lorem Ipsum</Button>
        <Button variant="outlined">Lorem Ipsum Dolor</Button>
      </div>
    </div>
    <div>
      <Heading>Button List with the same width</Heading>
      <div className={css.sameWidthList}>
        <Button variant="contained">Lorem</Button>
        <Button variant="outlined">Lorem Ipsum</Button>
        <Button variant="outlined">Lorem Ipsum Dolor</Button>
      </div>
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
  variant: "contained",
  onClick: action("Click"),
  color: "primary",
};

export { Default, WithIcon, WithIconAndText };
