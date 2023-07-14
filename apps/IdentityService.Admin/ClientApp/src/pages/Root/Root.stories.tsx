import { Meta, StoryObj } from "@storybook/react";

import Root from "./Root";
import css from "./Story.module.scss";

type Story = StoryObj<typeof meta>;

const meta = {
  title: "UI/Root",
  component: Root,
  tags: ["autodocs"],
} satisfies Meta<typeof Root>;

const Default: Story = {
  args: {},
  render: (args) => (
    <div className={css.Story}>
      <Root {...args} />
    </div>
  ),
};

export { Default };

export default meta;
