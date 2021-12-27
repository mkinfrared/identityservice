import { classNames } from "@identity-service/core";
import { memo } from "react";

import ConfirmEmail from "components/ConfirmEmailForm";
import LoginForm from "components/LoginForm";
import RegisterForm from "components/RegisterForm";
import { useReturnUrl } from "hooks";

import css from "./Main.module.scss";
import { MainProps } from "./Main.type";

const Main = ({ className, path }: MainProps) => {
  const returnUrl = useReturnUrl();

  let child: JSX.Element;

  switch (path) {
    case "login":
      child = <LoginForm className={css.formContainer} returnUrl={returnUrl} />;

      break;
    case "register":
      child = (
        <RegisterForm className={css.formContainer} returnUrl={returnUrl} />
      );

      break;
    case "confirmEmail":
      child = (
        <ConfirmEmail className={css.formContainer} returnUrl={returnUrl} />
      );

      break;
    default:
      child = <LoginForm className={css.formContainer} returnUrl={returnUrl} />;
  }

  return <div className={classNames(css.Main, className)}>{child}</div>;
};

export { Main };

export default memo(Main);
