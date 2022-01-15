import { memo } from "react";
import { useLocation } from "react-use";

import getRoutePath from "utils/getRoutePath";

import MainFC from "./Main";
import { MainProps } from "./Main.type";

const Main = (props: Omit<MainProps, "path">) => {
  const { pathname } = useLocation();

  if (!pathname) {
    return null;
  }

  const path = getRoutePath(pathname);

  return <MainFC {...props} path={path} />;
};

export default memo(Main);
