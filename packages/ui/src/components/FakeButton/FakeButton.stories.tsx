/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import React from "react";

import Text from "components/Text";

import { FakeButton } from "./FakeButton";
import css from "./Story.module.scss";

type Story = StoryObj<typeof FakeButton>;

const meta = {
  title: "UI/FakeButton",
  component: FakeButton,
  parameters: {
    componentSubtitle: "Subtitle from template",
  },
} satisfies Meta<typeof FakeButton>;

const Default: Story = {
  args: {
    children: <Text>I am a Fake Button</Text>,
    onClick: action("Synthetic Event"),
  },
  render: (args) => (
    <div className={css.Story} onClick={action("Bubbled Synthetic Click")}>
      <FakeButton {...args} />
      <FakeButton {...args} />
      <FakeButton {...args} />
      <FakeButton {...args} />
      <FakeButton {...args} />
    </div>
  ),
};

export { Default };

export default meta;
