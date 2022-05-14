import { Meta, Story } from "@storybook/react";
import React from "react";

import { Heading } from "./Heading";
import { HeadingProps } from "./Heading.type";
import css from "./Story.module.scss";

export default {
  title: "UI/Heading",
  component: Heading,
} as Meta;

const Template: Story<HeadingProps> = (args) => (
  <div className={css.Story}>
    <Heading variant="h1">Heading 1</Heading>
    <Heading variant="h2">Heading 2</Heading>
    <Heading variant="h3">Heading 3</Heading>
    <Heading variant="h4">Heading 4</Heading>
    <Heading variant="h5">Heading 5</Heading>
    <Heading variant="h6">Heading 6</Heading>
    <Heading {...args}>Example</Heading>
  </div>
);

const Default = Template.bind({});

Default.args = {};

export { Default };
