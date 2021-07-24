import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react";
import React from "react";

import Text from "components/Text";

import { FakeButton } from "./FakeButton";
import css from "./FakeButton.module.scss";
import { FakeButtonProps } from "./FakeButton.type";

export default {
  title: "UI/FakeButton",
  component: FakeButton
} as Meta;

const Template: Story<FakeButtonProps> = (args) => (
  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
  <div className={css.Story} onClick={action("Bubbled Synthetic Click")}>
    <FakeButton {...args} />
  </div>
);

const Default = Template.bind({});

Default.args = {
  children: <Text>I am a Fake Button</Text>,
  onClick: action("Synthetic Event")
};

export { Default };
