import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import React from "react";

import Button from "components/Button";
import Heading from "components/Heading";
import IconButton from "components/IconButton";
import { ReactComponent as Doc } from "icons/description.svg";
import { ReactComponent as Eye } from "icons/visibility.svg";

import { ButtonGroup } from "./ButtonGroup";
import css from "./Story.module.scss";

type Story = StoryObj<typeof ButtonGroup>;

const meta = {
  title: "UI/ButtonGroup",
  component: ButtonGroup,
  argTypes: {
    color: {
      options: ["error", "primary", "secondary", "success"],
      control: { type: "radio" },
    },
  },
  parameters: {
    componentSubtitle: "Subtitle from template",
  },
} satisfies Meta<typeof ButtonGroup>;

const Default: Story = {
  args: {
    color: "primary",
  },
  parameters: {
    docs: {
      storyDescription: "Story description",
    },
  },
  render: (args) => (
    <div className={css.Story}>
      <div className={css.container}>
        <Heading>Default</Heading>
        <ButtonGroup {...args}>
          <Button onClick={action("click")}>Lorem</Button>
          <Button onClick={action("click")}>doloribus</Button>
          <Button onClick={action("click")}>elit</Button>
          <Button onClick={action("click")}>consectetur</Button>
        </ButtonGroup>
      </div>
      <div className={css.container}>
        <Heading>Variants</Heading>
        <div className={css.buttonContainer}>
          <ButtonGroup {...args} variant="contained">
            <Button onClick={action("click")}>Lorem</Button>
            <Button onClick={action("click")}>doloribus</Button>
            <Button onClick={action("click")}>elit</Button>
            <Button onClick={action("click")}>consectetur</Button>
          </ButtonGroup>
        </div>
        <div className={css.buttonContainer}>
          <ButtonGroup {...args} variant="outlined">
            <Button onClick={action("click")}>Lorem</Button>
            <Button onClick={action("click")}>doloribus</Button>
            <Button onClick={action("click")}>elit</Button>
            <Button onClick={action("click")}>consectetur</Button>
          </ButtonGroup>
        </div>
      </div>
      <div className={css.container}>
        <Heading>Colors</Heading>
        <div className={css.buttonContainer}>
          <ButtonGroup {...args} variant="contained" color="primary">
            <Button onClick={action("click")}>Lorem</Button>
            <Button onClick={action("click")}>doloribus</Button>
            <Button onClick={action("click")}>elit</Button>
            <Button onClick={action("click")}>consectetur</Button>
          </ButtonGroup>
        </div>
        <div className={css.buttonContainer}>
          <ButtonGroup {...args} variant="contained" color="secondary">
            <Button onClick={action("click")}>Lorem</Button>
            <Button onClick={action("click")}>doloribus</Button>
            <Button onClick={action("click")}>elit</Button>
            <Button onClick={action("click")}>consectetur</Button>
          </ButtonGroup>
        </div>
        <div className={css.buttonContainer}>
          <ButtonGroup {...args} variant="contained" color="success">
            <Button onClick={action("click")}>Lorem</Button>
            <Button onClick={action("click")}>doloribus</Button>
            <Button onClick={action("click")}>elit</Button>
            <Button onClick={action("click")}>consectetur</Button>
          </ButtonGroup>
        </div>
        <div className={css.buttonContainer}>
          <ButtonGroup {...args} variant="contained" color="error">
            <Button onClick={action("click")}>Lorem</Button>
            <Button onClick={action("click")}>doloribus</Button>
            <Button onClick={action("click")}>elit</Button>
            <Button onClick={action("click")}>consectetur</Button>
          </ButtonGroup>
        </div>
        <div className={css.buttonContainer}>
          <ButtonGroup {...args} variant="outlined" color="primary">
            <Button onClick={action("click")}>Lorem</Button>
            <Button onClick={action("click")}>doloribus</Button>
            <Button onClick={action("click")}>elit</Button>
            <Button onClick={action("click")}>consectetur</Button>
          </ButtonGroup>
        </div>
        <div className={css.buttonContainer}>
          <ButtonGroup {...args} variant="outlined" color="secondary">
            <Button onClick={action("click")}>Lorem</Button>
            <Button onClick={action("click")}>doloribus</Button>
            <Button onClick={action("click")}>elit</Button>
            <Button onClick={action("click")}>consectetur</Button>
          </ButtonGroup>
        </div>
        <div className={css.buttonContainer}>
          <ButtonGroup {...args} variant="outlined" color="success">
            <Button onClick={action("click")}>Lorem</Button>
            <Button onClick={action("click")}>doloribus</Button>
            <Button onClick={action("click")}>elit</Button>
            <Button onClick={action("click")}>consectetur</Button>
          </ButtonGroup>
        </div>
        <div className={css.buttonContainer}>
          <ButtonGroup {...args} variant="outlined" color="error">
            <Button onClick={action("click")}>Lorem</Button>
            <Button onClick={action("click")}>doloribus</Button>
            <Button onClick={action("click")}>elit</Button>
            <Button onClick={action("click")}>consectetur</Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  ),
};

const WithIcon: Story = {
  render: () => (
    <div className={css.Story}>
      <div className={css.container}>
        <ButtonGroup>
          <IconButton onClick={action("click")}>
            <Doc />
          </IconButton>
          <Button onClick={action("click")}>consectetur</Button>
        </ButtonGroup>
      </div>
      <div className={css.container}>
        <ButtonGroup>
          <Button onClick={action("click")}>Lorem ipsum</Button>
          <IconButton onClick={action("click")}>
            <Eye />
          </IconButton>
        </ButtonGroup>
      </div>
    </div>
  ),
};

export { Default, WithIcon };

export default meta;
