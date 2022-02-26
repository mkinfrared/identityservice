import { render } from "@testing-library/react";
import React from "react";

import { Fieldset } from "./Fieldset";

describe("<Fieldset />", () => {
  const Component = <Fieldset />;

  it("should be defined", () => {
    expect(Fieldset).toBeDefined();
  });

  it("should match the snapshot", () => {
    const { container } = render(Component);

    expect(container).toMatchSnapshot();
  });

  it("should contain a data test id", () => {
    const { getByTestId } = render(Component);
    const element = getByTestId("Fieldset");

    expect(element).toBeDefined();
  });

  it("should render a legend tag when 'legend' prop is truthy", () => {
    const legend = "marklar";
    const { container } = render(<Fieldset legend={legend} />);
    const element = container.querySelector("legend");

    expect(element).toBeDefined();
  });
});
