import { MainSidebarProps } from "../MainSidebar.type";

const MainSidebarMock = (props: MainSidebarProps) => (
  <div data-testid="MainSidebar">{JSON.stringify(props)}</div>
);

export default MainSidebarMock;
