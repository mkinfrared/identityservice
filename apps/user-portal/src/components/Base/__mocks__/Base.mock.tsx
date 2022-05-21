import { BaseProps } from "../Base.type";

const BaseMock = (props: BaseProps) => (
  <div data-testid="Base">{JSON.stringify(props)}</div>
);

export default BaseMock;
