import { Meta, Story } from "@storybook/react";
import React from "react";

import Checkbox from "components/Checkbox";
import Radio from "components/Radio";
import TextField from "components/TextField";

import { Fieldset } from "./Fieldset";
import { FieldsetProps } from "./Fieldset.type";
import css from "./Story.module.scss";

export default {
  title: "UI/Fieldset",
  component: Fieldset,
  parameters: {
    componentSubtitle: "Subtitle goes here",
  },
} as Meta;

const Template: Story<FieldsetProps> = ({ className, disabled, legend }) => (
  <div className={css.Story}>
    <Fieldset className={className} disabled={disabled} legend={legend}>
      <TextField />
      <Checkbox label="foobar" />
      <Radio label="foobar" />
    </Fieldset>
  </div>
);

const Default = Template.bind({});

Default.args = {};

Default.parameters = {
  docs: {
    storyDescription: "Story description",
  },
};

export { Default };
