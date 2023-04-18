export type MainProps = {
  /**
   * a string that will be applied as a css class to parent element
   */
  className?: string;
};

export enum Routes {
  LOGIN = "/account/login",
  REGISTER = "/account/register",
  CONFIRM_EMAIL = "/account/confirmEmail",
  FORGOT_PASSWORD = "/account/forgotPassword",
  RESET_PASSWORD = "/account/resetPassword",
  CONSENT = "/consent",
}
