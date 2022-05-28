import { AppRoutesProps } from "../AppRoutes.type";

const AppRoutesMock = (props: AppRoutesProps) => (
  <div data-testid="AppRoutes">{JSON.stringify(props)}</div>
);

export default AppRoutesMock;
