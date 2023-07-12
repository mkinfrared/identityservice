import { render } from "@testing-library/react";

import Header from "./Header";

describe("<Header />", () => {
  const Component = <Header />;

  it("should be defined", () => {
    expect(Header).toBeDefined();
  });

  it("should match the snapshot", () => {
    const { container } = render(Component);

    expect(container).toMatchSnapshot();
  });

  it("should contain a data test id", () => {
    const { getByTestId } = render(Component);
    const element = getByTestId("Header");

    expect(element).toBeDefined();
  });
});
