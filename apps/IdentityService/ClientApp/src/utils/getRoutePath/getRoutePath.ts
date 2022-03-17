import { MainProps, Routes } from "pages/Main/Main.type";

const getRoutePath = (pathname: string) => {
  let path: MainProps["path"] = Routes.LOGIN;

  const consentReg = /\/Consent/i;
  const confirmEmailReg = /\/ConfirmEmail/i;
  const registerReg = /\/Register/i;

  if (registerReg.test(pathname)) {
    path = Routes.REGISTER;
  }

  if (confirmEmailReg.test(pathname)) {
    path = Routes.CONFIRM_EMAIL;
  }

  if (consentReg.test(pathname)) {
    path = Routes.CONSENT;
  }

  return path;
};

export default getRoutePath;
