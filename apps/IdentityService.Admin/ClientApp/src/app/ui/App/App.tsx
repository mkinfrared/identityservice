import { Spin } from "antd";
import { Suspense } from "react";

import { useUserSession } from "shared/lib/hooks";
import { Header } from "widgets/header";
import { Main } from "widgets/main";
import { MainSidebar } from "widgets/mainSidebar";

import { AppRouterProvider, withProviders } from "../../providers";

import css from "./App.module.scss";

const App = () => {
  const user = useUserSession();

  return (
    <div className={css.App}>
      <Header />
      <div className={css.content}>
        <Suspense fallback={<Spin className={css.spinner} size="large" />}>
          {user && <MainSidebar className={css.sidebar} />}
          <Main className={css.main}>
            <AppRouterProvider />
          </Main>
        </Suspense>
      </div>
    </div>
  );
};

export default withProviders(App);
