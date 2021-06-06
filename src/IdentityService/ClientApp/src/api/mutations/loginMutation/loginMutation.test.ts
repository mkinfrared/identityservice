import api from "utils/api";

import { loginMutation } from "./loginMutation";

jest.mock("utils/api");

describe("loginMutation", () => {
  const apiMock = api as jest.Mocked<typeof api>;

  it("should be defined", () => {
    expect(loginMutation).toBeDefined();
  });

  it("should call post on apiMock with correct arguments", () => {
    apiMock.post.mockResolvedValueOnce({ data: "foo" });

    const formData = {
      username: "marklar",
      password: "foobar",
      returnUrl: "/foo/bar"
    };

    loginMutation(formData);

    expect(apiMock.post).toHaveBeenCalled();

    expect(apiMock.post).toHaveBeenCalledTimes(1);

    expect(apiMock.post).toHaveBeenCalledWith("/auth", formData);
  });
});
