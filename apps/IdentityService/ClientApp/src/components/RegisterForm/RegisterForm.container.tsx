import { memo } from "react";

import { useReturnUrl } from "hooks";

import RegisterFormFC from "./RegisterForm";
import { RegisterFormContainerProps } from "./RegisterForm.type";

const RegisterFormContainer = (props: RegisterFormContainerProps) => {
  const returnUrl = useReturnUrl();

  return <RegisterFormFC {...props} returnUrl={returnUrl} />;
};

export default memo(RegisterFormContainer);
