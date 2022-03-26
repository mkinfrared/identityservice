export type MainRouteProps = {
  className?: string;
};

export enum MainRoutes {
  LOGIN = "/account/login",
  REGISTER = "/account/register",
  CONFIRM_EMAIL = "/account/confirmEmail",
  FORGOT_PASSWORD = "/account/forgotPassword",
  RESET_PASSWORD = "/account/resetPassword",
  CONSENT = "/consent",
}
