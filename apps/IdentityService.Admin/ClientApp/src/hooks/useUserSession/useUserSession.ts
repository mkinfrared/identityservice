import { User } from "oidc-client";
import { useEffect, useState } from "react";

import userManager from "utils/userManager";

const useUserSession = () => {
  const [user, setUser] = useState<User | null>(null);

  const checkUserSession = async () => {
    try {
      const data = await userManager.signinSilent();

      setUser(data);
    } catch (e) {
      console.warn(e);

      if (e instanceof Error) {
        if (e.message === "login_required") {
          userManager.removeUser();

          setUser(null);
        }
      }
    }
  };

  useEffect(() => {
    checkUserSession();

    userManager.events.addUserSignedOut(() => {
      setUser(null);
    });
  }, []);

  return user;
};

export default useUserSession;
