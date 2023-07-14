import { render } from "@testing-library/react";

import Logout from "./Logout";

describe("<Logout />", () => {
  const Component = <Logout />;

  it("should be defined", () => {
    expect(Logout).toBeDefined();
  });

  it("should match the snapshot", () => {
    const { container } = render(Component);

    expect(container).toMatchSnapshot();
  });

  it("should contain a data test id", () => {
    const { getByTestId } = render(Component);
    const element = getByTestId("Logout");

    expect(element).toBeDefined();
  });
});
