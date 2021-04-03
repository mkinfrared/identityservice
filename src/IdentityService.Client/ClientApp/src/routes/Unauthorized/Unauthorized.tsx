import { Suspense, lazy, memo } from "react";
import { Route, Switch } from "react-router-dom";

import { RouteTypes } from "routes/Route.type";

const Login = lazy(
  () =>
    import(/* webpackChunkName: "login", webpackPrefetch: true */ "LoginForm")
);

const Unauthorized = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Switch>
      <Route path={RouteTypes.LOGIN} component={Login} />
    </Switch>
  </Suspense>
);

export default memo(Unauthorized);
