const userManagerMock = {
  events: {
    addAccessTokenExpired: jest.fn(),
    addAccessTokenExpiring: jest.fn(),
    addSilentRenewError: jest.fn(),
    addUserLoaded: jest.fn(),
    addUserSessionChanged: jest.fn(),
    addUserSignedIn: jest.fn(),
    addUserSignedOut: jest.fn(),
    addUserUnloaded: jest.fn(),
    load: jest.fn(),
    removeAccessTokenExpired: jest.fn(),
    removeAccessTokenExpiring: jest.fn(),
    removeSilentRenewError: jest.fn(),
    removeUserLoaded: jest.fn(),
    removeUserSessionChanged: jest.fn(),
    removeUserSignedIn: jest.fn(),
    removeUserSignedOut: jest.fn(),
    removeUserUnloaded: jest.fn(),
    unload: jest.fn(),
  },
  clearStaleState: jest.fn(),
  getUser: jest.fn(),
  storeUser: jest.fn(),
  removeUser: jest.fn(),
  signinPopupCallback: jest.fn(),
  signinSilent: jest.fn(),
  signinSilentCallback: jest.fn(),
  signinRedirect: jest.fn(),
  signinRedirectCallback: jest.fn(),
  signoutRedirect: jest.fn(),
  signoutRedirectCallback: jest.fn(),
  signoutPopup: jest.fn(),
  signoutPopupCallback: jest.fn(),
  signinCallback: jest.fn(),
  signoutCallback: jest.fn(),
  querySessionStatus: jest.fn(),
  revokeAccessToken: jest.fn(),
  startSilentRenew: jest.fn(),
  stopSilentRenew: jest.fn(),
  createSigninRequest: jest.fn(),
  processSigninResponse: jest.fn(),
  createSignoutRequest: jest.fn(),
  processSignoutResponse: jest.fn(),
  settings: {},
  metadataService: {
    resetSigningKeys: jest.fn(),

    getMetadata: jest.fn(),

    getIssuer: jest.fn(),

    getAuthorizationEndpoint: jest.fn(),

    getUserInfoEndpoint: jest.fn(),

    getTokenEndpoint: jest.fn(),

    getCheckSessionIframe: jest.fn(),

    getEndSessionEndpoint: jest.fn(),

    getRevocationEndpoint: jest.fn(),

    getKeysEndpoint: jest.fn(),

    getSigningKeys: jest.fn(),
  },
};

export default userManagerMock;
