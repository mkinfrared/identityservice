import { action } from "@storybook/addon-actions";
import React from "react";
import { Meta, Story } from "@storybook/react";

import Text from "components/Text";

import { FakeButton } from "./FakeButton";
import { FakeButtonProps } from "./FakeButton.type";
import css from "./FakeButton.module.scss";
export default {
  title: "UI/FakeButton",
  component: FakeButton
} as Meta;

const Template: Story<FakeButtonProps> = (args) => (
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
