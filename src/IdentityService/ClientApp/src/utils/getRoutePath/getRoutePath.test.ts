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
});
