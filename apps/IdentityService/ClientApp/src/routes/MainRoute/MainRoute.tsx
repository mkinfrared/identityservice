import { lazyImport } from "@identity-service/core";
import { memo } from "react";
import { Route, Routes } from "react-router-dom";

import { MainRouteProps, MainRoutes } from "./MainRoute.type";

// https://localhost:3000/account/confirmEmail?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3Didentity_admin_client%26redirect_uri%3Dhttps%253A%252F%252Flocalhost%253A4001%252Fsignin-callback.html%26response_type%3Dcode%26scope%3Dopenid%2520profile%2520OrdersApi%26state%3D23df947e40ec4531a85e606db8da06e2%26code_challenge%3DG-bSPoO3MQgVVyKXGStqbpXDtn6GX9hE6ec69HYe1Sc%26code_challenge_method%3DS256%26response_mode%3Dquery

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
