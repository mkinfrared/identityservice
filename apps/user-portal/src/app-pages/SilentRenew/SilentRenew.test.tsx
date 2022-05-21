import { render } from "@testing-library/react";
import React from "react";

import { SilentRenew } from "./SilentRenew";

describe("<SilentRenew />", () => {
  const Component = <SilentRenew />;

  it("should be defined", () => {
    expect(SilentRenew).toBeDefined();
  });

  it("should match the snapshot", () => {
    const { container } = render(Component);

    expect(container).toMatchSnapshot();
  });

  it("should contain a data test id", () => {
    const { getByTestId } = render(Component);
    const element = getByTestId("SilentRenew");

    expect(element).toBeDefined();
  });
});
