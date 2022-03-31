import { render } from "@testing-library/react";

import { BrandButton } from "./BrandButton";
import { Brand } from "./BrandButton.type";

describe("<BrandButton />", () => {
  const Component = <BrandButton brand={Brand.STEAM} />;

  it("should be defined", () => {
    expect(BrandButton).toBeDefined();
  });

  it("should match the snapshot", () => {
    const { container } = render(Component);

    expect(container).toMatchSnapshot();
  });

  it("should contain a data test id", () => {
    const { getByTestId } = render(Component);
    const element = getByTestId("LinkButton");

    expect(element).toBeDefined();
  });

  it("should add 'apple' className when brand is 'Apple'", () => {
    const { getByTestId } = render(<BrandButton brand={Brand.APPLE} />);
    const element = getByTestId("LinkButton");

    expect(element).toHaveClass("apple");
  });

  it("should add 'epic' className when brand is 'Epic Games'", () => {
    const { getByTestId } = render(<BrandButton brand={Brand.EPIC_GAMES} />);
    const element = getByTestId("LinkButton");

    expect(element).toHaveClass("epic");
  });

  it("should add 'facebook' className when brand is 'Facebook'", () => {
    const { getByTestId } = render(<BrandButton brand={Brand.FACEBOOK} />);
    const element = getByTestId("LinkButton");

    expect(element).toHaveClass("facebook");
  });

  it("should add 'google' className when brand is 'Google'", () => {
    const { getByTestId } = render(<BrandButton brand={Brand.GOOGLE} />);
    const element = getByTestId("LinkButton");

    expect(element).toHaveClass("google");
  });

  it("should add 'microsoft' className when brand is 'Microsoft'", () => {
    const { getByTestId } = render(<BrandButton brand={Brand.MICROSOFT} />);
    const element = getByTestId("LinkButton");

    expect(element).toHaveClass("microsoft");
  });

  it("should add 'steam' className when brand is 'Steam'", () => {
    const { getByTestId } = render(<BrandButton brand={Brand.STEAM} />);
    const element = getByTestId("LinkButton");

    expect(element).toHaveClass("steam");
  });

  it("should add 'vk' className when brand is 'Vkontakte'", () => {
    const { getByTestId } = render(<BrandButton brand={Brand.VK} />);
    const element = getByTestId("LinkButton");

    expect(element).toHaveClass("vk");
  });
});
