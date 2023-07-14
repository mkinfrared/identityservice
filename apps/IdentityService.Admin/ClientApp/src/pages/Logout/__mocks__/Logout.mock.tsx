import { LogoutProps } from "../Logout.type";

const LogoutMock = (props: LogoutProps) => (
  <div data-testid="Logout">{JSON.stringify(props)}</div>
);

export default LogoutMock;
