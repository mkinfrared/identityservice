import { MainProps } from "../Main.type";

const MainMock = (props: MainProps) => (
  <div data-testid="Main">{JSON.stringify(props)}</div>
);

export default MainMock;
