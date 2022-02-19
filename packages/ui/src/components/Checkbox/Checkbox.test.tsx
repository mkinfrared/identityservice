import { render } from "@testing-library/react";
import React from "react";

import { Checkbox } from "./Checkbox";

describe("<Checkbox />", () => {
  const Component = <Checkbox />;

  it("should be defined", () => {
    expect(Checkbox).toBeDefined();
  });

  it("should match the snapshot", () => {
    const { container } = render(Component);

    expect(container).toMatchSnapshot();
  });

  it("should render a Text component when label is truthy", () => {
    const label = "marklar";
    const { getByTestId } = render(<Checkbox label={label} />);
    const labelText = getByTestId("Text");

    expect(labelText).toBeDefined();
  });

  it("should add an error class to label", () => {
    const { getByTestId } = render(<Checkbox error />);
    const label = getByTestId("Checkbox");

    expect(label.classList).toContain("error");
  });
});
