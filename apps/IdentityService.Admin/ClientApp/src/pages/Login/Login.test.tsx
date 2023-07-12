import { fireEvent, render } from "@testing-library/react";

import { userManager } from "shared/lib/helpers";

import Login from "./Login";

jest.mock("shared/lib/helpers");

describe("<Login />", () => {
  const userManagerMock = jest.mocked(userManager);
  const Component = <Login />;

  it("should be defined", () => {
    expect(Login).toBeDefined();
  });

  it("should match the snapshot", () => {
    const { container } = render(Component);

    expect(container).toMatchSnapshot();
  });

  it("should contain a data test id", () => {
    const { getByTestId } = render(Component);
    const element = getByTestId("Login");

    expect(element).toBeDefined();
  });

  it("should call 'signinRedirect' on userManager when button is clicked", () => {
    const { getByTestId } = render(Component);
    const button = getByTestId("Button");

    fireEvent.click(button);

    expect(userManagerMock.signinRedirect).toHaveBeenCalled();

    expect(userManagerMock.signinRedirect).toHaveBeenCalledTimes(1);
  });
});
