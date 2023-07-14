import { LogoutButtonProps } from "../LogoutButton.type";

const LogoutButtonMock = (props: LogoutButtonProps) => (
  <div data-testid="LogoutButton">{JSON.stringify(props)}</div>
);

export default LogoutButtonMock;
