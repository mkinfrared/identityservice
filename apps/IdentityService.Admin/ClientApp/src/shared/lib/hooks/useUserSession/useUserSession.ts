import { User } from "oidc-client";
import { useEffect, useState } from "react";

import { userManager } from "../../helpers";

const useUserSession = () => {
  const [user, setUser] = useState<User | null>(null);

  /*
   https://github.com/IdentityModel/oidc-client-js/issues/949#issuecomment-535072059

   Your workflow should be:

   1. Call getUser(watch out, because failed get will resolve with null as argument to Promise.Then)
   2. Check if user is null, if yes then call signinSilent.
   3. If signinSilent fails invoke signinRedirect;

   Callback:
   If this silent then invoke signinSilentCallback, otherwise invoke signinRedirectCallback;
   */

  const checkUserSession = async () => {
    try {
      let data = await userManager.getUser();

      if (!data) {
        data = await userManager.signinSilent();
      }

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
      console.warn("user signed out");

      setUser(null);
    });
  }, []);

  return user;
};

export { useUserSession };
