/* eslint-disable no-console */
import Oidc, {
  UserManager,
  UserManagerSettings,
  WebStorageStateStore,
} from "oidc-client";

import {
  AUTHORITY,
  BASE_URL,
  CLIENT_ID,
  POST_LOGOUT_REDIRECT_URI,
  REDIRECT_URI,
  RESPONSE_TYPE,
  SCOPE,
  SILENT_REDIRECT_URI,
} from "shared/config/secrets";

Oidc.Log.logger = console;

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
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  mergeClaims: true,
  loadUserInfo: true,
  // Make sure this is not added to settings
  // loadUserInfo: true,
  // Should be in callbacks
  // response_mode: "query",
};

const userManager = new UserManager(settings);

userManager.events.addAccessTokenExpiring((event) => {
  console.log("access token expiring");

  console.log(event);
});

userManager.events.addAccessTokenExpired((event) => {
  console.log("access token expired");

  console.log(event);
});

(window as any).userManager = userManager;

export { userManager };
