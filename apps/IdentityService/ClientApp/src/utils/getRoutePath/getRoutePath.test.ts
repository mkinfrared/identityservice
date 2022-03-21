import { Routes } from "pages/Main/Main.type";

import getRoutePath from "./getRoutePath";

describe("getRoutePath", () => {
  it("should be defined", () => {
    expect(getRoutePath).toBeDefined();
  });

  it("should return login when pathname contains 'login'", () => {
    const result = getRoutePath("/account/login?some=query");

    expect(result).toBe(Routes.LOGIN);
  });

  it("should return register when pathname contains 'register'", () => {
    const result = getRoutePath("/account/register?some=query");

    expect(result).toBe(Routes.REGISTER);
  });

  it("should return confirmEmail when pathname contains 'confirmEmail'", () => {
    const result = getRoutePath("/account/confirmEmail?some=query");

    expect(result).toBe(Routes.CONFIRM_EMAIL);
  });

  it("should return consent when pathname contains 'consent'", () => {
    const result = getRoutePath("/account/consent?some=query");

    expect(result).toBe(Routes.CONSENT);
  });

  it("should return resetPassword when pathname contains 'resetPassword'", () => {
    const result = getRoutePath("/account/resetPassword?some=query");

    expect(result).toBe(Routes.PASSWORD_RESET);
  });

  it("should return forgotPassword when pathname contains 'forgotPassword'", () => {
    const result = getRoutePath("/account/forgotPassword?some=query");

    expect(result).toBe(Routes.FORGOT_PASSWORD);
  });
});
