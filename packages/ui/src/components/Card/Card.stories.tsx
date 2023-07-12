import { classNames } from "@identity-service/core";
import { Meta, StoryObj } from "@storybook/react";
import React from "react";

import Text from "components/Text";

import { Card } from "./Card";
import css from "./Story.module.scss";

type Story = StoryObj<typeof Card>;

const meta = {
  title: "UI/Card",
  component: Card,
  parameters: {
    componentSubtitle: "Subtitle from template",
  },
} satisfies Meta<typeof Card>;

const Default: Story = {
  render: () => (
    <div className={css.Story}>
      <div className={css.cardContainer}>
        <Card className={classNames(css.card, css.emptyCard)} />
      </div>
    </div>
  ),
};

const WithText: Story = {
  args: {
    children: (
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad autem
        distinctio labore magnam nam nesciunt nisi odit possimus vero? Aliquam
        assumenda ea ipsam laboriosam nam quasi voluptatibus? Qui, repellat.
      </Text>
    ),
  },
  render: (args) => (
    <div className={css.Story}>
      <div className={css.cardContainer}>
        <Card className={css.card} {...args} />
      </div>
    </div>
  ),
};

export { Default, WithText };

export default meta;
