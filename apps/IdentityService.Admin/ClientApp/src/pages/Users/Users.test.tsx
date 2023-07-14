import { render } from "@testing-library/react";

import Users from "./Users";

describe("<Users />", () => {
  const Component = <Users />;

  it("should be defined", () => {
    expect(Users).toBeDefined();
  });

  it("should match the snapshot", () => {
    const { container } = render(Component);

    expect(container).toMatchSnapshot();
  });

  it("should contain a data test id", () => {
    const { getByTestId } = render(Component);
    const element = getByTestId("Users");

    expect(element).toBeDefined();
  });
});
