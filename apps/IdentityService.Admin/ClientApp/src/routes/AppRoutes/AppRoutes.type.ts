import { route } from "react-router-typesafe-routes/dom";

export type AppRoutesProps = {
  /**
   * a string that will be applied as a css class to parent element
   */
  className?: string;
};

export const AppRoute = {
  HOME: route(""),
  LOGIN: route("login"),
};
