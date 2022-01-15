import { ConfirmEmailFormProps } from "../ConfirmEmailForm.type";

const ConfirmEmailForm = (props: ConfirmEmailFormProps) => (
  <div data-testid="ConfirmEmailForm">{JSON.stringify(props)}</div>
);

export default ConfirmEmailForm;
