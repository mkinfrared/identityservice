import { render } from "@testing-library/react";
import React from "react";

import { Text } from "./Text";

describe("<Text />", () => {
  const Component = <Text />;

  it("should be defined", () => {
    expect(Text).toBeDefined();
  });

  it("should match the snapshot", () => {
    const { container } = render(Component);

    expect(container).toMatchSnapshot();
  });
});
