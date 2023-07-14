import { classNames } from "@identity-service/core";
import { Outlet } from "react-router-dom";

import { useUserSession } from "shared/lib/hooks";
import { Main } from "widgets/main";
import { MainSidebar } from "widgets/mainSidebar";

import css from "./Root.module.scss";
import { RootProps } from "./Root.type";

const Root = ({ className }: RootProps) => {
  const user = useUserSession();

  return (
    <div className={classNames(css.Root, className)} data-testid="Root">
      {user && <MainSidebar className={css.sidebar} />}
      <Main className={css.main}>
        <Outlet />
      </Main>
    </div>
  );
};

export default Root;
