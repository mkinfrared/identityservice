import css from "./PersistedGrants.module.scss";
import { PersistedGrantsProps } from "./PersistedGrants.type";

const PersistedGrants = ({ className }: PersistedGrantsProps) => {
  const classNames = [css.PersistedGrants, className].filter(Boolean).join(" ");

  return (
    <div className={classNames} data-testid="PersistedGrants">
      PersistedGrants works!!
    </div>
  );
};

export default PersistedGrants;
