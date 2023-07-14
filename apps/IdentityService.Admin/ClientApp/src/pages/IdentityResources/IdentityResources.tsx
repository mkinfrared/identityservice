import css from "./IdentityResources.module.scss";
import { IdentityResourcesProps } from "./IdentityResources.type";

const IdentityResources = ({ className }: IdentityResourcesProps) => {
  const classNames = [css.IdentityResources, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classNames} data-testid="IdentityResources">
      IdentityResources works!!
    </div>
  );
};

export default IdentityResources;
