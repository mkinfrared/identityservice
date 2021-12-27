import { LoginFormProps } from "../LoginForm.type";

const LoginFormMock = (props: LoginFormProps) => (
  <div data-testid="LoginForm">{JSON.stringify(props)}</div>
);

export default LoginFormMock;
