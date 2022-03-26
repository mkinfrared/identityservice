import { ReactNode } from "react";

import { MainRoutes } from "routes/MainRoute";

export type AppLinkProps = {
  children?: ReactNode;
  /**
   * a string that will be applied as a css class to parent element
   */
  className?: string;
  to: MainRoutes;
};
