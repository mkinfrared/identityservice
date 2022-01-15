import { render } from "@testing-library/react";

import { InputField } from "./InputField";

describe("<InputField />", () => {
  const Component = <InputField />;

  it("should be defined", () => {
    expect(InputField).toBeDefined();
  });

  it("match the snapshot", () => {
    const { container } = render(Component);

    expect(container).toMatchSnapshot();
  });
});
