import { PersistedGrantsProps } from "../PersistedGrants.type";

const PersistedGrantsMock = (props: PersistedGrantsProps) => (
  <div data-testid="PersistedGrants">{JSON.stringify(props)}</div>
);

export default PersistedGrantsMock;
