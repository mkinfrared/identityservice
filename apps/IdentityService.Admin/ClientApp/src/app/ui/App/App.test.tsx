import { render } from "@testing-library/react";

import App from "./App";

jest.mock("routes/AppRoutes");

jest.mock("@identity-service/ui");

describe("<App />", () => {
  const Component = <App />;

  it("should be defined", () => {
    expect(App).toBeDefined();
  });

  it("should match the snapshot", () => {
    const { container } = render(Component);

    expect(container).toMatchSnapshot();
  });
});
