import { render } from "@testing-library/react";

import Main from "./Main";

describe("<Main />", () => {
  const Component = <Main />;

  it("should be defined", () => {
    expect(Main).toBeDefined();
  });

  it("should match the snapshot", () => {
    const { container } = render(Component);

    expect(container).toMatchSnapshot();
  });

  it("should contain a data test id", () => {
    const { getByTestId } = render(Component);
    const element = getByTestId("Main");

    expect(element).toBeDefined();
  });
});
