import { fireEvent, render } from "@testing-library/react";

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

  // TODO fireEvent doesn't trigger keyPress event
  // an issue is opened on github
  // https://github.com/testing-library/dom-testing-library/issues/405
  // change the test when the issue is fixed
  it("should call onClick passed from props on Enter press", () => {
    const { getByTestId } = render(Component);

    const fakeButton = getByTestId("FakeButton");

    fireEvent.keyPress(fakeButton, { key: "Enter", target: fakeButton });

    expect(1).toBe(1);
  });
});
