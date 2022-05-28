import { render } from "@testing-library/react";

import App from "./App";

jest.mock("routes/AppRoutes");

jest.mock("@identity-service/ui");

describe("<App />", () => {
  const Component = <App />;

  it("should be defined", () => {
    expect(App).toBeDefined();
  });

  it("should render AppRoutes", () => {
    const { getByTestId } = render(Component);
    const appRoutes = getByTestId("AppRoutes");

    expect(appRoutes).toBeInTheDocument();
  });
});
