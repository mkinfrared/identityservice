import { ApiResourcesProps } from "../ApiResources.type";

const ApiResourcesMock = (props: ApiResourcesProps) => (
  <div data-testid="ApiResources">{JSON.stringify(props)}</div>
);

export default ApiResourcesMock;
