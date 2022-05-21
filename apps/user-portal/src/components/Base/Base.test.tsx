import { render } from "@testing-library/react";
import React from "react";

import { Base } from "./Base";

describe("<Base />", () => {
  const Component = <Base />;

  it("should be defined", () => {
    expect(Base).toBeDefined();
  });

  it("should match the snapshot", () => {
    const { container } = render(Component);

    expect(container).toMatchSnapshot();
  });

  it("should contain a data test id", () => {
    const { getByTestId } = render(Component);
    const element = getByTestId("Base");

    expect(element).toBeDefined();
  });
});
