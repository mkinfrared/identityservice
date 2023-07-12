import { ClientsProps } from "../Clients.type";

const ClientsMock = (props: ClientsProps) => (
  <div data-testid="Clients">{JSON.stringify(props)}</div>
);

export default ClientsMock;
