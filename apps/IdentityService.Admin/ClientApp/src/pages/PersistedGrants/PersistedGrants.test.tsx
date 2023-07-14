import { render } from "@testing-library/react";

import PersistedGrants from "./PersistedGrants";

describe("<PersistedGrants />", () => {
  const Component = <PersistedGrants />;

  it("should be defined", () => {
    expect(PersistedGrants).toBeDefined();
  });

  it("should match the snapshot", () => {
    const { container } = render(Component);

    expect(container).toMatchSnapshot();
  });

  it("should contain a data test id", () => {
    const { getByTestId } = render(Component);
    const element = getByTestId("PersistedGrants");

    expect(element).toBeDefined();
  });
});
