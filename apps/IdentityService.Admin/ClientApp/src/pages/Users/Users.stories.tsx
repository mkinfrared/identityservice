import { Meta, StoryObj } from "@storybook/react";

import css from "./Story.module.scss";
import Users from "./Users";

type Story = StoryObj<typeof meta>;

const meta = {
  title: "UI/Users",
  component: Users,
  tags: ["autodocs"],
} satisfies Meta<typeof Users>;

const Default: Story = {
  args: {},
  render: (args) => (
    <div className={css.Story}>
      <Users {...args} />
    </div>
  ),
};

export { Default };

export default meta;
