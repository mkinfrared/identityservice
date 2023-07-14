import { Loading } from "@identity-service/ui";
import { Suspense } from "react";

import { AppRoutes } from "routes/AppRoutes";
import { useUserSession } from "shared/lib/hooks";
import { Header } from "widgets/header";
import { Main } from "widgets/main";
import { MainSidebar } from "widgets/mainSidebar";

import { withProviders } from "../../providers";

import css from "./App.module.scss";

const App = () => {
  const user = useUserSession();

  return (
    <div className={css.App}>
      <Header />
      <div className={css.content}>
        {user && <MainSidebar className={css.sidebar} />}
        <Main className={css.main}>
          <Suspense fallback={<Loading type="infinity" />}>
            <AppRoutes />
          </Suspense>
        </Main>
      </div>
    </div>
  );
};

export { App };

export default withProviders(App);
