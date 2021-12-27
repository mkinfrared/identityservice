import { fireEvent, render } from "@testing-library/react";
import React from "react";

import { FakeButton } from "./FakeButton";

describe("<FakeButton />", () => {
  const onClick = jest.fn();
  const Component = <FakeButton onClick={onClick} />;

  it("should be defined", () => {
    expect(FakeButton).toBeDefined();
  });

  it("should match the snapshot", () => {
    const { container } = render(Component);

    expect(container).toMatchSnapshot();
  });

  it("should call onClick passed from props on Enter press", () => {
    const { getByTestId } = render(Component);
    const enterCode = 13;
    const fakeButton = getByTestId("FakeButton");

    fireEvent.keyPress(fakeButton, {
      charCode: enterCode,
      target: fakeButton,
    });

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("should not call onClick passed from props if pressed button is not 'Enter'", () => {
    const { getByTestId } = render(Component);
    const enterCode = 69;
    const fakeButton = getByTestId("FakeButton");

    fireEvent.keyPress(fakeButton, {
      charCode: enterCode,
      target: fakeButton,
    });

    expect(onClick).not.toHaveBeenCalled();
  });
});
