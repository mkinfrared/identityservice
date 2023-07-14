import { IdentityResourcesProps } from "../IdentityResources.type";

const IdentityResourcesMock = (props: IdentityResourcesProps) => (
  <div data-testid="IdentityResources">{JSON.stringify(props)}</div>
);

export default IdentityResourcesMock;
