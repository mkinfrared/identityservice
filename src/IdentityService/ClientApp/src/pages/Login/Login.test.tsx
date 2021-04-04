import { render } from "@testing-library/react";

import { Login } from "./Login";

jest.mock("api/mutations");

describe("<Login />", () => {
  const Component = <Login />;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should be defined", () => {
    expect(Login).toBeDefined();
  });

  it("should match the snapshot", () => {
    const { container } = render(Component);

    expect(container).toMatchSnapshot();
  });
});
