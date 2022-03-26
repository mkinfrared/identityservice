import { render } from "@testing-library/react";

import { Main } from "./Main";

jest.mock("routes/MainRoute");

describe("<Main />", () => {
  it("should be defined", () => {
    const { container } = render(<Main />);

    expect(container).toBeDefined();
  });

  it("should match the snapshot", () => {
    const { container } = render(<Main />);

    expect(container).toMatchSnapshot();
  });
});
