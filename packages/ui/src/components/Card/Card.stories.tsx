import { classNames } from "@identity-service/core";
import { Meta, Story } from "@storybook/react";
import React from "react";

import Text from "components/Text";

import { Card } from "./Card";
import { CardProps } from "./Card.type";
import css from "./Story.module.scss";

export default {
  title: "UI/Card",
  component: Card,
} as Meta;

const Template: Story<CardProps> = () => (
  <div className={css.Story}>
    <div className={css.cardContainer}>
      <Card className={classNames(css.card, css.emptyCard)} />
    </div>
  </div>
);

const WithTextTemplate: Story<CardProps> = (args) => (
  <div className={css.Story}>
    <div className={css.cardContainer}>
      <Card className={css.card} {...args} />
    </div>
  </div>
);

const Default = Template.bind({});
const WithText = WithTextTemplate.bind({});

WithText.args = {
  children: (
    <Text>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad autem
      distinctio labore magnam nam nesciunt nisi odit possimus vero? Aliquam
      assumenda ea ipsam laboriosam nam quasi voluptatibus? Qui, repellat.
    </Text>
  ),
};

export { Default, WithText };
