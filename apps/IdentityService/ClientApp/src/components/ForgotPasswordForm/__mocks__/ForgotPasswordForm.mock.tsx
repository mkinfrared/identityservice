import { ForgotPasswordFormProps } from "../ForgotPasswordForm.type";

const ForgotPasswordFormMock = (props: ForgotPasswordFormProps) => (
  <div data-testid="ForgotPasswordForm">{JSON.stringify(props)}</div>
);

export default ForgotPasswordFormMock;
