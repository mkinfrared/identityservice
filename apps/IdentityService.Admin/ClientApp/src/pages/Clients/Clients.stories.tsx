import { Meta, Story } from "@storybook/react";

import Clients from "./Clients";
import { ClientsProps } from "./Clients.type";
import css from "./Story.module.scss";

export default {
  title: "PAGES/Clients",
  component: Clients,
  parameters: {
    componentSubtitle: "Subtitle goes here",
  },
} as Meta;

const Template: Story<ClientsProps> = (args) => (
  <div className={css.Story}>
    <Clients {...args} />
  </div>
);

const Default = Template.bind({});

Default.args = {};

Default.parameters = {
  docs: {
    storyDescription: "Story description",
  },
};

export { Default };
