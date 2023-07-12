import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";

import { Checkbox } from "./Checkbox";
import css from "./Story.module.scss";

type Story = StoryObj<typeof Checkbox>;

const meta = {
  title: "UI/Checkbox",
  component: Checkbox,
  parameters: {
    componentSubtitle: "Subtitle from template",
  },
} satisfies Meta<typeof Checkbox>;

const Uncontrolled: Story = {
  args: {
    onChange: action("change"),
    label: "marklar",
  },
  parameters: {
    docs: {
      storyDescription: "Story description",
    },
  },
  render: (args) => (
    <div className={css.Story}>
      <Checkbox {...args} />
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
        <Checkbox name="example" onChange={handleChange} checked={checked} />
      </div>
    );
  },
};

export { Uncontrolled, Controlled };

export default meta;
