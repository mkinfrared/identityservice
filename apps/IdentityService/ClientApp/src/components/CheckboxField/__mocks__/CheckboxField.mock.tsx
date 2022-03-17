import { CheckboxFieldProps } from "../CheckboxField.type";

const CheckboxFieldMock = (props: CheckboxFieldProps) => (
  <div data-testid="CheckboxField">{JSON.stringify(props)}</div>
);

export default CheckboxFieldMock;
