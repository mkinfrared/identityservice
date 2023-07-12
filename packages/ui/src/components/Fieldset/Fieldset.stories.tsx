import { Meta, StoryObj } from "@storybook/react";
import React from "react";

import Checkbox from "components/Checkbox";
import Radio from "components/Radio";
import TextField from "components/TextField";

import { Fieldset } from "./Fieldset";
import css from "./Story.module.scss";

type Story = StoryObj<typeof Fieldset>;

const meta = {
  title: "UI/Fieldset",
  component: Fieldset,
  parameters: {
    componentSubtitle: "Subtitle from template",
  },
} satisfies Meta<typeof Fieldset>;

const Default: Story = {
  parameters: {
    docs: {
      storyDescription: "Story description",
    },
  },
  render: ({ className, disabled, legend }) => (
    <div className={css.Story}>
      <Fieldset className={className} disabled={disabled} legend={legend}>
        <TextField />
        <Checkbox label="foobar" />
        <Radio label="foobar" />
      </Fieldset>
    </div>
  ),
};

export { Default };

export default meta;
