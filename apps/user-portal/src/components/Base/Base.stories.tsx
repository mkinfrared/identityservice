import { Meta, Story } from "@storybook/react";

import { Base } from "./Base";
import { BaseProps } from "./Base.type";
import css from "./Story.module.scss";

export default {
  title: "COMPONENTS/Base",
  component: Base,
  parameters: {
    componentSubtitle: "Subtitle goes here",
  },
} as Meta;

const Template: Story<BaseProps> = () => (
  <div className={css.Story}>
    <Base />
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
