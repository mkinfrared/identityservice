import { Meta, StoryObj } from "@storybook/react";
import React from "react";

import Heading from "components/Heading";
import { ReactComponent as Clear } from "icons/clear.svg";
import { ReactComponent as Doc } from "icons/description.svg";
import { ReactComponent as Eye } from "icons/visibility.svg";

import { IconButton } from "./IconButton";
import css from "./Story.module.scss";

type Story = StoryObj<typeof IconButton>;

const meta = {
  title: "UI/IconButton",
  component: IconButton,
  parameters: {
    componentSubtitle: "Subtitle from template",
  },
} satisfies Meta<typeof IconButton>;

const Default: Story = {
  args: {
    disabled: false,
    variant: "contained",
    loading: false,
  },
  parameters: {
    docs: {
      storyDescription: "Story description",
    },
  },
  render: (args) => (
    <div className={css.Story}>
      <div>
        <Heading>Default</Heading>
        <IconButton {...args}>
          <Doc />
        </IconButton>
        <div style={{ marginTop: 20 }}>
          <IconButton {...args}>
            <Eye />
          </IconButton>
          <IconButton {...args}>
            <Clear />
          </IconButton>
        </div>
      </div>
      <div>
        <Heading>Button variants</Heading>
        <IconButton {...args} variant="outlined">
          <Doc />
        </IconButton>
        <IconButton {...args} variant="contained">
          <Doc />
        </IconButton>
      </div>
      <div>
        <Heading>Button colors</Heading>
        <div>
          <IconButton {...args} variant="contained" color="primary">
            <Eye />
          </IconButton>
          <IconButton {...args} variant="contained" color="secondary">
            <Eye />
          </IconButton>
          <IconButton {...args} variant="contained" color="success">
            <Eye />
          </IconButton>
          <IconButton {...args} variant="contained" color="error">
            <Eye />
          </IconButton>
        </div>
        <div>
          <IconButton {...args} variant="outlined" color="primary">
            <Eye />
          </IconButton>
          <IconButton {...args} variant="outlined" color="secondary">
            <Eye />
          </IconButton>
          <IconButton {...args} variant="outlined" color="success">
            <Eye />
          </IconButton>
          <IconButton {...args} variant="outlined" color="error">
            <Eye />
          </IconButton>
        </div>
      </div>
    </div>
  ),
};

export { Default };

export default meta;
