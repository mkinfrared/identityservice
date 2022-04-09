import { render } from "@testing-library/react";
import React from "react";

import { Button } from "./Button";

describe("<Button />", () => {
  const Component = <Button />;

  it("should be defined", () => {
    expect(Button).toBeDefined();
  });

  it("should match the snapshot", () => {
    const { container } = render(Component);

    expect(container).toMatchSnapshot();
  });

  it("should render a contained button by default", () => {
    const { getByTestId } = render(Component);
    const element = getByTestId("Button");

    expect(element).toBeDefined();

    expect(element).toHaveClass("contained");
  });

  it("should render an outlined button when variant prop is outlined", () => {
    const { getByTestId } = render(<Button variant="outlined" />);
    const element = getByTestId("Button");

    expect(element).toBeDefined();

    expect(element).toHaveClass("outlined");
  });

  it("should render a disabled button when disabled prop is true", () => {
    const { getByTestId } = render(<Button disabled />);
    const element = getByTestId("Button");

    expect(element).toBeDefined();

    expect(element).toBeDisabled();
  });

  it("should add class name passed in props", () => {
    const classname = "marklar";
    const { getByTestId } = render(<Button className={classname} />);
    const element = getByTestId("Button");

    expect(element).toBeDefined();

    expect(element).toHaveClass(classname);
  });

  it("should add 'loading' class name to button", () => {
    const classname = "loading";
    const { getByTestId } = render(<Button className={classname} loading />);
    const element = getByTestId("Button");

    expect(element).toBeDefined();

    expect(element).toHaveClass(classname);
  });
});
