import { HomeProps } from "../Home.type";

const HomeMock = (props: HomeProps) => (
  <div data-testid="Home">{JSON.stringify(props)}</div>
);

export default HomeMock;
