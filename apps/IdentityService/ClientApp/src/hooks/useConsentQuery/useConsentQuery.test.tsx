import { renderHook, waitFor } from "@testing-library/react";

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

    const { result } = renderHook(() => hook(returnUrl), {
      wrapper: withQuery,
    });

    await waitFor(() => expect(result.current.data).toEqual("42"));
  });
});
