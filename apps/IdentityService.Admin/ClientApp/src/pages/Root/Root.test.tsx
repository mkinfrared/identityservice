import { render } from "@testing-library/react";

import Root from "./Root";

describe("<Root />", () => {
  const Component = <Root />;

  it("should be defined", () => {
    expect(Root).toBeDefined();
  });

  it("should match the snapshot", () => {
    const { container } = render(Component);

    expect(container).toMatchSnapshot();
  });

  it("should contain a data test id", () => {
    const { getByTestId } = render(Component);
    const element = getByTestId("Root");

    expect(element).toBeDefined();
  });
});
