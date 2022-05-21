import { SilentRenewProps } from "../SilentRenew.type";

const SilentRenewMock = (props: SilentRenewProps) => (
  <div data-testid="SilentRenew">{JSON.stringify(props)}</div>
);

export default SilentRenewMock;
