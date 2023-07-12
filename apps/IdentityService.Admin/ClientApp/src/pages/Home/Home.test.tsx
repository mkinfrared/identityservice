import { act, render } from "@testing-library/react";

import { Home } from "./Home";

jest.mock("shared/lib/hooks", () => ({ useUserSession: jest.fn() }));

describe("<Home />", () => {
  const Component = <Home />;

  it("should be defined", () => {
    expect(Home).toBeDefined();
  });

  it("should match the snapshot", () => {
    const { container } = render(Component);

    act(() => {
      expect(container).toMatchSnapshot();
    });
  });

  it("should contain a data test id", () => {
    const { getByTestId } = render(Component);
    const element = getByTestId("Home");

    act(() => {
      expect(element).toBeDefined();
    });
  });
});
