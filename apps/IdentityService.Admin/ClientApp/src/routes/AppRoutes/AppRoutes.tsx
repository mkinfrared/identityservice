import { lazyImport } from "@identity-service/core";
import { memo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import useUserSession from "hooks/useUserSession";

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
        <Route path={AppRoute.LOGIN} element={<Login />} />
        <Route path="*" element={<Navigate to={AppRoute.LOGIN} />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path={AppRoute.HOME} element={<Home />} />
      <Route path="*" element={<Navigate to={AppRoute.HOME} />} />
    </Routes>
  );
};

export { AppRoutes };

export default memo(AppRoutes);
