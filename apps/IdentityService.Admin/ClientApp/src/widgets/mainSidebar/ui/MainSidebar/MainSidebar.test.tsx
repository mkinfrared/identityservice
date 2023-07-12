import { render } from "@testing-library/react";

import { useUserSession } from "shared/lib/hooks";

import MainSidebar from "./MainSidebar";

jest.mock("shared/lib/hooks");

describe("<MainSidebar />", () => {
  const useUserSessionMock = jest.mocked(useUserSession);

  beforeEach(() => {
    useUserSessionMock.mockReturnValue({ bar: "foo" } as any);
  });

  const Component = <MainSidebar />;

  it("should be defined", () => {
    expect(MainSidebar).toBeDefined();
  });

  it("should match the snapshot", () => {
    const { container } = render(Component);

    expect(container).toMatchSnapshot();
  });

  it("should contain a data test id", () => {
    const { getByTestId } = render(Component);
    const element = getByTestId("MainSidebar");

    expect(element).toBeDefined();
  });
});
