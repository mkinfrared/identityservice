export type MainProps = {
  /**
   * a string that will be applied as a css class to parent element
   */
  className?: string;
  path: Routes;
};

export enum Routes {
  CONSENT = "consent",
  CONFIRM_EMAIL = "confirmEmail",
  LOGIN = "login",
  REGISTER = "register",
  FORGOT_PASSWORD = "forgotPassword",
  PASSWORD_RESET = "resetPassword",
}
