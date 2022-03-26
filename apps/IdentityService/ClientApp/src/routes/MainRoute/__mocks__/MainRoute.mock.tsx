import { MainRouteProps } from "../MainRoute.type";

const MainRouteMock = (props: MainRouteProps) => (
  <div data-testid="MainRoute">{JSON.stringify(props)}</div>
);

export default MainRouteMock;
