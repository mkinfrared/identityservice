import { render } from "@testing-library/react";

import Clients from "./Clients";

describe("<Clients />", () => {
  const Component = <Clients />;

  it("should be defined", () => {
    expect(Clients).toBeDefined();
  });

  it("should match the snapshot", () => {
    const { container } = render(Component);

    expect(container).toMatchSnapshot();
  });

  it("should contain a data test id", () => {
    const { getByTestId } = render(Component);
    const element = getByTestId("Clients");

    expect(element).toBeDefined();
  });
});
