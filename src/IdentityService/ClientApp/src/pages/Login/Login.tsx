import { memo } from "react";

import LoginForm from "components/LoginForm";
import { useReturnUrl } from "hooks";

import css from "./Login.module.scss";

const Login = () => {
  const returnUrl = useReturnUrl();

  return (
    <div className={css.Login}>
      <LoginForm className={css.form} returnUrl={returnUrl} />
    </div>
  );
};

export { Login };

export default memo(Login);
