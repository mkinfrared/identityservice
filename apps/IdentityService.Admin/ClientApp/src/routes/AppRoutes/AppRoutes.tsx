import { Route, Routes } from "react-router-dom";

import { lazyImport } from "shared/lib/helpers";
import { APP_ROUTES } from "shared/types/routes";

const ApiResourcesPage = lazyImport(
  async () =>
    import(
      /* webpackChunkName: "ApiResourcesPage" */
      /* webpackPrefetch: true */
      "pages/ApiResources"
    ),
);

const ApiScopesPage = lazyImport(
  async () =>
    import(
      /* webpackChunkName: "ApiScopesPage" */
      /* webpackPrefetch: true */
      "pages/ApiScopes"
    ),
);

const ClientsPage = lazyImport(
  async () =>
    import(
      /* webpackChunkName: "ClientsPage" */
      /* webpackPrefetch: true */
      "pages/Clients"
    ),
);

const IdentityResourcesPage = lazyImport(
  async () =>
    import(
      /* webpackChunkName: "IdentityResourcesPage" */
      /* webpackPrefetch: true */
      "pages/IdentityResources"
    ),
);

const LogoutPage = lazyImport(
  async () =>
    import(
      /* webpackChunkName: "LogoutPage" */
      /* webpackPrefetch: true */
      "pages/Logout"
    ),
);

const HomePage = lazyImport(
  async () =>
    import(
      /* webpackChunkName: "HomePage" */
      /* webpackPrefetch: true */
      "pages/Home"
    ),
);

const PersistedGrantsPage = lazyImport(
  async () =>
    import(
      /* webpackChunkName: "PersistedGrantsPage" */
      /* webpackPrefetch: true */
      "pages/PersistedGrants"
    ),
);

const RolesPage = lazyImport(
  async () =>
    import(
      /* webpackChunkName: "RolesPage" */
      /* webpackPrefetch: true */
      "pages/Roles"
    ),
);

const UsersPage = lazyImport(
  async () =>
    import(
      /* webpackChunkName: "UsersPage" */
      /* webpackPrefetch: true */
      "pages/Users"
    ),
);

const AppRoutes = () => (
  <Routes>
    <Route path={APP_ROUTES.Home.path} element={<HomePage />} />
    <Route path={APP_ROUTES.ApiResources.path} element={<ApiResourcesPage />} />
    <Route path={APP_ROUTES.ApiScopes.path} element={<ApiScopesPage />} />
    <Route path={APP_ROUTES.Clients.path} element={<ClientsPage />} />
    <Route
      path={APP_ROUTES.IdentityResources.path}
      element={<IdentityResourcesPage />}
    />
    <Route path={APP_ROUTES.Logout.path} element={<LogoutPage />} />
    <Route
      path={APP_ROUTES.PersistedGrants.path}
      element={<PersistedGrantsPage />}
    />
    <Route path={APP_ROUTES.Roles.path} element={<RolesPage />} />
    <Route path={APP_ROUTES.Users.path} element={<UsersPage />} />
  </Routes>
);

export default AppRoutes;
