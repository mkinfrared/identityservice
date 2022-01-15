import { MainProps, Routes } from "pages/Main/Main.type";

const getRoutePath = (pathname: string) => {
  let path: MainProps["path"] = Routes.LOGIN;

  const registerReg = /\/Register/i;
  const confirmEmailReg = /\/ConfirmEmail/i;

  if (registerReg.test(pathname)) {
    path = Routes.REGISTER;
  }

  if (confirmEmailReg.test(pathname)) {
    path = Routes.CONFIRM_EMAIL;
  }

  return path;
};

export default getRoutePath;
