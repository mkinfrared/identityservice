import { Meta, Story } from "@storybook/react";

import { BrandButton } from "./BrandButton";
import css from "./BrandButton.module.scss";
import { Brand, BrandButtonProps } from "./BrandButton.type";

export default {
  title: "COMPONENTS/BrandButton",
  component: BrandButton,
  parameters: {
    componentSubtitle: "Subtitle goes here",
  },
} as Meta;

const Template: Story<BrandButtonProps> = (args) => (
  <div className={css.Story}>
    <BrandButton {...args} brand={Brand.APPLE} />
    <BrandButton {...args} brand={Brand.EPIC_GAMES} />
    <BrandButton {...args} brand={Brand.FACEBOOK} />
    <BrandButton {...args} brand={Brand.GOOGLE} />
    <BrandButton {...args} brand={Brand.MICROSOFT} />
    <BrandButton {...args} brand={Brand.STEAM} />
    <BrandButton {...args} brand={Brand.VK} />
  </div>
);

const Default = Template.bind({
  loading: false,
});

Default.args = {};

Default.parameters = {
  docs: {
    storyDescription: "Story description",
  },
};

export { Default };
