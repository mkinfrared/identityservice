import { route } from "react-router-typesafe-routes/dom";

export const APP_ROUTES = {
  Home: route(""),
  ApiResources: route("api-resources"),
  ApiScopes: route("api-scopes"),
  Clients: route("clients"),
  IdentityResources: route("identity-resources"),
  Logout: route("logout"),
  PersistedGrants: route("persisted-grants"),
  Roles: route("roles"),
  Users: route("users"),
};
