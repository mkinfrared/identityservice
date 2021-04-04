import { Meta, Story } from "@storybook/react";

import Text from "components/Text";

import { Card } from "./Card";
import css from "./Card.module.scss";
import { CardProps } from "./Card.type";

export default {
  title: "UI/Card",
  component: Card
} as Meta;

const Template: Story<CardProps> = (args) => <Card {...args} />;
const Default = Template.bind({});

Default.args = {
  children: (
    <Text>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad autem
      distinctio labore magnam nam nesciunt nisi odit possimus vero? Aliquam
      assumenda ea ipsam laboriosam nam quasi voluptatibus? Qui, repellat.
    </Text>
  ),
  className: css.Story
};

export { Default };
