/* eslint-disable no-console */
import Oidc, { UserManager, UserManagerSettings } from "oidc-client";

Oidc.Log.logger = console;

const settings: UserManagerSettings = {
  authority: "https://localhost:2001",
  client_id: "identity_admin_client",
  redirect_uri: "https://localhost:4001/signin-callback.html",
  response_type: "code",
  scope: "openid profile OrdersApi",
  post_logout_redirect_uri: "https://localhost:4001/logout",
  silent_redirect_uri: "https://localhost:4001/silent-renew.html",
  automaticSilentRenew: true,
  // userStore: new WebStorageStateStore({ store: window.localStorage }),
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

export default userManager;
