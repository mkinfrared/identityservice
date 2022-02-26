import React from "react";

import { FieldsetProps } from "../Fieldset.type";

const FieldsetMock = (props: FieldsetProps) => (
  <div data-testid="Fieldset">{JSON.stringify(props)}</div>
);

export default FieldsetMock;
