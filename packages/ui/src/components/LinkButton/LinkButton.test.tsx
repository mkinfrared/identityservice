import { render } from "@testing-library/react";
import React from "react";

import { LinkButton } from "./LinkButton";

describe("<LinkButton />", () => {
  const Component = <LinkButton />;

  it("should be defined", () => {
    expect(LinkButton).toBeDefined();
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

  it("should render an opaque button by default", () => {
    const { getByTestId } = render(Component);
    const element = getByTestId("LinkButton");

    expect(element).toBeDefined();

    expect(element).toHaveClass("opaque");
  });

  it("should render a transparent button when variant prop is transparent", () => {
    const { getByTestId } = render(<LinkButton variant="transparent" />);
    const element = getByTestId("LinkButton");

    expect(element).toBeDefined();

    expect(element).toHaveClass("transparent");
  });
});
