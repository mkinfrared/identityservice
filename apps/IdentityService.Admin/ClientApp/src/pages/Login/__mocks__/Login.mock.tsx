import { LoginProps } from "../Login.type";

const LoginMock = (props: LoginProps) => (
  <div data-testid="Login">{JSON.stringify(props)}</div>
);

export default LoginMock;
