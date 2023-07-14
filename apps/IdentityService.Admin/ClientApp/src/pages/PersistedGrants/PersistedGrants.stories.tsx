import { Meta, StoryObj } from "@storybook/react";

import PersistedGrants from "./PersistedGrants";
import css from "./Story.module.scss";

type Story = StoryObj<typeof meta>;

const meta = {
  title: "UI/PersistedGrants",
  component: PersistedGrants,
  tags: ["autodocs"],
} satisfies Meta<typeof PersistedGrants>;

const Default: Story = {
  args: {},
  render: (args) => (
    <div className={css.Story}>
      <PersistedGrants {...args} />
    </div>
  ),
};

export { Default };

export default meta;
