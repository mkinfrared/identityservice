import { render } from "@testing-library/react";

import { withRouter } from "utils/testUtils";

import { MainRoute } from "./MainRoute";

describe("<MainRoute />", () => {
  const Component = <MainRoute />;

  it("should be defined", () => {
    expect(MainRoute).toBeDefined();
  });

  it("should match the snapshot", () => {
    const { container } = render(Component, { wrapper: withRouter });

    expect(container).toMatchSnapshot();
  });
});
