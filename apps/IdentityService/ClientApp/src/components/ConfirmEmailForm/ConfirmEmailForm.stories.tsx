import { Meta, Story } from "@storybook/react";

import { ConfirmEmailForm } from "./ConfirmEmailForm";
import { ConfirmEmailFormProps } from "./ConfirmEmailForm.type";
import css from "./Story.module.scss";

export default {
  title: "COMPONENTS/ConfirmEmailForm",
  component: ConfirmEmailForm,
  parameters: {
    componentSubtitle: "Subtitle goes here",
  },
} as Meta;

const Template: Story<ConfirmEmailFormProps> = (args) => (
  <div className={css.Story}>
    <ConfirmEmailForm {...args} />
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
