export type MainProps = {
  /**
   * a string that will be applied as a css class to parent element
   */
  className?: string;
  path: Routes;
};

export enum Routes {
  LOGIN = "login",
  REGISTER = "register",
  CONFIRM_EMAIL = "confirmEmail",
}
