import { Meta, Story } from "@storybook/react";
import React, { useState } from "react";

import css from "./Story.module.scss";
import { Toggle } from "./Toggle";
import { ToggleProps } from "./Toggle.type";

export default {
  title: "UI/Toggle",
  component: Toggle,
  parameters: {
    componentSubtitle: "Subtitle goes here",
  },
} as Meta;

const UncontrolledTemplate: Story<ToggleProps> = (args) => (
  <div className={css.Story}>
    <Toggle {...args} />
  </div>
);

const ControlledTemplate: Story<ToggleProps> = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;

    setChecked(target.checked);
  };

  return (
    <div className={css.Story}>
      <Toggle name="example" onChange={handleChange} checked={checked} />
    </div>
  );
};

const Uncontrolled = UncontrolledTemplate.bind({});
const Controlled = ControlledTemplate.bind({});

Uncontrolled.args = {
  label: "marklar",
};

Uncontrolled.parameters = {
  docs: {
    storyDescription: "Story description",
  },
};

export { Uncontrolled, Controlled };
