import api from "utils/api";

import { registerMutation } from "./registerMutation";

jest.mock("utils/api");

describe("registerMutation", () => {
  const apiMock = api as jest.Mocked<typeof api>;

  it("should be defined", () => {
    expect(registerMutation).toBeDefined();
  });

  it("should call post on apiMock with correct arguments", () => {
    apiMock.post.mockResolvedValueOnce({ data: "foo" });

    const formData = {
      username: "marklar",
      firstName: "Timmy",
      lastName: "Burch",
      email: "timmy@coons.com",
      phoneNumber: "42",
      password: "foobar",
      passwordConfirmation: "foobar",
      redirectUrl: "/foo/bar"
    };

    registerMutation(formData);

    expect(apiMock.post).toHaveBeenCalled();

    expect(apiMock.post).toHaveBeenCalledTimes(1);

    expect(apiMock.post).toHaveBeenCalledWith("/auth/register", formData);
  });
});
