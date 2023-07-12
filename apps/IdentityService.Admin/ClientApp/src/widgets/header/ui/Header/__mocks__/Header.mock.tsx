import { HeaderProps } from "../Header.type";

const HeaderMock = (props: HeaderProps) => (
  <div data-testid="Header">{JSON.stringify(props)}</div>
);

export default HeaderMock;
