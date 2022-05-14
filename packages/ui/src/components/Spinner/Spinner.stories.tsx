import { Meta, Story } from "@storybook/react";
import React from "react";

import Text from "components/Text";

import { Spinner } from "./Spinner";
import { SpinnerProps } from "./Spinner.type";
import css from "./Story.module.scss";

export default {
  title: "UI/Spinner",
  component: Spinner,
  parameters: {
    componentSubtitle: "Subtitle goes here",
  },
} as Meta;

const spinnerTypes = [
  "audio",
  "ball-triangle",
  "bars",
  "circles",
  "double-ring",
  "eclipse",
  "grid",
  "hearts",
  "infinity",
  "oval",
  "puff",
  "rings",
  "ripple",
  "rolling",
  "spinning-circles",
  "tail-spin",
  "three-dots",
] as const;

const Template: Story<SpinnerProps> = () => (
  <div className={css.Story}>
    {spinnerTypes.map((type) => (
      <div key={type} className={css.loader}>
        <Text>{type}</Text>
        <Spinner type={type} />
      </div>
    ))}
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
