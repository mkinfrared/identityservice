import { memo } from "react";
import { Link, useLocation } from "react-router-dom";

import { AppLinkProps } from "./AppLink.type";

const AppLink = ({ children, className, to }: AppLinkProps) => {
  const { search, hash } = useLocation();

  const direction = {
    search,
    hash,
    pathname: to,
  };

  return (
    <Link className={className} data-testid="AppLink" to={direction}>
      {children}
    </Link>
  );
};

export { AppLink };

export default memo(AppLink);
