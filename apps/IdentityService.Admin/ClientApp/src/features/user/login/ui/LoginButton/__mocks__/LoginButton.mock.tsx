import { LoginButtonProps } from "../LoginButton.type";

const LoginButtonMock = (props: LoginButtonProps) => (
  <div data-testid="LoginButton">{JSON.stringify(props)}</div>
);

export default LoginButtonMock;
