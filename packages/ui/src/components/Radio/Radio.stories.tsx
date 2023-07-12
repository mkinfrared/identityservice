/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";

import { Radio } from "./Radio";
import css from "./Story.module.scss";

type Story = StoryObj<typeof Radio>;

const meta = {
  title: "UI/Radio",
  component: Radio,
  parameters: {
    componentSubtitle: "Subtitle from template",
  },
} satisfies Meta<typeof Radio>;

const Uncontrolled: Story = {
  args: {
    label: "marklar",
  },
  render: (args) => (
    <div className={css.Story}>
      <Radio {...args} />
    </div>
  ),
};

const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { target } = event;

      setChecked(target.checked);
    };

    return (
      <div className={css.Story}>
        <Radio checked={checked} onChange={handleChange} />
      </div>
    );
  },
};

const MultipleUncontrolled: Story = {
  render: () => (
    <div className={css.Story}>
      <form>
        <div className={css.radioGroup}>
          <Radio name="color" label="red" />
          <Radio name="color" label="green" />
          <Radio name="color" label="blue" />
          <Radio name="color" label="rainbow" />
        </div>
        <div className={css.radioGroup}>
          <Radio name="name" label="Timmy" />
          <Radio name="name" label="Jimmy" />
          <Radio name="name" label="Kenny" />
          <Radio name="name" label="Randy" />
        </div>
      </form>
    </div>
  ),
};

const MultipleControlled: Story = {
  render: () => {
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
  },
};

export { Uncontrolled, Controlled, MultipleUncontrolled, MultipleControlled };

export default meta;
