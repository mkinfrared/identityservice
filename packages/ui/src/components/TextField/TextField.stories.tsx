import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";

import { ReactComponent as Doc } from "icons/description.svg";
import { ReactComponent as Eye } from "icons/visibility.svg";

import css from "./Story.module.scss";
import { TextField } from "./TextField";

type Story = StoryObj<typeof TextField>;

const meta = {
  title: "UI/TextField",
  component: TextField,
  parameters: {
    componentSubtitle: "Subtitle from template",
  },
} satisfies Meta<typeof TextField>;

const Uncontrolled: Story = {
  args: {
    disabled: false,
    value: "foobar",
    error: "",
    label: "",
  },
  render: (args) => (
    <div className={css.Story}>
      <div>
        <TextField {...args} />
      </div>
    </div>
  ),
};

const Controlled: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState("");

    return (
      <div className={css.Story}>
        <div>
          <TextField
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </div>
      </div>
    );
  },
};

const MultipleFields: Story = {
  render: (args) => (
    <div className={css.Story}>
      <div>
        <TextField {...args} />
        <TextField {...args} />
        <TextField {...args} />
        <TextField {...args} />
      </div>
    </div>
  ),
};

const ExampleForm: Story = {
  render: () => (
    <div className={css.Story}>
      <div>
        <TextField name="username" />
        <TextField name="password" suffix={<Eye />} />
      </div>
    </div>
  ),
};

const WithError: Story = { ...Uncontrolled };
const WithPrefix: Story = { ...Uncontrolled };
const WithSuffix: Story = { ...Uncontrolled };
const WithPrefixSuffix: Story = { ...Uncontrolled };

WithError.args = {
  value: "marklar",
  onChange: action("change"),
  error:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. asdf sadfl kjasdf agj asldfkj asdfjlk",
};

WithPrefix.args = {
  value: "marklar",
  onChange: action("change"),
  prefix: <Doc />,
};

WithSuffix.args = {
  value: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
  onChange: action("change"),
  suffix: <Eye />,
  onSuffixClick: action("suffix"),
};

WithPrefixSuffix.args = {
  value: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
  onChange: action("change"),
  suffix: <Eye />,
  prefix: <Doc />,
};

export {
  Uncontrolled,
  Controlled,
  WithError,
  WithPrefix,
  WithSuffix,
  WithPrefixSuffix,
  MultipleFields,
  ExampleForm,
};

export default meta;
