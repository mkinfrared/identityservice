import { render } from "@testing-library/react";

import IdentityResources from "./IdentityResources";

describe("<IdentityResources />", () => {
  const Component = <IdentityResources />;

  it("should be defined", () => {
    expect(IdentityResources).toBeDefined();
  });

  it("should match the snapshot", () => {
    const { container } = render(Component);

    expect(container).toMatchSnapshot();
  });

  it("should contain a data test id", () => {
    const { getByTestId } = render(Component);
    const element = getByTestId("IdentityResources");

    expect(element).toBeDefined();
  });
});
