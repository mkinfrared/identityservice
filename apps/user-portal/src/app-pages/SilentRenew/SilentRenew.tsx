import React, { memo, useCallback, useEffect } from "react";

import useUserManager from "hooks/useUserManager";
import useUserSession from "hooks/useUserSession";

const SilentRenew = () => {
  const userManager = useUserManager();
  const { setUser } = useUserSession();

  const signInSilent = useCallback(async () => {
    try {
      const user = await userManager?.signinSilentCallback();

      setUser(user ?? null);
    } catch (e) {
      console.error("failed silent renew");

      console.error(e);
    }
  }, [setUser, userManager]);

  useEffect(() => {
    signInSilent();
  }, [signInSilent]);

  return (
    <div>
      <noscript> You need to enable JavaScript to run this app.</noscript>
    </div>
  );
};

export { SilentRenew };

export default memo(SilentRenew);
