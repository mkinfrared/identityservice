import { render } from "@testing-library/react";
import React from "react";

import { Card } from "./Card";

describe("<Card />", () => {
  const Component = <Card />;

  it("should be defined", () => {
    expect(Card).toBeDefined();
  });

  it("should match the snapshot", () => {
    const { container } = render(Component);

    expect(container).toMatchSnapshot();
  });

  it("should add class name passed in props", () => {
    const classname = "marklar";
    const { getByTestId } = render(<Card className={classname} />);
    const element = getByTestId("Card");

    expect(element).toBeDefined();

    expect(element).toHaveClass(classname);
  });
});
