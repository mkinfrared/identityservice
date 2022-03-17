import { renderHook } from "@testing-library/react-hooks";

import * as mutations from "api/mutations";
import { withQuery } from "utils/testUtils";

import { useConsentSubmitMutation } from "./useConsentSubmitMutation";

jest.mock("api/mutations");

describe("useConsentSubmitMutation", () => {
  const mutationsMock = mutations as jest.Mocked<typeof mutations>;
  const hook = useConsentSubmitMutation;

  it("should should be defined", () => {
    expect(hook).toBeDefined();
  });

  it("should call 'submitConsent'", async () => {
    mutationsMock.submitConsent.mockResolvedValueOnce("42" as any);

    const { result, waitFor } = renderHook(() => hook(), {
      wrapper: withQuery,
    });

    result.current.mutateAsync("42" as any);

    await waitFor(() => {
      expect(mutationsMock.submitConsent).toHaveBeenCalled();

      expect(mutationsMock.submitConsent).toHaveBeenCalledTimes(1);

      expect(mutationsMock.submitConsent).toHaveBeenCalledWith("42");
    });
  });
});
