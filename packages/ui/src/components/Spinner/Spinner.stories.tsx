import { Meta, StoryObj } from "@storybook/react";
import React from "react";

import Text from "components/Text";

import { Spinner } from "./Spinner";
import css from "./Story.module.scss";

type Story = StoryObj<typeof Spinner>;

const meta = {
  title: "UI/Spinner",
  component: Spinner,
  parameters: {
    componentSubtitle: "Subtitle from template",
  },
} satisfies Meta<typeof Spinner>;

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

const Default: Story = {
  render: () => (
    <div className={css.Story}>
      {spinnerTypes.map((type) => (
        <div key={type} className={css.loader}>
          <Text>{type}</Text>
          <Spinner type={type} />
        </div>
      ))}
    </div>
  ),
};

export { Default };

export default meta;
