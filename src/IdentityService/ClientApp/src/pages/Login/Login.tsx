import { memo } from "react";
import { useLocation } from "react-use";

import LoginForm from "components/LoginForm";

import css from "./Login.module.scss";

const Login = () => {
  const { search } = useLocation();
  const name = "ReturnUrl";
  const params = new URLSearchParams(search);
  const returnUrl = params.get(name) ?? "";

  return (
    <div className={css.Login}>
      <LoginForm className={css.form} returnUrl={returnUrl} />
    </div>
  );
};

export { Login };

export default memo(Login);
