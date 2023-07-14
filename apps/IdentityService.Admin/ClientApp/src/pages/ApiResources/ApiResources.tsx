import css from "./ApiResources.module.scss";
import { ApiResourcesProps } from "./ApiResources.type";

const ApiResources = ({ className }: ApiResourcesProps) => {
  const classNames = [css.ApiResources, className].filter(Boolean).join(" ");

  return (
    <div className={classNames} data-testid="ApiResources">
      ApiResources works!!
    </div>
  );
};

export default ApiResources;
