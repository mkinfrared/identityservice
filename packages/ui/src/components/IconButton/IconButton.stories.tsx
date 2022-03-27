import { Meta, Story } from "@storybook/react";
import React from "react";

import Button from "components/Button";
import { ReactComponent as Clear } from "icons/clear.svg";
import { ReactComponent as Doc } from "icons/description.svg";
import { ReactComponent as Eye } from "icons/visibility.svg";

import { IconButton } from "./IconButton";
import css from "./IconButton.module.scss";
import { IconButtonProps } from "./IconButton.type";

export default {
  title: "UI/IconButton",
  component: IconButton,
  parameters: {
    componentSubtitle: "Subtitle goes here",
  },
} as Meta;

const Template: Story<IconButtonProps> = (args) => (
  <div className={css.Story}>
    <IconButton {...args}>
      <Eye />
    </IconButton>
    <IconButton {...args}>
      <Doc />
    </IconButton>
    <IconButton {...args}>
      <Clear />
    </IconButton>
    <Button>Button</Button>
  </div>
);

const Default = Template.bind({});

Default.args = {
  disabled: false,
  variant: "opaque",
};

Default.parameters = {
  docs: {
    storyDescription: "Story description",
  },
};

export { Default };
