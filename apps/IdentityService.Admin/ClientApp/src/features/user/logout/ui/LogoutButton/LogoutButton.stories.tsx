import { Meta, StoryObj } from "@storybook/react";

import LogoutButton from "./LogoutButton";
import css from "./Story.module.scss";

type Story = StoryObj<typeof meta>;

const meta = {
  title: "UI/LogoutButton",
  component: LogoutButton,
  tags: ["autodocs"],
} satisfies Meta<typeof LogoutButton>;

const Default: Story = {
  args: {},
  render: (args) => (
    <div className={css.Story}>
      <LogoutButton {...args} />
    </div>
  ),
};

export { Default };

export default meta;
