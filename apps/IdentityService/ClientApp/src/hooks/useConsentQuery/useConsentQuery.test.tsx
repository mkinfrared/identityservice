import { renderHook } from "@testing-library/react-hooks";

import * as queries from "api/queries";
import { withQuery } from "utils/testUtils";

import { useConsentQuery } from "./useConsentQuery";

jest.mock("api/queries");

describe("useConsentQuery", () => {
  const queriesMock = queries as jest.Mocked<typeof queries>;
  const hook = useConsentQuery;
  const returnUrl = "/foo/bar";

  it("should should be defined", () => {
    expect(hook).toBeDefined();
  });

  it("should call 'getConsent'", async () => {
    queriesMock.getConsent.mockResolvedValueOnce("42" as any);

    const { result, waitFor } = renderHook(() => hook(returnUrl), {
      wrapper: withQuery,
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual("42");
  });
});
