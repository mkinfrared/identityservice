import { Meta, StoryObj } from "@storybook/react";
import React from "react";

import Heading from "components/Heading";
import { ReactComponent as Doc } from "icons/description.svg";
import { ReactComponent as Eye } from "icons/visibility.svg";

import { LinkButton } from "./LinkButton";
import css from "./Story.module.scss";

type Story = StoryObj<typeof LinkButton>;

const meta = {
  title: "UI/LinkButton",
  component: LinkButton,
  parameters: {
    componentSubtitle: "Subtitle from template",
  },
} satisfies Meta<typeof LinkButton>;

const Default: Story = {
  args: {
    variant: "contained",
    href: "https://en.wikipedia.org/wiki/Fleetwood_Mac",
  },
  render: (args) => (
    <div className={css.Story}>
      <div>
        <Heading>Default</Heading>
        <LinkButton {...args}>I am a button</LinkButton>
      </div>
      <div>
        <Heading>LinkButton variants</Heading>
        <div className={css.buttonContainer}>
          <LinkButton {...args} variant="contained">
            Contained
          </LinkButton>
          <LinkButton {...args} variant="outlined">
            Outlined
          </LinkButton>
        </div>
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
  ),
};

const WithIcon: Story = {
  render: (args) => (
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
  ),
};

const WithIconAndText: Story = {
  render: (args) => (
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
  ),
};

export { Default, WithIcon, WithIconAndText };

export default meta;
