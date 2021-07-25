import { memo } from "react";

import RegisterForm from "components/RegisterForm";
import { useReturnUrl } from "hooks";

import css from "./Register.module.scss";

const Register = () => {
  const returnUrl = useReturnUrl();

  return (
    <div className={css.Register}>
      <RegisterForm className={css.form} returnUrl={returnUrl} />
    </div>
  );
};

export { Register };

export default memo(Register);
