import { render } from "@testing-library/react";
import React from "react";

import Button from "components/Button";

import { ButtonGroup } from "./ButtonGroup";

jest.mock("components/Button");

describe("<ButtonGroup />", () => {
  const Component = (
    <ButtonGroup>
      <Button />
      <Button />
      <Button />
    </ButtonGroup>
  );

  it("should be defined", () => {
    expect(ButtonGroup).toBeDefined();
  });

  it("should match the snapshot", () => {
    const { container } = render(Component);

    expect(container).toMatchSnapshot();
  });

  it("should contain a data test id", () => {
    const { getByTestId } = render(Component);
    const element = getByTestId("ButtonGroup");

    expect(element).toBeDefined();
  });
});
