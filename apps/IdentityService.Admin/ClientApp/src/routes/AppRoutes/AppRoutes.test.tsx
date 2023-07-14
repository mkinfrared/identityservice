import { render } from "@testing-library/react";

import { withRouter } from "shared/lib/helpers/testUtils";

import AppRoutes from "./AppRoutes";

jest.mock("shared/lib/hooks", () => ({
  useUserSession: jest.fn(),
}));

describe("<AppRoutes />", () => {
  const Component = withRouter(<AppRoutes />);

  it("should be defined", () => {
    expect(AppRoutes).toBeDefined();
  });

  it("should match the snapshot", () => {
    const { container } = render(Component);

    expect(container).toMatchSnapshot();
  });
});
