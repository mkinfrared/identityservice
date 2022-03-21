import { MainProps, Routes } from "pages/Main/Main.type";

const getRoutePath = (pathname: string) => {
  let path: MainProps["path"] = Routes.LOGIN;

  const consentReg = /\/Consent/i;
  const confirmEmailReg = /\/ConfirmEmail/i;
  const registerReg = /\/Register/i;
  const forgotPasswordReg = /\/ForgotPassword/i;
  const resetPasswordReg = /\/ResetPassword/i;

  if (registerReg.test(pathname)) {
    path = Routes.REGISTER;
  }

  if (confirmEmailReg.test(pathname)) {
    path = Routes.CONFIRM_EMAIL;
  }

  if (consentReg.test(pathname)) {
    path = Routes.CONSENT;
  }

  if (forgotPasswordReg.test(pathname)) {
    path = Routes.FORGOT_PASSWORD;
  }

  if (resetPasswordReg.test(pathname)) {
    path = Routes.PASSWORD_RESET;
  }

  return path;
};

export default getRoutePath;
