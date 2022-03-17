import api from "utils/api";

import { submitConsent } from "./submitConsent";

jest.mock("utils/api");

describe("registerMutation", () => {
  const apiMock = api as jest.Mocked<typeof api>;

  it("should be defined", () => {
    expect(submitConsent).toBeDefined();
  });

  it("should call post on apiMock with correct arguments", () => {
    apiMock.post.mockResolvedValueOnce({ data: "foo" });

    const formData = {
      description: "marklar",
      redirectUrl: "/foo/bar",
      permissionGranted: true,
      rememberConsent: true,
      apiScopes: [],
      identityScopes: [],
    };

    submitConsent(formData);

    expect(apiMock.post).toHaveBeenCalled();

    expect(apiMock.post).toHaveBeenCalledTimes(1);

    expect(apiMock.post).toHaveBeenCalledWith(
      "/consent/submitConsent",
      formData,
    );
  });
});
