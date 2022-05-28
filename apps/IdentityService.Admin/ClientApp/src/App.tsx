import { Spinner, useTheme } from "@identity-service/ui";
import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

import AppRoutes from "routes/AppRoutes";

import css from "./App.module.scss";

const App = () => {
  useTheme("app-theme");

  return (
    <BrowserRouter>
      <div className={css.App}>
        <Suspense
          fallback={<Spinner className={css.spinner} type="infinity" />}
        >
          <AppRoutes />
        </Suspense>
      </div>
    </BrowserRouter>
  );
};

export default App;
