import { AppLinkProps } from "../AppLink.type";

const AppLinkMock = (props: AppLinkProps) => (
  <div data-testid="AppLink">{JSON.stringify(props)}</div>
);

export default AppLinkMock;
