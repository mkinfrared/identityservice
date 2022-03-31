import { Meta, Story } from "@storybook/react";
import React from "react";

import Heading from "components/Heading";
import { ReactComponent as Doc } from "icons/description.svg";
import { ReactComponent as Eye } from "icons/visibility.svg";

import { LinkButton } from "./LinkButton";
import css from "./LinkButton.module.scss";
import { LinkButtonProps } from "./LinkButton.type";

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
      <LinkButton {...args}>I am a button</LinkButton>
    </div>
    <div>
      <LinkButton variant="opaque">Opaque</LinkButton>
      <LinkButton variant="transparent">Transparent</LinkButton>
    </div>
    <div>
      <Heading>LinkButton List</Heading>
      <div>
        <LinkButton variant="opaque">Lorem</LinkButton>
        <LinkButton variant="transparent">Lorem Ipsum</LinkButton>
        <LinkButton variant="transparent">Lorem Ipsum Dolor</LinkButton>
      </div>
    </div>
    <div>
      <Heading>LinkButton List with the same width</Heading>
      <div className={css.sameWidthList}>
        <LinkButton variant="opaque">Lorem</LinkButton>
        <LinkButton variant="transparent">Lorem Ipsum</LinkButton>
        <LinkButton variant="transparent">Lorem Ipsum Dolor</LinkButton>
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
  variant: "opaque",
};

export { Default, WithIcon, WithIconAndText };
