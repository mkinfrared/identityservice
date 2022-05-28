import { render, waitFor } from "@testing-library/react";

import useUserSession from "hooks/useUserSession";
import { withRouter } from "utils/testUtils";

import { AppRoutes } from "./AppRoutes";

jest.mock("hooks/useUserSession");

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
