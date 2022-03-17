import { render } from "@testing-library/react";

import { CheckboxField } from "./CheckboxField";

describe("<CheckboxField />", () => {
  const Component = <CheckboxField />;

  it("should be defined", () => {
    expect(CheckboxField).toBeDefined();
  });

  it("should match the snapshot", () => {
    const { container } = render(Component);

    expect(container).toMatchSnapshot();
  });

  it("should contain a data test id", () => {
    const { getByTestId } = render(Component);
    const element = getByTestId("Checkbox");

    expect(element).toBeDefined();
  });
});
