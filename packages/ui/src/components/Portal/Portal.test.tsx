import { render } from "@testing-library/react";
import React, { createRef } from "react";

import { Portal } from "./Portal";

describe("<Portal />", () => {
  it("should be defined", () => {
    expect(Portal).toBeDefined();
  });

  it("should match the snapshot", () => {
    const ref = createRef<HTMLDivElement>();

    const { container } = render(
      <div ref={ref}>
        <p>lorem ipsum</p>
        <Portal container={ref}>
          <p>marklar</p>
        </Portal>
      </div>,
    );

    expect(container).toMatchSnapshot();
  });
});
