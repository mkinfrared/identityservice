import { lazyImport } from "@identity-service/core";
import { memo } from "react";
import { Route, Routes } from "react-router-dom";

import { MainRouteProps, MainRoutes } from "./MainRoute.type";

const ConsentForm = lazyImport(
  () =>
    import(
      /* webpackChunkName: "ConsentForm" */
      "components/ConsentForm"
    ),
);

const ConfirmEmailForm = lazyImport(
  () =>
    import(
      /* webpackChunkName: "ConfirmEmail" */
      /* webpackPrefetch: true */
      "components/ConfirmEmailForm"
    ),
);

const ForgotPasswordForm = lazyImport(
  () =>
    import(
      /* webpackChunkName: "ForgotPasswordForm" */
      /* webpackPrefetch: true */
      "components/ForgotPasswordForm"
    ),
);

const LoginForm = lazyImport(
  () =>
    import(
      /* webpackChunkName: "LoginForm" */
      /* webpackPrefetch: true */
      "components/LoginForm"
    ),
);

const PasswordResetForm = lazyImport(
  () =>
    import(
      /* webpackChunkName: "PasswordResetForm" */
      /* webpackPrefetch: false */
      "components/PasswordResetForm"
    ),
);

const RegisterForm = lazyImport(
  () =>
    import(
      /* webpackChunkName: "RegisterForm" */
      /* webpackPrefetch: true */
      "components/RegisterForm"
    ),
);

const MainRoute = ({ className }: MainRouteProps) => (
  <Routes>
    <Route
      path={MainRoutes.LOGIN}
      element={<LoginForm className={className} />}
    />
    <Route
      path={MainRoutes.REGISTER}
      element={<RegisterForm className={className} />}
    />
    <Route
      path={MainRoutes.CONFIRM_EMAIL}
      element={<ConfirmEmailForm className={className} />}
    />
    <Route
      path={MainRoutes.FORGOT_PASSWORD}
      element={<ForgotPasswordForm className={className} />}
    />
    <Route
      path={MainRoutes.RESET_PASSWORD}
      element={<PasswordResetForm className={className} />}
    />
    <Route
      path={MainRoutes.CONSENT}
      element={<ConsentForm className={className} />}
    />
  </Routes>
);

export { MainRoute };

export default memo(MainRoute);

/* webpackInclude: /\.json$/ */
/* webpackExclude: /\.noimport\.json$/ */
/* webpackChunkName: "my-chunk-name" */
/* webpackMode: "lazy" */
/* webpackPrefetch: true */
/* webpackPreload: true */
