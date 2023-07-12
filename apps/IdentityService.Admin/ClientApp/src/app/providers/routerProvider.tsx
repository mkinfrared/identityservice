import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { lazyImport } from "shared/lib/helpers";
import { APP_ROUTES } from "shared/types/routes";

const HomePage = lazyImport(
  async () =>
    import(
      /* webpackChunkName: "HomePage" */
      /* webpackPrefetch: true */
      "pages/Home"
    ),
);

const routes = createRoutesFromElements(
  <Route path={APP_ROUTES.HOME.path} element={<HomePage />} />,
);

const router = createBrowserRouter(routes);
const AppRouterProvider = () => <RouterProvider router={router} />;

export { AppRouterProvider };
