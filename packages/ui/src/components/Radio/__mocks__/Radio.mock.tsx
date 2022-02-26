import React from "react";

import { RadioProps } from "../Radio.type";

const RadioMock = (props: RadioProps) => (
  <div data-testid="Radio">{JSON.stringify(props)}</div>
);

export default RadioMock;
