import { render } from "@testing-library/react";

import Roles from "./Roles";

describe("<Roles />", () => {
  const Component = <Roles />;

  it("should be defined", () => {
    expect(Roles).toBeDefined();
  });

  it("should match the snapshot", () => {
    const { container } = render(Component);

    expect(container).toMatchSnapshot();
  });

  it("should contain a data test id", () => {
    const { getByTestId } = render(Component);
    const element = getByTestId("Roles");

    expect(element).toBeDefined();
  });
});
