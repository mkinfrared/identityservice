/* eslint-disable no-console */
import {
  UserManager,
  UserManagerSettings,
  WebStorageStateStore,
} from "oidc-client";
import { useEffect, useState } from "react";

import {
  AUTHORITY,
  BASE_URL,
  CLIENT_ID,
  POST_LOGOUT_REDIRECT_URI,
  REDIRECT_URI,
  RESPONSE_TYPE,
  SCOPE,
  SILENT_REDIRECT_URI,
} from "utils/secrets";

const useUserManager = () => {
  const [userManager, setUserManager] = useState<UserManager | null>(null);

  useEffect(() => {
    const settings: UserManagerSettings = {
      authority: AUTHORITY,
      client_id: CLIENT_ID,
      redirect_uri: BASE_URL + REDIRECT_URI,
      response_type: RESPONSE_TYPE,
      scope: SCOPE,
      post_logout_redirect_uri: BASE_URL + POST_LOGOUT_REDIRECT_URI,
      silent_redirect_uri: BASE_URL + SILENT_REDIRECT_URI,
      automaticSilentRenew: true,
      // userStore should match the store with signin callback and silent signin
      userStore: new WebStorageStateStore({ store: localStorage }),
      // Make sure this is not added to settings
      // loadUserInfo: true,
      // Should be in callbacks
      // response_mode: "query",
    };

    const manager = new UserManager(settings);

    manager.events.addUserLoaded((event) => {
      console.log("user loaded");

      console.log(event);
    });

    manager.events.addUserSignedIn(() => {
      console.log("user signed in");
    });

    manager.events.addUserSignedOut(() => {
      console.log("user signed out");
    });

    manager.events.addAccessTokenExpiring((event) => {
      console.log("access token expiring");

      console.log(event);
    });

    manager.events.addAccessTokenExpired((event) => {
      console.log("access token expired");

      console.log(event);
    });

    setUserManager(manager);
  }, []);

  return userManager;
};

export default useUserManager;
