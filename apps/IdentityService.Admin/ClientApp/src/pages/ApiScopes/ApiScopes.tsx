import css from "./ApiScopes.module.scss";
import { ApiScopesProps } from "./ApiScopes.type";

const ApiScopes = ({ className }: ApiScopesProps) => {
  const classNames = [css.ApiScopes, className].filter(Boolean).join(" ");

  return (
    <div className={classNames} data-testid="ApiScopes">
      ApiScopes works!!
    </div>
  );
};

export default ApiScopes;
