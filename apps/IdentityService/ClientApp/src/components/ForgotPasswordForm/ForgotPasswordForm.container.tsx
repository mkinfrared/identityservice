import { memo } from "react";

import { useReturnUrl } from "hooks";

import ForgotPasswordFormFC from "./ForgotPasswordForm";
import { ForgotPasswordFormContainerProps } from "./ForgotPasswordForm.type";

const ForgotPasswordFormContainer = (
  props: ForgotPasswordFormContainerProps,
) => {
  const returnUrl = useReturnUrl();

  return <ForgotPasswordFormFC {...props} returnUrl={returnUrl} />;
};

export default memo(ForgotPasswordFormContainer);
