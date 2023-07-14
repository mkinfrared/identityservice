import { render } from "@testing-library/react";

import ApiScopes from "./ApiScopes";

describe("<ApiScopes />", () => {
  const Component = <ApiScopes />;

  it("should be defined", () => {
    expect(ApiScopes).toBeDefined();
  });

  it("should match the snapshot", () => {
    const { container } = render(Component);

    expect(container).toMatchSnapshot();
  });

  it("should contain a data test id", () => {
    const { getByTestId } = render(Component);
    const element = getByTestId("ApiScopes");

    expect(element).toBeDefined();
  });
});
