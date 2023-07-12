import css from "./Clients.module.scss";
import { ClientsProps } from "./Clients.type";

const Clients = ({ className }: ClientsProps) => {
  const classNames = [css.Clients, className].filter(Boolean).join(" ");

  return (
    <div className={classNames} data-testid="Clients">
      Clients works!!
    </div>
  );
};

export default Clients;
