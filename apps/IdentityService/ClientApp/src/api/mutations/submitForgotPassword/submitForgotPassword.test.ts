import api from "utils/api";

import { submitForgotPassword } from "./submitForgotPassword";

jest.mock("utils/api");

describe("submitForgotPassword", () => {
  const apiMock = api as jest.Mocked<typeof api>;

  it("should be defined", () => {
    expect(submitForgotPassword).toBeDefined();
  });

  it("should call post on apiMock with correct arguments", async () => {
    apiMock.post.mockResolvedValueOnce({ data: "foo" });

    const data = {
      email: "marklar@coons.com",
      returnUrl: "/foo/bar",
    };

    await submitForgotPassword(data);

    expect(apiMock.post).toHaveBeenCalled();

    expect(apiMock.post).toHaveBeenCalledTimes(1);

    expect(apiMock.post).toHaveBeenCalledWith("/auth/forgotPassword", data);
  });
});
