import { lazyImport } from "@identity-service/core";
import { Navigate, Route, Routes } from "react-router-dom";

import { useUserSession } from "shared/lib/hooks";

import { AppRoute } from "./AppRoutes.type";

const Home = lazyImport(
  () =>
    import(
      /* webpackChunkName: "Home" */
      "pages/Home"
    ),
);

const Login = lazyImport(
  () =>
    import(
      /* webpackChunkName: "Login" */
      "pages/Login"
    ),
);

const AppRoutes = () => {
  const user = useUserSession();

  if (!user) {
    return (
      <Routes>
        <Route path={AppRoute.LOGIN.path} element={<Login />} />
        <Route path="*" element={<Navigate to={AppRoute.LOGIN.path} />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path={AppRoute.HOME.path} element={<Home />} />
      <Route path={AppRoute.CLIENTS.path} element={<div>Client</div>} />
      <Route path="*" element={<Navigate to={AppRoute.HOME.path} replace />} />
    </Routes>
  );
};

export default AppRoutes;
