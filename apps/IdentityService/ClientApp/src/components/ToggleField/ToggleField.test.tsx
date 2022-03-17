import { render } from "@testing-library/react";

import { ToggleField } from "./ToggleField";

describe("<ToggleField />", () => {
  const Component = <ToggleField />;

  it("should be defined", () => {
    expect(ToggleField).toBeDefined();
  });

  it("should match the snapshot", () => {
    const { container } = render(Component);

    expect(container).toMatchSnapshot();
  });

  it("should contain a data test id", () => {
    const { getByTestId } = render(Component);
    const element = getByTestId("Toggle");

    expect(element).toBeDefined();
  });
});
