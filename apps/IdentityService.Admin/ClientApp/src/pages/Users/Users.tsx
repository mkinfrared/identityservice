import css from "./Users.module.scss";
import { UsersProps } from "./Users.type";

const Users = ({ className }: UsersProps) => {
  const classNames = [css.Users, className].filter(Boolean).join(" ");

  return (
    <div className={classNames} data-testid="Users">
      Users works!!
    </div>
  );
};

export default Users;
