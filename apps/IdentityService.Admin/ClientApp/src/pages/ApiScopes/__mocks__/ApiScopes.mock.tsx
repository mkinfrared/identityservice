import { ApiScopesProps } from "../ApiScopes.type";

const ApiScopesMock = (props: ApiScopesProps) => (
  <div data-testid="ApiScopes">{JSON.stringify(props)}</div>
);

export default ApiScopesMock;
