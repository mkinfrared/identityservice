import css from "./Roles.module.scss";
import { RolesProps } from "./Roles.type";

const Roles = ({ className }: RolesProps) => {
  const classNames = [css.Roles, className].filter(Boolean).join(" ");

  return (
    <div className={classNames} data-testid="Roles">
      Roles works!!
    </div>
  );
};

export default Roles;
