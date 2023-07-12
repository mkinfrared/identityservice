import { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { Heading } from "./Heading";
import css from "./Story.module.scss";

type Story = StoryObj<typeof Heading>;

const meta = {
  title: "UI/Heading",
  component: Heading,
  parameters: {
    componentSubtitle: "Subtitle from template",
  },
} satisfies Meta<typeof Heading>;

const Default: Story = {
  render: (args) => (
    <div className={css.Story}>
      <Heading variant="h1">Heading 1</Heading>
      <Heading variant="h2">Heading 2</Heading>
      <Heading variant="h3">Heading 3</Heading>
      <Heading variant="h4">Heading 4</Heading>
      <Heading variant="h5">Heading 5</Heading>
      <Heading variant="h6">Heading 6</Heading>
      <Heading {...args}>Example</Heading>
    </div>
  ),
};

export { Default };

export default meta;
