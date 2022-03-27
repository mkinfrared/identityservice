import React from "react";

import { ButtonGroupProps } from "../ButtonGroup.type";

const ButtonGroupMock = (props: ButtonGroupProps) => (
  <div data-testid="ButtonGroup">{JSON.stringify(props)}</div>
);

export default ButtonGroupMock;
