import { RootProps } from "../Root.type";

const RootMock = (props: RootProps) => (
  <div data-testid="Root">{JSON.stringify(props)}</div>
);

export default RootMock;
