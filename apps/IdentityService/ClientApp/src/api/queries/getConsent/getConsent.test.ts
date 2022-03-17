import api from "utils/api";

import { getConsent } from "./getConsent";

jest.mock("utils/api");

describe("getConsent", () => {
  const apiMock = api as jest.Mocked<typeof api>;

  it("should be defined", () => {
    expect(getConsent).toBeDefined();
  });

  it("should call get on apiMock with correct arguments", () => {
    apiMock.get.mockResolvedValueOnce({ data: 42 });

    const returnUrl = "/marklar";
    const params = { returnUrl };

    getConsent(returnUrl);

    expect(apiMock.get).toHaveBeenCalled();

    expect(apiMock.get).toHaveBeenCalledTimes(1);

    expect(apiMock.get).toHaveBeenCalledWith("/consent/getConsent", { params });
  });
});
