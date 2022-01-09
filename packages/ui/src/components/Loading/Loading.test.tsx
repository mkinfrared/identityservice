import { render } from "@testing-library/react";
import React, { createRef } from "react";

import { Loading } from "./Loading";

describe("<Loading />", () => {
  const element = createRef<HTMLDivElement>();
  const Component = <Loading container={element} />;

  it("should be defined", () => {
    expect(Loading).toBeDefined();
  });

  it("should match the snapshot", () => {
    const { container } = render(Component);

    expect(container).toMatchSnapshot();
  });
});
