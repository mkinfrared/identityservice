import { render } from "@testing-library/react";

import ApiResources from "./ApiResources";

describe("<ApiResources />", () => {
  const Component = <ApiResources />;

  it("should be defined", () => {
    expect(ApiResources).toBeDefined();
  });

  it("should match the snapshot", () => {
    const { container } = render(Component);

    expect(container).toMatchSnapshot();
  });

  it("should contain a data test id", () => {
    const { getByTestId } = render(Component);
    const element = getByTestId("ApiResources");

    expect(element).toBeDefined();
  });
});
