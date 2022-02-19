import React from "react";

import { ToggleProps } from "../Toggle.type";

const ToggleMock = (props: ToggleProps) => (
  <div data-testid="Toggle">{JSON.stringify(props)}</div>
);

export default ToggleMock;
