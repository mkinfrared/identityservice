import { Button } from "@mui/material";

import { userManager } from "shared/lib/helpers";

import { LogoutButtonProps } from "./LogoutButton.type";

const LogoutButton = ({ className }: LogoutButtonProps) => {
  const logIn = () => {
    userManager.signoutRedirect();
  };

  return (
    <Button className={className} data-testid="LoginButton" onClick={logIn}>
      Logout
    </Button>
  );
};

export default LogoutButton;
