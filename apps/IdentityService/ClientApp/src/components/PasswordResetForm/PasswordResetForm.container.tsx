import { useSearchParams } from "react-router-dom";

import PasswordResetFormFC from "./PasswordResetForm";
import { PasswordResetFormContainerProps } from "./PasswordResetForm.type";

const PasswordResetFormContainer = ({
  className,
}: PasswordResetFormContainerProps) => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const userId = params.get("userId");

  if (!token || !userId) {
    console.error("Token or UserId are missing");

    return null;
  }

  return (
    <PasswordResetFormFC className={className} token={token} userId={userId} />
  );
};

export default PasswordResetFormContainer;
