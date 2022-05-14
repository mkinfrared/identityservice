import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react";
import React, { useState } from "react";

import { ReactComponent as Doc } from "icons/description.svg";
import { ReactComponent as Eye } from "icons/visibility.svg";

import css from "./Story.module.scss";
import { TextField } from "./TextField";
import { TextFieldProps } from "./TextField.type";

export default {
  title: "UI/TextField",
  component: TextField,
} as Meta;

const Template: Story<TextFieldProps> = (args) => (
  <div className={css.Story}>
    <div>
      <TextField {...args} />
    </div>
  </div>
);

const ControlledTemplate: Story<TextFieldProps> = () => {
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
};

const MultiFields: Story<TextFieldProps> = (args) => (
  <div className={css.Story}>
    <div>
      <TextField {...args} />
      <TextField {...args} />
      <TextField {...args} />
      <TextField {...args} />
    </div>
  </div>
);

const Form: Story<TextFieldProps> = () => (
  <div className={css.Story}>
    <div>
      <TextField name="username" />
      <TextField name="password" suffix={<Eye />} />
    </div>
  </div>
);

const Uncontrolled = Template.bind({});
const Controlled = ControlledTemplate.bind({});
const WithError = Template.bind({});
const WithPrefix = Template.bind({});
const WithSuffix = Template.bind({});
const WithPrefixSuffix = Template.bind({});
const MultipleFields = MultiFields.bind({});
const ExampleForm = Form.bind({});

Uncontrolled.args = {
  disabled: false,
  value: "foobar",
  error: "",
  label: "",
};

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
