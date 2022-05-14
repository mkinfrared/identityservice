import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react";
import React, { useState } from "react";

import { Checkbox } from "./Checkbox";
import { CheckboxProps } from "./Checkbox.type";
import css from "./Story.module.scss";

export default {
  title: "UI/Checkbox",
  component: Checkbox,
  parameters: {
    componentSubtitle: "Subtitle goes here",
  },
} as Meta;

const UncontrolledTemplate: Story<CheckboxProps> = (args) => (
  <div className={css.Story}>
    <Checkbox {...args} />
  </div>
);

const ControlledTemplate: Story<CheckboxProps> = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;

    setChecked(target.checked);
  };

  return (
    <div className={css.Story}>
      <Checkbox name="example" onChange={handleChange} checked={checked} />
    </div>
  );
};

const Uncontrolled = UncontrolledTemplate.bind({});
const Controlled = ControlledTemplate.bind({});

Uncontrolled.args = {
  onChange: action("change"),
  label: "marklar",
};

Uncontrolled.parameters = {
  docs: {
    storyDescription: "Story description",
  },
};

export { Uncontrolled, Controlled };
