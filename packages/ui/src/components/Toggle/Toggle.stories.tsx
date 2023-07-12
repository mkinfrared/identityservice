import { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";

import css from "./Story.module.scss";
import { Toggle } from "./Toggle";

type Story = StoryObj<typeof Toggle>;

const meta = {
  title: "UI/Toggle",
  component: Toggle,
  parameters: {
    componentSubtitle: "Subtitle from template",
  },
} satisfies Meta<typeof Toggle>;

const Uncontrolled: Story = {
  args: {
    label: "marklar",
  },
  render: (args) => (
    <div className={css.Story}>
      <Toggle {...args} />
    </div>
  ),
};

const Controlled: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
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
  },
};

export { Uncontrolled, Controlled };

export default meta;
