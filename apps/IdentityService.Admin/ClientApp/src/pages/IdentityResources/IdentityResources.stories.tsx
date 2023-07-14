import { Meta, StoryObj } from "@storybook/react";

import IdentityResources from "./IdentityResources";
import css from "./Story.module.scss";

type Story = StoryObj<typeof meta>;

const meta = {
  title: "UI/IdentityResources",
  component: IdentityResources,
  tags: ["autodocs"],
} satisfies Meta<typeof IdentityResources>;

const Default: Story = {
  args: {},
  render: (args) => (
    <div className={css.Story}>
      <IdentityResources {...args} />
    </div>
  ),
};

export { Default };

export default meta;
