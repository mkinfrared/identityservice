import { render } from "@testing-library/react";

import { withRouter } from "utils/testUtils";

import { AppLink } from "./AppLink";

describe("<AppLink />", () => {
  const to = "/foo/bar";
  const Component = <AppLink to={to as any} />;

  it("should be defined", () => {
    expect(AppLink).toBeDefined();
  });

  it("should match the snapshot", () => {
    const { container } = render(Component, { wrapper: withRouter });

    expect(container).toMatchSnapshot();
  });

  it("should contain a data test id", () => {
    const { getByTestId } = render(Component, { wrapper: withRouter });
    const element = getByTestId("AppLink");

    expect(element).toBeDefined();
  });
});
