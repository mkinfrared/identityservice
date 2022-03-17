import { ToggleFieldProps } from "../ToggleField.type";

const ToggleFieldMock = (props: ToggleFieldProps) => (
  <div data-testid="ToggleField">{JSON.stringify(props)}</div>
);

export default ToggleFieldMock;
