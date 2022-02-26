import { render } from "@testing-library/react";
import React from "react";

import { Radio } from "./Radio";

describe("<Radio />", () => {
  const Component = <Radio />;

  it("should be defined", () => {
    expect(Radio).toBeDefined();
  });

  it("should match the snapshot", () => {
    const { container } = render(Component);

    expect(container).toMatchSnapshot();
  });

  it("should contain a data test id", () => {
    const { getByTestId } = render(Component);
    const element = getByTestId("Radio");

    expect(element).toBeDefined();
  });

  it("should render <Text /> when label is truthy", () => {
    const label = "markar";
    const { getByTestId } = render(<Radio label={label} />);
    const text = getByTestId("Text");

    expect(text).toBeDefined();
  });

  it("should add an 'error' class to label when error is true", () => {
    const { getByTestId } = render(<Radio error />);
    const label = getByTestId("Radio");

    expect(label.classList).toContain("error");
  });
});
