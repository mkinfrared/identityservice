import { render } from "@testing-library/react";

import LoginButton from "./LoginButton";

describe("<LoginButton />", () => {
  const Component = <LoginButton />;

  it("should be defined", () => {
    expect(LoginButton).toBeDefined();
  });

  it("should match the snapshot", () => {
    const { container } = render(Component);

    expect(container).toMatchSnapshot();
  });
});
