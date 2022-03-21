import api from "utils/api";

import { submitPasswordChange } from "./submitPasswordChange";

jest.mock("utils/api");

describe("submitPasswordChange", () => {
  const apiMock = api as jest.Mocked<typeof api>;

  it("should be defined", () => {
    expect(submitPasswordChange).toBeDefined();
  });

  it("should call post on apiMock with correct arguments", async () => {
    apiMock.post.mockResolvedValueOnce({ data: "foo" });

    const data = {
      userId: "marklar",
      token: "foobar",
      password: "verystrongpassword",
      confirmPassword: "verystrongpassword",
    };

    await submitPasswordChange(data);

    expect(apiMock.post).toHaveBeenCalled();

    expect(apiMock.post).toHaveBeenCalledTimes(1);

    expect(apiMock.post).toHaveBeenCalledWith("/auth/resetPassword", data);
  });
});
