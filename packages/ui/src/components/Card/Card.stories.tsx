import { classNames } from "@identity-service/core";
import { Meta, Story } from "@storybook/react";
import React from "react";

import Text from "components/Text";

import { Card } from "./Card";
import css from "./Card.module.scss";
import { CardProps } from "./Card.type";

export default {
  title: "UI/Card",
  component: Card,
} as Meta;

const Template: Story<CardProps> = (args) => (
  <div className={css.Story}>
    <div className={css.cardContainer}>
      <Card className={classNames(css.card, css.emptyCard)} />
      <Card className={css.card} {...args} />
    </div>
  </div>
);

const Default = Template.bind({});

Default.args = {
  children: (
    <Text>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad autem
      distinctio labore magnam nam nesciunt nisi odit possimus vero? Aliquam
      assumenda ea ipsam laboriosam nam quasi voluptatibus? Qui, repellat.
    </Text>
  ),
};

export { Default };
