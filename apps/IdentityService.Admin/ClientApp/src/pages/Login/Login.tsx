import { Button } from "@identity-service/ui";
import { useCallback } from "react";

import { userManager } from "shared/lib/helpers";

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

export default Login;
