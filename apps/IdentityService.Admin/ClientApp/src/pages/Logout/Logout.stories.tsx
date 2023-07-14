import { Meta, StoryObj } from "@storybook/react";

import Logout from "./Logout";
import css from "./Story.module.scss";

type Story = StoryObj<typeof meta>;

const meta = {
  title: "UI/Logout",
  component: Logout,
  tags: ["autodocs"],
} satisfies Meta<typeof Logout>;

const Default: Story = {
  args: {},
  render: (args) => (
    <div className={css.Story}>
      <Logout {...args} />
    </div>
  ),
};

export { Default };

export default meta;
