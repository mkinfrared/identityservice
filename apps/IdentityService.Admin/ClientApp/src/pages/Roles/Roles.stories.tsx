import { Meta, StoryObj } from "@storybook/react";

import Roles from "./Roles";
import css from "./Story.module.scss";

type Story = StoryObj<typeof meta>;

const meta = {
  title: "UI/Roles",
  component: Roles,
  tags: ["autodocs"],
} satisfies Meta<typeof Roles>;

const Default: Story = {
  args: {},
  render: (args) => (
    <div className={css.Story}>
      <Roles {...args} />
    </div>
  ),
};

export { Default };

export default meta;
