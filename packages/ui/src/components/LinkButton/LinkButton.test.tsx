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
});
