import { Meta, Story } from "@storybook/react";
import React, { useState } from "react";

import { Radio } from "./Radio";
import css from "./Radio.module.scss";
import { RadioProps } from "./Radio.type";

export default {
  title: "UI/Radio",
  component: Radio,
  parameters: {
    componentSubtitle: "Subtitle goes here",
  },
} as Meta;

const UncontrolledTemplate: Story<RadioProps> = (args) => (
  <div className={css.Story}>
    <Radio {...args} />
  </div>
);

const ControlledTemplate: Story<RadioProps> = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;

    setChecked(target.checked);
  };

  return (
    <div className={css.Story}>
      <Radio checked={checked} onChange={handleChange} label="foobar" />
    </div>
  );
};

const MultipleUncontrolledTemplate: Story<RadioProps> = () => (
  <div className={css.Story}>
    <form>
      <Radio name="color" label="red" />
      <Radio name="color" label="green" />
      <Radio name="color" label="blue" />
      <Radio name="color" label="rainbow" />
    </form>
  </div>
);

const MultipleControlledTemplate: Story<RadioProps> = () => {
  const [value, setValue] = useState<string | undefined>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;

    setValue(target.value);
  };

  return (
    <div className={css.Story}>
      <Radio
        checked={value === "red"}
        name="color"
        onChange={handleChange}
        label="red"
        value="red"
      />
      <Radio
        checked={value === "green"}
        name="color"
        onChange={handleChange}
        label="green"
        value="green"
      />
      <Radio
        checked={value === "blue"}
        name="color"
        onChange={handleChange}
        label="blue"
        value="blue"
      />
      <Radio
        checked={value === "rainbow"}
        name="color"
        onChange={handleChange}
        label="rainbow"
        value="rainbow"
      />
    </div>
  );
};

const Uncontrolled = UncontrolledTemplate.bind({});
const Controlled = ControlledTemplate.bind({});
const MultipleUncontrolled = MultipleUncontrolledTemplate.bind({});
const MultipleControlled = MultipleControlledTemplate.bind({});

Uncontrolled.args = {
  label: "marklar",
};

Uncontrolled.parameters = {
  docs: {
    storyDescription: "Story description",
  },
};

export { Uncontrolled, Controlled, MultipleUncontrolled, MultipleControlled };
