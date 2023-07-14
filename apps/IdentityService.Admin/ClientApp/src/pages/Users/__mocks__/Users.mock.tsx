import { UsersProps } from "../Users.type";

const UsersMock = (props: UsersProps) => (
  <div data-testid="Users">{JSON.stringify(props)}</div>
);

export default UsersMock;
