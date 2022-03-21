import { PasswordResetFormProps } from "../PasswordResetForm.type";

const PasswordResetFormMock = (props: PasswordResetFormProps) => (
  <div data-testid="PasswordResetForm">{JSON.stringify(props)}</div>
);

export default PasswordResetFormMock;
