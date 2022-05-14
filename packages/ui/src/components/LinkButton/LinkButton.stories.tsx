import { Meta, Story } from "@storybook/react";
import React from "react";

import Heading from "components/Heading";
import { ReactComponent as Doc } from "icons/description.svg";
import { ReactComponent as Eye } from "icons/visibility.svg";

import { LinkButton } from "./LinkButton";
import { LinkButtonProps } from "./LinkButton.type";
import css from "./Story.module.scss";

export default {
  title: "UI/LinkButton",
  component: LinkButton,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

const Template: Story<LinkButtonProps> = (args) => (
  <div className={css.Story}>
    <div>
      <Heading>Default</Heading>
      <LinkButton {...args}>I am a button</LinkButton>
    </div>
    <div>
      <Heading>LinkButton variants</Heading>
      <LinkButton {...args} variant="contained">
        Contained
      </LinkButton>
      <LinkButton {...args} variant="outlined">
        Outlined
      </LinkButton>
    </div>
    <div>
      <Heading>LinkButton colors</Heading>
      <div>
        <LinkButton {...args} variant="contained" color="primary">
          Primary
        </LinkButton>
        <LinkButton {...args} variant="contained" color="secondary">
          Secondary
        </LinkButton>
        <LinkButton {...args} variant="contained" color="success">
          Success
        </LinkButton>
        <LinkButton {...args} variant="contained" color="error">
          Error
        </LinkButton>
      </div>
      <div>
        <LinkButton {...args} variant="outlined" color="primary">
          Primary
        </LinkButton>
        <LinkButton {...args} variant="outlined" color="secondary">
          Secondary
        </LinkButton>
        <LinkButton {...args} variant="outlined" color="success">
          Success
        </LinkButton>
        <LinkButton {...args} variant="outlined" color="error">
          Error
        </LinkButton>
      </div>
    </div>
    <div>
      <Heading>LinkButton List</Heading>
      <div>
        <LinkButton variant="contained">Lorem</LinkButton>
        <LinkButton variant="outlined">Lorem Ipsum</LinkButton>
        <LinkButton variant="outlined">Lorem Ipsum Dolor</LinkButton>
      </div>
    </div>
    <div>
      <Heading>LinkButton List with the same width</Heading>
      <div className={css.sameWidthList}>
        <LinkButton variant="contained">Lorem</LinkButton>
        <LinkButton variant="outlined">Lorem Ipsum</LinkButton>
        <LinkButton variant="outlined">Lorem Ipsum Dolor</LinkButton>
      </div>
    </div>
  </div>
);

const WithIconTemplate: Story<LinkButtonProps> = (args) => (
  <div className={css.Story}>
    <div>
      <LinkButton {...args}>
        <Doc />
      </LinkButton>
    </div>
    <div>
      <LinkButton {...args}>
        <Eye />
      </LinkButton>
    </div>
  </div>
);

const WithIconAndTextTemplate: Story<LinkButtonProps> = (args) => (
  <div className={css.Story}>
    <div>
      <LinkButton {...args}>
        <Doc />
        Lorem
      </LinkButton>
    </div>
    <div>
      <LinkButton {...args}>
        <Eye />
        🙈 Lorem ipsum
      </LinkButton>
    </div>
    <div>
      <LinkButton {...args}>
        <Eye />
        🚀 Lorem ipsum
        <Doc />
      </LinkButton>
    </div>
  </div>
);

const Default = Template.bind({});
const WithIcon = WithIconTemplate.bind({});
const WithIconAndText = WithIconAndTextTemplate.bind({});

Default.args = {
  variant: "contained",
  href: "https://en.wikipedia.org/wiki/Fleetwood_Mac",
};

export { Default, WithIcon, WithIconAndText };
