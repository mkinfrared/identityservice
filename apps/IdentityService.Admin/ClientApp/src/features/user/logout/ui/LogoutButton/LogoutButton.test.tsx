import { render } from "@testing-library/react";

import LogoutButton from "./LogoutButton";

describe("<LogoutButton />", () => {
  const Component = <LogoutButton />;

  it("should be defined", () => {
    expect(LogoutButton).toBeDefined();
  });

  it("should match the snapshot", () => {
    const { container } = render(Component);

    expect(container).toMatchSnapshot();
  });
});
