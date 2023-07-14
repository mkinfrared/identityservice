import { Button } from "@mui/material";

import { userManager } from "shared/lib/helpers";

import { LoginButtonProps } from "./LoginButton.type";

const LoginButton = ({ className }: LoginButtonProps) => {
  const logIn = () => {
    userManager.signinRedirect();
  };

  return (
    <Button className={className} data-testid="LoginButton" onClick={logIn}>
      Login
    </Button>
  );
};

export default LoginButton;
