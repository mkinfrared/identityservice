import { RolesProps } from "../Roles.type";

const RolesMock = (props: RolesProps) => (
  <div data-testid="Roles">{JSON.stringify(props)}</div>
);

export default RolesMock;
