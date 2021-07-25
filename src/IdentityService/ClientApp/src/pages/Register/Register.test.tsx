import { render } from "@testing-library/react";

import { Register } from "./Register";

describe("<Register />", () => {
  const Component = <Register />;

  it("should be defined", () => {
    expect(Register).toBeDefined();
  });

  it("should match the snapshot", () => {
    const { container } = render(Component);

    expect(container).toMatchSnapshot();
  });
});
