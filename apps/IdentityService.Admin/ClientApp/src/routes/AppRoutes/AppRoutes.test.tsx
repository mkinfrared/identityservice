import { render, waitFor } from "@testing-library/react";

import { withRouter } from "shared/lib/helpers/testUtils";
import { useUserSession } from "shared/lib/hooks";

import AppRoutes from "./AppRoutes";

jest.mock("shared/lib/hooks", () => ({
  useUserSession: jest.fn(),
}));

describe("<AppRoutes />", () => {
  const useUserSessionMock = jest.mocked(useUserSession);
  const Component = <AppRoutes />;

  it("should be defined", () => {
    expect(AppRoutes).toBeDefined();
  });

  it("should match the snapshot", () => {
    const { container } = render(Component, { wrapper: withRouter });

    expect(container).toMatchSnapshot();
  });

  it("should render Login page when user is not signed in", async () => {
    const { getByTestId } = render(Component, {
      wrapper: withRouter,
    });

    await waitFor(() => {
      const loginPage = getByTestId("Login");

      expect(loginPage).toBeInTheDocument();
    });
  });

  it("should render Home page when user is logged in", async () => {
    const user = { foo: "bar" } as any;

    useUserSessionMock.mockReturnValue(user);

    const { getByTestId } = render(Component, {
      wrapper: withRouter,
    });

    await waitFor(() => {
      const homePage = getByTestId("Home");

      expect(homePage).toBeInTheDocument();
    });
  });
});
