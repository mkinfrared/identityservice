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
    <BrandButton {...args} brand={Brand.APPLE}>
      Register with Apple
    </BrandButton>
    <BrandButton {...args} brand={Brand.EPIC_GAMES}>
      Register with Epic Games
    </BrandButton>
    <BrandButton {...args} brand={Brand.FACEBOOK}>
      Register with Facebook
    </BrandButton>
    <BrandButton {...args} brand={Brand.GOOGLE}>
      Register with Google
    </BrandButton>
    <BrandButton {...args} brand={Brand.MICROSOFT}>
      Register with Microsoft
    </BrandButton>
    <BrandButton {...args} brand={Brand.STEAM}>
      Register with Steam
    </BrandButton>
    <BrandButton {...args} brand={Brand.VK}>
      Register with VK
    </BrandButton>
  </div>
);

const Default = Template.bind({
  loading: false,
});

Default.args = {
  href: "https://en.wikipedia.org/wiki/Fleetwood_Mac",
};

Default.parameters = {
  docs: {
    storyDescription: "Story description",
  },
};

export { Default };
