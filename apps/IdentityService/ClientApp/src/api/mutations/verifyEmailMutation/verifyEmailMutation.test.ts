import api from "utils/api";

import { verifyEmailMutation } from "./verifyEmailMutation";

jest.mock("utils/api");

describe("verifyEmailMutation", () => {
  const apiMock = api as jest.Mocked<typeof api>;

  it("should be defined", () => {
    expect(verifyEmailMutation).toBeDefined();
  });

  it("should call post on apiMock with correct arguments", () => {
    const formData = {
      userId: "00000000-0000-0000-0000-000000000000",
      token: "marklar",
      code: 424242,
    };

    verifyEmailMutation(formData);

    expect(apiMock.post).toHaveBeenCalled();

    expect(apiMock.post).toHaveBeenCalledTimes(1);

    expect(apiMock.post).toHaveBeenCalledWith("/auth/verifyEmail", formData);
  });
});
