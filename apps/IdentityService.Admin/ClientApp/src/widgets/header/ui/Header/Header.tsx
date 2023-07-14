import { classNames } from "@identity-service/core";

import { LoginButton } from "features/user/login";
import { LogoutButton } from "features/user/logout";
import { useUserSession } from "shared/lib/hooks";

import css from "./Header.module.scss";
import { HeaderProps } from "./Header.type";

const Header = ({ className }: HeaderProps) => {
  const user = useUserSession();

  return (
    <div className={classNames(css.Header, className)} data-testid="Header">
      <div>Logo</div>
      <div className={css.right}>
        {user ? <LogoutButton /> : <LoginButton />}
      </div>
    </div>
  );
};

export default Header;
