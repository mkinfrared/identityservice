import { Button } from "@identity-service/ui";
import { memo, useCallback } from "react";

import userManager from "utils/userManager";

import css from "./Login.module.scss";

const Login = () => {
  const handleClick = useCallback(() => {
    userManager.signinRedirect();
  }, []);

  return (
    <div className={css.Login} data-testid="Login">
      <Button onClick={handleClick}>Login</Button>
    </div>
  );
};

export { Login };

export default memo(Login);
