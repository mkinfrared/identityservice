import { memo } from "react";

import { useReturnUrl } from "hooks";

import LoginFormFC from "./LoginForm";
import { LoginFormContainerProps } from "./LoginForm.type";

const LoginFormContainer = (props: LoginFormContainerProps) => {
  const returnUrl = useReturnUrl();

  return <LoginFormFC {...props} returnUrl={returnUrl} />;
};

export default memo(LoginFormContainer);
