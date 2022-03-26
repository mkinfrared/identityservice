import { memo } from "react";

import { useReturnUrl } from "hooks";

import ConfirmEmailFormFC from "./ConfirmEmailForm";
import { ConfirmEmailFormContainerProps } from "./ConfirmEmailForm.type";

const ConfirmEmailFormContainer = (props: ConfirmEmailFormContainerProps) => {
  const returnUrl = useReturnUrl();

  return <ConfirmEmailFormFC {...props} returnUrl={returnUrl} />;
};

export default memo(ConfirmEmailFormContainer);
