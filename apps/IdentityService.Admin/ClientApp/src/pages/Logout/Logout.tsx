import css from "./Logout.module.scss";
import { LogoutProps } from "./Logout.type";

const Logout = ({ className }: LogoutProps) => {
  const classNames = [css.Logout, className].filter(Boolean).join(" ");

  return (
    <div className={classNames} data-testid="Logout">
      Logout works!!
    </div>
  );
};

export default Logout;
