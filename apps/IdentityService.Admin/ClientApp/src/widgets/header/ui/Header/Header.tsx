import { classNames } from "@identity-service/core";

import css from "./Header.module.scss";
import { HeaderProps } from "./Header.type";

const Header = ({ className }: HeaderProps) => (
  <div className={classNames(css.Header, className)} data-testid="Header">
    Header works!!
  </div>
);

export default Header;
