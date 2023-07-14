import { Meta, StoryObj } from "@storybook/react";

import ApiResources from "./ApiResources";
import css from "./Story.module.scss";

type Story = StoryObj<typeof meta>;

const meta = {
  title: "UI/ApiResources",
  component: ApiResources,
  tags: ["autodocs"],
} satisfies Meta<typeof ApiResources>;

const Default: Story = {
  args: {},
  render: (args) => (
    <div className={css.Story}>
      <ApiResources {...args} />
    </div>
  ),
};

export { Default };

export default meta;
